"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { sounds } from "@/utils/audio";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

      setScrollProgress(progress);
      setIsVisible(scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    sounds.playClick("crisp");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // SVG circular progress parameters
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={handleScrollToTop}
        className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#0b0c14]/90 backdrop-blur-xl shadow-2xl shadow-black/90 transition-all duration-300 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:-translate-y-1 cursor-pointer"
        aria-label="Scroll back to top"
        title="Back to top"
      >
        {/* Circular Progress Ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          {/* Subtle Track Ring */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-white/[0.14]"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Dynamic Progress Fill */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-sky-400 transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Arrow Icon with Hover Bounce */}
        <ArrowUp className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-zinc-300 transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};
