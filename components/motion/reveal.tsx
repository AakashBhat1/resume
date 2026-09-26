"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade + rise when the block scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of waiting for the viewport (use above the fold). */
  immediate?: boolean;
}

/** Each word rises out of its own mask: the classic editorial headline reveal. */
export function RevealText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(" ");

  // The sr-only copy is what assistive tech reads; aria-label is ignored on generic elements like <p>/<span>.
  if (immediate) {
    // Pure CSS path: plays on first paint, before hydration, so above-the-fold text is never stuck hidden.
    return (
      <Tag className={className}>
        <span className="sr-only">{text}</span>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="word-rise" style={{ animationDelay: `${delay + index * stagger}s` }}>
              {word}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", rotate: 4 }}
            animate={inView ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: delay + index * stagger }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

interface StaggerListProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  as?: "ul" | "ol" | "div";
}

/** Reveals children one after another, capped so long lists never feel slow. */
export function StaggerList({ children, className, itemClassName, as = "ul" }: StaggerListProps) {
  const ItemTag = as === "div" ? motion.div : motion.li;
  const ListTag = as;

  return (
    <ListTag className={className}>
      {children.map((child, index) => (
        <ItemTag
          key={index}
          className={cn(itemClassName)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: Math.min(index, 6) * 0.07 }}
        >
          {child}
        </ItemTag>
      ))}
    </ListTag>
  );
}
