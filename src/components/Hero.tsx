"use client";

import React, { useState } from "react";
import { ArrowDownRight, FileText, Check, Copy, Terminal, Sparkles, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    sounds.playClick("toggle");
    navigator.clipboard.writeText(PERSONAL_INFO.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 border-b border-white/[0.08] overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 8 Columns: Editorial Headline, Bio & Action Buttons */}
          <div className="lg:col-span-8 space-y-8">
            {/* Monospace intro badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 font-mono text-[11px] text-sky-400 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
                {PERSONAL_INFO.name} — Full-Stack & Systems Developer
              </span>
              <span className="font-mono text-xs text-zinc-500 hidden sm:inline">
                // Bukidnon State University (Class of 2026)
              </span>
            </div>

            {/* Editorial Headline inspired by Jamie McKaye's stacked ghost typography */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.06]">
                Software isn&apos;t just syntax.
                <br />
                It&apos;s{" "}
                <span className="relative inline-block select-none group cursor-default">
                  {/* Stacked Ghost Words (Jamie McKaye signature visual effect) */}
                  <span 
                    aria-hidden="true" 
                    className="absolute -top-7 left-0 text-white/[0.03] select-none pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 hidden sm:inline-block"
                  >
                    engineered craft.
                  </span>
                  <span 
                    aria-hidden="true" 
                    className="absolute -top-4 left-0 text-white/[0.06] select-none pointer-events-none transition-transform duration-500 group-hover:-translate-y-1 hidden sm:inline-block"
                  >
                    engineered craft.
                  </span>
                  <span 
                    aria-hidden="true" 
                    className="absolute -top-2 left-0 text-sky-400/[0.12] select-none pointer-events-none transition-transform duration-500 group-hover:-translate-y-0.5"
                  >
                    engineered craft.
                  </span>
                  
                  {/* Foreground Gradient Word */}
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 drop-shadow-sm">
                    engineered craft.
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
                {PERSONAL_INFO.editorialBio}
              </p>
            </div>

            {/* Call-to-action bar */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs pt-2">
              <a
                href="#deployments"
                onClick={() => sounds.playClick("crisp")}
                className="group flex items-center gap-2 rounded-md bg-white text-black px-4.5 py-3 font-medium hover:bg-zinc-200 transition-all shadow-md hover:shadow-sky-500/10 hover:-translate-y-0.5"
              >
                <span>View Deployments</span>
                <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick("soft")}
                className="flex items-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.03] px-4 py-3 text-zinc-300 hover:border-white/[0.28] hover:bg-white/[0.08] hover:text-white transition-all hover:-translate-y-0.5"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub (@Spade-kun)</span>
              </a>

              <a
                href={PERSONAL_INFO.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick("soft")}
                className="flex items-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.03] px-4 py-3 text-zinc-300 hover:border-white/[0.28] hover:bg-white/[0.08] hover:text-white transition-all hover:-translate-y-0.5"
              >
                <FileText className="h-3.5 w-3.5 text-indigo-400" />
                <span>Curriculum Vitae</span>
              </a>

              <button
                onClick={handleCopyEmail}
                type="button"
                className="flex items-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.03] px-4 py-3 text-zinc-300 hover:border-white/[0.28] hover:bg-white/[0.08] hover:text-white transition-all hover:-translate-y-0.5"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Email copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{PERSONAL_INFO.contactEmail}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right 4 Columns: Editorial Portrait Card featuring Picture1.png */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] group">
              {/* Backlight Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-teal-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Portrait Frame */}
              <div className="relative rounded-2xl border border-white/[0.14] bg-[#0c0c14]/90 p-3 shadow-2xl backdrop-blur-xl">
                {/* Top mono header in card */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3 font-mono text-[11px] text-zinc-400">
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Noel Raterta Jr.</span>
                  </div>
                  <span className="text-zinc-500 text-[10px]">PHILIPPINES</span>
                </div>

                {/* Profile Image Picture1.png */}
                <div className="relative rounded-xl overflow-hidden bg-black/40 aspect-[4/4.8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/Picture1.png"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-center filter grayscale-[25%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />

                  {/* Gradient bottom overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Image bottom badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/[0.1]">
                      <MapPin className="h-2.5 w-2.5 text-sky-400" />
                      Malaybalay, Bukidnon
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30 font-medium">
                      BSIT 2026
                    </span>
                  </div>
                </div>

                {/* Card footer details */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-zinc-500">
                  <span>Full-Stack & Systems</span>
                  <span className="text-zinc-400">@Spade-kun</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick spec ticker below */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/[0.08] pt-10">
          <div className="space-y-1">
            <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Practice</div>
            <div className="font-mono text-sm text-zinc-200 font-medium">Full-Stack & Systems</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Client Delivery</div>
            <div className="font-mono text-sm text-zinc-200 font-medium">4 Client Web Apps</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Focus Stack</div>
            <div className="font-mono text-sm text-zinc-200 font-medium">Next.js · Laravel · Supabase</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Availability</div>
            <div className="font-mono text-sm text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to Opportunities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
