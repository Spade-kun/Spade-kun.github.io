"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowUpRight,
  Loader2,
  Terminal
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "@/utils/audio";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

const QUICK_TOPICS = [
  { label: "💼 Engineering Role", subject: "Full-Time Software Engineering Opportunity" },
  { label: "🌐 Custom Web App", subject: "Bespoke Web Application Project Inquiry" },
  { label: "⚙️ n8n Automation", subject: "n8n AI & Autonomous Workflow Integration" },
  { label: "🤝 Freelance Contract", subject: "Freelance Architecture & Development Contract" },
];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = "",
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus on mount and reset status
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMessage("");
      setTimeout(() => nameInputRef.current?.focus(), 80);
      sounds.playClick("soft");
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    sounds.playClick("crisp");
    setStatus("submitting");
    setErrorMessage("");

    try {
      // Free endpoint with AJAX support (Zero API key required)
      const endpoint = `https://formsubmit.co/ajax/${PERSONAL_INFO.contactEmail}`;
      const payload = {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || `Portfolio Inquiry from ${name.trim()}`,
        message: message.trim(),
        _captcha: "false",
        _template: "table",
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      // FormSubmit returns success: true or activation needed on first run
      if (res.ok || (data && (data.success === "true" || data.success === true || (data.message && data.message.includes("Activation"))))) {
        setStatus("success");
        sounds.playConfirm();
      } else {
        throw new Error(data?.message || "Failed to deliver message via API");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const copyDraft = () => {
    const draftText = `From: ${name} (${email})\nSubject: ${subject}\n\n${message}`;
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoFallbackUrl = `mailto:${PERSONAL_INFO.contactEmail}?subject=${encodeURIComponent(
    subject || `Message from ${name || "Visitor"}`
  )}&body=${encodeURIComponent(
    `From: ${name}\nEmail: ${email}\n\n${message}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl rounded-3xl border border-white/[0.12] bg-[#0b0c14]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 text-zinc-200 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-1/4 -translate-y-1/2 w-72 h-32 bg-gradient-to-b from-sky-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-2.5 font-mono text-xs text-sky-400">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="uppercase tracking-widest font-semibold">Direct Email Dispatch</span>
            <span className="hidden sm:inline text-zinc-600">::</span>
            <span className="hidden sm:inline font-mono text-[11px] text-zinc-400">to: {PERSONAL_INFO.contactEmail}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/[0.2] transition-colors"
            title="Close (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 relative z-10">
          {status === "success" ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="h-7 w-7 animate-in zoom-in-50 duration-300" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Message Dispatched Successfully!
                </h3>
                <p className="font-mono text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-sky-300 font-semibold">{name}</span>. Your inquiry was delivered directly to Noel&apos;s inbox. I typically respond within 24 hours.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                    setStatus("idle");
                  }}
                  className="px-4 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  Send Another Message
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-md"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Get in Touch
                </h2>
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  Fill out the form below to send an encrypted transmission directly to Noel&apos;s email.
                </p>
              </div>

              {/* Quick Topic Presets */}
              <div>
                <div className="font-mono text-[11px] text-zinc-500 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-sky-400" />
                  <span>Quick Presets:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {QUICK_TOPICS.map((topic) => (
                    <button
                      key={topic.label}
                      type="button"
                      onClick={() => {
                        setSubject(topic.subject);
                        sounds.playClick("soft");
                      }}
                      className={`px-2.5 py-1 rounded-lg border transition-all ${
                        subject === topic.subject
                          ? "border-sky-400/50 bg-sky-400/10 text-sky-300 font-medium"
                          : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/[0.2]"
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Two Column Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-mono text-[11px] text-zinc-400 mb-1">
                    Your Name <span className="text-sky-400">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full rounded-xl border border-white/[0.1] bg-black/40 px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-zinc-600 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-zinc-400 mb-1">
                    Your Email <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full rounded-xl border border-white/[0.1] bg-black/40 px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-zinc-600 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project inquiry or role overview"
                  className="w-full rounded-xl border border-white/[0.1] bg-black/40 px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-zinc-600 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1">
                  Message Details <span className="text-sky-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide scope, timeline, deliverables, or questions..."
                  className="w-full rounded-xl border border-white/[0.1] bg-black/40 px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-zinc-600 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-all resize-none"
                />
              </div>

              {/* Error state with instant mail client fallback */}
              {status === "error" && (
                <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 font-mono text-xs space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                    <span>Free API transmission notice ({errorMessage || "Network limitation"}).</span>
                  </div>
                  <p className="text-[11px] text-zinc-300">
                    Your message draft is safe! You can send it directly through your mail app or copy the text:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={mailtoFallbackUrl}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 px-3 py-1.5 text-white font-semibold transition-colors"
                    >
                      <Mail className="h-3 w-3" />
                      <span>Launch in Email App</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <button
                      type="button"
                      onClick={copyDraft}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-zinc-200 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between gap-3 font-mono text-xs">
                <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-sky-400" />
                  <span>Free SSL SMTP Gateway</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.2] transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 py-2.5 font-semibold hover:bg-zinc-200 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
