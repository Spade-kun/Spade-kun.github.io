"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  X, 
  Info, 
  Briefcase, 
  GraduationCap, 
  Bot, 
  Database, 
  Terminal, 
  Activity, 
  Search,
  Filter,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { sounds } from "@/utils/audio";
import { PERSONAL_INFO } from "@/data/portfolioData";

export interface TopologyNode {
  id: string;
  label: string;
  cluster: "core" | "commercial" | "academic" | "automation" | "systems";
  tagline: string;
  roleOrOrg: string;
  period?: string;
  location?: string;
  description: string;
  milestones?: string[];
  techStack: string[];
  linkUrl?: string;
  isCore?: boolean;
  isClusterHub?: boolean;
  radius: number;
  // Physics coordinates & state
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface TopologyLink {
  source: string;
  target: string;
  label?: string;
  color?: string;
}

const CLUSTER_CONFIG = {
  core: {
    color: "#38bdf8", // Sky Neon
    bgGlow: "rgba(56, 189, 248, 0.4)",
    title: "Systems Architect Hub",
    badge: "Core Node",
    icon: Terminal
  },
  commercial: {
    color: "#c084fc", // Purple / Violet
    bgGlow: "rgba(192, 132, 252, 0.35)",
    title: "Commercial Web Deployments",
    badge: "Production Client",
    icon: Briefcase
  },
  academic: {
    color: "#38bdf8", // Blue
    bgGlow: "rgba(56, 189, 248, 0.35)",
    title: "Academic & Computer Science",
    badge: "BSIT Foundation",
    icon: GraduationCap
  },
  automation: {
    color: "#fbbf24", // Amber Gold
    bgGlow: "rgba(251, 191, 36, 0.35)",
    title: "n8n AI & Autonomous Pipelines",
    badge: "AI Automation",
    icon: Bot
  },
  systems: {
    color: "#34d399", // Emerald Green
    bgGlow: "rgba(52, 211, 153, 0.35)",
    title: "Relational & Desktop Engines",
    badge: "Core Systems",
    icon: Database
  }
};

const INITIAL_NODES: Omit<TopologyNode, "x" | "y" | "vx" | "vy">[] = [
  // 1. Center Hub Node
  {
    id: "spade-kun",
    label: "Noel Raterta Jr.",
    cluster: "core",
    tagline: "Full-Stack Developer, Web Architect & Automation Builder",
    roleOrOrg: "Spade-kun // Systems Hub",
    period: "2021 — Active",
    location: "Malaybalay City, Bukidnon, PH",
    description: "Architecting deliberate, full-stack commercial web platforms in Laravel and Next.js, building autonomous AI workflows in n8n, and engineering relational database architectures.",
    milestones: [
      "Engineered multiple live client commercial web platforms in Laravel, Blade, and PostgreSQL.",
      "Developed self-hosted n8n autonomous lead generation agents with AI prospect qualification.",
      "BS Information Technology candidate at Bukidnon State University with emphasis on Software Engineering."
    ],
    techStack: ["Laravel", "Next.js", "React", "PHP", "PostgreSQL", "MySQL", "Shopify", "n8n", "Python", "Java"],
    isCore: true,
    radius: 32
  },

  // 2. Hub Commercial Practice
  {
    id: "hub-commercial",
    label: "Freelance Full-Stack Practice",
    cluster: "commercial",
    tagline: "Commercial Web Platforms & Client Deployments",
    roleOrOrg: "Independent Engineering Practice",
    period: "2021 — Present",
    location: "Malaybalay City, Bukidnon, PH",
    description: "Contributed to and deployed commercial web platforms including Everly Plumbing (Laravel/PostgreSQL), Everly Bookkeeping (Laravel/MySQL), Deen International (Shopify), and Salt Lyf Cruises.",
    milestones: [
      "Built relational schemas enforcing strict transactional data integrity and index optimization.",
      "Modernized client conversion funnels and mobile-responsive layouts with sub-second LCP.",
      "Authored clean technical documentation, deployment guides, and client maintenance runbooks."
    ],
    techStack: ["Laravel", "Blade", "PHP 8+", "Next.js", "PostgreSQL", "MySQL", "Shopify", "Tailwind CSS"],
    isClusterHub: true,
    radius: 22
  },
  {
    id: "node-everly-plumbing",
    label: "Everly Plumbing Platform",
    cluster: "commercial",
    tagline: "Laravel & PostgreSQL Commercial Platform",
    roleOrOrg: "Live Client Deployment",
    period: "2026",
    description: "High-performance commercial plumbing service platform engineered with Laravel, Blade server-rendering, and PostgreSQL.",
    milestones: [
      "Engineered client lead capture pipeline and service catalog schema.",
      "Achieved sub-second paint times and 95+ Core Web Vitals score across mobile viewports."
    ],
    techStack: ["Laravel", "Blade", "PostgreSQL", "PHP", "SEO"],
    linkUrl: "https://everlyplumbing.com",
    radius: 14
  },
  {
    id: "node-everly-bookkeeping",
    label: "Everly Bookkeeping Platform",
    cluster: "commercial",
    tagline: "Laravel & MySQL Financial Services Storefront",
    roleOrOrg: "Live Client Deployment",
    period: "2026",
    description: "Commercial accounting and financial consultation intake platform built with Laravel MVC and MySQL relational database.",
    milestones: [
      "Implemented structured client consultation intake funnels and service breakdown components.",
      "Enforced SSL/TLS security hardening and secure contact submission endpoints."
    ],
    techStack: ["Laravel", "Blade", "MySQL", "Financial Web"],
    linkUrl: "https://everlybookkeeping.com",
    radius: 14
  },
  {
    id: "node-deen-store",
    label: "Deen International Store",
    cluster: "commercial",
    tagline: "Shopify Global E-Commerce Storefront",
    roleOrOrg: "Commercial Client Build",
    period: "2026",
    description: "Global e-commerce storefront for premium apparel and accessories deployed on Shopify with custom Liquid templating.",
    milestones: [
      "Implemented responsive product grids, international multi-currency pricing, and streamlined checkout.",
      "Optimized visual asset delivery pipelines for minimal load latency."
    ],
    techStack: ["Shopify", "Liquid", "E-Commerce", "Responsive UI"],
    linkUrl: "https://deenintr.com",
    radius: 14
  },
  {
    id: "node-salt-lyf",
    label: "Salt Lyf Cruises",
    cluster: "commercial",
    tagline: "Squarespace Marine Tourism Platform",
    roleOrOrg: "Client Platform Deployment",
    period: "2026",
    description: "Luxury marine tourism and yacht charter booking platform crafted with custom CSS and interactive booking forms.",
    milestones: [
      "Custom responsive CSS framework tuned for high readability and luxury aesthetic.",
      "Engineered charter itinerary displays and guest intake reservation forms."
    ],
    techStack: ["Squarespace", "Custom CSS", "JavaScript"],
    linkUrl: "https://saltlyfcruises.com",
    radius: 13
  },
  {
    id: "node-wp-theme",
    label: "WordPress Custom Themes",
    cluster: "commercial",
    tagline: "Custom PHP Theme & ACF Architecture",
    roleOrOrg: "Production Theme Demonstration",
    period: "2026",
    description: "Demonstration of advanced WordPress capabilities: custom theme coding from scratch, PHP templates, and Custom Post Types.",
    milestones: [
      "Built bespoke theme templates avoiding bloated third-party page builders.",
      "Structured relational custom taxonomies and ACF field schemas."
    ],
    techStack: ["WordPress", "PHP", "MySQL", "ACF"],
    radius: 13
  },

  // 3. Hub Academic Foundation
  {
    id: "hub-academic",
    label: "BS Information Technology",
    cluster: "academic",
    tagline: "Academic Degree & CS Theory",
    roleOrOrg: "Bukidnon State University",
    period: "2022 — Expected 2026",
    location: "Bukidnon, Philippines",
    description: "Major focus on Software Engineering, Advanced Relational Database Systems, Systems Architecture, and Network Security.",
    milestones: [
      "Dean's lister / high academic standing in software development and computing theory.",
      "Active contributor and lead developer for academic capstones, student GUI systems, and database projects.",
      "Theoretical and practical mastery of relational database normalization (1NF - BCNF)."
    ],
    techStack: ["Java", "Python", "Data Structures", "Algorithms", "Relational Theory", "Computer Networks"],
    isClusterHub: true,
    radius: 22
  },
  {
    id: "node-relational-theory",
    label: "Relational Database Theory",
    cluster: "academic",
    tagline: "ACID Guarantees & Index Optimization",
    roleOrOrg: "Core Computing Foundation",
    description: "Deep study and implementation of relational algebra, B-Tree index optimization, transaction isolation levels, and foreign key integrity.",
    milestones: [
      "Engineered robust schema migrations with foreign key constraints across PostgreSQL and MySQL.",
      "Conducted query execution plan analysis (EXPLAIN ANALYZE) to eliminate table scans."
    ],
    techStack: ["PostgreSQL", "MySQL", "ACID", "B-Tree Indexing", "SQL"],
    radius: 14
  },
  {
    id: "node-dsa",
    label: "Data Structures & Algorithms",
    cluster: "academic",
    tagline: "Complexity Analysis & State Machines",
    roleOrOrg: "Academic Foundation",
    description: "Implementation of fundamental data structures: hash maps, trees, graph traversal, sorting algorithms, and Big-O computational complexity.",
    milestones: [
      "Applied algorithmic graph traversal to dependency tree resolution.",
      "Built deterministic state machines for game physics and clinical workflows."
    ],
    techStack: ["Algorithms", "Data Structures", "Big-O", "State Machines"],
    radius: 13
  },
  {
    id: "node-oop-java",
    label: "OOP & Java Architecture",
    cluster: "academic",
    tagline: "Object-Oriented Design & JDBC Systems",
    roleOrOrg: "Systems Engineering",
    description: "Encapsulation, inheritance, polymorphism, design patterns, and JDBC transaction management in enterprise Java environments.",
    milestones: [
      "Built modular student registration and records systems using Java Swing and SQL.",
      "Enforced strict OOP separation between presentation, business logic, and DAO layers."
    ],
    techStack: ["Java", "OOP", "Swing GUI", "JDBC", "Design Patterns"],
    radius: 13
  },
  {
    id: "node-net-sec",
    label: "Networks & Security Protocols",
    cluster: "academic",
    tagline: "TCP/IP, SSL/TLS & Authentication",
    roleOrOrg: "Systems Foundation",
    description: "Computer networking models (OSI / TCP-IP), HTTP/HTTPS request lifecycles, CORS security, and cryptographic hashing standards.",
    milestones: [
      "Configured SSL/TLS certificates and hardened web server headers.",
      "Implemented role-based access control (RBAC) and bcrypt password hashing."
    ],
    techStack: ["TCP/IP", "HTTP/HTTPS", "SSL/TLS", "Network Security", "RBAC"],
    radius: 13
  },

  // 4. Hub Automation & AI Workflows
  {
    id: "hub-automation",
    label: "Autonomous AI & n8n Systems",
    cluster: "automation",
    tagline: "Workflow Automation & Agentic Pipelines",
    roleOrOrg: "Specialized Discipline",
    period: "2025 — Present",
    description: "Designing self-hosted n8n workflow execution graphs, autonomous lead extraction agents, and real-time webhook routing pipelines.",
    milestones: [
      "Built autonomous multi-step lead generation agent with AI qualification filters.",
      "Automated prospect deduplication, email delivery validation, and CRM notification sync.",
      "Architected error handling routines with retries and rate-limit backoffs."
    ],
    techStack: ["n8n", "AI Agents", "Webhooks", "REST APIs", "CRM Sync", "JSON Pipelines"],
    isClusterHub: true,
    radius: 22
  },
  {
    id: "node-n8n-agent",
    label: "Autonomous Lead Gen Agent",
    cluster: "automation",
    tagline: "Featured Production AI Pipeline",
    roleOrOrg: "Production Automation Build",
    period: "2026",
    description: "Full production-grade autonomous agent built in n8n. Scrapes prospect databases, extracts verified contacts, qualifies with AI, and notifies CRM queues.",
    milestones: [
      "Multi-node architecture executing automated prospect evaluation.",
      "Integrated Slack/Webhook real-time telemetry dispatch."
    ],
    techStack: ["n8n", "AI Inference", "Lead Gen", "Webhooks"],
    radius: 14
  },
  {
    id: "node-ai-eval",
    label: "AI Prospect Qualification",
    cluster: "automation",
    tagline: "Intelligent ICP Assessment Logic",
    roleOrOrg: "Workflow Node Pipeline",
    description: "Custom prompt engineering and AI decision nodes that evaluate target domains, corporate scale, and buyer persona alignment.",
    milestones: [
      "Dynamic prompt filters assessing company authority metrics.",
      "Zero-latency structured JSON schema outputs for downstream ingest."
    ],
    techStack: ["AI Prompts", "OpenAI / Claude", "JSON Schema", "n8n"],
    radius: 13
  },
  {
    id: "node-webhooks",
    label: "Webhook Telemetry & Sync",
    cluster: "automation",
    tagline: "Bi-Directional API Routing",
    roleOrOrg: "Event-Driven Infrastructure",
    description: "Event-driven architecture connecting custom forms, external CRMs, notification webhooks, and transactional emails.",
    milestones: [
      "Created resilient webhook ingress endpoints with cryptographic secret verification.",
      "Implemented background retry queues avoiding lost data transmissions."
    ],
    techStack: ["Webhooks", "REST APIs", "Event-Driven", "Payload Routing"],
    radius: 13
  },

  // 5. Hub Relational & Systems Engines
  {
    id: "hub-systems",
    label: "Relational & Desktop Engines",
    cluster: "systems",
    tagline: "Transactional Software & Game Physics",
    roleOrOrg: "Systems Engineering Practice",
    period: "2023 — Present",
    description: "Engineering administrative desktop suites, clinical record databases, and deterministic 60fps Pygame simulation loops.",
    milestones: [
      "Designed full patient management system for dental clinic appointments.",
      "Engineered Java Swing desktop suite for university registrar workflows.",
      "Programmed continuous-motion physics game loop in Python with custom collision mathematics."
    ],
    techStack: ["PHP", "MySQL", "Java Swing", "JDBC", "Python", "Pygame"],
    isClusterHub: true,
    radius: 22
  },
  {
    id: "node-dental-system",
    label: "Dental Clinic Patient System",
    cluster: "systems",
    tagline: "PHP & MySQL Clinical Portal",
    roleOrOrg: "Full-Stack System",
    description: "Comprehensive clinical administration portal replacing paper scheduling with patient self-service appointments and doctor consoles.",
    milestones: [
      "Engineered appointment conflict resolution ensuring zero double-bookings.",
      "Designed secure medical record notes and automated schedule alerts."
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "Relational DB"],
    linkUrl: "https://github.com/Spade-kun/DENTAL_CLINIC_WEBSITE",
    radius: 14
  },
  {
    id: "node-student-gui",
    label: "Academic Enrollment GUI",
    cluster: "systems",
    tagline: "Java Swing Desktop Management Engine",
    roleOrOrg: "Desktop Software Build",
    description: "Robust desktop system for educational registrar operations with strict CRUD workflows, prerequisite checks, and direct JDBC SQL storage.",
    milestones: [
      "Built responsive Java Swing components with zero third-party GUI dependencies.",
      "Implemented strict referential integrity triggers preventing orphaned academic records."
    ],
    techStack: ["Java", "Swing GUI", "MySQL", "JDBC"],
    linkUrl: "https://github.com/Spade-kun/Student_Enrollment_GUI",
    radius: 14
  },
  {
    id: "node-move-or-die",
    label: "Move or Die 2D Survival Engine",
    cluster: "systems",
    tagline: "Python & Pygame Continuous Game Loop",
    roleOrOrg: "Deterministic Game Mechanics",
    description: "Arcade survival game built in Python enforcing continuous movement where stopping rapidly drains health. Features custom vector math and collision.",
    milestones: [
      "Implemented 60 FPS deterministic tick loop with sub-millisecond delta time calculations.",
      "Built procedural enemy wave spawners and state-machine boss phases."
    ],
    techStack: ["Python", "Pygame", "Vector Math", "State Machines"],
    linkUrl: "https://github.com/Spade-kun/MOVE_OR_DIE_GAME",
    radius: 14
  }
];

const LINKS: TopologyLink[] = [
  // Core Hub to Cluster Hubs
  { source: "spade-kun", target: "hub-commercial", color: "#c084fc" },
  { source: "spade-kun", target: "hub-academic", color: "#38bdf8" },
  { source: "spade-kun", target: "hub-automation", color: "#fbbf24" },
  { source: "spade-kun", target: "hub-systems", color: "#34d399" },

  // Commercial Hub Links
  { source: "hub-commercial", target: "node-everly-plumbing", color: "#c084fc" },
  { source: "hub-commercial", target: "node-everly-bookkeeping", color: "#c084fc" },
  { source: "hub-commercial", target: "node-deen-store", color: "#c084fc" },
  { source: "hub-commercial", target: "node-salt-lyf", color: "#c084fc" },
  { source: "hub-commercial", target: "node-wp-theme", color: "#c084fc" },

  // Academic Hub Links
  { source: "hub-academic", target: "node-relational-theory", color: "#38bdf8" },
  { source: "hub-academic", target: "node-dsa", color: "#38bdf8" },
  { source: "hub-academic", target: "node-oop-java", color: "#38bdf8" },
  { source: "hub-academic", target: "node-net-sec", color: "#38bdf8" },

  // Automation Hub Links
  { source: "hub-automation", target: "node-n8n-agent", color: "#fbbf24" },
  { source: "hub-automation", target: "node-ai-eval", color: "#fbbf24" },
  { source: "hub-automation", target: "node-webhooks", color: "#fbbf24" },

  // Systems Hub Links
  { source: "hub-systems", target: "node-dental-system", color: "#34d399" },
  { source: "hub-systems", target: "node-student-gui", color: "#34d399" },
  { source: "hub-systems", target: "node-move-or-die", color: "#34d399" },

  // Cross-Cluster Architectural Bridges
  { source: "node-everly-plumbing", target: "node-relational-theory", color: "rgba(192, 132, 252, 0.4)", label: "PostgreSQL Schema" },
  { source: "node-everly-bookkeeping", target: "node-dental-system", color: "rgba(52, 211, 153, 0.4)", label: "MySQL ACID Integrity" },
  { source: "node-student-gui", target: "node-oop-java", color: "rgba(56, 189, 248, 0.4)", label: "JDBC Integration" },
  { source: "node-n8n-agent", target: "node-webhooks", color: "rgba(251, 191, 36, 0.4)", label: "REST Telemetry" },
  { source: "node-move-or-die", target: "node-dsa", color: "rgba(52, 211, 153, 0.4)", label: "State Machines" }
];

interface DataPacket {
  linkIdx: number;
  progress: number;
  speed: number;
  color: string;
}

interface ExperienceTopologyGraphProps {
  onSwitchToTimeline?: () => void;
}

export const ExperienceTopologyGraph: React.FC<ExperienceTopologyGraphProps> = ({
  onSwitchToTimeline
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [nodes, setNodes] = useState<TopologyNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TopologyNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TopologyNode | null>(null);
  const [activeCluster, setActiveCluster] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pulsesEnabled, setPulsesEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Camera & Physics references (to avoid re-renders on animation tick)
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1, targetX: 0, targetY: 0, targetZoom: 1 });
  const draggingNodeRef = useRef<TopologyNode | null>(null);
  const isPanningRef = useRef<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dataPacketsRef = useRef<DataPacket[]>([]);
  const rafRef = useRef<number | null>(null);
  const nodesRef = useRef<TopologyNode[]>([]);

