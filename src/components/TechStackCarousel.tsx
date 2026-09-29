"use client";

import React, { useState } from "react";
import { Cpu, Terminal, Layers, Database, Globe, Sparkles } from "lucide-react";
import { sounds } from "@/utils/audio";
import { ScrollReveal } from "@/components/ScrollReveal";

interface TechItem {
  name: string;
  category: "backend" | "frontend" | "database" | "platforms";
  level: string;
  detail: string;
  iconTag: string;
}

const ALL_TECH: TechItem[] = [
  // Backend
  { name: "Laravel", category: "backend", level: "Core Specialty", detail: "MVC architectures, Eloquent ORM, Blade views, middleware", iconTag: "PHP" },
  { name: "NestJS", category: "backend", level: "Enterprise", detail: "TypeScript modular architecture, dependency injection, ORM services", iconTag: "NEST" },
  { name: "PHP", category: "backend", level: "Production", detail: "Object-oriented backend services and transactional endpoints", iconTag: "PHP" },
  { name: "Node.js & Express", category: "backend", level: "Full-Stack", detail: "Async event loops, microservices, and server-side utilities", iconTag: "NODE" },
  { name: "Java & C", category: "backend", level: "Systems / OOP", detail: "Swing UI, JDBC database drivers, memory architecture", iconTag: "JVM" },
  { name: "Python", category: "backend", level: "Systems", detail: "Pygame game loops, procedural math, and automation scripts", iconTag: "PY" },
  { name: "REST APIs", category: "backend", level: "Architecture", detail: "Contract-first endpoint design with strict JSON schemas", iconTag: "HTTP" },

  // Frontend
  { name: "Next.js", category: "frontend", level: "Production", detail: "App Router, Server Components, dynamic edge rendering", iconTag: "NEXT" },
  { name: "React", category: "frontend", level: "Production", detail: "Hooks, state machines, and component design systems", iconTag: "REACT" },
  { name: "Angular & AngularJS", category: "frontend", level: "Full-Stack", detail: "Component-driven government inventory & HRMIS interfaces", iconTag: "NG" },
  { name: "TypeScript", category: "frontend", level: "Strict", detail: "End-to-end type contracts, interfaces, and compile-time safety", iconTag: "TS" },
  { name: "Tailwind CSS", category: "frontend", level: "Styling", detail: "Utility-first design tokens, responsive breakpoints, animations", iconTag: "CSS" },
  { name: "HTML & CSS", category: "frontend", level: "Core", detail: "Semantic DOM, responsive design, and accessible styling", iconTag: "DOM" },

  // Databases
  { name: "MySQL", category: "database", level: "Transactional", detail: "Client consultation schemas, foreign key cascade constraints", iconTag: "SQL" },
  { name: "Supabase (PostgreSQL)", category: "database", level: "Cloud SQL", detail: "PostgreSQL engine, secure auth, row-level security, and APIs", iconTag: "SUPA" },
  { name: "MongoDB", category: "database", level: "NoSQL", detail: "Document stores and flexible JSON schema collections", iconTag: "NOSQL" },
  { name: "ACID Compliance", category: "database", level: "Guarantees", detail: "Atomic transaction blocks preventing ghost writes and race conditions", iconTag: "ACID" },
  { name: "Database Normalization", category: "database", level: "Architecture", detail: "Normalized ER diagrams and scalable entity relationships", iconTag: "DATA" },

  // Platforms & Automation
  { name: "n8n Workflows", category: "platforms", level: "AI & Automation", detail: "Autonomous lead management, task routing, webhooks, and sync", iconTag: "N8N" },
  { name: "Zoho CRM & Analytics", category: "platforms", level: "CRM & Insights", detail: "User engagement analysis, pipeline routing, and conversion metrics", iconTag: "CRM" },
  { name: "Squarespace & WordPress", category: "platforms", level: "CMS & Web Presence", detail: "Brand alignment, custom PHP themes, layouts, and SEO performance", iconTag: "WEB" },
  { name: "Cisco Networking (CCNA)", category: "platforms", level: "Verified CCNA", detail: "DNS setup, reverse proxy, VLAN, LAN repair, switch troubleshooting", iconTag: "NET" },
  { name: "Git & GitHub", category: "platforms", level: "Workflows", detail: "Atomic commit patterns, pull request reviews, and continuous deployments", iconTag: "GIT" },
  { name: "Postman & Linux", category: "platforms", level: "Tooling", detail: "API testing, terminal scripting, device configuration, and support", iconTag: "CLI" },
];

