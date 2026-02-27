import { portfolioData } from "@/constants/site";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function EducationSection() {
  return (
    <section id="education" className="section-shell">
      <SectionHeading
        eyebrow="Education"
        title="Academic Foundation"
        description="Core education timeline that supports ML and full-stack engineering growth."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {portfolioData.education.map((item, index) => (
          <AnimationWrapper key={`${item.title}-${item.period}`} delay={index * 0.08}>
            <GlassCard className="h-full p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/85">{item.period}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.institution}</p>
            </GlassCard>
          </AnimationWrapper>
        ))}
      </div>
    </section>
  );
}
