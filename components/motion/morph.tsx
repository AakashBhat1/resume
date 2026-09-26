"use client";

import { ViewTransition, type ReactNode } from "react";

interface MorphProps {
  name: string;
  children: ReactNode;
}

/** Shared-element boundary: two elements with the same name morph across a route change. */
export function Morph({ name, children }: MorphProps) {
  return (
    <ViewTransition name={name} share="morph">
      {children}
    </ViewTransition>
  );
}
