import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  durationSeconds?: number;
  reverse?: boolean;
  className?: string;
}

/** Infinite CSS marquee (compositor-only transform); pauses on hover and under reduced motion. */
export function Marquee({ items, durationSeconds = 40, reverse = false, className }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 sm:px-8">{item}</span>
          <svg viewBox="-12 -12 24 24" className="size-4 text-marigold sm:size-5" aria-hidden="true">
            <path d="M0 -11 L3 -3 L11 0 L3 3 L0 11 L-3 3 L-11 0 L-3 -3 Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee flex overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max"
        style={
          {
            "--marquee-duration": `${durationSeconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
