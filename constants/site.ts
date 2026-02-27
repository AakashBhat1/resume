import portfolioContent from "@/constants/portfolio-content.json";
import type { PortfolioContent } from "@/lib/types";

export const portfolioData = portfolioContent as PortfolioContent;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: portfolioData.personal.name,
  role: portfolioData.personal.title,
  description:
    "Portfolio of Aakash Bhat, a Computer Engineering student focused on machine learning and full-stack product development.",
  url: siteUrl,
  ogImage: "/opengraph-image",
  keywords: [
    "Aakash Bhat",
    "Computer Engineering",
    "Machine Learning",
    "Full-Stack Developer",
    "Next.js Portfolio",
    "MERN Developer",
    "Python Developer",
  ],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certification", label: "Certification" },
  { id: "contact", label: "Contact" },
] as const;
