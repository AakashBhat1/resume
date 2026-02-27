"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type AnimationWrapperProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimationWrapper({
  children,
  delay = 0,
  className,
  y,
}: AnimationWrapperProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.6 }}
      custom={y}
    >
      {children}
    </motion.div>
  );
}
