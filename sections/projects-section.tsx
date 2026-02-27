import { portfolioData } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Selected Work"
        description="Production-focused builds across web engineering, computer vision, and machine learning."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {portfolioData.projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