  // Initialize node positions in a balanced circular topology
  const initializeGraph = useCallback((width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;

    const clusterAngles: Record<string, { baseAngle: number; dist: number }> = {
      commercial: { baseAngle: -Math.PI * 0.75, dist: 160 },
      academic: { baseAngle: -Math.PI * 0.25, dist: 160 },
      automation: { baseAngle: Math.PI * 0.75, dist: 160 },
      systems: { baseAngle: Math.PI * 0.25, dist: 160 }
    };

    const newNodes: TopologyNode[] = INITIAL_NODES.map((init) => {
      let x = cx;
      let y = cy;

      if (init.isCore) {
        x = cx;
        y = cy;
      } else if (init.isClusterHub && clusterAngles[init.cluster]) {
        const { baseAngle, dist } = clusterAngles[init.cluster];
        x = cx + Math.cos(baseAngle) * dist;
        y = cy + Math.sin(baseAngle) * dist;
      } else if (clusterAngles[init.cluster]) {
        const { baseAngle, dist } = clusterAngles[init.cluster];
        // Distribute leaf nodes around cluster hub
        const jitter = (Math.random() - 0.5) * 0.8;
        const leafDist = dist + 110 + Math.random() * 40;
        x = cx + Math.cos(baseAngle + jitter) * leafDist;
        y = cy + Math.sin(baseAngle + jitter) * leafDist;
      }

      return {
        ...init,
        x,
        y,
        vx: 0,
        vy: 0
      };
    });

    nodesRef.current = newNodes;
    setNodes(newNodes);

    // Initialize moving data flow packets
    const packets: DataPacket[] = [];
    for (let i = 0; i < LINKS.length; i++) {
      packets.push({
        linkIdx: i,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        color: LINKS[i].color || "#38bdf8"
      });
      packets.push({
        linkIdx: i,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        color: LINKS[i].color || "#38bdf8"
      });
    }
    dataPacketsRef.current = packets;
  }, []);

