import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { navItems, portfolioData } from "@/constants/site";
import { RevealText } from "@/components/motion/reveal";
import { LocalTime } from "@/components/site/local-time";

const { personal } = portfolioData;

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-foreground text-background">
      <div className="shell pb-10 pt-20 sm:pt-28">
        <p className="eyebrow !text-background/60">Have something in mind?</p>
        <Link href="/contact" className="group mt-4 inline-flex items-end gap-4">
          <RevealText
            as="span"
            text="Let's talk."
            className="display block text-[clamp(3.5rem,13vw,11rem)] leading-[0.9]"
          />
          <span className="mb-3 inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform duration-500 ease-out group-hover:-rotate-45 group-hover:scale-110 sm:mb-6 sm:size-20">
            <FiArrowUpRight className="size-6 sm:size-8" />
          </span>
        </Link>

        <div className="mt-20 grid gap-10 border-t border-background/15 pt-10 text-sm sm:grid-cols-3">
          <div className="space-y-1">
            <p className="eyebrow !text-background/50">Local time</p>
            <p>
              {personal.location.split(",")[0]} · <LocalTime />
            </p>
          </div>
          <div className="space-y-1">
            <p className="eyebrow !text-background/50">Pages</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {[{ href: "/", label: "Home" }, ...navItems].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-1">
            <p className="eyebrow !text-background/50">Elsewhere</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              <li>
                <a href={personal.social.github} target="_blank" rel="noreferrer" className="link-draw">
                  GitHub
                </a>
              </li>
              <li>
                <a href={personal.social.linkedin} target="_blank" rel="noreferrer" className="link-draw">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${personal.email}`} className="link-draw">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-xs text-background/50">
          © {new Date().getFullYear()} {personal.name}. Designed and built in Faridabad.
        </p>
      </div>
    </footer>
  );
}
