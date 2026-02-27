export type SkillItem = {
  name: string;
  level: number;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  details: string[];
};

export type ProjectItem = {
  title: string;
  period: string;
  description: string;
  stack: string[];
  github: string;
  image: string;
};

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
};

export type PortfolioContent = {
  personal: {
    name: string;
    title: string;
    heroTagline: string;
    phone: string;
    email: string;
    location: string;
    statement: string[];
    social: {
      github: string;
      linkedin: string;
    };
    resumePath: string;
  };
  about: {
    summary: string;
    interests: string[];
    highlights: string[];
  };
  skills: Record<string, SkillItem[]>;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  coursework: string[];
  certification: {
    title: string;
    issuer: string;
    period: string;
    description: string;
  };
};
