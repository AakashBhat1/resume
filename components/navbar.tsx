"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems, portfolioData } from "@/constants/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) {
          continue;
        }

        const start = section.offsetTop;
        const end = start + section.offsetHeight;

        if (y >= start && y < end) {
          setActiveId(item.id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-white/15 bg-slate-900/55 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55">
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className="text-sm font-semibold tracking-[0.15em] text-cyan-200"
          aria-label="Go to home section"
        >
          AB
        </button>

        <ul className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className="relative rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:text-cyan-200"
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-cyan-300"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={portfolioData.personal.resumePath}
            download
            className="hidden items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-400/30 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/20 hover:border-cyan-300/60 md:inline-flex"
          >
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900/55 text-slate-100 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/15 bg-slate-900/90 p-4 shadow-lg backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-cyan-400/10 hover:text-cyan-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={portfolioData.personal.resumePath}
                  download
                  className="mt-2 flex w-full items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-400/30 px-3 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20 hover:border-cyan-300/60"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
