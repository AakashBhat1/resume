"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeading
        eyebrow="Experience"
        title="Industry Training and Practical Delivery"
        description="Hands-on internship experience across data science and MERN stack development."
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute left-3 top-0 w-px bg-gradient-to-b from-cyan-300/70 to-transparent md:left-1/2"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {portfolioData.experience.map((item, index) => (
            <motion.div
              key={`${item.role}-${item.period}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 18 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative md:grid md:grid-cols-2 md:gap-10"
            >
              <span className="absolute left-0 top-4 z-10 inline-flex size-6 items-center justify-center rounded-full border border-cyan-300/60 bg-slate-900 text-[10px] font-bold text-cyan-200 md:left-1/2 md:-translate-x-1/2">
                {index + 1}
              </span>

              <div className={index % 2 === 0 ? "md:pr-12" : "md:col-start-2 md:pl-12"}>
                <GlassCard className="ml-10 p-5 sm:p-6 md:ml-0">
                  <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/85">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-100">{item.role}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.company}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