  // Handle Resize & Canvas high-DPI scaling
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (nodesRef.current.length === 0) {
        initializeGraph(rect.width, rect.height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initializeGraph]);

  // Main Canvas Render & Physics Simulation Loop
  useEffect(() => {
    let active = true;

    const render = () => {
      if (!active) return;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const cx = width / 2;
      const cy = height / 2;

      // Smooth camera interpolation
      const cam = cameraRef.current;
      cam.x += (cam.targetX - cam.x) * 0.12;
      cam.y += (cam.targetY - cam.y) * 0.12;
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.12;

      // Physics Simulation (Springs + Repulsion + Centering Force)
      const curNodes = nodesRef.current;
      const draggingNode = draggingNodeRef.current;

      // 1. Repulsion between all nodes
      for (let i = 0; i < curNodes.length; i++) {
        for (let j = i + 1; j < curNodes.length; j++) {
          const a = curNodes[i];
          const b = curNodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = (a.radius + b.radius) * 2.5;

          if (dist < 260) {
            const force = (260 - dist) / dist * 0.08;
            if (a !== draggingNode && !a.isCore) {
              a.vx -= dx * force;
              a.vy -= dy * force;
            }
            if (b !== draggingNode && !b.isCore) {
              b.vx += dx * force;
              b.vy += dy * force;
            }
          }
        }
      }

      // 2. Spring link attraction
      for (let k = 0; k < LINKS.length; k++) {
        const link = LINKS[k];
        const sourceNode = curNodes.find(n => n.id === link.source);
        const targetNode = curNodes.find(n => n.id === link.target);

        if (sourceNode && targetNode) {
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = sourceNode.isCore || targetNode.isCore ? 160 : 110;
          const diff = dist - targetDist;
          const spring = diff * 0.0022;

          if (sourceNode !== draggingNode && !sourceNode.isCore) {
            sourceNode.vx += (dx / dist) * spring;
            sourceNode.vy += (dy / dist) * spring;
          }
          if (targetNode !== draggingNode && !targetNode.isCore) {
            targetNode.vx -= (dx / dist) * spring;
            targetNode.vy -= (dy / dist) * spring;
          }
        }
      }

      // 3. Gentle Centering Gravity
      for (let i = 0; i < curNodes.length; i++) {
        const n = curNodes[i];
        if (n !== draggingNode && !n.isCore) {
          n.vx += (cx - n.x) * 0.0006;
          n.vy += (cy - n.y) * 0.0006;

          // Apply velocity with damping
          n.vx *= 0.85;
          n.vy *= 0.85;
          n.x += n.vx;
          n.y += n.vy;
        }
      }

      // Clear Canvas
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Cyber Matrix Background Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Apply Camera Transform
      ctx.save();
      ctx.translate(cx + cam.x, cy + cam.y);
      ctx.scale(cam.zoom, cam.zoom);
      ctx.translate(-cx, -cy);

      // Draw Topology Links
      for (let k = 0; k < LINKS.length; k++) {
        const link = LINKS[k];
        const s = curNodes.find(n => n.id === link.source);
        const t = curNodes.find(n => n.id === link.target);
        if (!s || !t) continue;

        const isHighlighted = (hoveredNode && (hoveredNode.id === s.id || hoveredNode.id === t.id)) ||
                              (selectedNode && (selectedNode.id === s.id || selectedNode.id === t.id));
        const isDimmed = (hoveredNode || selectedNode) && !isHighlighted;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);

        if (isHighlighted) {
          ctx.strokeStyle = link.color || "#38bdf8";
          ctx.lineWidth = 2.2;
          ctx.shadowColor = link.color || "#38bdf8";
          ctx.shadowBlur = 10;
        } else {
          ctx.strokeStyle = isDimmed ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw Animated Data Packets
      if (pulsesEnabled) {
        const packets = dataPacketsRef.current;
        for (let pIdx = 0; pIdx < packets.length; pIdx++) {
          const p = packets[pIdx];
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;

          const link = LINKS[p.linkIdx];
          if (!link) continue;
          const s = curNodes.find(n => n.id === link.source);
          const t = curNodes.find(n => n.id === link.target);
          if (!s || !t) continue;

          const px = s.x + (t.x - s.x) * p.progress;
          const py = s.y + (t.y - s.y) * p.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color || "#38bdf8";
          ctx.shadowColor = p.color || "#38bdf8";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw Nodes
      for (let i = 0; i < curNodes.length; i++) {
        const node = curNodes[i];
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        const config = CLUSTER_CONFIG[node.cluster] || CLUSTER_CONFIG.commercial;

        // Check if connected to hovered/selected
        const isConnected = (hoveredNode && LINKS.some(l => 
          (l.source === hoveredNode.id && l.target === node.id) ||
          (l.target === hoveredNode.id && l.source === node.id)
        )) || (selectedNode && LINKS.some(l => 
          (l.source === selectedNode.id && l.target === node.id) ||
          (l.target === selectedNode.id && l.source === node.id)
        ));

        const isDimmed = (hoveredNode || selectedNode) && !isHovered && !isSelected && !isConnected;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.22 : 1.0;

        // Outer pulsing aura for selected/hovered/core
        if (isSelected || isHovered || node.isCore) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 7, 0, Math.PI * 2);
          ctx.fillStyle = config.bgGlow;
          ctx.shadowColor = config.color;
          ctx.shadowBlur = isSelected ? 24 : 14;
          ctx.fill();
        }

        // Main Node Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isCore 
          ? "#0b0c14" 
          : isSelected 
            ? "#111422" 
            : "#07080e";
        ctx.strokeStyle = isSelected 
          ? "#ffffff" 
          : isHovered 
            ? config.color 
            : config.color;
        ctx.lineWidth = isSelected ? 2.5 : isHovered ? 2.0 : 1.5;
        ctx.shadowColor = config.color;
        ctx.shadowBlur = isHovered || isSelected ? 12 : 4;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner glowing core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.isCore ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = config.color;
        ctx.fill();

        // Node Label
        ctx.font = node.isCore 
          ? "bold 13px JetBrains Mono, monospace" 
          : node.isClusterHub 
            ? "600 11px JetBrains Mono, monospace" 
            : "500 10px JetBrains Mono, monospace";
        ctx.fillStyle = isSelected 
          ? "#ffffff" 
          : isHovered 
            ? "#ffffff" 
            : isDimmed 
              ? "rgba(255, 255, 255, 0.4)" 
              : "rgba(255, 255, 255, 0.85)";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        // Label offset below node
        const labelY = node.y + node.radius + 6;
        ctx.fillText(node.label, node.x, labelY);

        ctx.restore();
      }

      ctx.restore(); // Restore camera transform
      ctx.restore(); // Restore high-DPI scaling

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hoveredNode, selectedNode, pulsesEnabled]);

  // Coordinate conversion helpers (Screen Space <-> Graph Canvas Space)
  const getGraphCoords = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const cam = cameraRef.current;

    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;

    const graphX = (screenX - cx - cam.x) / cam.zoom + cx;
    const graphY = (screenY - cy - cam.y) / cam.zoom + cy;

    return { x: graphX, y: graphY };
  }, []);

