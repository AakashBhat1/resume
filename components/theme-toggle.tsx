"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900/55 text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-200 dark:bg-slate-900/55 dark:text-slate-100"
      aria-label="Toggle dark mode"
    >
      <FiSun className="hidden size-4 dark:block" />
      <FiMoon className="size-4 dark:hidden" />
    </button>
  );
}
