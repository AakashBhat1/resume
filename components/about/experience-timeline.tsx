"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { ExperienceItem } from "@/lib/types";
import { Reveal } from "@/components/motion/reveal";

interface ExperienceTimelineProps {
  items: readonly ExperienceItem[];
}

/** Vertical rail that fills in as the reader scrolls through each role. */
export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={listRef} className="relative space-y-16 pl-8 sm:pl-12">
      <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-border" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: progress }}
        className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-primary"
      />

      {items.map((item) => (
        <li key={`${item.company}-${item.period}`} className="relative">
          <span aria-hidden="true" className="absolute -left-8 top-2 size-[11px] rounded-full border-2 border-primary bg-background sm:-left-12" />
          <Reveal>
            <p className="eyebrow tabular-nums">
              {item.period}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            <h3 className="display mt-3 text-3xl leading-tight sm:text-4xl">{item.company}</h3>
            <p className="mt-1 font-medium text-primary">{item.role}</p>
            <ul className="mt-5 space-y-3 text-muted">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-marigold" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
