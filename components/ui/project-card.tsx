"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";
import type { ProjectItem } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group"
    >
      <GlassCard className="relative h-full overflow-hidden border border-white/10 p-4 transition duration-300 group-hover:border-cyan-300/40 group-hover:shadow-glow sm:p-5">
        <div className="relative mb-5 overflow-hidden rounded-xl border border-white/10">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            width={900}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-cyan-300/10 opacity-90" />
        </div>

        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-300/90">{project.period}</p>
        <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 px-3 py-2 text-sm font-medium text-cyan-50 transition hover:bg-cyan-500/20 hover:border-cyan-300/60"
              aria-label={`Live demo for ${project.title}`}
            >
              <FiExternalLink className="size-4" />
              Live Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-500/40 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/45 hover:text-cyan-200"
            aria-label={`Open ${project.title} on GitHub`}
          >
            <FiGithub className="size-4" />
            GitHub
            <FiArrowUpRight className="size-4" />
          </a>
        </div>
      </GlassCard>
    </motion.article>
  );
}
