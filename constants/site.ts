import portfolioContent from "@/constants/portfolio-content.json";
import type { PortfolioContent } from "@/lib/types";

export const portfolioData = portfolioContent as PortfolioContent;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://resume-beta-coral.vercel.app";

export const siteConfig = {
  name: portfolioData.personal.name,
  role: portfolioData.personal.title,
  description:
    "Portfolio of Aakash Bhat, a Software Engineer focused on DevOps, computer vision, FastAPI, Docker, and automation.",
  url: siteUrl,
  ogImage: "/opengraph-image",
  keywords: [
    "Aakash Bhat",
    "Software Engineer",
    "DevOps",
    "Computer Vision",
    "FastAPI",
    "Docker",
    "Automation",
  ],
} as const;

export const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
