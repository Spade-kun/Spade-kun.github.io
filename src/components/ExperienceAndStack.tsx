"use client";

import React from "react";
import { Briefcase, GraduationCap, Download, CheckCircle2, Terminal } from "lucide-react";
import { EXPERIENCES, SKILL_CATEGORIES, PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";
import { ScrollReveal } from "@/components/ScrollReveal";

export const ExperienceAndStack: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-36 border-b border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Journey & Milestones */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Engineering Track Record
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Experience & Academic Foundation
              </h2>
            </div>

            <div className="space-y-10 border-l border-white/[0.1] pl-6 sm:pl-8 ml-2">
              {EXPERIENCES.map((exp, idx) => (
                <ScrollReveal
                  key={idx}
                  variant="fade-up"
                  delay={idx * 50}
                >
                  <div className="relative space-y-3">
                    {/* Timeline dot */}
                    <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#060608] bg-sky-400 shadow-sm shadow-sky-400/50" />

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      <span className="font-mono text-xs text-sky-400 bg-sky-950/50 border border-sky-800/50 px-2.5 py-0.5 rounded-md font-medium">
                        {exp.period}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-zinc-400">
                      {exp.organization} · {exp.location}
                    </div>

                    <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-zinc-400">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="text-zinc-600 mt-0.5">↳</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Resume action box */}
            <ScrollReveal variant="3d-card" delay={100}>
              <div className="rounded-2xl border border-white/[0.12] bg-white/[0.02] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 backdrop-blur-sm">
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Download Verified Credentials</div>
                <div className="font-mono text-xs text-zinc-400 mt-1">
                  Targeted Full-Stack Resume & Comprehensive Academic CV
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.links.resume}
                  download
                  onClick={() => sounds.playClick("crisp")}
                  className="flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2.5 text-xs font-mono font-medium hover:bg-zinc-200 transition-all shadow-md hover:-translate-y-0.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Resume (PDF)</span>
                </a>
                <a
                  href={PERSONAL_INFO.links.cv}
                  download
                  onClick={() => sounds.playClick("soft")}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.14] bg-white/[0.04] px-4 py-2.5 text-xs font-mono text-zinc-300 hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <span>CV (PDF)</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

          {/* Right: Technical Stack Taxonomy */}
          <div id="stack" className="lg:col-span-5 space-y-8">
            <div>
              <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Technical Competence
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Stack & Disciplines
              </h2>
            </div>

            <div className="space-y-4">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <ScrollReveal
                  key={idx}
                  variant="3d-card"
                  delay={idx * 60}
                >
                  <div
                    className="rounded-2xl border border-white/[0.08] bg-[#09090d]/80 p-6 space-y-3.5 hover:border-white/[0.16] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                        {cat.title}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">0{idx + 1}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-white/[0.08] bg-black/50 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:border-sky-500/50 hover:text-sky-300 hover:bg-sky-500/[0.05] transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Engineering philosophy callout */}
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-sky-950/20 to-transparent p-6 font-mono text-xs text-zinc-400 space-y-3">
              <div className="text-zinc-200 font-semibold flex items-center gap-2">
                <Terminal className="h-4 w-4 text-sky-400" />
                The Engineering Philosophy
              </div>
              <p className="leading-relaxed">
                &ldquo;Premature abstraction breeds fragility. Prefer direct APIs, strict types, parameterized transactions, and measurable paint times over layers of unread dependencies.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
