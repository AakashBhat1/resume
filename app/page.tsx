import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { StructuredData } from "@/components/structured-data";
import { HomeHero } from "@/components/home/home-hero";
import { ExperienceTeaser } from "@/components/home/experience-teaser";
import { Marquee } from "@/components/site/marquee";
import { ProjectCard } from "@/components/work/project-card";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { getHeroMedia, getProjectMedia } from "@/lib/media";
import { getFeaturedProjects, projects } from "@/lib/projects";

const PRIMARY_STACK = ["Python", "FastAPI", "Next.js", "PyTorch", "OpenVINO", "YOLO", "OpenCV"] as const;
const SECONDARY_STACK = ["Docker", "PostgreSQL", "Nginx", "AWS EC2", "Playwright", "GitHub Actions", "WebSockets"] as const;

export default function Home() {
  const heroMedia = getHeroMedia();
  const [lead, ...rest] = getFeaturedProjects();

  return (
    <>
      <StructuredData />
      <HomeHero media={heroMedia} />

      <section aria-label="Tools I use" className="mt-8 space-y-2 border-y border-border py-6 sm:py-8">
        <Marquee items={PRIMARY_STACK} durationSeconds={38} className="display text-4xl italic sm:text-6xl" />
        <Marquee items={SECONDARY_STACK} durationSeconds={46} reverse className="text-lg text-muted sm:text-2xl" />
      </section>

      <section className="shell mt-32 sm:mt-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <RevealText as="h2" text="Things I've built lately." className="display mt-4 text-5xl leading-[0.95] sm:text-7xl" />
          </div>
          <Reveal delay={0.15}>
            <Link href="/work" className="group inline-flex items-center gap-2 text-sm font-semibold">
              <span className="link-draw">All projects ({String(projects.length).padStart(2, "0")})</span>
              <FiArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-24">
          <ProjectCard project={lead} media={getProjectMedia(lead.slug)} index={0} aspect="wide" sizes="(max-width: 1200px) 100vw, 1200px" />
          <div className="grid gap-16 md:grid-cols-2 md:gap-10">
            {rest.map((project, index) => (
              <div key={project.slug} className={index % 2 === 1 ? "md:mt-40" : undefined}>
                <ProjectCard
                  project={project}
                  media={getProjectMedia(project.slug)}
                  index={index + 1}
                  aspect={index % 2 === 0 ? "tall" : "standard"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExperienceTeaser />
    </>
  );
}
