"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDownRight, FiArrowRight } from "react-icons/fi";
import { portfolioData } from "@/constants/site";
import type { MediaSet } from "@/lib/media";
import { RevealText } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/media/media-frame";
import { HeroArt } from "@/components/media/hero-art";

const { personal, experience } = portfolioData;
const [firstName, ...restName] = personal.name.split(" ");
const current = experience[0];

interface HomeHeroProps {
  media: MediaSet;
}

export function HomeHero({ media }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
      <div className="shell">
        <div className="fade-up flex flex-wrap items-center justify-between gap-3" style={{ animationDelay: "0.2s" }}>
          <p className="eyebrow flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" />
            {personal.title.replace("|", "·")}
          </p>
          <p className="eyebrow">Based in {personal.location.split(",").slice(0, 2).join(",")}</p>
        </div>

        <div className="mt-8 grid items-end gap-10 lg:mt-10 lg:grid-cols-[1.45fr_0.55fr] lg:gap-14">
          <motion.div style={{ y: nameY, opacity: fade }}>
            <h1 className="display text-[clamp(4.5rem,17vw,13.5rem)] leading-[0.82]" aria-label={personal.name}>
              <RevealText as="span" text={firstName} immediate delay={0.15} className="block" />
              <RevealText
                as="span"
                text={restName.join(" ")}
                immediate
                delay={0.3}
                className="block pl-[0.6em] italic text-primary"
              />
            </h1>

            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="max-w-xl">
                <RevealText
                  as="p"
                  text={personal.heroTagline}
                  immediate
                  delay={0.55}
                  stagger={0.03}
                  className="display text-2xl leading-snug sm:text-3xl"
                />
                <p className="fade-up mt-4 text-base leading-relaxed text-muted" style={{ animationDelay: "0.9s" }}>
                  {personal.statement[1]}
                </p>
              </div>

              <div className="fade-up flex flex-wrap gap-3" style={{ animationDelay: "1s" }}>
                <Link
                  href="/work"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-primary pl-6 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-hover"
                >
                  See the work
                  <span className="inline-flex size-8 items-center justify-center overflow-hidden rounded-full bg-white/15">
                    <FiArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                  </span>
                </Link>
                <a
                  href={personal.resumePath}
                  download
                  className="inline-flex h-12 items-center rounded-full border border-foreground/25 px-6 text-sm font-semibold transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  Résumé
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: archY }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="clip-up" style={{ animationDelay: "0.35s" }}>
            <MediaFrame
              media={media}
              alt="Autumn festival garlands and falling leaves in warm evening light"
              fallback={<HeroArt />}
              priority
              parallax
              sizes="(max-width: 1024px) 90vw, 30vw"
              className="aspect-[4/5] rounded-b-[1.5rem] rounded-t-[999px]"
            />
            </div>
          </motion.div>
        </div>

        <div
          className="fade-up mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm"
          style={{ animationDelay: "1.2s" }}
        >
          <p className="text-muted">
            Currently <span className="text-foreground">{current.role.split(",")[0]}</span> at{" "}
            <span className="text-foreground">ETSPL</span> · {current.period}
          </p>
          <p className="eyebrow flex items-center gap-2">
            Scroll
            <FiArrowDownRight className="size-3.5 animate-bounce" />
          </p>
        </div>
      </div>
    </section>
  );
}
