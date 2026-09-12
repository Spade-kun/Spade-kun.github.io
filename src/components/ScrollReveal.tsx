"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "smooth-pop" | "3d-card" | "scale-spring" | "fade-up" | "pop-up";
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  variant = "3d-card",
  threshold = 0.12
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch (variant) {
      case "pop-up":
        return "translateY(28px) scale(0.95)";
      case "3d-card":
        // Apple / Awwwards physical card floating into place
        return "perspective(1000px) rotateX(10deg) translateY(38px) scale(0.96)";
      case "scale-spring":
        return "scale(0.92) translateY(28px)";
      case "fade-up":
        return "translateY(32px)";
      case "smooth-pop":
      default:
        return "perspective(800px) translateY(32px) scale(0.97)";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isVisible ? "perspective(1000px) rotateX(0deg) translateY(0) scale(1)" : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
        transitionProperty: "opacity, transform",
        transitionDuration: "850ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity",
        transformStyle: "preserve-3d"
      }}
      className={className}
    >
      {children}
    </div>
  );
};
