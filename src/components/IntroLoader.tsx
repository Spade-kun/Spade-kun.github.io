"use client";

import React, { useEffect, useState } from "react";
import { sounds } from "@/utils/audio";

interface IntroLoaderProps {
  onComplete?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState("Mounting system runtime...");
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Smooth cinematic progression curve (~2.6s total)
      const step = current < 15 ? 1 : current < 40 ? 2 : current < 65 ? 1.5 : current < 85 ? 2 : current < 96 ? 1.5 : 1;
      current += step;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setPhaseText("Workstation ready // Welcome");

        try {
          sounds.playClick("crisp");
        } catch {}

        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            setShouldRender(false);
            onComplete?.();
          }, 750);
        }, 450);
      } else {
        const rounded = Math.min(99, Math.floor(current));
        setProgress(rounded);
        if (rounded < 25) {
          setPhaseText("Booting Custom Frameworks (Laravel, Next.js, React)...");
        } else if (rounded < 50) {
          setPhaseText("Mounting Website Builders (Shopify, Wix, Squarespace, WP)...");
        } else if (rounded < 78) {
          setPhaseText("Orchestrating n8n Automation & Lead Generation Agents...");
        } else {
          setPhaseText("All custom frameworks, builders & n8n pipelines ready...");
        }
      }
    }, 34);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterval(interval);
        setIsFinished(true);
        setTimeout(() => {
          setShouldRender(false);
          onComplete?.();
        }, 400);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, 400);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#050508] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out ${
        isFinished
          ? "opacity-0 pointer-events-none scale-105 filter blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Precision Blueprint Grid & Radial Glow */}
      <div 
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px"
        }}
      />

      {/* Cybernetic Sonar Waves & Orbit Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Pulsing Concentric Radar Rings */}
        <div className="absolute w-[340px] h-[340px] rounded-full border border-sky-500/15 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-white/[0.07] animate-[spin_80s_linear_infinite]" />
        <div className="absolute w-[680px] h-[680px] rounded-full border border-white/[0.04] -rotate-12 animate-[spin_120s_linear_infinite]" />
        
        {/* Soft Ambient Aurora Nebulas */}
        <div className="absolute w-[550px] h-[550px] rounded-full bg-sky-500/[0.08] blur-[140px] animate-pulse-subtle" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.05] blur-[120px]" />
      </div>

      {/* Floating Cybernetic Code & Platform Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none font-mono text-xs text-zinc-600/40">
        <span className="absolute top-[18%] left-[10%] text-sky-400/30">Laravel :: MVC</span>
        <span className="absolute top-[28%] right-[12%] text-emerald-400/25">Shopify &amp; Liquid</span>
        <span className="absolute bottom-[35%] left-[8%] text-purple-400/30">Wix &amp; Squarespace</span>
        <span className="absolute bottom-[20%] right-[10%] text-sky-300/30">n8n :: LeadGen Agent</span>
        <span className="absolute top-[65%] left-[16%] text-emerald-300/20">// automated workflows</span>
        <span className="absolute top-[12%] right-[28%] text-indigo-400/25">Next.js :: Edge</span>
        <span className="absolute bottom-[12%] left-[30%] text-zinc-500/25">PostgreSQL / ACID</span>
      </div>

      {/* Sweeping Laser Scan Line */}
      <div 
        className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-sky-500/[0.03] to-transparent pointer-events-none animate-[scanline_6s_linear_infinite]"
        style={{ top: "-10%" }}
      />

      {/* Top Header telemetry */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between font-mono text-[11px] text-zinc-500 z-20">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-400">BOOT SEQUENCE</span>
          <span className="text-zinc-600">//</span>
          <span>CUSTOM PLATFORMS &amp; N8N AUTOMATION</span>
        </div>
        <button
          onClick={handleSkip}
          className="text-zinc-500 hover:text-white px-2.5 py-1 rounded border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.2] transition-colors cursor-pointer"
        >
          Skip [ESC]
        </button>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* Code Badge </> */}
        <div className="mb-6 flex items-center justify-center h-14 w-14 rounded-2xl border border-white/[0.18] bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-sky-500/20 relative group hover:border-sky-400/60 transition-colors">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-400/25 via-indigo-500/10 to-transparent opacity-60" />
          {/* Glowing Code Symbol </> */}
          <span className="font-mono text-lg font-bold bg-gradient-to-r from-sky-300 via-white to-emerald-300 bg-clip-text text-transparent tracking-tighter relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
            &lt;/&gt;
          </span>
          <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#050508] animate-pulse" />
        </div>

        {/* Name Title with Dynamic Progressive Color Fill-Up Loading Effect (Clean, No Box Shadow) */}
        <div className="relative mb-2 select-none">
          {/* Layer 1: Base Ghost Text (Underlying Unfilled State) */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-800/80">
            Noel Raterta Jr.
          </h1>

          {/* Layer 2: Vibrant Colored Text that Fills Up with Progress % (Pure Text Color, Zero Box Shadow) */}
          <div
            className="absolute inset-0 overflow-hidden transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          >
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-200 to-emerald-300 bg-clip-text text-transparent whitespace-nowrap">
              Noel Raterta Jr.
            </h1>
          </div>
        </div>

        {/* Monospace Subhead highlighting Custom Frameworks, CMS Builders & n8n Automation */}
        <div className="font-mono text-[11px] sm:text-xs text-sky-400 tracking-wider uppercase mb-10 flex items-center justify-center gap-1.5 flex-wrap">
          <span className="text-zinc-600">&lt;</span>
          <span>Custom Code (Laravel)</span>
          <span className="text-zinc-600">·</span>
          <span>Builders (Wix, Shopify, Squarespace)</span>
          <span className="text-zinc-600">·</span>
          <span>n8n Automation</span>
          <span className="text-zinc-600">/&gt;</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-80 space-y-2.5">
          <div className="h-1 w-full rounded-full bg-white/[0.08] overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-indigo-400 to-emerald-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-zinc-400 truncate max-w-[210px] text-left">
              {phaseText}
            </span>
            <span className="text-sky-400 font-semibold tabular-nums">
              {progress.toString().padStart(2, "0")}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom telemetry line */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-zinc-600 border-t border-white/[0.05] pt-3">
        <span>BukSU · BSIT 2026</span>
        <span>CUSTOM BUILDS &amp; AUTOMATION</span>
      </div>
    </div>
  );
};
