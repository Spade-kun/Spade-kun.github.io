"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Clock, Volume2, VolumeX } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette }) => {
  const [phTime, setPhTime] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Track scroll position to reduce opacity and apply frosted blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMuted(sounds.getMuted());
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(now);
        setPhTime(`${formatted} PH`);
      } catch {
        setPhTime("PH (UTC+8)");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick("toggle");
  };

  const handleOpenConsole = () => {
    sounds.playClick("crisp");
    onOpenCommandPalette();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    sounds.playClick("soft");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${
        isScrolled
          ? "border-b border-white/[0.1] bg-[#060608]/70 backdrop-blur-2xl shadow-2xl shadow-black/80"
          : "border-b border-white/[0.04] bg-[#060608]/30 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Left: Single-line brand identity & spacious status badge */}
        <div className="flex items-center gap-3 sm:gap-8 whitespace-nowrap shrink-0">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="group flex items-center gap-2.5 sm:gap-3 font-mono text-sm sm:text-[15px] tracking-tight text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse-subtle shrink-0" />
            <span className="font-semibold text-white tracking-normal whitespace-nowrap">noelraterta.dev</span>
            <span className="hidden sm:inline text-zinc-600 whitespace-nowrap">/</span>
            <span className="hidden sm:inline text-zinc-400 font-normal whitespace-nowrap">{PERSONAL_INFO.handle}</span>
          </a>

          {/* Clean status badge with dedicated right margin spacing */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-xs font-mono text-zinc-400 hover:border-white/[0.16] transition-colors whitespace-nowrap shrink-0 mr-4 lg:mr-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-emerald-400 font-medium whitespace-nowrap">open to roles</span>
            <span className="text-zinc-600">·</span>
            <Clock className="h-3 w-3 text-zinc-500 shrink-0" />
            <span className="whitespace-nowrap">{phTime || "UTC+8"}</span>
          </div>
        </div>

        {/* Right: Navigation, Audio & Clean Console Button */}
        <div className="flex items-center gap-2.5 sm:gap-8 ml-auto pl-2 sm:pl-8 whitespace-nowrap shrink-0">
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-mono text-zinc-400 whitespace-nowrap shrink-0">
            <a 
              href="#deployments" 
              onClick={(e) => handleNavClick(e, "deployments")}
              className="py-1 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              [deployments]
            </a>
            <a 
              href="#systems" 
              onClick={(e) => handleNavClick(e, "systems")}
              className="py-1 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              [systems]
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, "about")}
              className="py-1 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              [about]
            </a>
            <a 
              href="#stack" 
              onClick={(e) => handleNavClick(e, "stack")}
              className="py-1 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              [stack]
            </a>
            <a 
              href="#experience" 
              onClick={(e) => handleNavClick(e, "experience")}
              className="py-1 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              [journey]
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, "contact")}
              className="py-1 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              [contact]
            </a>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              type="button"
              className="flex items-center justify-center h-9 w-9 rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.22] hover:text-white transition-all shrink-0"
              title={isMuted ? "Unmute UI sound effects" : "Mute UI sound effects"}
              aria-label="Toggle UI sounds"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-zinc-500" />
              ) : (
                <Volume2 className="h-4 w-4 text-sky-400" />
              )}
            </button>

            {/* Console Button */}
            <button
              onClick={handleOpenConsole}
              type="button"
              className="flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3.5 py-1.5 text-xs sm:text-sm font-mono text-zinc-300 hover:border-white/[0.28] hover:bg-white/[0.08] hover:text-white transition-all shadow-sm shrink-0"
              aria-label="Open command console"
            >
              <Terminal className="h-3.5 w-3.5 text-sky-400" />
              <span className="font-medium">Console</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
