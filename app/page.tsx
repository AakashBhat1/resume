import dynamic from "next/dynamic";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { StructuredData } from "@/components/structured-data";
import { AboutSection } from "@/sections/about-section";
import { CertificationSection } from "@/sections/certification-section";
import { EducationSection } from "@/sections/education-section";
import { ExperienceSection } from "@/sections/experience-section";
import { HeroSection } from "@/sections/hero-section";
import { SkillsSection } from "@/sections/skills-section";
import { AnimatedBackground } from "@/components/animated-background";


const ProjectsSection = dynamic(
  () => import("@/sections/projects-section").then((mod) => mod.ProjectsSection),
  {
    loading: () => <section id="projects" className="section-shell" />,
  },
);

const ContactSection = dynamic(
  () => import("@/sections/contact-section").then((mod) => mod.ContactSection),
  {
    loading: () => <section id="contact" className="section-shell" />,
  },
);

export default function Home() {
  return (
    <>
      <StructuredData />
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />

      <main className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
