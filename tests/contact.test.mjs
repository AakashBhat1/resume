import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Compile the actual source with the project's TypeScript dependency; replace
// only request/SMTP boundaries so these tests never send email or need Next running.
function loadSource(path, mocks = {}, globals = {}) {
  const filename = fileURLToPath(new URL(`../${path}`, import.meta.url));
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, esModuleInterop: true },
  });
  const loadedModule = { exports: {} };
  runInNewContext(outputText, {
    module: loadedModule,
    exports: loadedModule.exports,
    require: (id) => Object.hasOwn(mocks, id) ? mocks[id] : require(id),
    process,
    console,
    ...globals,
  }, { filename });
  return loadedModule.exports;
}

function createAction({ forwardedFor = "203.0.113.1", sendMail = async () => {} } = {}) {
  const logs = [];
  const action = loadSource("app/actions/contact.ts", {
    "next/headers": { headers: async () => new Headers(forwardedFor === null ? {} : { "x-forwarded-for": forwardedFor }) },
    "@/lib/mailer": { sendContactMail: sendMail },
    "@/lib/rate-limit": loadSource("lib/rate-limit.ts"),
    "@/lib/validations": loadSource("lib/validations.ts"),
  }, { console: { error: (...args) => logs.push(args) } });
  return { submit: action.submitContactForm, logs };
}

function form(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: "Test Sender", email: "sender@example.com", message: "A test contact message.", ...overrides })) {
    data.set(key, value);
  }
  return data;
}

test("email escapes all HTML fields, preserves line breaks, and removes subject CR/LF", async () => {
  let mail;
  const { sendContactMail } = loadSource("lib/mailer.ts", {
    nodemailer: { createTransport: () => ({ sendMail: async (value) => { mail = value; } }) },
  }, { process: { env: { SMTP_HOST: "smtp.example.com", SMTP_PORT: "465", SMTP_USER: "owner@example.com", SMTP_PASS: "test-only", CONTACT_TO_EMAIL: "owner@example.com" } } });
  const payload = {
    senderName: `A & <b>"B"</b>'\r\nInjected`,
    senderEmail: `x&<>"'@example.com`,
    message: `<a href=x>hi</a>\n& "quoted" 'text'`,
  };
  await sendContactMail(payload);
  assert.ok(mail.html.includes(`A &amp; &lt;b&gt;&quot;B&quot;&lt;/b&gt;&#39;\r\nInjected`));
  assert.ok(mail.html.includes(`x&amp;&lt;&gt;&quot;&#39;@example.com`));
  assert.ok(mail.html.includes(`&lt;a href=x&gt;hi&lt;/a&gt;<br />&amp; &quot;quoted&quot; &#39;text&#39;`));
  assert.doesNotMatch(mail.html, /<a href|<b>/);
  assert.doesNotMatch(mail.subject, /[\r\n]/);
  assert.ok(mail.text.endsWith(payload.message));
  assert.equal(mail.replyTo, payload.senderEmail);
});

test("limiter isolates IPs and resets exactly at the ten-minute boundary", () => {
  let now = 1000;
  const { allowContactSubmission: allow } = loadSource("lib/rate-limit.ts", {}, { Date: { now: () => now } });
  assert.deepEqual([allow("a"), allow("a"), allow("a"), allow("a")], [true, true, true, false]);
  assert.equal(allow("b"), true);
  now += 600000 - 1;
  assert.equal(allow("a"), false);
  now += 1;
  assert.equal(allow("a"), true);
});

for (const forwardedFor of ["203.0.113.1, 10.0.0.1", null]) {
  test(`fourth concurrent submission is blocked (${forwardedFor ?? "missing IP"})`, async () => {
    let sent = 0;
    const { submit } = createAction({ forwardedFor, sendMail: async () => { sent += 1; } });
    const results = await Promise.all(Array.from({ length: 4 }, () => submit({}, form())));
    assert.equal(results.filter((result) => result.status === "success").length, 3);
    assert.equal(sent, 3);
    assert.match(results.find((result) => result.status === "error").message, /try again in 10 minutes/);
  });
}

test("internal failures are logged and replaced by a generic client error", async () => {
  const failure = new Error("Contact email is not configured. Add SMTP env variables.");
  const { submit, logs } = createAction({ sendMail: async () => { throw failure; } });
  const result = await submit({}, form());
  assert.equal(result.status, "error");
  assert.equal(result.message, "Unable to send message right now. Please try again later.");
  assert.equal(logs[0][1], failure);
  // Failed delivery attempts still consume quota.
  await submit({}, form());
  await submit({}, form());
  assert.match((await submit({}, form())).message, /try again in 10 minutes/);
});

test("oversized fields and honeypots do not send email or consume delivery quota", async () => {
  let sent = 0;
  const { submit } = createAction({ sendMail: async () => { sent += 1; } });
  assert.ok((await submit({}, form({ name: "n".repeat(81) }))).fieldErrors.name);
  assert.ok((await submit({}, form({ message: "m".repeat(2001) }))).fieldErrors.message);
  assert.equal((await submit({}, form({ hp_field_x: "spam" }))).status, "success");
  assert.equal(sent, 0);
  for (let index = 0; index < 3; index += 1) {
    assert.equal((await submit({}, form({ name: "n".repeat(80), message: "m".repeat(2000) }))).status, "success");
  }
  assert.equal(sent, 3);
});
