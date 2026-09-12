"use client";

import React, { useState } from "react";
import { User, Cpu, Bot, Check, Copy, Sparkles } from "lucide-react";
import { JSON_LD_SCHEMA, LLMS_TXT } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";

export type ReaderMode = "human" | "search" | "agent";

interface ReaderSwitcherProps {
  currentMode: ReaderMode;
  onModeChange: (mode: ReaderMode) => void;
}

export const ReaderSwitcher: React.FC<ReaderSwitcherProps> = ({
  currentMode,
  onModeChange
}) => {
  const [copied, setCopied] = useState(false);

  const handleModeSelect = (mode: ReaderMode) => {
    sounds.playClick("toggle");
    onModeChange(mode);
  };

  const handleCopyPayload = () => {
    sounds.playClick("soft");
    const payload = currentMode === "search" 
      ? JSON.stringify(JSON_LD_SCHEMA, null, 2) 
      : LLMS_TXT;
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-b border-white/[0.08] bg-[#09090d]/60 backdrop-blur-md py-12 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              One Site. Every Reader.
            </div>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Choose your perspective
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-xl">
              Switch how this portfolio renders: for human eyes, search engine indexing, or autonomous LLM agents.
            </p>
          </div>

          {/* Perspective Buttons */}
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.12] bg-black/60 p-1.5 font-mono text-xs shadow-inner">
            <button
              onClick={() => handleModeSelect("human")}
              type="button"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition-all ${
                currentMode === "human"
                  ? "bg-white/[0.14] text-white shadow-md font-medium border border-white/[0.1]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Human UI</span>
            </button>

            <button
              onClick={() => handleModeSelect("search")}
              type="button"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition-all ${
                currentMode === "search"
                  ? "bg-white/[0.14] text-white shadow-md font-medium border border-white/[0.1]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Cpu className="h-3.5 w-3.5 text-amber-400" />
              <span>Schema (JSON-LD)</span>
            </button>

            <button
              onClick={() => handleModeSelect("agent")}
              type="button"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition-all ${
                currentMode === "agent"
                  ? "bg-white/[0.14] text-white shadow-md font-medium border border-white/[0.1]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Bot className="h-3.5 w-3.5 text-emerald-400" />
              <span>Agent (llms.txt)</span>
            </button>
          </div>
        </div>

        {/* Machine Mode Viewer if not human */}
        {currentMode !== "human" && (
          <div className="mt-8 rounded-2xl border border-white/[0.14] bg-[#050508]/90 p-6 shadow-2xl transition-all animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 mb-4 font-mono text-xs">
              <div className="flex items-center gap-2.5 text-zinc-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium">
                  {currentMode === "search" ? "application/ld+json — Structured Data" : "text/markdown — llms.txt standard"}
                </span>
              </div>
              <button
                onClick={handleCopyPayload}
                type="button"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied payload</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Raw</span>
                  </>
                )}
              </button>
            </div>

            <pre className="max-h-96 overflow-x-auto overflow-y-auto text-xs font-mono leading-relaxed text-zinc-300 p-2 selection:bg-sky-500/30">
              <code>
                {currentMode === "search"
                  ? JSON.stringify(JSON_LD_SCHEMA, null, 2)
                  : LLMS_TXT}
              </code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
