import { portfolioData } from "@/constants/site";
import type { ProjectItem } from "@/lib/types";

export const projects: readonly ProjectItem[] = portfolioData.projects;

export function getFeaturedProjects(): ProjectItem[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): ProjectItem {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

/** Splits a long description into sentence-sized paragraphs for detail pages. */
export function toParagraphs(text: string): string[] {
  return text
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function projectIndexLabel(slug: string): string {
  const index = projects.findIndex((project) => project.slug === slug);
  return String(index + 1).padStart(2, "0");
}
