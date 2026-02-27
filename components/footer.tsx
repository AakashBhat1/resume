import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { portfolioData } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container flex flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
        <p>© {year} {portfolioData.personal.name}. All rights reserved.</p>

        <div className="flex items-center gap-3">
          <a
            href={portfolioData.personal.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="rounded-full border border-white/15 p-2 transition hover:border-cyan-300/50 hover:text-cyan-200"
          >
            <FiGithub className="size-4" />
          </a>
          <a
            href={portfolioData.personal.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="rounded-full border border-white/15 p-2 transition hover:border-cyan-300/50 hover:text-cyan-200"
          >
            <FiLinkedin className="size-4" />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            aria-label="Send an email"
            className="rounded-full border border-white/15 p-2 transition hover:border-cyan-300/50 hover:text-cyan-200"
          >
            <FiMail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
