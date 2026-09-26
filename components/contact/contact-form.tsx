"use client";

import { useActionState, useEffect, useRef } from "react";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import { submitContactForm } from "@/app/actions/contact";
import { initialContactState } from "@/app/actions/contact-state";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "message";

interface FieldProps {
  name: FieldName;
  label: string;
  error?: string;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
}

function Field({ name, label, error, multiline = false, type = "text", autoComplete }: FieldProps) {
  const shared = cn(
    "peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-7 text-lg outline-none transition-colors duration-300 placeholder:text-transparent focus:ring-0",
    error ? "border-cranberry" : "border-border focus:border-primary",
  );

  return (
    <div className="relative">
      {multiline ? (
        <textarea id={name} name={name} rows={4} required placeholder={label} className={cn(shared, "resize-none")} aria-invalid={Boolean(error)} />
      ) : (
        <input id={name} name={name} type={type} required placeholder={label} autoComplete={autoComplete} className={shared} aria-invalid={Boolean(error)} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-xs peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-primary"
      >
        {label}
      </label>
      {error ? <p className="mt-2 text-sm text-cranberry">{error}</p> : null}
    </div>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialContactState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-8" noValidate>
      {/* Honeypot: hidden from people, tempting to bots. Name is deliberately not one autofill recognises. */}
      <input type="text" name="hp_field_x" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-8 sm:grid-cols-2">
        <Field name="name" label="Your name" autoComplete="name" error={state.fieldErrors?.name} />
        <Field name="email" label="Email address" type="email" autoComplete="email" error={state.fieldErrors?.email} />
      </div>
      <Field name="message" label="What's on your mind?" multiline error={state.fieldErrors?.message} />

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary pl-7 pr-2 font-semibold text-white transition-colors duration-300 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending…" : "Send message"}
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/15">
            {isPending ? (
              <FiLoader className="size-4 animate-spin" />
            ) : (
              <FiArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
            )}
          </span>
        </button>

        {state.message ? (
          <p role="status" className={cn("text-sm", state.status === "success" ? "text-moss" : "text-cranberry")}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
