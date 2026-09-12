"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import { ParticleCloud } from "@/components/ParticleCloud";

interface SignalDividerProps {
  tags?: string[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  cloudHeight?: number;
}

export const SignalDivider: React.FC<SignalDividerProps> = ({
  tags = ["Full-Stack", "Laravel & Blade", "Next.js & React", "PostgreSQL & MySQL", "E-Commerce"],
  ctaText = "Follow the signal",
  ctaHref = "#deployments",
  className = "",
  cloudHeight = 220
}) => {
  return (
    <div className={`relative w-full overflow-hidden border-t border-b border-white/[0.08] bg-[#050508]/80 ${className}`}>
      {/* Particle Cloud across the transition */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ParticleCloud height={cloudHeight} className="h-full opacity-75" />
      </div>

      {/* Horizontal Signal Line with Labels */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            {tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="text-zinc-200 hover:text-white transition-colors">{tag}</span>
                {idx < tags.length - 1 && <span className="text-zinc-600">/</span>}
              </React.Fragment>
            ))}
          </div>

          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer group shrink-0"
            >
              <span>{ctaText}</span>
              <ArrowDown className="h-3.5 w-3.5 text-sky-400 transition-transform group-hover:translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
