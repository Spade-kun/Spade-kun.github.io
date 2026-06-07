/**
 * interactions.js — Awwwards-Level Interactions v2
 * Fixes: split-text hero name, adds canvas particles + per-section backgrounds
 */

// ─── 1. MAGNETIC CURSOR ─────────────────────────────────────────
class MagneticCursor {
  constructor() {
    this.dotX = -200; this.dotY = -200;
    this.ringX = -200; this.ringY = -200;
    if (window.matchMedia('(max-width: 1024px)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    this.create();
    this.bind();
  }
  create() {
    document.body.classList.add('custom-cursor-active');
    this.dot = Object.assign(document.createElement('div'), { className: 'mc-dot' });
    this.ring = Object.assign(document.createElement('div'), { className: 'mc-ring' });
    this.label = Object.assign(document.createElement('span'), { className: 'mc-ring-label' });
    this.ring.appendChild(this.label);
    document.body.append(this.ring, this.dot);
  }
  bind() {
    window.addEventListener('mousemove', e => { this.dotX = e.clientX; this.dotY = e.clientY; });
    document.addEventListener('mouseover', e => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        this.label.textContent = el.dataset.cursor || '';
        this.dot.classList.add('mc-dot--active');
        this.ring.classList.add('mc-ring--active');
      } else if (e.target.closest('a, button, input, textarea, select')) {
        this.label.textContent = '';
        this.dot.classList.add('mc-dot--hover');
        this.ring.classList.add('mc-ring--hover');
      }
    });
    document.addEventListener('mouseout', () => {
      this.label.textContent = '';
      ['mc-dot--hover','mc-dot--active'].forEach(c => this.dot.classList.remove(c));
      ['mc-ring--hover','mc-ring--active'].forEach(c => this.ring.classList.remove(c));
    });
    const tick = () => {
      this.dot.style.transform = `translate(${this.dotX - 5}px,${this.dotY - 5}px)`;
      this.ringX += (this.dotX - this.ringX) * 0.13;
      this.ringY += (this.dotY - this.ringY) * 0.13;
      this.ring.style.transform = `translate(${this.ringX - 20}px,${this.ringY - 20}px)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

// ─── 2. 3D CARD TILT ────────────────────────────────────────────
class CardTilt {
  constructor(selector, maxDeg = 10) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll(selector).forEach(card => {
      card.style.willChange = 'transform';
      card.addEventListener('mouseenter', () => {
        this.addShimmer(card);
        card.style.transition = 'transform 0.08s linear, box-shadow 0.2s ease';
      });
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * maxDeg;
        const ry = -((e.clientX - r.left - r.width / 2) / (r.width / 2)) * maxDeg;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015) translateY(-2px)`;
        card.style.boxShadow = '0 30px 70px rgba(0,0,0,0.45), 0 0 60px rgba(99,102,241,0.18)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease';
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }
  addShimmer(card) {
    const s = Object.assign(document.createElement('span'), { className: 'card-shimmer-el' });
    card.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
}

// ─── 3. SKILL NEIGHBOR DIMMING ──────────────────────────────────
class SkillNeighborDim {
  constructor() {
    const cards = document.querySelectorAll('.skill-category');
    if (!cards.length) return;
    cards.forEach(c => {
      c.style.transition = 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.3s ease, box-shadow 0.3s ease';
      c.addEventListener('mouseenter', () => cards.forEach(x => {
        if (x !== c) { x.style.opacity = '0.28'; x.style.filter = 'saturate(0.4)'; x.style.transform = 'scale(0.97)'; }
        else { x.style.opacity = '1'; x.style.filter = ''; }
      }));
      c.addEventListener('mouseleave', () => cards.forEach(x => {
        x.style.opacity = ''; x.style.filter = ''; x.style.transform = '';
      }));
    });
  }
}

// ─── 4. HERO NAME GLITCH ────────────────────────────────────────
class HeroGlitch {
  constructor() {
    // Apply after split-text animation completes (delay = name chars delay + animation duration)
    setTimeout(() => {
      const el = document.querySelector('.hero-title .accent-text');
      if (el) el.classList.add('glitch-text');
    }, 3000);
  }
}

// ─── 5. SPLIT TEXT REVEAL ───────────────────────────────────────
//  KEY FIX: Element nodes (e.g. .accent-text) are treated as a
//  SINGLE unit — not split char-by-char — so gradient CSS is intact.
class SplitTextReveal {
  constructor(selector, delay = 0.1, stagger = 0.04) {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll(selector).forEach(el => this.split(el, delay, stagger));
  }

  split(el, delay, stagger) {
    // 1. Cancel the element's own CSS animation (we replace it)
    el.style.animation = 'none';
    el.style.opacity = '1';
    el.setAttribute('aria-label', el.textContent.trim());

    let charIdx = 0;

    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        node.textContent.split('').forEach(char => {
          if (/\s/.test(char)) {
            frag.appendChild(document.createTextNode(char));
            return;
          }
          const unit = document.createElement('span');
          unit.className = 'split-unit';
          unit.setAttribute('aria-hidden', 'true');
          const inner = document.createElement('span');
          inner.className = 'split-char';
          inner.textContent = char;
          inner.style.animationDelay = `${delay + charIdx * stagger}s`;
          charIdx++;
          unit.appendChild(inner);
          frag.appendChild(unit);
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Treat the ENTIRE element as one animated unit (preserves gradients, etc.)
        const unit = document.createElement('span');
        unit.className = 'split-unit';
        unit.setAttribute('aria-hidden', 'true');
        // Insert unit before node, then move node inside unit
        node.parentNode.insertBefore(unit, node);
        unit.appendChild(node);
        // Animate the element itself (not its chars)
        node.style.display = 'inline-block';
        node.style.animation = `split-rise 0.85s cubic-bezier(0.22,1,0.36,1) ${delay + charIdx * stagger}s both`;
        // Advance charIdx by the text length for proper stagger offset
        charIdx += node.textContent.length;
      }
    };

    Array.from(el.childNodes).forEach(node => processNode(node));
  }
}

// ─── 6. SCROLL PROGRESS ─────────────────────────────────────────
class ScrollProgress {
  constructor() {
    this.bar = Object.assign(document.createElement('div'), { className: 'scroll-progress-bar' });
    document.body.appendChild(this.bar);
    this.ring = this.createRing();
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        this.update();
        ticking = false;
      });
    }, { passive: true });
    this.update();
  }
  createRing() {
    const wrap = Object.assign(document.createElement('div'), { className: 'scroll-progress-ring-wrap' });
    const C = 2 * Math.PI * 40;
    wrap.innerHTML = `
      <svg viewBox="0 0 100 100" class="scroll-progress-ring-svg" aria-hidden="true">
        <defs><linearGradient id="spGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#8b5cf6"/>
        </linearGradient></defs>
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="2"/>
        <circle class="sp-arc" cx="50" cy="50" r="40" fill="none" stroke="url(#spGrad)"
          stroke-width="3" stroke-linecap="round"
          stroke-dasharray="${C}" stroke-dashoffset="${C}"
          transform="rotate(-90 50 50)"/>
      </svg>
      <span class="scroll-progress-pct">0</span>`;
    this.arc = wrap.querySelector('.sp-arc');
    this.pct = wrap.querySelector('.scroll-progress-pct');
    document.body.appendChild(wrap);
    return wrap;
  }
  update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const r = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    this.bar.style.transform = `scaleX(${r})`;
    this.arc.setAttribute('stroke-dashoffset', 2 * Math.PI * 40 * (1 - r));
    this.pct.textContent = Math.round(r * 100);
  }
}

