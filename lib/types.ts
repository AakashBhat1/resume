export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  details: string[];
};

export type ProjectItem = {
  slug: string;
  title: string;
  featured?: boolean;
  tagline?: string;
  period: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
  image?: string;
};

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  period: string;
  note?: string;
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
  skills: Record<string, string[]>;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
};