  // Node hit test
  const findNodeAtCoords = useCallback((graphX: number, graphY: number) => {
    const curNodes = nodesRef.current;
    for (let i = curNodes.length - 1; i >= 0; i--) {
      const n = curNodes[i];
      const dx = graphX - n.x;
      const dy = graphY - n.y;
      if (dx * dx + dy * dy <= (n.radius + 8) * (n.radius + 8)) {
        return n;
      }
    }
    return null;
  }, []);

  // Pointer / Mouse Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    const { x, y } = getGraphCoords(e.clientX, e.clientY);
    const hit = findNodeAtCoords(x, y);

    if (hit) {
      draggingNodeRef.current = hit;
      setSelectedNode(hit);
      sounds.playClick("crisp");
    } else {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { x, y } = getGraphCoords(e.clientX, e.clientY);

    // If dragging a node
    if (draggingNodeRef.current) {
      draggingNodeRef.current.x = x;
      draggingNodeRef.current.y = y;
      draggingNodeRef.current.vx = 0;
      draggingNodeRef.current.vy = 0;
      return;
    }

    // If panning camera
    if (isPanningRef.current) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      panStartRef.current = { x: e.clientX, y: e.clientY };
      cameraRef.current.targetX += dx;
      cameraRef.current.targetY += dy;
      return;
    }

