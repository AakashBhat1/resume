"use client";

import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";

const testimonials = [
  {
    name: "John Doe",
    role: "Senior Engineering Manager",
    company: "Tech Solutions Inc.",
    content:
      "Aakash demonstrated exceptional technical skills and an impressive ability to learn quickly. His work on the real-time AI system was a major contribution to the project.",
  },
  {
    name: "Jane Smith",
    role: "Lead Full-Stack Developer",
    company: "Codec Technologies",
    content:
      "Working with Aakash was a breeze. He writes clean, scalable code and has a deep understanding of modern web architectures. Highly recommended for complex integrations.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-shell">
      <SectionHeading
        eyebrow="Recommendations"
        title="What People Say"
        description="Feedback from mentors, leads, and peers on past collaborations."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, index) => (
          <AnimationWrapper key={t.name} delay={index * 0.15}>
            <GlassCard className="relative h-full border border-white/5 p-6 hover:border-cyan-400/20 transition-colors">
              <FiMessageSquare className="absolute right-6 top-6 size-8 text-cyan-400/10" />
              <p className="relative z-10 text-sm leading-relaxed text-slate-300">
                &quot;{t.content}&quot;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg font-bold text-cyan-300">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-100">{t.name}</h4>
                  <p className="text-xs text-slate-400">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </GlassCard>
          </AnimationWrapper>
        ))}
      </div>
    </section>
  );
}
