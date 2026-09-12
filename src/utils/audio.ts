"use client";

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_muted");
      if (saved !== null) {
        this.isMuted = saved === "true";
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_muted", String(this.isMuted));
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick(type: "soft" | "crisp" | "toggle" = "crisp") {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "crisp") {
        // High-tech tactile click
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === "soft") {
        // Subtle haptic pop
        osc.type = "triangle";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "toggle") {
        // Chime for switches
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.06);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch {
      // Audio playback fails gracefully if not permitted
    }
  }

  public playHover() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.025);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Audio playback fails gracefully if not permitted
    }
  }

  public playConfirm() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      
      // Dual harmonic confirmation chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.type = "sine";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.setValueAtTime(880, now + 0.08); // A5
      osc2.frequency.setValueAtTime(880, now); // A5
      osc2.frequency.setValueAtTime(1174.66, now + 0.08); // D6

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch {
      // Graceful fallback
    }
  }
}

export const sounds = new SoundManager();
