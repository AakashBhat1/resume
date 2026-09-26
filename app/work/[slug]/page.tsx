import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Morph } from "@/components/motion/morph";
import { Reveal, RevealText, StaggerList } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/media/media-frame";
import { ArtFallback } from "@/components/media/art-fallback";
import { coverTransitionName, titleTransitionName } from "@/lib/transitions";
import { getProjectMedia } from "@/lib/media";
import { getNextProject, getProjectBySlug, projectIndexLabel, projects, toParagraphs } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.tagline ? `${project.tagline}. ${toParagraphs(project.description)[0]}` : project.description,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const next = getNextProject(project.slug);
  const [lead, ...body] = toParagraphs(project.description);
  const total = String(projects.length).padStart(2, "0");

  return (
    <article className="pt-28 sm:pt-36">
      <header className="shell">
        <Reveal y={12}>
          <Link href="/work" className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground">
            <FiArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
            <span className="link-draw">All work</span>
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-4xl">
            <p className="eyebrow tabular-nums">
              {projectIndexLabel(project.slug)} / {total} · {project.period}
            </p>
            <Morph name={titleTransitionName(project.slug)}>
              <h1 className="display mt-4 w-fit text-[clamp(3rem,9vw,7.5rem)] leading-[0.9]">{project.title}</h1>
            </Morph>
            {project.tagline ? (
              <RevealText as="p" text={project.tagline} immediate delay={0.4} stagger={0.04} className="display mt-4 text-2xl italic text-primary sm:text-3xl" />
            ) : null}
          </div>

          <Reveal delay={0.5} y={12}>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-foreground pl-5 pr-2 text-sm font-semibold text-background"
            >
              <FiGithub className="size-4" />
              View source
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-background/15">
                <FiArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        </div>
      </header>

      <div className="shell mt-12">
        <Morph name={coverTransitionName(project.slug)}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:aspect-[16/9]">
            <MediaFrame
              media={getProjectMedia(project.slug)}
              alt={`${project.title} cover`}
              priority
              parallax
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="size-full"
              fallback={<ArtFallback seed={project.slug} label={projectIndexLabel(project.slug)} />}
            />
          </div>
        </Morph>
      </div>

      <div className="shell mt-20 grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
          <div>
            <p className="eyebrow">Year</p>
            <p className="mt-2 tabular-nums">{project.period}</p>
          </div>
          <div>
            <p className="eyebrow">Stack</p>
            <StaggerList className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="inline-block rounded-full border border-border px-3 py-1.5 text-sm">
                  {tech}
                </span>
              ))}
            </StaggerList>
          </div>
          <div>
            <p className="eyebrow">Source</p>
            <a href={project.github} target="_blank" rel="noreferrer" className="link-draw mt-2 inline-block break-all">
              {project.github.replace("https://", "")}
            </a>
          </div>
        </aside>

        <div className="space-y-8">
          <RevealText as="p" text={lead} stagger={0.015} className="display text-2xl leading-snug sm:text-[2.1rem]" />
          {body.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-lg leading-relaxed text-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="shell mt-32 border-t border-border pt-10" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="group grid items-center gap-8 md:grid-cols-[1fr_20rem]">
          <div>
            <p className="eyebrow">Next project</p>
            <Morph name={titleTransitionName(next.slug)}>
              <p className="display mt-4 w-fit text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] transition-colors duration-500 group-hover:text-primary">
                {next.title}
              </p>
            </Morph>
          </div>
          <Morph name={coverTransitionName(next.slug)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.97]">
              <MediaFrame
                media={getProjectMedia(next.slug)}
                alt={`${next.title} cover`}
                sizes="20rem"
                className="size-full"
                fallback={<ArtFallback seed={next.slug} label={projectIndexLabel(next.slug)} />}
              />
            </div>
          </Morph>
        </Link>
      </section>
    </article>
  );
}
