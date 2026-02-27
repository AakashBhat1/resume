"use client";

import { motion } from "framer-motion";

type SkillBarProps = {
  name: string;
  level: number;
  delay?: number;
};

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-200 dark:text-slate-200">{name}</span>
        <span className="text-xs text-slate-400">{level}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full bg-accent-gradient"
        />
      </div>
    </div>
  );
}