// ─── 7. NAV SLIDING UNDERLINE ───────────────────────────────────
class NavSlider {
  constructor() {
    this.menu = document.getElementById('navMenu');
    if (!this.menu) return;
    this.indicator = Object.assign(document.createElement('span'), { className: 'nav-slider-indicator' });
    this.menu.style.position = 'relative';
    this.menu.appendChild(this.indicator);
    this.links = document.querySelectorAll('.nav-link');
    this.moveToActive();
    this.links.forEach(l => {
      l.addEventListener('click', () => setTimeout(() => this.moveTo(l), 10));
      l.addEventListener('mouseenter', () => this.moveTo(l));
      l.addEventListener('mouseleave', () => this.moveToActive());
    });
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        this.moveToActive();
        ticking = false;
      });
    }, { passive: true });
    window.addEventListener('resize', () => this.moveToActive(), { passive: true });
  }
  getActive() { return document.querySelector('.nav-link.active') || this.links[0]; }
  moveTo(link) {
    if (!link) return;
    const mr = this.menu.getBoundingClientRect(), lr = link.getBoundingClientRect();
    this.indicator.style.width = `${lr.width}px`;
    this.indicator.style.left = `${lr.left - mr.left}px`;
    this.indicator.style.opacity = '1';
  }
  moveToActive() { this.moveTo(this.getActive()); }
}

