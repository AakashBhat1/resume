import { portfolioData } from "@/constants/site";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillBar } from "@/components/ui/skill-bar";
import { 
  SiPython, SiJavascript, SiHtml5, SiCss3, SiReact, SiNextdotjs, SiTailwindcss, 
  SiFlask, SiOpencv, SiMongodb, SiFirebase, SiGit, SiGithub, SiNetlify 
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const iconMap: Record<string, React.ElementType> = {
  "Python": SiPython,
  "JavaScript": SiJavascript,
  "HTML5": SiHtml5,
  "CSS3": SiCss3,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Flask": SiFlask,
  "OpenCV": SiOpencv,
  "MongoDB (basic)": SiMongodb,
  "Firebase": SiFirebase,
  "Git": SiGit,
  "GitHub": SiGithub,
  "VS Code": VscVscode,
  "Netlify": SiNetlify
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeading
        eyebrow="Technical Skills"
        title="Modern Stack Across ML and Full-Stack Development"
        description="Categorized expertise with production-focused tooling and frameworks."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(portfolioData.skills).map(([category, items], categoryIndex) => (
          <AnimationWrapper key={category} delay={categoryIndex * 0.08}>
            <GlassCard className="h-full p-5 sm:p-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-100">{category}</h3>
              <div className="space-y-4">
                {items.map((item, itemIndex) => {
                  const Icon = iconMap[item.name as keyof typeof iconMap];
                  return (
                    <SkillBar
                      key={item.name}
                      name={item.name}
                      level={item.level}
                      delay={itemIndex * 0.07}
                      icon={Icon ? <Icon /> : undefined}
                    />
                  );
                })}
              </div>
            </GlassCard>
          </AnimationWrapper>
        ))}
      </div>

      <AnimationWrapper delay={0.15} className="mt-6">
        <GlassCard className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-slate-100">Coursework</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {portfolioData.coursework.map((course) => (
              <span
                key={course}
                className="rounded-full border border-slate-400/30 bg-slate-800/55 px-3 py-1 text-xs text-slate-300"
              >
                {course}
              </span>
            ))}
          </div>
        </GlassCard>
      </AnimationWrapper>
    </section>
  );
}