export const TechStackCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [inspectedTech, setInspectedTech] = useState<TechItem | null>(ALL_TECH[0]);

  const categories = [
    { id: "all", label: "All Disciplines", icon: Layers },
    { id: "backend", label: "Backend & Systems", icon: Terminal },
    { id: "frontend", label: "Modern Frontend", icon: Cpu },
    { id: "database", label: "Databases & Storage", icon: Database },
    { id: "platforms", label: "Builders & Automation", icon: Globe },
  ];

  const filteredTech = activeTab === "all"
    ? ALL_TECH
    : ALL_TECH.filter((t) => t.category === activeTab);

  // Divide into two alternating flow streams for infinite horizontal kinetic ribbon effect
  const half = Math.ceil(filteredTech.length / 2);
  const rawRow1 = filteredTech.slice(0, half);
  const rawRow2 = filteredTech.slice(half);

  // Fallbacks if a filtered category has few items
  const baseRow1 = rawRow1.length > 0 ? rawRow1 : filteredTech;
  const baseRow2 = rawRow2.length > 0 ? rawRow2 : filteredTech;

  // Quadruple items to increase length significantly for ultra-wide monitors and seamless loops
  const row1 = [...baseRow1, ...baseRow1, ...baseRow1, ...baseRow1];
  const row2 = [...baseRow2, ...baseRow2, ...baseRow2, ...baseRow2];

  const handleTabClick = (id: string) => {
    sounds.playClick("soft");
    setActiveTab(id);
    const firstMatch = id === "all" ? ALL_TECH[0] : ALL_TECH.find(t => t.category === id);
    if (firstMatch) setInspectedTech(firstMatch);
  };

  const handleTechHover = (tech: TechItem) => {
    setInspectedTech(tech);
    sounds.playHover();
  };

  return (
    <section id="stack" className="py-24 sm:py-36 border-t border-white/[0.08] relative overflow-hidden bg-[#060609]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
            <div>
              <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                Technical Competence & Tools
              </div>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                Stack & Disciplines
              </h2>
            </div>
            <p className="max-w-md font-mono text-xs text-zinc-400 leading-relaxed">
              Automatic kinetic stream of verified production technologies, backend frameworks, relational engines, and platforms.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Navigation Tabs (Horizontally scrollable on mobile) */}
        <ScrollReveal variant="fade-up" delay={50}>
          <div className="mt-10 flex items-center gap-2 font-mono text-xs overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabClick(cat.id)}
                  className={`flex items-center gap-2 shrink-0 rounded-full px-4 py-2 transition-all duration-300 text-xs ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-md shadow-white/10 scale-100"
                      : "bg-white/[0.02] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.2]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      {/* Dynamic Multi-Track Kinetic Carousel Streams (Expanded Full-Bleed Length & Prominent Scale) */}
      <div className="mt-14 space-y-6 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        {/* Side Fade Mask Overlays for infinite edge bleeding */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 md:w-56 bg-gradient-to-r from-[#060609] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 md:w-56 bg-gradient-to-l from-[#060609] to-transparent z-20 pointer-events-none" />

        {/* Track 1: Automatic Continuous Flow Leftward */}
        <div className="overflow-hidden py-2">
          <div className="animate-marquee-left flex gap-4 sm:gap-5">
            {row1.map((tech, idx) => {
              const isInspected = inspectedTech?.name === tech.name;
              return (
                <div
                  key={`r1-${idx}`}
                  onMouseEnter={() => handleTechHover(tech)}
                  onClick={() => {
                    setInspectedTech(tech);
                    sounds.playClick("crisp");
                  }}
                  className={`flex items-center gap-3 sm:gap-4 shrink-0 rounded-full px-5 sm:px-7 py-3 sm:py-4 transition-all duration-300 cursor-pointer select-none group ${
                    isInspected
                      ? "bg-white text-black font-bold shadow-2xl shadow-sky-500/25 scale-105 border border-white"
                      : "border border-white/[0.1] bg-white/[0.03] text-zinc-200 hover:text-white hover:border-white/[0.28] hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`font-mono text-xs px-2 py-0.5 rounded transition-colors font-bold ${
                    isInspected
                      ? "bg-black/15 text-black"
                      : "bg-white/[0.08] text-sky-400 group-hover:bg-sky-500/20"
                  }`}>
                    {tech.iconTag}
                  </span>
                  <span className="text-sm sm:text-base font-semibold tracking-tight whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className={`font-mono text-xs whitespace-nowrap transition-colors ${
                    isInspected ? "text-black/75 font-medium" : "text-zinc-400 group-hover:text-zinc-300"
                  }`}>
                    · {tech.level}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Track 2: Automatic Continuous Flow Rightward */}
        <div className="overflow-hidden py-2">
          <div className="animate-marquee-right flex gap-4 sm:gap-5">
            {row2.map((tech, idx) => {
              const isInspected = inspectedTech?.name === tech.name;
              return (
                <div
                  key={`r2-${idx}`}
                  onMouseEnter={() => handleTechHover(tech)}
                  onClick={() => {
                    setInspectedTech(tech);
                    sounds.playClick("crisp");
                  }}
                  className={`flex items-center gap-3 sm:gap-4 shrink-0 rounded-full px-5 sm:px-7 py-3 sm:py-4 transition-all duration-300 cursor-pointer select-none group ${
                    isInspected
                      ? "bg-white text-black font-bold shadow-2xl shadow-sky-500/25 scale-105 border border-white"
                      : "border border-white/[0.1] bg-white/[0.03] text-zinc-200 hover:text-white hover:border-white/[0.28] hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`font-mono text-xs px-2 py-0.5 rounded transition-colors font-bold ${
                    isInspected
                      ? "bg-black/15 text-black"
                      : "bg-white/[0.08] text-sky-400 group-hover:bg-sky-500/20"
                  }`}>
                    {tech.iconTag}
                  </span>
                  <span className="text-sm sm:text-base font-semibold tracking-tight whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className={`font-mono text-xs whitespace-nowrap transition-colors ${
                    isInspected ? "text-black/75 font-medium" : "text-zinc-400 group-hover:text-zinc-300"
                  }`}>
                    · {tech.level}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Live Active Stack Inspector Strip (Mobile Responsive) */}
        {inspectedTech && (
          <ScrollReveal variant="fade-up" delay={80}>
            <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-zinc-400">
              <div className="flex flex-wrap items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                <span className="text-white font-semibold uppercase tracking-wider text-sm">
                  {inspectedTech.name}
                </span>
                <span className="text-sky-400 border border-sky-500/30 bg-sky-950/40 px-2 py-0.5 rounded text-[11px]">
                  {inspectedTech.level}
                </span>
              </div>
              <div className="text-zinc-300 text-xs sm:text-sm font-sans max-w-xl leading-relaxed">
                {inspectedTech.detail}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
