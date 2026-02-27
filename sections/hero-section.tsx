"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { portfolioData } from "@/constants/site";

export function HeroSection() {
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 500], [0, 70]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24 sm:pt-28">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
              {portfolioData.personal.title}
            </p>
            <h1 className="text-balance text-4xl font-black tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              {portfolioData.personal.name}
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-semibold text-slate-200/95 sm:text-2xl">
              {portfolioData.personal.heroTagline}
            </p>
            <div className="mt-6 space-y-2 text-sm leading-relaxed text-slate-300 sm:text-base">
              {portfolioData.personal.statement.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="magnetic-button inline-flex h-11 items-center gap-2 rounded-xl bg-accent-gradient px-5 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
              >
                View Projects
                <FiArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="magnetic-button inline-flex h-11 items-center rounded-xl border border-cyan-300/35 bg-slate-900/50 px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70"
              >
                Contact Me
              </button>

              <a
                href={portfolioData.personal.resumePath}
                className="magnetic-button inline-flex h-11 items-center gap-2 rounded-xl border border-slate-500/45 px-5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
                download
              >
                Download Resume
                <FiDownload className="size-4" />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={portfolioData.personal.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="rounded-full border border-white/15 bg-slate-900/55 p-3 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                <FiGithub className="size-5" />
              </a>
              <a
                href={portfolioData.personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="rounded-full border border-white/15 bg-slate-900/55 p-3 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                <FiLinkedin className="size-5" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                aria-label="Send email"
                className="rounded-full border border-white/15 bg-slate-900/55 p-3 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                <FiMail className="size-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            style={{ y: visualY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="glass-panel relative overflow-hidden p-6">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/85">Core Focus</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="rounded-lg border border-white/10 bg-slate-800/40 px-3 py-2">Machine Learning Engineering</li>
                <li className="rounded-lg border border-white/10 bg-slate-800/40 px-3 py-2">Full-Stack Product Development</li>
                <li className="rounded-lg border border-white/10 bg-slate-800/40 px-3 py-2">API & Data Workflow Optimization</li>
              </ul>
            </div>
            <div className="floating-orb absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-cyan-400/20 blur-xl" />
            <div className="floating-orb absolute -right-7 -top-7 h-24 w-24 rounded-full bg-sky-500/20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
