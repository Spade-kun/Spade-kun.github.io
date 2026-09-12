"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
}

export const ParticleCloud: React.FC<{ className?: string; height?: number }> = ({
  className = "",
  height = 360
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = height);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for subtle interactive swirl
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Generate 850 stardust particles concentrated along the central horizontal meridian
    const count = Math.min(850, Math.floor(width * 0.7));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      // Gaussian-like concentration towards the center vertical axis
      const u1 = Math.random();
      const u2 = Math.random();
      const randNorm = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const centerY = h * 0.45 + randNorm * (h * 0.22);

      particles.push({
        x: Math.random() * width,
        y: centerY,
        originY: centerY,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() < 0.85 ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.65 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005
      });
    }

    let time = 0;
    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wave oscillation
        p.phase += p.speed;
        p.x += p.vx + Math.sin(p.phase) * 0.2;
        p.y = p.originY + Math.cos(p.phase * 0.8) * 12;

        // Wrap around horizontally
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Mouse interaction: subtle gentle drift away from cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;
        }

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * (0.8 + 0.2 * Math.sin(p.phase))})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [height]);

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
