"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";

interface ExpandingProfileCardProps {
  onOpenContactModal?: () => void;
}

export const ExpandingProfileCard: React.FC<ExpandingProfileCardProps> = ({ onOpenContactModal }) => {
  const [scaleProgress, setScaleProgress] = useState(0.93);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const copyEmail = () => {
    sounds.playClick("soft");
    navigator.clipboard.writeText(PERSONAL_INFO.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenContact = () => {
    sounds.playClick("crisp");
    if (onOpenContactModal) {
      onOpenContactModal();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-contact-modal"));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how close the element is to the center of the viewport (0 to 1)
      const visibleRatio = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8)));
      const calculatedScale = 0.93 + (visibleRatio * 0.07);
      setScaleProgress(Math.min(1, Math.max(0.93, calculatedScale)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden scroll-mt-24">
      <div
        ref={cardRef}
        style={{
          transform: `scale(${scaleProgress})`,
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform"
        }}
        className="mx-auto max-w-6xl rounded-[32px] sm:rounded-[44px] border border-white/[0.12] bg-[#0c0d14]/90 backdrop-blur-2xl p-8 sm:p-14 shadow-2xl relative overflow-hidden group"
      >
        {/* Ambient background bloom */}
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
          {/* Left: Noel's Portrait (Picture1.png) & Fast Facts */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-5">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border border-white/[0.15] shadow-2xl bg-black/60 group/photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/Picture1.png"
                alt="Noel Raterta Jr."
                className="w-full h-full object-cover grayscale contrast-125 group-hover/photo:grayscale-0 transition-all duration-500 scale-105 group-hover/photo:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/[0.1]">
                <span>Noel Raterta Jr.</span>
                <span className="text-emerald-400 font-medium">Spade-kun</span>
              </div>
            </div>

            {/* Quick Facts Mini-Pills */}
            <div className="w-full max-w-[256px] space-y-2 font-mono text-[11px] text-zinc-400">
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <span className="text-zinc-500">Location</span>
                <span className="text-zinc-300">Malaybalay, Bukidnon (PH)</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <span className="text-zinc-500">Education</span>
                <span className="text-zinc-300">BSIT · BukSU 2026</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <span className="text-zinc-500">Status</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open for Work
                </span>
              </div>
            </div>
          </div>

          {/* Right: Impactful Headline, Bio & Core Focus */}
          <div className="lg:col-span-8 space-y-6">
            <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              About Me // Background &amp; Focus
            </div>

            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase">
                Hey — I&apos;m Noel.
              </h2>
              <p className="mt-1 font-mono text-xs sm:text-sm text-sky-400 font-medium">
                Full-Stack Developer, Web Architect &amp; Automation Engineer
              </p>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              I&apos;m an Information Technology student and web developer based in the Philippines. I specialize in turning business requirements into high-performing digital systems — whether that means coding bespoke web applications from scratch, designing conversion-focused stores on website builders, or wiring autonomous AI automation workflows.
            </p>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="font-mono text-xs text-sky-300 font-semibold mb-1">
                  Custom Code &amp; Frameworks
                </div>
                <div className="font-mono text-[11px] text-zinc-400 leading-relaxed">
                  Laravel, PHP, Next.js, React, Node.js &amp; PostgreSQL.
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="font-mono text-xs text-emerald-300 font-semibold mb-1">
                  CMS &amp; Website Builders
                </div>
                <div className="font-mono text-[11px] text-zinc-400 leading-relaxed">
                  Squarespace, WordPress &amp; E-Commerce Web Tools.
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="font-mono text-xs text-purple-300 font-semibold mb-1">
                  n8n &amp; AI Automation
                </div>
                <div className="font-mono text-[11px] text-zinc-400 leading-relaxed">
                  Autonomous lead gen agents, webhooks &amp; CRM pipelines.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleOpenContact}
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 font-mono text-xs font-semibold hover:bg-zinc-200 transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email: {PERSONAL_INFO.contactEmail}</span>
              </button>

              <a
                href={PERSONAL_INFO.links.resume}
                download
                onClick={() => sounds.playClick("soft")}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.04] px-6 py-3 font-mono text-xs text-zinc-200 hover:text-white hover:bg-white/[0.08] transition-all hover:-translate-y-0.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Resume</span>
              </a>

              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick("soft")}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.02] px-5 py-3 font-mono text-xs text-zinc-400 hover:text-sky-300 hover:border-sky-400/40 transition-all"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
