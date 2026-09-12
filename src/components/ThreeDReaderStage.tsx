"use client";

import React, { useState, useEffect } from "react";
import { User, Search, Code2, ArrowUpRight, Layers, FileCode, Check, GitBranch } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";

export type ReaderTab = "people" | "search" | "agents";

interface ThreeDReaderStageProps {
  currentTab?: ReaderTab;
  onTabChange?: (tab: ReaderTab) => void;
}

export const ThreeDReaderStage: React.FC<ThreeDReaderStageProps> = ({
  currentTab: controlledTab,
  onTabChange
}) => {
  const [internalTab, setInternalTab] = useState<ReaderTab>("people");
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const tab = controlledTab !== undefined ? controlledTab : internalTab;

  // Auto-cycle through perspectives ("people" -> "search" -> "agents") every 1.5s
  useEffect(() => {
    const tabs: ReaderTab[] = ["people", "search", "agents"];
    const interval = setInterval(() => {
      // Pause automatic rotation if user is hovering over 3D card
      if (isHovered) return;
      const currentIndex = tabs.indexOf(tab);
      const nextTab = tabs[(currentIndex + 1) % tabs.length];
      setInternalTab(nextTab);
      onTabChange?.(nextTab);
    }, 1500);

    return () => clearInterval(interval);
  }, [tab, isHovered, onTabChange]);

  const setTab = (newTab: ReaderTab) => {
    sounds.playClick("toggle");
    setInternalTab(newTab);
    onTabChange?.(newTab);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: -((y - 0.5) * 22),
      ry: (x - 0.5) * 22,
      px: Math.round(x * 100),
      py: Math.round(y * 100)
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, px: 50, py: 50 });
  };

  return (
    <section className="relative py-28 sm:py-36 border-b border-white/[0.08] overflow-hidden bg-[#060608]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Top Eyebrow Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="font-mono text-xs text-zinc-400 tracking-wider flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            One site. Every reader.
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
            <Layers className="h-4 w-4 text-zinc-400" />
            <span className="hidden sm:inline">Interactive 3D IDE Stage</span>
          </div>
        </div>

        {/* 3D Tilted Card Stage with Mouse Tracking Tilt & Orbital Rings */}
        <div className="relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center perspective-[1200px] mb-16 select-none">
          {/* Orbital Celestial Rings & Constellation Aura */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[520px] sm:w-[700px] h-[520px] sm:h-[700px] rounded-full border border-dashed border-white/[0.06] animate-[spin_120s_linear_infinite]" />
            <div className="absolute w-[460px] sm:w-[620px] h-[260px] sm:h-[340px] rounded-full border border-white/[0.08] -rotate-[16deg] animate-[spin_80s_linear_infinite]" />
            <div className="absolute w-80 h-80 rounded-full bg-sky-500/[0.05] blur-[100px]" />
          </div>

          {/* 3D STACKED INTERACTIVE CONTAINER */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHovered
                ? `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.025, 1.025, 1.025)`
                : `perspective(1100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1, 1, 1)`,
              transition: isHovered ? "transform 0.08s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transformStyle: "preserve-3d"
            }}
            className="relative w-full max-w-[540px] sm:max-w-[620px] h-[390px] sm:h-[420px] cursor-grab active:cursor-grabbing"
          >
            {/* Dynamic Specular Hover Light Reflection */}
            <div
              className="absolute inset-0 z-40 rounded-2xl pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.75 : 0,
                background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, rgba(56, 189, 248, 0.18), transparent 60%)`
              }}
            />

            {/* CARD 1: PEOPLE (NoelRaterta.tsx — VS Code TypeScript View) */}
            <div
              onClick={() => setTab("people")}
              className={`absolute inset-0 rounded-2xl border transition-all duration-700 ease-out p-0 flex flex-col justify-between shadow-2xl backdrop-blur-2xl overflow-hidden ${
                tab === "people"
                  ? "z-30 bg-[#0c0d14]/98 border-sky-400/30 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.2)] translate-y-0 translate-x-0 scale-100 opacity-100"
                  : tab === "search"
                  ? "z-20 bg-[#08080f]/85 border-white/[0.08] -translate-y-3.5 -translate-x-5 scale-[0.96] opacity-50 hover:opacity-80"
                  : "z-10 bg-[#06060c]/65 border-white/[0.06] -translate-y-7 -translate-x-9 scale-[0.92] opacity-30 hover:opacity-60"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* VS Code Window Chrome Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#07070b] px-3.5 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] hover:brightness-110" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] hover:brightness-110" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] hover:brightness-110" />
                </div>
                {/* Active Tabs Bar */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1.5 bg-[#0c0d14] px-3 py-1 rounded-t border-t-2 border-sky-400 text-xs font-mono text-zinc-200">
                    <span className="text-sky-400 font-bold text-[10px]">TSX</span>
                    <span>NoelRaterta.tsx</span>
                    <span className="text-zinc-500 hover:text-white text-[11px] ml-1">✕</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-zinc-500">
                    <span className="text-zinc-600 text-[10px]">TS</span>
                    <span>systems.config.ts</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                  <span className="text-[10px] text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">01 // UI</span>
                </div>
              </div>

              {/* Breadcrumb Path */}
              <div className="px-3.5 py-1 border-b border-white/[0.04] bg-black/30 font-mono text-[10px] text-zinc-500 flex items-center justify-between">
                <div>
                  portfolio &gt; src &gt; components &gt; <span className="text-zinc-300">NoelRaterta.tsx</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] text-zinc-500">
                  <span>Ln 4, Col 18</span>
                  <span>UTF-8</span>
                </div>
              </div>

              {/* VS Code Main Interface: Left Activity Bar + Code Body + Minimap */}
              <div className="flex flex-1 overflow-hidden">
                {/* Left Mini Activity Bar */}
                <div className="w-8 sm:w-9 bg-[#07070a] border-r border-white/[0.06] flex flex-col items-center justify-between py-2.5 shrink-0 text-zinc-500">
                  <div className="space-y-3 flex flex-col items-center">
                    <span className="text-sky-400 border-l-2 border-sky-400 pl-1 -ml-1 text-xs" title="Explorer">🗂</span>
                    <span className="text-zinc-600 hover:text-zinc-300 text-xs" title="Search">🔍</span>
                    <span className="text-zinc-600 hover:text-zinc-300 text-xs relative" title="Source Control">
                      ⚡
                      <span className="absolute -top-1 -right-1.5 h-2 w-2 rounded-full bg-sky-400" />
                    </span>
                    <span className="text-zinc-600 hover:text-zinc-300 text-xs" title="Debug">▷</span>
                  </div>
                  <span className="text-zinc-600 hover:text-zinc-300 text-xs">⚙</span>
                </div>

                {/* Code Body with Line Number Gutter */}
                <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed flex gap-3 my-auto overflow-hidden flex-1">
                  {/* Line Number Gutter */}
                  <div className="text-zinc-600 select-none text-right font-mono pr-2 border-r border-white/[0.06] space-y-1 shrink-0">
                    <div className="text-zinc-600">01</div>
                    <div className="text-zinc-600">02</div>
                    <div className="text-zinc-600">03</div>
                    <div className="text-sky-400 font-bold bg-sky-500/10 px-0.5 rounded">04</div>
                    <div className="text-zinc-600">05</div>
                    <div className="text-zinc-600">06</div>
                    <div className="text-zinc-600">07</div>
                    <div className="text-zinc-600">08</div>
                  </div>
                  {/* Monaco / VS Code Syntax Highlighted Tokens */}
                  <div className="space-y-1 text-zinc-300 overflow-x-auto no-scrollbar flex-1">
                    <div>
                      <span className="text-[#c586c0]">export const </span>
                      <span className="text-[#4ec9b0] font-semibold">NoelRaterta</span>
                      <span className="text-zinc-400">: </span>
                      <span className="text-[#4ec9b0]">SystemEngineer</span>
                      <span className="text-[#d4d4d4]"> = &#123;</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">headline</span>
                      <span className="text-zinc-400">: </span>
                      <span className="text-[#ce9178]">&quot;Software isn&apos;t just syntax. It&apos;s craft.&quot;</span>
                      <span className="text-zinc-400">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">practice</span>
                      <span className="text-zinc-400">: </span>
                      <span className="text-[#ce9178]">&quot;Full-Stack &amp; Systems Developer&quot;</span>
                      <span className="text-zinc-400">,</span>
                    </div>
                    <div className="pl-4 bg-white/[0.03] -mx-2 px-2 rounded border-l border-sky-400/60">
                      <span className="text-[#9cdcfe]">deployments</span>
                      <span className="text-zinc-400">: [</span>
                      <span className="text-[#ce9178]">&quot;Everly Plumbing&quot;</span>
                      <span className="text-zinc-400">, </span>
                      <span className="text-[#ce9178]">&quot;Everly Bookkeeping&quot;</span>
                      <span className="text-zinc-400">],</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">guarantees</span>
                      <span className="text-zinc-400">: [</span>
                      <span className="text-[#ce9178]">&quot;ACID Compliance&quot;</span>
                      <span className="text-zinc-400">, </span>
                      <span className="text-[#ce9178]">&quot;Sub-second LCP&quot;</span>
                      <span className="text-zinc-400">],</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">education</span>
                      <span className="text-zinc-400">: </span>
                      <span className="text-[#ce9178]">&quot;BSIT (Class of 2026, BukSU)&quot;</span>
                    </div>
                    <div>
                      <span className="text-[#d4d4d4]">&#125;;</span>
                    </div>
                  </div>
                </div>

                {/* Right Simulated VS Code Minimap */}
                <div className="hidden sm:block w-8 border-l border-white/[0.04] bg-black/40 p-1 select-none pointer-events-none shrink-0">
                  <div className="space-y-1 opacity-40">
                    <div className="h-1 w-5 bg-sky-400/60 rounded" />
                    <div className="h-1 w-6 bg-orange-400/50 rounded ml-1" />
                    <div className="h-1 w-4 bg-orange-400/50 rounded ml-1" />
                    <div className="h-1 w-6 bg-sky-400/70 rounded ml-1" />
                    <div className="h-1 w-5 bg-orange-400/50 rounded ml-1" />
                    <div className="h-1 w-3 bg-zinc-400/50 rounded" />
                  </div>
                </div>
              </div>

              {/* VS Code Bottom Status Bar */}
              <div className="border-t border-white/[0.08] bg-[#007acc]/90 text-white px-3 py-1 font-mono text-[10px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold">
                    <GitBranch className="h-3 w-3" /> main*
                  </span>
                  <span>0 ⊗ 0 ⚠</span>
                </div>
                <div className="flex items-center gap-3 font-normal opacity-90">
                  <span>TypeScript 5.7</span>
                  <span>UTF-8</span>
                  <span>Prettier</span>
                </div>
              </div>
            </div>

            {/* CARD 2: SEARCH (PersonSchema.json — VS Code JSON-LD View) */}
            <div
              onClick={() => setTab("search")}
              className={`absolute inset-0 rounded-2xl border transition-all duration-700 ease-out p-0 flex flex-col justify-between shadow-2xl backdrop-blur-2xl overflow-hidden ${
                tab === "search"
                  ? "z-30 bg-[#0c0d14]/98 border-amber-400/35 shadow-[0_20px_60px_-15px_rgba(245,158,11,0.2)] translate-y-0 translate-x-0 scale-100 opacity-100"
                  : tab === "agents"
                  ? "z-20 bg-[#08080f]/85 border-white/[0.08] -translate-y-3.5 translate-x-5 scale-[0.96] opacity-50 hover:opacity-80"
                  : "z-20 bg-[#08080f]/85 border-white/[0.08] -translate-y-3.5 translate-x-5 scale-[0.96] opacity-50 hover:opacity-80"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* VS Code Window Chrome Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#07070b] px-3.5 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                {/* Active Tab */}
                <div className="flex items-center gap-1.5 bg-[#0c0d14] px-3 py-1 rounded-t border-t-2 border-amber-400 text-xs font-mono text-zinc-200">
                  <span className="text-amber-400 font-bold text-[10px]">&#123; &#125;</span>
                  <span>PersonSchema.json</span>
                  <span className="text-zinc-500 hover:text-white text-[11px] ml-1">✕</span>
                </div>
                <div className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">02 // SCHEMA</div>
              </div>

              {/* Breadcrumb Path */}
              <div className="px-3.5 py-1 border-b border-white/[0.04] bg-black/30 font-mono text-[10px] text-zinc-500 flex items-center justify-between">
                <div>
                  public &gt; meta &gt; <span className="text-zinc-300">PersonSchema.json</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] text-zinc-500">
                  <span>JSON-LD</span>
                  <span>UTF-8</span>
                </div>
              </div>

              {/* VS Code Main Interface */}
              <div className="flex flex-1 overflow-hidden">
                {/* Activity Bar */}
                <div className="w-8 sm:w-9 bg-[#07070a] border-r border-white/[0.06] flex flex-col items-center justify-between py-2.5 shrink-0 text-zinc-500">
                  <div className="space-y-3 flex flex-col items-center">
                    <span className="text-amber-400 border-l-2 border-amber-400 pl-1 -ml-1 text-xs">🗂</span>
                    <span className="text-zinc-600 text-xs">🔍</span>
                    <span className="text-zinc-600 text-xs">⚡</span>
                    <span className="text-zinc-600 text-xs">▷</span>
                  </div>
                  <span className="text-zinc-600 text-xs">⚙</span>
                </div>

                {/* JSON Code Body with Line Numbers */}
                <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed flex gap-3 my-auto overflow-hidden flex-1">
                  <div className="text-zinc-600 select-none text-right font-mono pr-2 border-r border-white/[0.06] space-y-1 shrink-0">
                    <div>01</div>
                    <div>02</div>
                    <div>03</div>
                    <div className="text-amber-400 font-bold bg-amber-500/10 px-0.5 rounded">04</div>
                    <div>05</div>
                    <div>06</div>
                    <div>07</div>
                    <div>08</div>
                  </div>
                  <div className="space-y-1 text-zinc-300 overflow-x-auto no-scrollbar flex-1">
                    <div><span className="text-amber-400">&#123;</span></div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">&quot;@context&quot;</span>: <span className="text-[#ce9178]">&quot;https://schema.org&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">&quot;@type&quot;</span>: <span className="text-[#ce9178]">&quot;Person&quot;</span>,
                    </div>
                    <div className="pl-4 bg-white/[0.03] -mx-2 px-2 rounded border-l border-amber-400/60">
                      <span className="text-[#9cdcfe]">&quot;name&quot;</span>: <span className="text-[#ce9178]">&quot;Noel Raterta Jr.&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">&quot;jobTitle&quot;</span>: <span className="text-[#ce9178]">&quot;Full-Stack Systems Engineer&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">&quot;alumniOf&quot;</span>: <span className="text-[#ce9178]">&quot;Bukidnon State University&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9cdcfe]">&quot;knowsAbout&quot;</span>: [<span className="text-[#ce9178]">&quot;Laravel&quot;</span>, <span className="text-[#ce9178]">&quot;Next.js&quot;</span>, <span className="text-[#ce9178]">&quot;PostgreSQL&quot;</span>]
                    </div>
                    <div><span className="text-amber-400">&#125;</span></div>
                  </div>
                </div>

                {/* Right Minimap */}
                <div className="hidden sm:block w-8 border-l border-white/[0.04] bg-black/40 p-1 select-none pointer-events-none shrink-0">
                  <div className="space-y-1 opacity-40">
                    <div className="h-1 w-3 bg-amber-400/70 rounded" />
                    <div className="h-1 w-6 bg-sky-400/50 rounded ml-1" />
                    <div className="h-1 w-5 bg-sky-400/50 rounded ml-1" />
                    <div className="h-1 w-6 bg-amber-400/60 rounded ml-1" />
                    <div className="h-1 w-4 bg-orange-400/50 rounded ml-1" />
                    <div className="h-1 w-2 bg-amber-400/70 rounded" />
                  </div>
                </div>
              </div>

              {/* VS Code Bottom Status Bar */}
              <div className="border-t border-white/[0.08] bg-[#07070b] px-3.5 py-1.5 font-mono text-[10px] text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <GitBranch className="h-3 w-3" /> main*
                  </span>
                  <span>JSON Validated</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>JSON-LD</span>
                  <span>UTF-8</span>
                  <span>Spaces: 2</span>
                </div>
              </div>
            </div>

            {/* CARD 3: AGENTS (llms.txt — VS Code Markdown & Agent Discovery View) */}
            <div
              onClick={() => setTab("agents")}
              className={`absolute inset-0 rounded-2xl border transition-all duration-700 ease-out p-0 flex flex-col justify-between shadow-2xl backdrop-blur-2xl overflow-hidden ${
                tab === "agents"
                  ? "z-30 bg-[#0c0d14]/98 border-emerald-400/35 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] translate-y-0 translate-x-0 scale-100 opacity-100"
                  : tab === "search"
                  ? "z-10 bg-[#06060c]/65 border-white/[0.06] -translate-y-7 translate-x-9 scale-[0.92] opacity-30 hover:opacity-60"
                  : "z-20 bg-[#08080f]/85 border-white/[0.08] -translate-y-3.5 translate-x-5 scale-[0.96] opacity-50 hover:opacity-80"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* VS Code Window Chrome Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#07070b] px-3.5 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                {/* Active Tab */}
                <div className="flex items-center gap-1.5 bg-[#0c0d14] px-3 py-1 rounded-t border-t-2 border-emerald-400 text-xs font-mono text-zinc-200">
                  <span className="text-emerald-400 font-bold text-[10px]">MD</span>
                  <span>llms.txt</span>
                  <span className="text-zinc-500 hover:text-white text-[11px] ml-1">✕</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">03 // AGENTS</div>
              </div>

              {/* Breadcrumb Path */}
              <div className="px-3.5 py-1 border-b border-white/[0.04] bg-black/30 font-mono text-[10px] text-zinc-500 flex items-center justify-between">
                <div>
                  root &gt; <span className="text-zinc-300">llms.txt</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] text-zinc-500">
                  <span>Markdown</span>
                  <span>UTF-8</span>
                </div>
              </div>

              {/* VS Code Main Interface */}
              <div className="flex flex-1 overflow-hidden">
                {/* Activity Bar */}
                <div className="w-8 sm:w-9 bg-[#07070a] border-r border-white/[0.06] flex flex-col items-center justify-between py-2.5 shrink-0 text-zinc-500">
                  <div className="space-y-3 flex flex-col items-center">
                    <span className="text-emerald-400 border-l-2 border-emerald-400 pl-1 -ml-1 text-xs">🗂</span>
                    <span className="text-zinc-600 text-xs">🔍</span>
                    <span className="text-zinc-600 text-xs">⚡</span>
                    <span className="text-zinc-600 text-xs">▷</span>
                  </div>
                  <span className="text-zinc-600 text-xs">⚙</span>
                </div>

                {/* llms.txt Code Body */}
                <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed flex gap-3 my-auto overflow-hidden flex-1">
                  <div className="text-zinc-600 select-none text-right font-mono pr-2 border-r border-white/[0.06] space-y-1 shrink-0">
                    <div>01</div>
                    <div>02</div>
                    <div className="text-emerald-400 font-bold bg-emerald-500/10 px-0.5 rounded">03</div>
                    <div>04</div>
                    <div>05</div>
                    <div>06</div>
                    <div>07</div>
                  </div>
                  <div className="space-y-1 text-zinc-300 overflow-x-auto no-scrollbar flex-1">
                    <div className="text-[#6a9955] font-mono italic">// Autonomous agent discovery endpoint</div>
                    <div>
                      <span className="text-emerald-400 font-bold"># Noel Raterta Jr. </span>
                      <span className="text-zinc-400">— Full-Stack Systems Builder</span>
                    </div>
                    <div className="bg-white/[0.03] -mx-2 px-2 rounded border-l border-emerald-400/60">
                      <span className="text-sky-400">&gt; Focus: </span>
                      <span className="text-zinc-300">Enterprise Laravel, Next.js, PostgreSQL, Java Relational</span>
                    </div>
                    <div>
                      <span className="text-sky-400">&gt; Deployments: </span>
                      <span className="text-zinc-300">everlyplumbing.com, everlybookkeeping.com, deenintr.com</span>
                    </div>
                    <div>
                      <span className="text-sky-400">&gt; Credentials: </span>
                      <span className="text-zinc-300">BS Information Technology, BukSU (2026)</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">&gt; Availability: </span>
                      <span className="text-emerald-300 font-medium">Open to roles &amp; high-impact client builds</span>
                    </div>
                  </div>
                </div>

                {/* Right Minimap */}
                <div className="hidden sm:block w-8 border-l border-white/[0.04] bg-black/40 p-1 select-none pointer-events-none shrink-0">
                  <div className="space-y-1 opacity-40">
                    <div className="h-1 w-6 bg-emerald-400/70 rounded" />
                    <div className="h-1 w-5 bg-sky-400/50 rounded ml-1" />
                    <div className="h-1 w-4 bg-sky-400/50 rounded ml-1" />
                    <div className="h-1 w-5 bg-emerald-400/60 rounded ml-1" />
                    <div className="h-1 w-3 bg-zinc-400/50 rounded" />
                  </div>
                </div>
              </div>

              {/* VS Code Bottom Status Bar */}
              <div className="border-t border-white/[0.08] bg-[#07070b] px-3.5 py-1.5 font-mono text-[10px] text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <GitBranch className="h-3 w-3" /> main*
                  </span>
                  <span>Agent Schema Ready</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>UTF-8</span>
                  <span>Markdown</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Interaction Cue */}
        <div className="flex items-center justify-center gap-2 -mt-8 mb-12 text-zinc-500 font-mono text-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>Interactive 3D IDE · Move mouse to tilt perspective in real-time</span>
        </div>

        {/* READER SWITCHER TABS */}
        <div className="border-b border-white/[0.12] pb-0">
          <div className="grid grid-cols-3 max-w-xl mx-auto">
            {/* People Tab */}
            <button
              type="button"
              onClick={() => setTab("people")}
              className={`relative pb-4 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm transition-colors cursor-pointer ${
                tab === "people" ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <User className="h-4 w-4" />
              <span>People</span>
              {tab === "people" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>

            {/* Search Tab */}
            <button
              type="button"
              onClick={() => setTab("search")}
              className={`relative pb-4 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm transition-colors cursor-pointer ${
                tab === "search" ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
              {tab === "search" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>

            {/* Agents Tab */}
            <button
              type="button"
              onClick={() => setTab("agents")}
              className={`relative pb-4 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm transition-colors cursor-pointer ${
                tab === "agents" ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>Agents</span>
              {tab === "agents" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>
          </div>
        </div>

        {/* DYNAMIC EDITORIAL CONTENT BELOW THE TABS */}
        <div className="mt-12 sm:mt-16 max-w-2xl">
          {tab === "people" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="font-mono text-xs text-sky-400 uppercase tracking-widest">
                Rendered page · human experience
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                A page to experience.
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
                Interactive IDE perspective with live syntax tokens and hardware-accelerated 3D mouse tracking. Hover over the editor to tilt the viewpoint.
              </p>
              <div className="pt-2">
                <a
                  href="#deployments"
                  onClick={() => sounds.playClick("soft")}
                  className="inline-flex items-center gap-2 font-mono text-xs text-white border-b border-white pb-0.5 hover:text-sky-300 hover:border-sky-300 transition-colors"
                >
                  <span>Explore deployed works</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {tab === "search" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="font-mono text-xs text-amber-400 uppercase tracking-widest">
                Structured data · JSON-LD graph
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Identity, made explicit.
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
                Semantic entity schemas and machine graph linkages prepared for Google, answer engines, and crawler discovery.
              </p>
              <div className="pt-2">
                <a
                  href="#systems"
                  onClick={() => sounds.playClick("soft")}
                  className="inline-flex items-center gap-2 font-mono text-xs text-white border-b border-white pb-0.5 hover:text-amber-300 hover:border-amber-300 transition-colors"
                >
                  <span>Inspect systems &amp; principles</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {tab === "agents" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                Agent manifest · llms.txt excerpt
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                A source to work with.
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
                Readable context, strict schemas, and clean markdown routes. An entrance engineered for the next generation of autonomous readers.
              </p>
              <div className="pt-2">
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick("soft")}
                  className="inline-flex items-center gap-2 font-mono text-xs text-white border-b border-white pb-0.5 hover:text-emerald-300 hover:border-emerald-300 transition-colors"
                >
                  <span>Open the agent manifest (/llms.txt)</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
