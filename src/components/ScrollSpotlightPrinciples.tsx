"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Zap, Code2, Server, MessageSquare, Database } from "lucide-react";

interface Principle {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Deterministic Architecture.",
    icon: Database,
    tag: "Integrity",
    description: "Every database query is parameterized, every state machine is bounded, and every failure mode has an explicit recovery path."
  },
  {
    title: "ACID Transactions.",
    icon: ShieldCheck,
    tag: "Data Consistency",
    description: "Strict relational integrity across PostgreSQL and MySQL. Zero ghost writes and zero lost updates in commercial booking and client workflows."
  },
  {
    title: "Sub-Second Paint Times.",
    icon: Zap,
    tag: "Core Web Vitals",
    description: "Server-side Blade and Next.js pre-rendering delivering 95+ performance scores, sub-second LCP, and zero cumulative layout shifts."
  },
  {
    title: "Strict Type Contracts.",
    icon: Code2,
    tag: "Safety",
    description: "End-to-end TypeScript interfaces and robust backend DTOs ensuring absolute runtime safety from relational schemas to UI rendering."
  },
  {
    title: "Production Resilience.",
    icon: Server,
    tag: "Reliability",
    description: "Hardened SSL/TLS configuration, clean MVC routing, modular directory boundaries, and real-time telemetry observation."
  },
  {
    title: "Direct Collaboration.",
    icon: MessageSquare,
    tag: "Execution",
    description: "Transparent, asynchronous workflow via GitHub, Discord, and Slack with deliberate, atomic commit histories."
  }
];

export const ScrollSpotlightPrinciples: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight * 0.52;
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="py-24 sm:py-36 border-t border-white/[0.08] relative overflow-hidden bg-[#07080c]">
      {/* Subtle radial ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div>
            <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
              Engineering Standard & Guarantees
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              How I Build Systems
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-zinc-400 leading-relaxed">
            Scroll down to inspect the architectural philosophy and engineering practices applied to every production deployment.
          </p>
        </div>

        {/* Scroll-Driven Spotlight List (Grigoletti Style) */}
        <div className="mt-12 divide-y divide-white/[0.06]">
          {PRINCIPLES.map((item, idx) => {
            const isActive = activeIndex === idx;
            const Icon = item.icon;

            return (
              <div
                key={idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={`py-10 sm:py-14 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-12 cursor-pointer group ${
                  isActive
                    ? "opacity-100 translate-x-2 sm:translate-x-3"
                    : "opacity-25 hover:opacity-50"
                }`}
                onClick={() => setActiveIndex(idx)}
              >
                {/* Left: Title & Tag */}
                <div className="md:w-5/12 flex items-baseline gap-4">
                  <span
                    className={`font-mono text-xs transition-colors duration-300 ${
                      isActive ? "text-sky-400 font-bold" : "text-zinc-600"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <h3
                      className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-white" : "text-zinc-500"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <div
                      className={`mt-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 ${
                        isActive ? "text-sky-400/80" : "text-zinc-600"
                      }`}
                    >
                      {item.tag}
                    </div>
                  </div>
                </div>

                {/* Center: Icon indicator with glow */}
                <div className="hidden md:flex items-center justify-center shrink-0">
                  <div
                    className={`h-12 w-12 rounded-full border transition-all duration-500 flex items-center justify-center ${
                      isActive
                        ? "border-sky-400/60 bg-sky-500/10 text-sky-300 shadow-lg shadow-sky-500/20 scale-110"
                        : "border-white/[0.08] bg-white/[0.02] text-zinc-600 scale-95"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Right: Detailed Description */}
                <div className="md:w-5/12">
                  <p
                    className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 font-normal ${
                      isActive ? "text-zinc-200" : "text-zinc-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
