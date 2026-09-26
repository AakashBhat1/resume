import type { Metadata } from "next";
import { portfolioData } from "@/constants/site";
import { ExperienceTimeline } from "@/components/about/experience-timeline";
import { Reveal, RevealText, StaggerList } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Experience, skills, education and certificates of Aakash Bhat.",
  alternates: { canonical: "/about" },
};

const { personal, about, experience, skills, education, certifications } = portfolioData;

const CHIP_TINTS = [
  "hover:bg-primary hover:border-primary",
  "hover:bg-marigold hover:border-marigold hover:!text-foreground",
  "hover:bg-moss hover:border-moss",
  "hover:bg-cranberry hover:border-cranberry",
] as const;

function groupByIssuer(): Array<[string, typeof certifications]> {
  const groups = new Map<string, typeof certifications>();
  for (const certification of certifications) {
    groups.set(certification.issuer, [...(groups.get(certification.issuer) ?? []), certification]);
  }
  return [...groups.entries()];
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <p className="eyebrow">{eyebrow}</p>
      <RevealText as="h2" text={title} className="display mt-4 text-4xl leading-[0.95] sm:text-6xl" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-32 sm:pt-44">
      <header className="shell">
        <p className="eyebrow">About</p>
        <RevealText
          as="h1"
          text={about.summary}
          immediate
          delay={0.2}
          stagger={0.025}
          className="display mt-6 max-w-5xl text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1.02]"
        />
        <div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
          <Reveal delay={0.4}>
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              {personal.statement.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="eyebrow">What I focus on</p>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {about.highlights.map((highlight, index) => (
                <li key={highlight} className="flex items-baseline gap-4 py-3">
                  <span className="text-xs tabular-nums text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </header>

      <section className="shell mt-32 grid gap-12 lg:mt-44 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle eyebrow="Experience" title="Where I've worked." />
        <ExperienceTimeline items={experience} />
      </section>

      <section className="shell mt-32 grid gap-12 lg:mt-44 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle eyebrow="Toolkit" title="What I work with." />
        <div className="space-y-10">
          {Object.entries(skills).map(([group, items]) => (
            <Reveal key={group}>
              <p className="eyebrow">{group.replace(" and ", " & ")}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((skill, index) => (
                  <li
                    key={skill}
                    className={cn(
                      "cursor-default rounded-full border border-border px-4 py-2 text-sm transition-colors duration-300 hover:text-white",
                      CHIP_TINTS[index % CHIP_TINTS.length],
                    )}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell mt-32 grid gap-12 lg:mt-44 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle eyebrow="Learning" title="Education & certificates." />
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <p className="eyebrow">Education</p>
            <StaggerList className="mt-4 divide-y divide-border border-y border-border">
              {education.map((item) => (
                <div key={item.title} className="py-5">
                  <p className="text-xs tabular-nums text-muted">{item.period}</p>
                  <p className="display mt-1 text-xl">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.institution}</p>
                </div>
              ))}
            </StaggerList>
          </div>
          <div className="space-y-10">
            {groupByIssuer().map(([issuer, items]) => (
              <div key={issuer}>
                <p className="eyebrow">
                  {issuer} <span className="text-primary">×{items.length}</span>
                </p>
                <StaggerList className="mt-4 divide-y divide-border border-y border-border">
                  {items.map((item) => (
                    <div key={item.title} className="py-4">
                      <p className="leading-snug">{item.title}</p>
                      <p className="mt-1 text-xs tabular-nums text-muted">
                        {item.period}
                        {item.note ? ` · ${item.note}` : ""}
                      </p>
                    </div>
                  ))}
                </StaggerList>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