    // Hover test
    const hit = findNodeAtCoords(x, y);
    if (hit !== hoveredNode) {
      setHoveredNode(hit);
      if (hit) sounds.playHover();
    }
  };

  const handlePointerUp = () => {
    draggingNodeRef.current = null;
    isPanningRef.current = false;
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = Math.max(0.45, Math.min(2.5, cameraRef.current.targetZoom * factor));
    cameraRef.current.targetZoom = newZoom;
  };

  // Camera Recenter
  const handleRecenter = () => {
    sounds.playClick("soft");
    cameraRef.current.targetX = 0;
    cameraRef.current.targetY = 0;
    cameraRef.current.targetZoom = 1;
  };

  // Reheat / Scatter Animation
  const handleReheat = () => {
    sounds.playClick("toggle");
    const curNodes = nodesRef.current;
    for (let i = 0; i < curNodes.length; i++) {
      if (!curNodes[i].isCore) {
        curNodes[i].vx = (Math.random() - 0.5) * 12;
        curNodes[i].vy = (Math.random() - 0.5) * 12;
      }
    }
  };

  // Filter Cluster Focus
  const handleSelectCluster = (clusterKey: string) => {
    sounds.playClick("soft");
    setActiveCluster(clusterKey);
    if (clusterKey === "all") {
      setSelectedNode(null);
      handleRecenter();
    } else {
      const hub = nodesRef.current.find(n => n.cluster === clusterKey && n.isClusterHub);
      if (hub) {
        setSelectedNode(hub);
        const container = containerRef.current;
        if (container) {
          const cx = container.clientWidth / 2;
          const cy = container.clientHeight / 2;
          cameraRef.current.targetX = (cx - hub.x) * cameraRef.current.zoom;
          cameraRef.current.targetY = (cy - hub.y) * cameraRef.current.zoom;
        }
      }
    }
  };

  const selectedConfig = selectedNode 
    ? (CLUSTER_CONFIG[selectedNode.cluster] || CLUSTER_CONFIG.commercial)
    : null;

  // Find linked dependencies for selected node
  const connectedNeighbors = selectedNode ? nodesRef.current.filter(n => 
    LINKS.some(l => 
      (l.source === selectedNode.id && l.target === n.id) ||
      (l.target === selectedNode.id && l.source === n.id)
    )
  ) : [];

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full rounded-3xl border border-white/[0.1] bg-[#07080e] overflow-hidden select-none transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "min-h-[580px] sm:min-h-[640px] h-[640px]"
      }`}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Top HUD Status Bar & Category Filter Pills */}
      <div className="absolute top-4 left-4 right-4 flex flex-col md:flex-row md:items-center justify-between gap-3 pointer-events-none z-20">
        {/* Left Telemetry Beacon */}
        <div className="flex items-center gap-2 pointer-events-auto bg-[#0b0c16]/90 backdrop-blur-md border border-white/[0.1] rounded-full px-3.5 py-1.5 font-mono text-xs shadow-lg">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-white font-semibold">Systems Architecture Topology</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400 text-[11px] hidden sm:inline">Interactive Neural Foundation</span>
        </div>

        {/* Center: Cluster Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto bg-[#0b0c16]/90 backdrop-blur-md border border-white/[0.1] rounded-2xl p-1 shadow-lg font-mono text-xs">
          <button
            onClick={() => handleSelectCluster("all")}
            className={`px-3 py-1 rounded-xl transition-all text-[11px] font-medium ${
              activeCluster === "all" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white"
            }`}
          >
            All Nodes
          </button>
          <button
            onClick={() => handleSelectCluster("commercial")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all text-[11px] ${
              activeCluster === "commercial" ? "bg-purple-500/20 text-purple-300 border border-purple-400/40" : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <span>Commercial</span>
          </button>
          <button
            onClick={() => handleSelectCluster("academic")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all text-[11px] ${
              activeCluster === "academic" ? "bg-sky-500/20 text-sky-300 border border-sky-400/40" : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Academic BSIT</span>
          </button>
          <button
            onClick={() => handleSelectCluster("automation")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all text-[11px] ${
              activeCluster === "automation" ? "bg-amber-500/20 text-amber-300 border border-amber-400/40" : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>n8n & AI</span>
          </button>
          <button
            onClick={() => handleSelectCluster("systems")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all text-[11px] ${
              activeCluster === "systems" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40" : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Databases</span>
          </button>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-[#0b0c16]/90 backdrop-blur-md border border-white/[0.1] rounded-2xl p-1 shadow-lg font-mono text-xs">
          <button
            onClick={handleRecenter}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Recenter Camera"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleReheat}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Reheat Simulation Forces"
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              sounds.playClick("soft");
              setIsFullscreen(!isFullscreen);
            }}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Topology"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Floating Bottom Left Telemetry Legend */}
      <div className="absolute bottom-4 left-4 pointer-events-none z-20 hidden sm:flex items-center gap-3 bg-[#0b0c16]/85 backdrop-blur-md border border-white/[0.08] rounded-xl px-3.5 py-2 font-mono text-[11px] text-zinc-400 shadow-xl">
        <span className="text-zinc-500 font-semibold">CIRCUIT NODES:</span>
        <span className="flex items-center gap-1.5 text-purple-300">
          <span className="h-2 w-2 rounded-full bg-purple-400" /> Commercial
        </span>
        <span className="flex items-center gap-1.5 text-sky-300">
          <span className="h-2 w-2 rounded-full bg-sky-400" /> Academic
        </span>
        <span className="flex items-center gap-1.5 text-amber-300">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> n8n Automation
        </span>
        <span className="flex items-center gap-1.5 text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Databases
        </span>
      </div>

      {/* Selected Node Hologram Telemetry HUD (Slide-Over Panel on Right) */}
      {selectedNode && selectedConfig && (
        <div className="absolute top-20 bottom-4 right-4 w-full sm:w-[380px] max-w-[calc(100vw-32px)] bg-[#0c0d18]/95 backdrop-blur-2xl border border-white/[0.14] rounded-2xl p-5 shadow-2xl flex flex-col justify-between overflow-y-auto z-30 animate-fade-in">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <span 
                  className="h-2 w-2 rounded-full animate-pulse" 
                  style={{ backgroundColor: selectedConfig.color }}
                />
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-zinc-300">
                  {selectedConfig.badge}
                </span>
              </div>
              <button
                onClick={() => {
                  sounds.playClick("soft");
                  setSelectedNode(null);
                }}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Title & Organization */}
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                {selectedNode.label}
              </h3>
              <p className="font-mono text-xs text-sky-400 mt-1">
                {selectedNode.roleOrOrg}
              </p>
              {selectedNode.period && (
                <div className="font-mono text-[11px] text-zinc-400 mt-0.5">
                  {selectedNode.period} {selectedNode.location ? `· ${selectedNode.location}` : ""}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              {selectedNode.description}
            </p>

            {/* Key Verified Milestones */}
            {selectedNode.milestones && selectedNode.milestones.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                  Verified Architectural Milestones:
                </div>
                <div className="space-y-1.5">
                  {selectedNode.milestones.map((ms, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-sky-400 font-mono text-[11px] mt-0.5">↳</span>
                      <span>{ms}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connected Circuit Dependencies */}
            {connectedNeighbors.length > 0 && (
              <div className="pt-2">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mb-1.5">
                  Connected Circuit Nodes ({connectedNeighbors.length}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {connectedNeighbors.map((neighbor) => (
                    <button
                      key={neighbor.id}
                      onClick={() => {
                        sounds.playClick("soft");
                        setSelectedNode(neighbor);
                      }}
                      className="inline-flex items-center gap-1 font-mono text-[10px] rounded-md border border-white/[0.1] bg-white/[0.03] px-2 py-1 text-zinc-300 hover:text-white hover:border-sky-400/40 hover:bg-sky-500/10 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="h-3 w-3 text-sky-400" />
                      <span>{neighbor.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            {selectedNode.techStack && (
              <div className="pt-2">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mb-1.5">
                  Technologies:
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] rounded px-2 py-0.5 border border-white/[0.08] bg-white/[0.02] text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
            {selectedNode.linkUrl ? (
              <a
                href={selectedNode.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick("crisp")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-400 text-black px-3.5 py-1.5 font-mono text-xs font-semibold hover:bg-sky-300 transition-colors shadow-sm cursor-pointer"
              >
                <span>Inspect Source</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : onSwitchToTimeline ? (
              <button
                onClick={() => {
                  sounds.playClick("crisp");
                  onSwitchToTimeline();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-white hover:border-white/[0.28] transition-colors cursor-pointer"
              >
                <span>View In Timeline</span>
                <ChevronRight className="h-3.5 w-3.5 text-sky-400" />
              </button>
            ) : null}

            <span className="font-mono text-[10px] text-zinc-500">
              Drag node to move
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
