import { portfolioData } from "@/constants/site";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="About"
        title="Engineering with Product and Intelligence in Mind"
        description="A focused blend of machine learning and modern web engineering, shaped by real deployment experience."
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <AnimationWrapper>
          <GlassCard className="p-6 sm:p-7">
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{portfolioData.about.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {portfolioData.about.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>
        </AnimationWrapper>

        <AnimationWrapper delay={0.08}>
          <GlassCard className="p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-slate-100">Areas of Interest</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {portfolioData.about.interests.map((interest) => (
                <li key={interest} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </AnimationWrapper>
      </div>
    </section>
  );
}
