import type { Metadata } from "next";
import { portfolioData } from "@/constants/site";
import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { LocalTime } from "@/components/site/local-time";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aakash Bhat.",
  alternates: { canonical: "/contact" },
};

const { personal } = portfolioData;

export default function ContactPage() {
  return (
    <div className="shell pt-32 sm:pt-44">
      <p className="eyebrow">Contact</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.88]">
        <RevealText as="span" text="Say hello," immediate delay={0.2} className="block" />
        <RevealText as="span" text="let's build." immediate delay={0.4} className="block italic text-primary" />
      </h1>

      <div className="mt-20 grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal delay={0.5} className="space-y-10">
          <div>
            <p className="eyebrow">Email</p>
            <a href={`mailto:${personal.email}`} className="display link-draw mt-3 inline-block break-all text-2xl sm:text-3xl">
              {personal.email}
            </a>
            <div className="mt-5">
              <CopyEmail email={personal.email} />
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-6 border-t border-border pt-8 text-sm">
            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-2">
                <a href={`tel:${personal.phone}`} className="link-draw tabular-nums">
                  {personal.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Local time</dt>
              <dd className="mt-2">
                <LocalTime />
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Based in</dt>
              <dd className="mt-2">{personal.location}</dd>
            </div>
            <div>
              <dt className="eyebrow">Elsewhere</dt>
              <dd className="mt-2 flex gap-4">
                <a href={personal.social.github} target="_blank" rel="noreferrer" className="link-draw">
                  GitHub
                </a>
                <a href={personal.social.linkedin} target="_blank" rel="noreferrer" className="link-draw">
                  LinkedIn
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.65}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
