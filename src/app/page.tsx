"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ThreeDReaderStage, ReaderTab } from "@/components/ThreeDReaderStage";
import { SignalDivider } from "@/components/SignalDivider";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ScrollSpotlightPrinciples } from "@/components/ScrollSpotlightPrinciples";
import { ExpandingProfileCard } from "@/components/ExpandingProfileCard";
import { TechStackCarousel } from "@/components/TechStackCarousel";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { TelemetryDock } from "@/components/TelemetryDock";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CustomCursor } from "@/components/CustomCursor";
import { IntroLoader } from "@/components/IntroLoader";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [readerTab, setReaderTab] = useState<ReaderTab>("people");

  React.useEffect(() => {
    const handleOpenContact = () => setContactModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpenContact);
    return () => window.removeEventListener("open-contact-modal", handleOpenContact);
  }, []);

  return (
    <SmoothScrollProvider>
      {/* Cinematic Intro Loading Screen */}
      <IntroLoader />

      {/* Smooth Fluid Custom Precision Cursor */}
      <CustomCursor />

      {/* Floating Scroll To Top Arrow Button */}
      <ScrollToTopButton />

      <div className="relative min-h-screen bg-[#060608] text-[#ededf0] selection:bg-sky-500/20 selection:text-white overflow-x-clip">
        {/* Ambient Stardust Wave Background, Blueprint Grid & Cursor Glow */}
        <AnimatedBackground />

        {/* Top fixed minimalist navigation */}
        <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        <main className="relative z-10 pt-20">
          {/* Editorial Hero headline & Picture1 portrait card */}
          <ScrollReveal delay={50}>
            <Hero />
          </ScrollReveal>

          {/* 3D Tilted Perspective Reader Stage */}
          <ScrollReveal delay={100}>
            <ThreeDReaderStage 
              currentTab={readerTab} 
              onTabChange={setReaderTab} 
            />
          </ScrollReveal>

          {/* Particle Cloud Signal Divider */}
          <ScrollReveal delay={50}>
            <SignalDivider />
          </ScrollReveal>

          {/* Selected Systems & Deployed Commercial Works (Cinematic Split Directory & 3D Stage) */}
          <ProjectShowcase />

          {/* Particle Cloud Signal Divider: Engineering Philosophy */}
          <ScrollReveal delay={50}>
            <SignalDivider 
              tags={["ACID Guarantees", "Zero-Latency SSR", "Strict Type Contracts", "Production Resilience"]}
              ctaText="Inspect systems & principles"
              ctaHref="#systems"
              cloudHeight={160}
            />
          </ScrollReveal>

          {/* Scroll-Driven Spotlight Principles (Core Systems Architecture) */}
          <ScrollReveal variant="3d-card" delay={60}>
            <div id="systems" className="scroll-mt-24">
              <ScrollSpotlightPrinciples />
            </div>
          </ScrollReveal>

          {/* Expanding Profile Bento Card ("Hey — I'm Noel") */}
          <ScrollReveal variant="scale-spring" delay={50}>
            <ExpandingProfileCard onOpenContactModal={() => setContactModalOpen(true)} />
          </ScrollReveal>

          {/* Stack & Disciplines: Dynamic Kinetic Stream (Placed BEFORE Experience, No Card Containers) */}
          <TechStackCarousel />

          {/* Particle Cloud Signal Divider: Experience & Credentials */}
          <ScrollReveal delay={50}>
            <SignalDivider 
              tags={["Verified Experience", "Client Intakes", "Academic Foundation", "Download CV"]}
              ctaText="View credentials"
              ctaHref="#experience"
              cloudHeight={160}
            />
          </ScrollReveal>

          {/* Experience & Academic Foundation (Editorial Wireframe with Animated Horizontal Laser Lines) */}
          <ExperienceTimeline />
        </main>

        {/* Real-time client-side Core Web Vitals telemetry dock */}
        <ScrollReveal variant="fade-up" delay={50}>
          <TelemetryDock />
        </ScrollReveal>

        {/* Footer & Contact */}
        <ScrollReveal variant="fade-up" delay={60}>
          <Footer onOpenContactModal={() => setContactModalOpen(true)} />
        </ScrollReveal>

        {/* Direct Email Transmission Pop-Up Modal */}
        <ContactModal 
          isOpen={contactModalOpen} 
          onClose={() => setContactModalOpen(false)} 
        />

        {/* ⌘K / Ctrl+K interactive command palette */}
        <CommandPalette 
          isOpen={commandPaletteOpen} 
          onClose={() => setCommandPaletteOpen(false)} 
          onSwitchMode={setReaderTab}
        />
      </div>
    </SmoothScrollProvider>
  );
}
