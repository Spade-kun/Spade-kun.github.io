"use client";

import React, { useState } from "react";
import { Mail, ArrowUpRight, Copy, Check, FileText } from "lucide-react";
import { GithubIcon, FacebookIcon, InstagramIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";

interface FooterProps {
  onOpenContactModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContactModal }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    sounds.playClick("soft");
    navigator.clipboard.writeText(PERSONAL_INFO.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenContact = () => {
    sounds.playClick("crisp");
    if (onOpenContactModal) {
      onOpenContactModal();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-contact-modal"));
    }
  };

  return (
    <footer id="contact" className="border-t border-white/[0.08] bg-[#060608] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Contact Hero CTA */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-12 mb-16">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Initiate Contact
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Let&apos;s engineer something deliberate together.
            </h2>
            <p className="mt-3 text-sm text-zinc-400 font-normal leading-relaxed">
              Seeking full-time software engineering roles, technical internships, or selective freelance contracts. Have a project specification or role in mind?
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={handleOpenContact}
                className="flex items-center gap-2 rounded-md bg-white text-black px-4 py-2.5 font-medium hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Send Direct Email</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={copyEmail}
                type="button"
                className="flex items-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-zinc-300 hover:border-white/[0.24] hover:bg-white/[0.08] hover:text-white transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Copy: {PERSONAL_INFO.contactEmail}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/[0.08] pt-8 font-mono text-xs text-zinc-400">
          <div className="md:col-span-5 space-y-1">
            <div className="text-zinc-200 font-semibold text-sm">
              {PERSONAL_INFO.name} ({PERSONAL_INFO.handle})
            </div>
            <div className="text-zinc-500">
              Full-Stack Developer · Bukidnon State University
            </div>
          </div>

          <div className="md:col-span-7 flex flex-wrap items-center md:justify-end gap-2.5 sm:gap-3">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.02] px-3.5 py-2 text-zinc-300 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.06] transition-all shadow-sm group"
            >
              <GithubIcon className="h-4 w-4 text-zinc-300 group-hover:text-white transition-colors" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.02] px-3.5 py-2 text-zinc-300 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.06] transition-all shadow-sm group"
            >
              <FacebookIcon className="h-4 w-4 text-[#1877F2] group-hover:scale-110 transition-transform" />
              <span>Facebook</span>
            </a>
            <a
              href={PERSONAL_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.02] px-3.5 py-2 text-zinc-300 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.06] transition-all shadow-sm group"
            >
              <InstagramIcon className="h-4 w-4 text-[#E4405F] group-hover:scale-110 transition-transform" />
              <span>Instagram</span>
            </a>
            <a
              href={PERSONAL_INFO.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.02] px-3.5 py-2 text-zinc-300 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.06] transition-all shadow-sm group"
            >
              <FileText className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
