"use client";

import React, { useState } from "react";
import { ArrowUpRight, Download, Calendar, MapPin, Sparkles, CheckCircle2, Network, ListTree } from "lucide-react";
import { EXPERIENCES, PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ExperienceTopologyGraph } from "@/components/ExperienceTopologyGraph";

export const ExperienceTimeline: React.FC = () => {
  const [viewMode, setViewMode] = useState<"topology" | "timeline">("topology");
  const [activeExpIdx, setActiveExpIdx] = useState<number>(0);

  return (
    <section id="experience" className="py-24 sm:py-36 border-t border-white/[0.08] relative overflow-hidden bg-[#060608]">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-sky-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
            <div>
              <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
                Verified Track Record & Education
              </div>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                Experience & Foundation
              </h2>
            </div>
            <p className="max-w-md font-mono text-xs text-zinc-400 leading-relaxed">
              Real-world client deployments, commercial full-stack contributions, and computer science foundations.
            </p>
          </div>
        </ScrollReveal>

        {/* View Switcher: Interactive Systems Topology vs Editorial Wireframe Timeline */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Inspection Engine:</span>
            <span className="text-zinc-200 font-medium">
              {viewMode === "topology" ? "Interactive Neural Topology Graph" : "Chronological Editorial Timeline"}
            </span>
          </div>

          <div className="flex items-center gap-1 border border-white/[0.1] bg-black/40 p-1 rounded-xl shrink-0 font-mono text-xs">
            <button
              onClick={() => {
                sounds.playClick("soft");
                setViewMode("topology");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "topology"
                  ? "bg-white text-black font-medium shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>Systems Topology Graph</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick("soft");
                setViewMode("timeline");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "timeline"
                  ? "bg-white text-black font-medium shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ListTree className="h-3.5 w-3.5" />
              <span>Editorial Timeline</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Systems Architecture Topology (Interactive Graph Mode) */}
        {viewMode === "topology" ? (
          <div className="mt-8">
            <ExperienceTopologyGraph onSwitchToTimeline={() => setViewMode("timeline")} />
          </div>
        ) : (
          /* View Mode 2: Editorial Wireframe Timeline with Animated Horizontal Line Reveals */
          <div className="mt-16 space-y-16 relative">
          {EXPERIENCES.map((exp, idx) => {
            const isSelected = activeExpIdx === idx;

            return (
              <ScrollReveal
                key={idx}
                variant="fade-up"
                delay={idx * 80}
              >
                <div
                  onMouseEnter={() => {
                    setActiveExpIdx(idx);
                    sounds.playHover();
                  }}
                  className="group relative cursor-pointer"
                >
                  {/* Top Animated Laser Reveal Line */}
                  <div className="relative w-full h-[1px] bg-white/[0.08] overflow-hidden mb-8">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-sky-400 via-white/80 to-transparent transition-transform duration-700 origin-left ${
                        isSelected ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-60"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Time Period & Index */}
                    <div className="lg:col-span-3 space-y-2">
                      <ScrollReveal variant="pop-up" delay={50}>
                        <div className="font-mono text-xs text-sky-400 uppercase tracking-wider flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            isSelected ? "bg-sky-400 shadow-md shadow-sky-400/50 scale-125" : "bg-zinc-600"
                          }`} />
                          <span>0{idx + 1} //</span>
                        </div>
                        <div className="font-mono text-sm sm:text-base font-semibold text-white mt-1">
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 mt-1">
                          <MapPin className="h-3 w-3 text-zinc-500" />
                          <span>{exp.location}</span>
                        </div>
                      </ScrollReveal>
                    </div>

                    {/* Center & Right: Role, Organization & Architectural Bullet Lines */}
                    <div className="lg:col-span-9 space-y-6">
                      <ScrollReveal variant="pop-up" delay={80}>
                        <div>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                            {exp.role}
                          </h3>
                          <div className="font-mono text-xs sm:text-sm text-zinc-400 mt-1.5 flex items-center gap-2">
                            <span className="text-zinc-200 font-medium">{exp.organization}</span>
                          </div>
                        </div>
                      </ScrollReveal>

                      {/* Line-Animated Architectural Milestones with Individual Pop-Up Triggers */}
                      <ul className="space-y-3.5 pt-2">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>
                            <ScrollReveal variant="pop-up" delay={100 + bIdx * 45}>
                              <div className="flex items-start gap-3.5 group/item transition-colors">
                                <span className="text-sky-400 font-mono text-xs mt-1 transition-transform group-hover/item:translate-x-0.5">
                                  ↳
                                </span>
                                <span className="text-sm sm:text-base text-zinc-300 group-hover/item:text-white leading-relaxed font-normal">
                                  {bullet}
                                </span>
                              </div>
                            </ScrollReveal>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies Ribbon with Pop-Up Trigger */}
                      <ScrollReveal variant="pop-up" delay={200}>
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-xs text-zinc-400 hover:text-white hover:border-white/[0.2] transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      )}

        {/* Minimalist Editorial Action Bar (No box container, clean line aesthetic) */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                Full-Stack Credentials & Curriculum Vitae
              </div>
              <div className="text-base sm:text-lg text-white font-medium mt-1">
                Verified Career Documentation & Academic Diplomas
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PERSONAL_INFO.links.resume}
                download
                onClick={() => sounds.playClick("crisp")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white text-black px-6 py-3 font-mono text-xs font-semibold hover:bg-zinc-200 transition-all shadow-lg hover:-translate-y-0.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Resume (PDF)</span>
                <span className="text-zinc-500 group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>

              <a
                href={PERSONAL_INFO.links.cv}
                download
                onClick={() => sounds.playClick("soft")}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-white/[0.04] px-6 py-3 font-mono text-xs text-zinc-300 hover:text-white hover:border-white/[0.28] transition-all hover:-translate-y-0.5"
              >
                <span>Academic CV</span>
                <span className="text-zinc-500 group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
