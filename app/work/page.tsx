import type { Metadata } from "next";
import { ProjectCard } from "@/components/work/project-card";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { getProjectMedia } from "@/lib/media";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Computer vision, DevOps, security ML and automation projects by Aakash Bhat.",
  alternates: { canonical: "/work" },
};

type Aspect = "tall" | "standard";

// Alternating rhythm so the two columns never line up edge-to-edge.
const LEFT_ASPECTS: readonly Aspect[] = ["tall", "standard", "tall"];
const RIGHT_ASPECTS: readonly Aspect[] = ["standard", "tall", "standard"];

export default function WorkPage() {
  const left = projects.filter((_, index) => index % 2 === 0);
  const right = projects.filter((_, index) => index % 2 === 1);

  const renderColumn = (column: typeof projects, aspects: readonly Aspect[], offset: number) =>
    column.map((project, index) => (
      <ProjectCard
        key={project.slug}
        project={project}
        media={getProjectMedia(project.slug)}
        index={index * 2 + offset}
        aspect={aspects[index % aspects.length]}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    ));

  return (
    <div className="shell pt-32 sm:pt-44">
      <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <h1 className="display text-[clamp(4.5rem,16vw,12rem)] leading-[0.85]">
          <RevealText as="span" text="Work" immediate delay={0.2} />
          <sup className="ml-2 align-top font-sans text-lg font-medium not-italic text-primary sm:text-2xl">
            ({String(projects.length).padStart(2, "0")})
          </sup>
        </h1>
        <Reveal delay={0.5}>
          <p className="max-w-md text-lg leading-relaxed text-muted">
            Self-hosted surveillance, tender automation, 360° video, security ML and local-first tools. Each one
            shipped with its source on GitHub.
          </p>
        </Reveal>
      </header>

      <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-14">
        <div className="space-y-16 md:space-y-28">{renderColumn(left, LEFT_ASPECTS, 0)}</div>
        <div className="space-y-16 md:space-y-28 md:pt-48">{renderColumn(right, RIGHT_ASPECTS, 1)}</div>
      </div>
    </div>
  );
}
