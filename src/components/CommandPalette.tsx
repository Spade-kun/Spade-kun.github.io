"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  Terminal, 
  ArrowRight, 
  FileText, 
  Mail, 
  Copy, 
  Check, 
  Cpu, 
  Bot, 
  User, 
  X,
  Layers
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ReaderTab } from "./ThreeDReaderStage";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchMode: (mode: ReaderTab) => void;
}

interface CommandItem {
  id: string;
  category: "Navigation" | "Perspectives" | "Actions" | "External";
  title: string;
  detail?: string;
  icon: React.ReactNode;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSwitchMode,
}) => {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (hash: string) => {
    onClose();
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contactEmail);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1000);
  };

  const items: CommandItem[] = [
    {
      id: "nav-systems",
      category: "Navigation",
      title: "Jump to Systems & Projects",
      detail: "Dental Clinic, Java Enrollment, Move or Die",
      icon: <Layers className="h-4 w-4 text-sky-400" />,
      perform: () => navigateTo("#systems")
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "Jump to Experience & Journey",
      detail: "Freelance record & BukSU academic background",
      icon: <Terminal className="h-4 w-4 text-indigo-400" />,
      perform: () => navigateTo("#experience")
    },
    {
      id: "nav-stack",
      category: "Navigation",
      title: "Jump to Tech Stack",
      detail: "Next.js, Java, PHP, MySQL, Python",
      icon: <Cpu className="h-4 w-4 text-emerald-400" />,
      perform: () => navigateTo("#stack")
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Jump to Contact",
      detail: "Direct message & social links",
      icon: <Mail className="h-4 w-4 text-amber-400" />,
      perform: () => navigateTo("#contact")
    },
    {
      id: "mode-human",
      category: "Perspectives",
      title: "Switch to People (Human UI)",
      detail: "Standard visual portfolio layout",
      icon: <User className="h-4 w-4 text-zinc-300" />,
      perform: () => {
        onSwitchMode("people");
        onClose();
      }
    },
    {
      id: "mode-schema",
      category: "Perspectives",
      title: "Switch to JSON-LD Schema View",
      detail: "Machine-readable search engine payload",
      icon: <Cpu className="h-4 w-4 text-amber-400" />,
      perform: () => {
        onSwitchMode("search");
        onClose();
      }
    },
    {
      id: "mode-agent",
      category: "Perspectives",
      title: "Switch to Agents View (llms.txt)",
      detail: "Raw markdown representation for AI agents",
      icon: <Bot className="h-4 w-4 text-emerald-400" />,
      perform: () => {
        onSwitchMode("agents");
        onClose();
      }
    },
    {
      id: "act-copy-email",
      category: "Actions",
      title: copied ? "Email Copied to Clipboard!" : "Copy Contact Email",
      detail: PERSONAL_INFO.contactEmail,
      icon: copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-zinc-400" />,
      perform: copyEmail
    },
    {
      id: "act-resume",
      category: "Actions",
      title: "Download Full-Stack Resume (PDF)",
      detail: "Noel_Raterta_Resume_Fullstack.pdf",
      icon: <FileText className="h-4 w-4 text-sky-400" />,
      perform: () => {
        window.open(PERSONAL_INFO.links.resume, "_blank");
        onClose();
      }
    },
    {
      id: "ext-github",
      category: "External",
      title: "Visit GitHub Profile",
      detail: "@Spade-kun repositories & contributions",
      icon: <GithubIcon className="h-4 w-4 text-zinc-300" />,
      perform: () => {
        window.open(PERSONAL_INFO.links.github, "_blank");
        onClose();
      }
    }
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.detail && item.detail.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Modal Dialog */}
      <div 
        className="w-full max-w-xl rounded-2xl border border-white/[0.12] bg-[#0c0c12] shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="flex items-center border-b border-white/[0.08] px-4 py-3 bg-white/[0.02]">
          <Search className="h-4 w-4 text-zinc-400 mr-2 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List (Smooth Scrollable with Lenis override) */}
        <div 
          data-lenis-prevent="true"
          className="max-h-[54vh] sm:max-h-[60vh] overflow-y-auto overscroll-contain p-2.5 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-500"
          onWheel={(e) => e.stopPropagation()}
        >
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 text-xs">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.perform}
                type="button"
                className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left hover:bg-white/[0.08] group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded bg-white/[0.04] border border-white/[0.06]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-zinc-200 group-hover:text-white font-medium text-xs">
                      {item.title}
                    </div>
                    {item.detail && (
                      <div className="text-[11px] text-zinc-500 truncate max-w-sm">
                        {item.detail}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-zinc-500 group-hover:text-sky-300">
                  <span>run</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Bottom Hint Bar */}
        <div className="border-t border-white/[0.08] bg-black/40 px-4 py-2 flex items-center justify-between text-[10px] text-zinc-500">
          <span>Navigation console // Noel Raterta Jr.</span>
          <div className="flex items-center gap-2">
            <span>[ESC] close</span>
            <span>·</span>
            <span>[↵] select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
