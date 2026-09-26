import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { portfolioData } from "@/constants/site";
import { Reveal, RevealText, StaggerList } from "@/components/motion/reveal";

function shortCompany(company: string): string {
  const acronym = company.match(/\(([^)]+)\)/);
  return acronym ? acronym[1] : company.replace(/ Pvt\. Ltd\.| Private Limited/g, "");
}

export function ExperienceTeaser() {
  return (
    <section className="shell mt-32 sm:mt-40">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Experience</p>
          <RevealText as="h2" text="Where I've been building." className="display mt-4 text-5xl leading-[0.95] sm:text-6xl" />
          <Reveal delay={0.2}>
            <Link href="/about" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              <span className="link-draw">More about me</span>
              <FiArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <StaggerList className="border-t border-border" itemClassName="border-b border-border">
          {portfolioData.experience.map((item) => (
            <div
              key={item.company}
              className="group relative grid gap-1 overflow-hidden py-7 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-marigold/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />
              <span className="text-xs tabular-nums text-muted">{item.period}</span>
              <span>
                <span className="display block text-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-3xl">
                  {shortCompany(item.company)}
                </span>
                <span className="mt-1 block text-sm text-muted">{item.role}</span>
              </span>
              <span className="text-xs text-muted">{item.location}</span>
            </div>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
