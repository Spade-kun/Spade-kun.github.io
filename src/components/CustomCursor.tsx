"use client";

import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (typeof window !== "undefined") {
      const touchMatch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      setIsTouchDevice(touchMatch);
      if (touchMatch) return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer");
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth Lerp Animation Loop for fluid trailing physics
    const loop = () => {
      // Ring lags smoothly behind mouse (lerp factor 0.18)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Central Precision Point Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicking
              ? "h-1.5 w-1.5 bg-sky-300 shadow-[0_0_10px_#38bdf8]"
              : isHovered
              ? "h-2 w-2 bg-sky-400 shadow-[0_0_12px_#38bdf8]"
              : "h-2 w-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          }`}
        />
      </div>

      {/* Trailing Fluid Frosted Aura Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
            isHovered
              ? "h-12 w-12 border-sky-400/80 bg-sky-500/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-110"
              : isClicking
              ? "h-7 w-7 border-emerald-400/90 bg-emerald-500/15 scale-90"
              : "h-9 w-9 border-white/25 bg-white/[0.02]"
          }`}
        >
          {/* Subtle crosshair tick marks when hovering interactive targets */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none animate-spin-slow">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-[2px] bg-sky-400/80" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-[2px] bg-sky-400/80" />
              <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-[2px] bg-sky-400/80" />
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-[2px] bg-sky-400/80" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
