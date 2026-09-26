"use client";

import { ViewTransition, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navItems, portfolioData } from "@/constants/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const HIDE_AFTER_PX = 160;

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 24);
    setHidden(current > HIDE_AFTER_PX && current > previous);
  });

  // Reset menu/visibility on navigation, adjusting state during render instead of in an effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setHidden(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <ViewTransition name="site-header">
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          animate={{ y: hidden && !menuOpen ? "-110%" : "0%" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className={cn(
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled && !menuOpen
              ? "border-b border-border/70 bg-background/80 backdrop-blur-md"
              : "border-b border-transparent",
          )}
        >
          <nav className="shell flex h-16 items-center justify-between sm:h-20" aria-label="Primary">
            <Link href="/" className="group relative z-10 flex items-center gap-2" aria-label="Aakash Bhat, home">
              <span className="size-2.5 rounded-full bg-primary transition-transform duration-500 group-hover:scale-150" />
              <span className="display text-lg sm:text-xl">{portfolioData.personal.name}</span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              <ul className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                          active ? "text-background" : "text-foreground/80 hover:text-foreground",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {active ? (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-foreground"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        ) : null}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <a
                href={portfolioData.personal.resumePath}
                download
                className="hidden rounded-full border border-foreground/80 px-4 py-2 text-sm font-medium transition-colors duration-300 hover:bg-foreground hover:text-background sm:inline-flex"
              >
                Résumé
              </a>
              <ThemeToggle />

              <button
                type="button"
                className="relative z-10 inline-flex size-9 items-center justify-center md:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <span className="relative block h-3 w-6">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-px w-6 bg-foreground transition-transform duration-500",
                      menuOpen && "translate-y-1.5 rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px w-6 bg-foreground transition-transform duration-500",
                      menuOpen && "-translate-y-1.5 -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </motion.div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 -z-10 flex flex-col justify-end bg-background px-6 pb-12 md:hidden"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            >
              <ul className="space-y-2">
                {[{ href: "/", label: "Home" }, ...navItems].map((item, index) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 + index * 0.06 }}
                    >
                      <Link href={item.href} className="display block text-5xl leading-tight">
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <a
                href={portfolioData.personal.resumePath}
                download
                className="mt-10 inline-flex w-fit rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
              >
                Download résumé
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </ViewTransition>
  );
}
