import nodemailer from "nodemailer";

type MailPayload = {
  senderName: string;
  senderEmail: string;
  message: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!host || !port || !user || !pass || !to) {
    return null;
  }

  return {
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
    to,
  };
}

export async function sendContactMail(payload: MailPayload) {
  const config = getSmtpConfig();

  if (!config) {
    throw new Error("Contact email is not configured. Add SMTP env variables.");
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  await transporter.sendMail({
    from: `Portfolio Contact <${config.auth.user}>`,
    to: config.to,
    replyTo: payload.senderEmail,
    subject: `Portfolio Inquiry from ${payload.senderName}`,
    text: `Name: ${payload.senderName}\nEmail: ${payload.senderEmail}\n\n${payload.message}`,
    html: `
      <h2>Portfolio Contact Request</h2>
      <p><strong>Name:</strong> ${payload.senderName}</p>
      <p><strong>Email:</strong> ${payload.senderEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message.replace(/\n/g, "<br />")}</p>
    `,
  });
}
