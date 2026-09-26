"use client";

import { ViewTransition, type PointerEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ProjectItem } from "@/lib/types";
import type { MediaSet } from "@/lib/media";
import { MediaFrame } from "@/components/media/media-frame";
import { ArtFallback } from "@/components/media/art-fallback";
import { projectIndexLabel } from "@/lib/projects";
import { coverTransitionName, titleTransitionName } from "@/lib/transitions";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface ProjectCardProps {
  project: ProjectItem;
  media: MediaSet;
  index: number;
  aspect?: "wide" | "standard" | "tall";
  sizes?: string;
}

const ASPECT_CLASS: Record<NonNullable<ProjectCardProps["aspect"]>, string> = {
  wide: "aspect-[16/9]",
  standard: "aspect-[4/3]",
  tall: "aspect-[4/5]",
};

export function ProjectCard({ project, media, index, aspect = "standard", sizes }: ProjectCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 300, damping: 30, mass: 0.6 });
  const y = useSpring(pointerY, { stiffness: 300, damping: 30, mass: 0.6 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: (index % 2) * 0.08 }}
    >
      <Link href={`/work/${project.slug}`} className="group block" aria-label={`${project.title}: view project`}>
        <div className="relative" onPointerMove={handlePointerMove}>
          <ViewTransition name={coverTransitionName(project.slug)} share="morph">
            <div className={cn("relative overflow-hidden rounded-[1.25rem]", ASPECT_CLASS[aspect])}>
              <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                <MediaFrame
                  media={media}
                  alt={`${project.title} cover`}
                  className="size-full"
                  sizes={sizes}
                  fallback={<ArtFallback seed={project.slug} label={projectIndexLabel(project.slug)} />}
                />
              </div>
            </div>
          </ViewTransition>

          <motion.span
            aria-hidden="true"
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 hidden [@media(pointer:fine)]:block"
          >
            <span className="block -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100">
              View
            </span>
          </motion.span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <ViewTransition name={titleTransitionName(project.slug)} share="morph">
              <h3 className="display w-fit text-2xl sm:text-3xl">
                <span className="link-draw pb-0.5">{project.title}</span>
              </h3>
            </ViewTransition>
            {project.tagline ? <p className="mt-1.5 text-sm text-muted">{project.tagline}</p> : null}
          </div>
          <span className="eyebrow shrink-0 pt-2 tabular-nums">{project.period}</span>
        </div>

        <p className="mt-3 text-xs text-muted">{project.stack.join("  ·  ")}</p>
      </Link>
    </motion.article>
  );
}
