"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CopyEmailProps {
  email: string;
}

const RESET_MS = 2200;

export function CopyEmail({ email }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = window.setTimeout(() => setCopied(false), RESET_MS);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context / permissions); mailto link remains available.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="relative inline-flex h-10 min-w-[7.5rem] items-center justify-center overflow-hidden rounded-full border border-foreground/25 px-5 text-sm font-medium transition-colors duration-300 hover:border-foreground"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "copy"}
          initial={{ y: "120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-120%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {copied ? "Copied ✓" : "Copy email"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
