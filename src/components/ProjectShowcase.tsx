"use client";

import React, { useState } from "react";
import { ExternalLink, Terminal, Layers, Code2, Cpu, Filter, Globe, CheckCircle2, List, LayoutGrid } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PROJECTS, Project } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";
import { ScrollReveal } from "@/components/ScrollReveal";

export const ProjectShowcase: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"directory" | "containers">("directory");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const hoveredProjectRef = React.useRef<string | null>(null);
  hoveredProjectRef.current = hoveredProject;

  const sectionRef = React.useRef<HTMLElement>(null);
  const rowRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const userSelectedRef = React.useRef<boolean>(false);

  const categories = [
    "All",
    "Automation & AI Workflows",
    "Deployed Commercial Platform",
    "Full-Stack System",
    "Desktop & Systems",
    "Game Engine & Mechanics"
  ];

  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  // Reset rowRefs when filtered list changes to avoid stale DOM references
  rowRefs.current = rowRefs.current.slice(0, filteredProjects.length);

  // Pure scroll synchronization: activate cards sequentially based on focal center position
  React.useEffect(() => {
    if (viewMode !== "directory") return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;

        // If user recently clicked a card explicitly, briefly prioritize their manual selection
        if (userSelectedRef.current) return;

        // Ensure deployments section is in view
        const section = sectionRef.current;
        if (section) {
          const sRect = section.getBoundingClientRect();
          if (sRect.bottom < 120 || sRect.top > window.innerHeight - 120) {
            return;
          }
        }

        const focalY = window.innerHeight * 0.44;
        let closestId = filteredProjects[0]?.id || null;
        let minDistance = Infinity;

        for (let i = 0; i < filteredProjects.length; i++) {
          const el = rowRefs.current[i];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - focalY);
          if (dist < minDistance) {
            minDistance = dist;
            closestId = filteredProjects[i].id;
          }
        }

        if (closestId && closestId !== hoveredProjectRef.current) {
          setHoveredProject(closestId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial evaluation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filteredProjects, viewMode]);

  const handleFilterClick = (cat: string) => {
    sounds.playClick("soft");
    setFilter(cat);
  };

  return (
    <section ref={sectionRef} id="deployments" className="py-28 sm:py-36 border-b border-white/[0.08] relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div>
            <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Production Track Record & Engineering Builds
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Deployed Works & Systems
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-zinc-400 leading-relaxed">
            From live commercial web applications in Laravel and Next.js to Java relational engines, Shopify stores, and deterministic game loops.
          </p>
        </div>

        {/* Controls: Filter Pills + View Switcher */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-zinc-500 mr-2 text-[11px]">
              <Filter className="h-3 w-3" />
              <span>Filter:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`rounded-full px-4 py-1.5 transition-all text-xs ${
                  filter === cat
                    ? "bg-white text-black font-medium shadow-sm"
                    : "bg-white/[0.02] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.2]"
                }`}
              >
                {cat === "Deployed Commercial Platform" ? "Live Client Deployments" : cat === "Automation & AI Workflows" ? "n8n & AI Automation" : cat}
              </button>
            ))}
          </div>

          {/* View Mode Switcher (Grigoletti Directory vs Apple Containers) */}
          <div className="flex items-center gap-1 border border-white/[0.1] bg-black/40 p-1 rounded-xl shrink-0 font-mono text-xs">
            <button
              onClick={() => {
                sounds.playClick("soft");
                setViewMode("directory");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "directory"
                  ? "bg-white text-black font-medium shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Interactive Directory</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick("soft");
                setViewMode("containers");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "containers"
                  ? "bg-white text-black font-medium shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Deep Spec Cards</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Cinematic Split Interactive Showcase (Scroll-Synced, Fully Visible Sticky Stage) */}
        {viewMode === "directory" ? (
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Interactive Directory Navigation - Balanced Gaps to Fill Column Properly */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              {filteredProjects.map((project: Project, idx: number) => {
                const isSelected = (hoveredProject || filteredProjects[0].id) === project.id;
                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      rowRefs.current[idx] = el;
                    }}
                    onClick={() => {
                      userSelectedRef.current = true;
                      setHoveredProject(project.id);
                      sounds.playClick("crisp");
                      setTimeout(() => {
                        userSelectedRef.current = false;
                      }, 800);
                    }}
                    className={`group relative py-5 px-5 sm:px-6 rounded-xl border transition-colors duration-200 cursor-pointer select-none ${
                      isSelected
                        ? "bg-white/[0.06] border-sky-400/40 shadow-lg shadow-sky-500/5"
                        : "bg-white/[0.015] border-white/[0.07] hover:bg-white/[0.03] hover:border-white/[0.14]"
                    }`}
                  >
                    {/* Fixed Left indicator accent - opacity transition only, zero layout shift */}
                    <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r transition-opacity duration-200 ${
                      isSelected ? "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] opacity-100" : "opacity-0"
                    }`} />

                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-2 flex-1 min-w-0">
                        {/* Metadata & Beacons */}
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className={`font-bold transition-colors ${
                            isSelected ? "text-sky-400" : "text-zinc-500"
                          }`}>
                            0{idx + 1} //
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-[11px] text-zinc-400 truncate">
                            {project.category === "Deployed Commercial Platform" ? "2026 · Commercial Platform" : project.category === "Automation & AI Workflows" ? "n8n AI Workflow" : project.category}
                          </span>
                          {project.category === "Deployed Commercial Platform" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          )}
                          {project.category === "Automation & AI Workflows" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping shrink-0" />
                          )}
                        </div>

                        {/* Title - Short & Clean */}
                        <h3 className={`text-base sm:text-lg font-bold uppercase tracking-tight transition-colors line-clamp-1 ${
                          isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                        }`}>
                          {project.title.replace(" Commercial Web Platform", "").replace(" Financial Services Platform", "").replace(" Digital Agency Platform", "")}
                        </h3>

                        {/* Tags & Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                          {project.tags.slice(0, 3).map((tag, tIdx) => (
                            <span key={tIdx} className={`px-2 py-0.5 rounded border transition-colors ${
                              isSelected ? "border-white/[0.14] bg-white/[0.04] text-zinc-300" : "border-white/[0.06] bg-white/[0.02] text-zinc-500"
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right status badges & arrow - Fixed content across all states */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        {project.video && (
                          <span className="font-mono text-[10px] sm:text-[11px] rounded-full px-2.5 py-0.5 border border-white/[0.08] bg-white/[0.03] text-zinc-400">
                            Demo Video
                          </span>
                        )}
                        {project.liveUrl && !project.video && (
                          <span className="font-mono text-[10px] sm:text-[11px] rounded-full px-2.5 py-0.5 border border-white/[0.08] bg-white/[0.03] text-zinc-400">
                            Live
                          </span>
                        )}
                        <span className={`text-base transition-colors ${
                          isSelected ? "text-sky-400 font-bold" : "text-zinc-600 group-hover:text-zinc-400"
                        }`}>
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Directory Bottom Status */}
              <div className="pt-6 pb-12 sm:pb-16 font-mono text-xs text-zinc-500 flex items-center justify-between px-4 sm:px-6">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {filteredProjects.length} Verified Deployments Indexed
                </span>
                <span className="text-zinc-600 font-normal">End of directory //</span>
              </div>
            </div>

            {/* Right: Dedicated Cinematic Preview Stage (Compact, 100% Fully Visible in Viewport at All Depths) */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 transition-all duration-300">
              {(() => {
                const active = filteredProjects.find(p => p.id === (hoveredProject || filteredProjects[0].id)) || filteredProjects[0];
                return (
                  <div 
                    key={active.id}
                    className="animate-stage-fade rounded-3xl border border-white/[0.12] bg-[#0b0c14]/95 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top ambient glow */}
                    <div className="absolute top-0 right-1/4 -translate-y-1/2 w-72 h-28 bg-gradient-to-b from-sky-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                    {/* Stage Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider font-semibold">
                          {active.category}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500">
                        {active.video ? "Interactive Demo Video" : "Live Preview"}
                      </span>
                    </div>

                    {/* 3D Browser Window Frame */}
                    <div className="mt-3 rounded-xl border border-white/[0.12] overflow-hidden shadow-2xl bg-black/80 group/preview relative transition-transform duration-500 hover:scale-[1.01]">
                      {/* Window Chrome Header */}
                      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.08] bg-white/[0.04]">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-red-500/60" />
                          <span className="h-2 w-2 rounded-full bg-amber-500/60" />
                          <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
                        </div>
                        {active.liveUrl ? (
                          <span className="font-mono text-[10px] text-sky-400 truncate max-w-[220px]">
                            {new URL(active.liveUrl).hostname}
                          </span>
                        ) : active.video ? (
                          <span className="font-mono text-[10px] text-sky-400 truncate max-w-[220px]">
                            {active.title}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-zinc-500">
                            Local Workstation Build
                          </span>
                        )}
                        <div className="w-8" />
                      </div>

                      {/* Preview Video, Image or Terminal */}
                      {active.video ? (
                        <div className="relative aspect-[16/9] max-h-[220px] sm:max-h-[260px] overflow-hidden bg-black">
                          <video
                            key={active.id}
                            src={active.video}
                            poster={active.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="w-full h-full object-cover object-center"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 border border-sky-400/30 font-mono text-[10px] text-sky-300 flex items-center gap-1.5 backdrop-blur-md pointer-events-none">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                            <span>{active.category === "Automation & AI Workflows" ? "n8n Live Workflow" : "Production Walkthrough"}</span>
                          </div>
                        </div>
                      ) : active.image ? (
                        <div className="relative aspect-[16/9] max-h-[190px] sm:max-h-[220px] overflow-hidden bg-black/60">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            key={active.id}
                            src={active.image}
                            alt={active.title}
                            className="w-full h-full object-cover object-top animate-fade-in transition-transform duration-700 group-hover/preview:scale-105"
                          />
                          {active.liveUrl && (
                            <a
                              href={active.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center font-mono text-xs text-white gap-2 backdrop-blur-[2px]"
                            >
                              <span>Open {new URL(active.liveUrl).hostname}</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="p-3 bg-[#07070c] font-mono text-xs text-zinc-300 min-h-[140px]">
                          <pre className="overflow-x-auto leading-relaxed">
                            <code>{active.specCode || "// Native Desktop Architecture"}</code>
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Active Title & Description */}
                    <div className="mt-3 space-y-1 relative z-10">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                        {active.title}
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                        {active.description}
                      </p>
                    </div>

                    {/* Metrics Row */}
                    <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-white/[0.07] bg-black/40 p-2 font-mono text-xs">
                      {active.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="space-y-0.5">
                          <div className="text-[9px] text-zinc-500 uppercase truncate">
                            {m.label}
                          </div>
                          <div className="text-[11px] font-semibold text-white truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Triggers */}
                    <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5 relative z-10">
                      <div className="flex flex-wrap gap-1.5">
                        {active.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {active.liveUrl && (
                          <a
                            href={active.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sounds.playClick("crisp")}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 text-black px-3.5 py-1.5 font-mono text-xs font-semibold hover:bg-emerald-400 transition-colors shadow-sm"
                          >
                            <span>Visit Website</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {active.githubUrl && (
                          <a
                            href={active.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sounds.playClick("soft")}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] p-1.5 text-zinc-300 hover:text-white hover:border-white/[0.24] transition-all"
                            title="View Source Code"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
        /* View Mode 2: Apple & Awwwards Style Glassmorphic Project Containers */
        <div className="mt-14 space-y-10">
          {filteredProjects.map((project: Project, idx: number) => (
            <ScrollReveal
              key={project.id}
              variant="3d-card"
              delay={Math.min(idx * 50, 200)}
            >
              <div className="relative rounded-3xl border border-white/[0.09] bg-[#0b0c12]/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl transition-all duration-500 hover:border-white/[0.22] hover:shadow-sky-500/10 group overflow-hidden">
                {/* Ambient top glow */}
                <div className="absolute top-0 right-1/3 -translate-y-1/2 w-96 h-40 bg-gradient-to-b from-sky-500/15 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:from-sky-500/25 transition-all duration-700" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative z-10">
                  {/* Left Column: Editorial Specs */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-500 font-semibold">
                        0{idx + 1} //
                      </span>
                      <span className="font-mono text-xs text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                        {project.category === "Deployed Commercial Platform" && (
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                        )}
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                      {project.description}
                    </p>

                    {/* Role description if available */}
                    {project.roleDescription && (
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-zinc-400">
                        <span className="text-zinc-200 font-medium">Role: </span>
                        {project.roleDescription}
                      </div>
                    )}

                    {/* Architecture decisions */}
                    <div className="space-y-2 pt-1">
                      <div className="font-mono text-xs text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="h-3.5 w-3.5 text-sky-400" />
                        Architecture & Implementation Decisions
                      </div>
                      <ul className="space-y-2 text-xs text-zinc-400 font-mono">
                        {project.architecture.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-sky-400 mt-0.5">↳</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="flex flex-wrap items-center gap-6 pt-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sounds.playClick("soft")}
                          className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 border-b border-emerald-400 pb-0.5 hover:text-emerald-300 hover:border-emerald-300 transition-colors"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          <span>Visit Live Website</span>
                          <span className="text-zinc-500">↗</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sounds.playClick("soft")}
                          className="inline-flex items-center gap-2 font-mono text-xs text-white border-b border-white pb-0.5 hover:text-sky-300 hover:border-sky-300 transition-colors"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                          <span>Inspect Repository</span>
                          <span className="text-zinc-500">↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Floating Spec Card, Metrics & Preview */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Metric Row in subtle container */}
                    <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-white/[0.07] bg-black/40 p-3.5">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="space-y-1">
                          <div className="text-[10px] font-mono text-zinc-500 uppercase truncate">
                            {m.label}
                          </div>
                          <div className="text-xs font-mono font-semibold text-white truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Visual Preview Video or image in Browser Frame */}
                    {project.video ? (
                      <div className="rounded-2xl border border-white/[0.12] overflow-hidden shadow-2xl bg-black/80 group/img relative transition-all duration-300 hover:border-sky-400/40">
                        <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.08] bg-white/[0.03]">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                          </div>
                          <span className="font-mono text-[10px] text-sky-400">
                            {project.category === "Automation & AI Workflows" ? "n8n Workflow Execution Recording" : `${project.title.split(' ')[0]} Live Demo Walkthrough`}
                          </span>
                          <div className="w-10" />
                        </div>
                        <video
                          src={project.video}
                          poster={project.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          className="w-full h-auto max-h-[300px] object-contain bg-black"
                        />
                      </div>
                    ) : project.image ? (
                      <div className="rounded-2xl border border-white/[0.12] overflow-hidden shadow-2xl bg-black/60 group/img relative transition-all duration-300 hover:border-white/[0.25]">
                        {/* Browser Window Chrome Header */}
                        <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.08] bg-white/[0.03]">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                          </div>
                          {project.liveUrl && (
                            <span className="font-mono text-[10px] text-zinc-500 truncate max-w-[180px]">
                              {new URL(project.liveUrl).hostname}
                            </span>
                          )}
                          <div className="w-10" />
                        </div>

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto object-cover opacity-90 group-hover/img:opacity-100 transition-opacity duration-300"
                        />
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center font-mono text-xs text-white gap-2 backdrop-blur-[2px]"
                          >
                            <span>Open {new URL(project.liveUrl).hostname}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    ) : null}

                    {/* Clean Terminal Snippet for Systems */}
                    {project.specCode && (
                      <div className="rounded-2xl border border-white/[0.1] bg-[#07070c] overflow-hidden shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 font-mono text-[11px] text-zinc-400">
                          <div className="flex items-center gap-2">
                            <Code2 className="h-3.5 w-3.5 text-sky-400" />
                            <span>Implementation Spec</span>
                          </div>
                          <span className="text-[10px] text-zinc-500">production code</span>
                        </div>
                        <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed selection:bg-sky-500/30">
                          <code>{project.specCode}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};
