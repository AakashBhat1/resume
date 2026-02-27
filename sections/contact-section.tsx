"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiLoader, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { initialContactState } from "@/app/actions/contact-state";
import { submitContactForm } from "@/app/actions/contact";
import { portfolioData } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialContactState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <section id="contact" className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Build Something Valuable"
        description="Open to internships, collaboration opportunities, and meaningful engineering conversations."
      />

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-6 sm:p-7">
          <h3 className="text-lg font-semibold text-slate-100">Direct Contact</h3>
          <p className="mt-2 text-sm text-slate-400">
            Reach out through the form or use direct channels below for faster communication.
          </p>

          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3 text-slate-300">
              <FiMail className="mt-0.5 size-4 text-cyan-300" />
              <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-cyan-200">
                {portfolioData.personal.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <FiPhone className="mt-0.5 size-4 text-cyan-300" />
              <a href={`tel:${portfolioData.personal.phone}`} className="hover:text-cyan-200">
                {portfolioData.personal.phone}
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <FiMapPin className="mt-0.5 size-4 text-cyan-300" />
              <span>{portfolioData.personal.location}</span>
            </li>
          </ul>
        </GlassCard>

        <GlassCard className="p-6 sm:p-7">
          <form ref={formRef} action={formAction} className="space-y-5" noValidate>
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

            <FloatingField
              name="name"
              label="Your Name"
              error={state.fieldErrors?.name}
              autoComplete="name"
            />

            <FloatingField
              name="email"
              label="Email Address"
              type="email"
              error={state.fieldErrors?.email}
              autoComplete="email"
            />

            <FloatingField
              name="message"
              label="Your Message"
              as="textarea"
              error={state.fieldErrors?.message}
              rows={5}
            />

            <motion.button
              type="submit"
              disabled={isPending}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent-gradient px-5 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <FiLoader className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>

            {state.message ? (
              <p
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm",
                  state.status === "success"
                    ? "border-emerald-400/35 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-400/35 bg-rose-500/10 text-rose-200",
                )}
              >
                {state.message}
              </p>
            ) : null}
          </form>
        </GlassCard>
      </div>
    </section>
  );
}

type FloatingFieldProps = {
  name: string;
  label: string;
  type?: "text" | "email";
  as?: "input" | "textarea";
  rows?: number;
  error?: string;
  autoComplete?: string;
};

function FloatingField({
  name,
  label,
  type = "text",
  as = "input",
  rows = 4,
  error,
  autoComplete,
}: FloatingFieldProps) {
  const baseClass = cn(
    "peer input-shell placeholder-transparent",
    error ? "border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/30" : "",
  );

  return (
    <label className="relative block">
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          className={cn(baseClass, "min-h-[130px] resize-y")}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          required
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          className={baseClass}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          required
        />
      )}

      <span className="pointer-events-none absolute left-4 top-3.5 origin-left text-sm text-slate-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:scale-100 peer-focus:-top-2 peer-focus:scale-90 peer-focus:text-cyan-300 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:bg-slate-900/90 peer-[:not(:placeholder-shown)]:px-1">
        {label}
      </span>

      {error ? (
        <p id={`${name}-error`} className="mt-2 text-xs text-rose-300">
          {error}
        </p>
      ) : null}
    </label>
  );
}
