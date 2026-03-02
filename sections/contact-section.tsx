"use client";

import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { portfolioData } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";

export function ContactSection() {
  return (
    <section id="contact" className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Build Something Valuable"
        description="Open to internships, collaboration opportunities, and meaningful engineering conversations. Reach out directly using the details below."
      />

      <div className="mx-auto max-w-xl">
        <GlassCard className="p-6 sm:p-7">
          <h3 className="text-lg font-semibold text-slate-100">Direct Contact</h3>
          <p className="mt-2 text-sm text-slate-400">
            For opportunities or questions, feel free to reach out using email or phone.
          </p>

          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3 text-slate-300">
              <FiMail className="mt-0.5 size-4 text-cyan-300" />
              <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-cyan-200">
                {portfolioData.personal.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <FiPhone className="mt-0.5 size-4 text-cyan-300" />
              <a href={`tel:${portfolioData.personal.phone}`} className="hover:text-cyan-200">
                {portfolioData.personal.phone}
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <FiMapPin className="mt-0.5 size-4 text-cyan-300" />
              <span>{portfolioData.personal.location}</span>
            </li>
          </ul>
        </GlassCard>
      </div>
    </section>
  );
}
