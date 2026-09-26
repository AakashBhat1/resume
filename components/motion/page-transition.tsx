"use client";

import { ViewTransition, type ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Keys the page subtree by pathname so every navigation is an exit + enter pair.
 * `update="none"` keeps in-page transitions (e.g. form actions) from animating the whole page.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" update="none" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
