"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const particles = [
  { top: "12%", left: "8%", size: 8, delay: 0.2, duration: 7 },
  { top: "22%", left: "72%", size: 6, delay: 0.5, duration: 6.5 },
  { top: "46%", left: "15%", size: 10, delay: 0.3, duration: 8 },
  { top: "58%", left: "80%", size: 7, delay: 0.8, duration: 6.8 },
  { top: "75%", left: "30%", size: 9, delay: 0.4, duration: 7.4 },
  { top: "82%", left: "62%", size: 6, delay: 1, duration: 6.2 },
];

export function AnimatedBackground() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1200], [0, 140]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-surface-gradient"
        style={{ y: parallaxY }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 opacity-90">
        <div className="floating-glow absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-[90px]" />
        <div className="floating-glow absolute -right-28 top-44 h-80 w-80 rounded-full bg-sky-500/15 blur-[110px]" />
        <div className="floating-glow absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-400/10 blur-[100px]" />
      </div>

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.top}-${particle.left}`}
          className="absolute rounded-full bg-cyan-300/45 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, index % 2 ? 8 : -8, 0],
            opacity: [0.35, 0.8, 0.35],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,rgba(15,23,42,0.78)_100%)] dark:block" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_center,rgba(248,250,252,0)_0%,rgba(248,250,252,0.82)_100%)] light:block" />
    </div>
  );
}
