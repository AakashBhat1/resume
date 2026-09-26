"use client";

import type { MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

type Theme = "light" | "dark";

function applyThemeClass(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = resolvedTheme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${event.clientX}px`);
    root.style.setProperty("--vt-y", `${event.clientY}px`);
    root.classList.add("theme-vt");

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
      applyThemeClass(next);
    });

    transition.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-primary/60 hover:text-primary"
      aria-label="Toggle colour theme"
    >
      <FiSun className="hidden size-4 transition-transform duration-500 group-hover:rotate-90 dark:block" />
      <FiMoon className="size-4 transition-transform duration-500 group-hover:-rotate-12 dark:hidden" />
    </button>
  );
}
