"use client";

import React, { useEffect, useRef, useState } from "react";

interface Stardust {
  x: number;
  y: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  waveSpeed: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Dense stardust wave simulation (matching the user's favorite particle screenshot)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for subtle particle dispersion
    let mouseX = -1000;
    let mouseY = -1000;
    const onCanvasMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onCanvasMouseMove, { passive: true });

    // Generate 420 crisp stardust particles spread across the entire viewport
    const count = Math.min(450, Math.floor((w * h) / 3800));
    const particles: Stardust[] = [];

    for (let i = 0; i < count; i++) {
      const startY = Math.random() * h;
      particles.push({
        x: Math.random() * w,
        y: startY,
        originY: startY,
        vx: (Math.random() - 0.25) * 0.45 + 0.1, // gentle drifting
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() < 0.85 ? Math.random() * 1.5 + 0.6 : Math.random() * 2.4 + 1.2,
        alpha: Math.random() * 0.65 + 0.2,
        phase: Math.random() * Math.PI * 2,
        waveSpeed: Math.random() * 0.018 + 0.006
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.phase += p.waveSpeed;
        p.x += p.vx;
        p.y = p.originY + Math.sin(p.phase) * 8;

        // Wrap around smoothly
        if (p.x > w) p.x = 0;
        if (p.x < 0) p.x = w;
        if (p.originY > h) p.originY = 0;
        if (p.originY < 0) p.originY = h;

        // Interactive mouse dispersion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 1.5;
          p.originY += (dy / dist) * force * 1.5;
        }

        // Draw crisp stardust particle
        const pulse = 0.75 + 0.25 * Math.sin(p.phase * 1.5);
        ctx.fillStyle = `rgba(235, 245, 255, ${p.alpha * pulse})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onCanvasMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Precision Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 30%, #000 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 30%, #000 55%, transparent 100%)"
        }}
      />

      {/* Persistent Dense Stardust Wave Particle Canvas across all sections */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-85" />

      {/* Floating Ambient Glowing Nebulas */}
      <div className="absolute -top-[15%] left-[8%] w-[600px] h-[600px] rounded-full bg-sky-500/[0.045] blur-[130px] animate-pulse-subtle" />
      <div className="absolute top-[30%] -right-[8%] w-[550px] h-[550px] rounded-full bg-indigo-500/[0.04] blur-[140px]" />
      <div className="absolute top-[60%] left-[3%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />
      <div className="absolute top-[85%] right-[10%] w-[450px] h-[450px] rounded-full bg-sky-500/[0.035] blur-[140px]" />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, rgba(99, 102, 241, 0.02) 35%, transparent 70%)",
        }}
      />
    </div>
  );
};