// ─── 8. MAGNETIC BUTTONS ────────────────────────────────────────
class MagneticButtons {
  constructor(selector = '.btn, .nav-link') {
    if (window.matchMedia('(max-width: 1024px)').matches) return;
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.28;
        const dy = (e.clientY - r.top - r.height / 2) * 0.28;
        el.style.transform = `translate(${dx}px,${dy}px)`;
      });
      el.addEventListener('mouseleave', () => el.style.transform = '');
    });
  }
}

// ─── 9. STAGGER REVEAL ──────────────────────────────────────────
class StaggerReveal {
  constructor() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('.skill-category, .project-card, .certification-card, .timeline-item, .stat, .section-header, .live-preview-card');
    if (!targets.length) return;
    targets.forEach(el => {
      el.classList.add('stagger-reveal');
      const sibs = Array.from(el.parentElement.querySelectorAll('.stagger-reveal'));
      el.style.transitionDelay = `${sibs.indexOf(el) * 0.07}s`;
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('stagger-reveal--visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => obs.observe(el));
  }
}

// ─── 10. HERO CANVAS PARTICLES ──────────────────────────────────
class HeroParticles {
  constructor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'hero-particles-canvas';
    hero.querySelector('.hero-background').appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.mouse = { x: -1000, y: -1000 };
    this.particles = [];
    this.running = true;

    this.resize();
    this.spawn();
    window.addEventListener('resize', () => { this.resize(); this.spawn(); }, { passive: true });
    window.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      this.running = document.visibilityState === 'visible';
      if (this.running) this.loop();
    });
    this.loop();
  }

  resize() {
    const hero = this.canvas.parentElement.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.W = hero.offsetWidth;
    this.H = hero.offsetHeight;
    this.canvas.width = Math.floor(this.W * dpr);
    this.canvas.height = Math.floor(this.H * dpr);
    this.canvas.style.width = `${this.W}px`;
    this.canvas.style.height = `${this.H}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  spawn() {
    const count = Math.min(Math.floor((this.W * this.H) / 16000), 42);
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.55 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));
  }

  loop() {
    if (!this.running) return;
    const { ctx, W, H } = this;
    ctx.clearRect(0, 0, W, H);

    this.particles.forEach((p, i) => {
      p.pulse += 0.018;

      // Mouse repulsion
      const dx = p.x - this.mouse.x, dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        const safeDist = Math.max(dist, 1);
        p.vx += (dx / safeDist) * 0.12;
        p.vy += (dy / safeDist) * 0.12;
      }

      p.vx *= 0.993; p.vy *= 0.993;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

      // Particle glow
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grd.addColorStop(0, `rgba(99,102,241,${alpha})`);
      grd.addColorStop(1, `rgba(99,102,241,0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Solid core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,92,246,${alpha})`;
      ctx.fill();

      // Connection lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const q = this.particles[j];
        const ddx = p.x - q.x, ddy = p.y - q.y;
        const d = Math.sqrt(ddx * ddx + ddy * ddy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 130) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(() => this.loop());
  }
}

// ─── 11. PER-SECTION BACKGROUND ANIMATIONS ──────────────────────
class SectionBackgrounds {
  constructor() {
    this.setup('#about',         'about');
    this.setup('#skills',        'skills');
    this.setup('#projects',      'projects');
    this.setup('#live-preview',  'live-preview');
    this.setup('#experience',    'experience');
    this.setup('#certifications','certs');
    this.setup('#contact',       'contact');
  }

  setup(selector, key) {
    const section = document.querySelector(selector);
    if (!section) return;
    section.style.position = 'relative';
    section.style.overflow = 'hidden';

    const bg = document.createElement('div');
    bg.className = `section-bg section-bg--${key}`;
    bg.setAttribute('aria-hidden', 'true');

    // Different ornament counts per section
    const counts = { about:3, skills:4, projects:3, 'live-preview':2, experience:3, certs:5, contact:3 };
    const n = counts[key] || 3;
    for (let i = 0; i < n; i++) {
      const orb = document.createElement('div');
      orb.className = `bg-orb bg-orb-${i + 1}`;
      bg.appendChild(orb);
    }

    // Skills: floating code tokens
    if (key === 'skills') {
      ['{ }', '</>', '( )', '#!', '01', '/*', '**', '=='].forEach((tok, i) => {
        const t = document.createElement('span');
        t.className = 'bg-code-token';
        t.textContent = tok;
        t.style.setProperty('--i', i);
        bg.appendChild(t);
      });
    }

    // Experience: decorative wave SVG
    if (key === 'experience') {
      const wave = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      wave.setAttribute('viewBox', '0 0 1440 180');
      wave.setAttribute('preserveAspectRatio', 'none');
      wave.classList.add('bg-wave');
      wave.innerHTML = `
        <path d="M0,90 C240,160 480,20 720,90 C960,160 1200,20 1440,90 L1440,180 L0,180 Z" 
              fill="rgba(99,102,241,0.04)"/>
        <path d="M0,120 C360,60 720,160 1080,100 C1260,70 1380,130 1440,110 L1440,180 L0,180 Z" 
              fill="rgba(139,92,246,0.04)"/>`;
      bg.appendChild(wave);
    }

    // Contact: animated grid dots
    if (key === 'contact') {
      const grid = document.createElement('div');
      grid.className = 'bg-dot-grid';
      bg.appendChild(grid);
    }

    section.insertAdjacentElement('afterbegin', bg);
  }
}

// ─── 12. PROFILE IMAGE 3D TILT ──────────────────────────────────
class ProfileTilt {
  constructor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const wrap = document.querySelector('.image-wrapper');
    if (!wrap) return;
    wrap.style.transformStyle = 'preserve-3d';
    wrap.style.transition = 'transform 0.08s linear';

    const section = document.querySelector('#about');
    if (!section) return;

    section.addEventListener('mousemove', e => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2) * 3;
      const dy = -(e.clientY - cy) / (r.height / 2) * 3;
      wrap.style.transform = `perspective(800px) rotateY(${dx}deg) rotateX(${dy}deg) scale(1.01)`;
    });

    section.addEventListener('mouseleave', () => {
      wrap.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
      wrap.style.transform = '';
      setTimeout(() => wrap.style.transition = 'transform 0.08s linear', 700);
    });
  }
}

// ─── 13. STAT NUMBER COUNT-UP ───────────────────────────────────
class StatCountUp {
  constructor() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const num = parseInt(raw.replace(/\D/g,''), 10);
        const suffix = raw.replace(/[\d]/g,'');
        if (isNaN(num)) return;
        obs.unobserve(el);
        this.count(el, num, suffix);
      });
    }, { threshold: 0.5 });
    stats.forEach(s => obs.observe(s));
  }
  count(el, target, suffix) {
    let start = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = start + suffix;
      if (start >= target) clearInterval(timer);
    }, 20);
  }
}

// ─── 14. PROJECT HOVER PREVIEW ──────────────────────────────────
class ProjectHoverPreview {
  constructor() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length || window.matchMedia('(max-width: 1024px)').matches) return;

    this.preview = Object.assign(document.createElement('div'), { className: 'project-floating-preview' });
    document.body.appendChild(this.preview);
    this.mx = 0; this.my = 0; this.px = 0; this.py = 0; this.visible = false;

    window.addEventListener('mousemove', e => { this.mx = e.clientX; this.my = e.clientY; });

    cards.forEach(card => {
      const title = card.querySelector('.project-title')?.textContent.trim() || 'Project';
      card.addEventListener('mouseenter', () => {
        this.preview.innerHTML = `<div class="pfp-inner"><span class="pfp-label">${title}</span></div>`;
        this.visible = true;
        this.preview.classList.add('pfp--visible');
        this.track();
      });
      card.addEventListener('mouseleave', () => {
        this.visible = false;
        this.preview.classList.remove('pfp--visible');
      });
    });
  }
  track() {
    const tick = () => {
      this.px += (this.mx - this.px) * 0.12;
      this.py += (this.my - this.py) * 0.12;
      this.preview.style.left = `${this.px + 24}px`;
      this.preview.style.top = `${this.py - 70}px`;
      if (this.visible) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

// ─── INIT ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Keep the premium interactions, but avoid the heaviest cursor layer for better responsiveness.
  new HeroParticles();
  new SectionBackgrounds();
  new CardTilt('.project-card', 4);
  new CardTilt('.skill-category', 3);
  new CardTilt('.certification-card', 3);
  new SkillNeighborDim();
  new HeroGlitch();
  new ScrollProgress();
  new NavSlider();
  new MagneticButtons('.btn, .nav-link');
  new StaggerReveal();
  new ProfileTilt();
  new StatCountUp();
  new ProjectHoverPreview();

  // Split text reveal — FIXED (runs after fonts load)
  setTimeout(() => new SplitTextReveal('.hero-title', 0.2, 0.04), 300);
});
