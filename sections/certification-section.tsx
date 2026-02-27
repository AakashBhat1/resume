import { portfolioData } from "@/constants/site";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function CertificationSection() {
  const certification = portfolioData.certification;

  return (
    <section id="certification" className="section-shell">
      <SectionHeading
        eyebrow="Certification"
        title="Professional Credential"
        description="Recognized training that strengthens analytics and data-driven product decision-making."
      />

      <AnimationWrapper>
        <GlassCard className="mx-auto max-w-3xl p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.12em] text-cyan-200">
              Certified
            </span>
            <span className="text-xs uppercase tracking-[0.12em] text-slate-400">{certification.period}</span>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-slate-100">{certification.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{certification.issuer}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">{certification.description}</p>
        </GlassCard>
      </AnimationWrapper>
    </section>
  );
}
