"use client";

import { motion } from "framer-motion";

type SkillBarProps = {
  name: string;
  level: number;
  delay?: number;
  icon?: React.ReactNode;
};

export function SkillBar({ name, level, delay = 0, icon }: SkillBarProps) {
  return (
    <motion.div 
      className="space-y-2 group cursor-default"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
          {icon && <span className="text-lg">{icon}</span>}
          {name}
        </span>
        <span className="text-xs text-slate-400 group-hover:text-cyan-400/80 transition-colors">{level}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-slate-700/50">
        <motion.div
           initial={{ width: 0 }}
           whileInView={{ width: `${level}%` }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.9, delay, ease: "easeOut" }}
           className="absolute inset-y-0 left-0 rounded-full bg-accent-gradient shadow-[0_0_10px_rgba(34,211,238,0.4)]"
        />
      </div>
    </motion.div>
  );
}
