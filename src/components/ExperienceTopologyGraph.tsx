"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Sparkles, 
  ExternalLink, 
  X, 
  ZoomIn, 
  ZoomOut, 
  ChevronRight, 
  HelpCircle, 
  Briefcase, 
  GraduationCap, 
  Bot, 
  ShieldCheck, 
  Trophy, 
  Activity, 
  Layers, 
  Terminal, 
  Globe2,
  Building2,
  Play,
  Pause,
  FastForward,
  Cpu,
  CheckCircle2
} from "lucide-react";
import { sounds } from "@/utils/audio";
import { PERSONAL_INFO, CERTIFICATIONS, AWARDS } from "@/data/portfolioData";

export interface TopologyNode {
  id: string;
  label: string;
  cluster: "core" | "webdev" | "automation" | "pictd" | "education";
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
  orbitIndex: number; // 0=center, 1=inner, 2=mid, 3=outer, 4=far
  baseAngle: number;
  currentAngle: number;
  orbitSpeed: number;
  glyph?: string;
  ringAngle?: number;
  telemetryCode?: string;
  parentHubId?: string;
  // Physics / Canvas Coordinates
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
    bgGlow: "rgba(56, 189, 248, 0.45)",
    title: "Origin Star // Noel C. Raterta Jr.",
    badge: "System Origin Core",
    glyph: "👑",
    telemetry: "KERNEL // ACTIVE",
    icon: Globe2
  },
  webdev: {
    color: "#a855f7", // Purple / Violet
    bgGlow: "rgba(168, 85, 247, 0.4)",
    title: "Web Engineering World",
    badge: "Web Developer",
    glyph: "💼",
    telemetry: "NEXT.JS / LARAVEL",
    icon: Briefcase
  },
  automation: {
    color: "#f59e0b", // Amber Solar
    bgGlow: "rgba(245, 158, 11, 0.4)",
    title: "Automation & Analytics World",
    badge: "Process Automation",
    glyph: "⚡",
    telemetry: "n8n / CRM / SEO",
    icon: Bot
  },
  pictd: {
    color: "#06b6d4", // Cyan Government ICT
    bgGlow: "rgba(6, 182, 212, 0.4)",
    title: "Provincial ICT Division (PICTD)",
    badge: "Government Engineering",
    glyph: "🏛️",
    telemetry: "ANGULAR / NESTJS / NET",
    icon: Building2
  },
  education: {
    color: "#10b981", // Emerald Academic & Honors
    bgGlow: "rgba(16, 185, 129, 0.4)",
    title: "Academic & Honors Constellation",
    badge: "BSIT Foundation",
    glyph: "🎓",
    telemetry: "BSIT / CCNA / HACK4GOV",
    icon: GraduationCap
  }
};

// Official Resume-Accurate Nodes
const RESUME_NODES: Omit<TopologyNode, "x" | "y" | "vx" | "vy" | "currentAngle">[] = [
  // 1. Center Origin Planet (Noel C. Raterta Jr.)
  {
    id: "spade-kun",
    label: "Noel C. Raterta Jr.",
    cluster: "core",
    tagline: "Full Stack Developer",
    roleOrOrg: "Malaybalay City, Bukidnon, Philippines",
    period: "Active",
    location: "Malaybalay City, Bukidnon",
    description: "Full Stack Developer experienced in building web applications with Next.js, Laravel, and modern JavaScript frameworks. Skilled in database management (MySQL, Supabase) and process automation. Committed to delivering scalable, high-performance solutions.",
    milestones: [
      "Experienced in building full-stack web applications with Next.js, Laravel, and modern JavaScript frameworks.",
      "Skilled in database management (MySQL, Supabase) and process automation (n8n, Zoho CRM).",
      "BS Information Technology candidate at Bukidnon State University (2022 - 2026).",
      "Earned Cisco CCNA & Cisco Cybersecurity credentials; Awarded Hack4Gov Region X 1st Runner-Up (2025)."
    ],
    techStack: ["Next.js", "Laravel", "PHP", "React", "Angular", "NestJS", "MySQL", "Supabase", "n8n", "Python", "Java"],
    isCore: true,
    radius: 36,
    orbitIndex: 0,
    baseAngle: 0,
    orbitSpeed: 0,
    ringAngle: -0.32,
    telemetryCode: "ORIGIN // ACTIVE"
  },

  // 2. Hub 1: Web Developer (Freelance Developer) — January 2023 - Present (Quadrant: West / Orbit 1)
  {
    id: "hub-webdev",
    label: "Web Developer (Freelance)",
    cluster: "webdev",
    tagline: "Freelance Web Developer Practice",
    roleOrOrg: "Freelance Developer",
    period: "January 2023 — Present",
    location: "Malaybalay City, Bukidnon, PH",
    description: "Developed 4 custom web applications for diverse clients, including platforms for bookkeeping and plumbing services, using a tech stack of Next.js, Laravel, PHP, and Supabase.",
    milestones: [
      "Developed 4 custom web applications for diverse clients, including platforms for bookkeeping and plumbing services, using a tech stack of Next.js, Laravel, PHP, and Supabase.",
      "Reduced client site maintenance overhead by migrating legacy layouts to modern, responsive frameworks like Next.js and Laravel, resulting in improved site performance.",
      "Integrated third-party APIs and databases (MySQL, Supabase) to build secure authentication and backend-driven platforms for small-scale business operations.",
      "Engineered API integrations for five client-facing platforms over 12 months, automating data exchange between Next.js/Laravel frontends and MySQL/Supabase backends, resulting in 30% faster onboarding and enhanced transactional reliability."
    ],
    techStack: ["Next.js", "Laravel", "PHP", "Supabase", "MySQL", "REST APIs", "Tailwind CSS"],
    isClusterHub: true,
    radius: 25,
    orbitIndex: 1,
    baseAngle: Math.PI * 0.85,
    orbitSpeed: 0.0004,
    glyph: "💼",
    ringAngle: 0.28,
    telemetryCode: "PROD // 200 OK"
  },
  {
    id: "node-4-apps",
    label: "4 Custom Client Web Apps",
    cluster: "webdev",
    tagline: "Bookkeeping & Plumbing Client Platforms",
    roleOrOrg: "Freelance Developer Project",
    period: "January 2023 — Present",
    description: "Custom-developed web applications for commercial bookkeeping and trade plumbing clients engineered with Next.js, Laravel, PHP, and Supabase.",
    milestones: [
      "Built bespoke service platforms tailored for specific business conversion funnels.",
      "Architected sub-second response times using modern reactive frameworks."
    ],
    techStack: ["Next.js", "Laravel", "PHP", "Supabase"],
    radius: 13,
    orbitIndex: 1,
    baseAngle: 0,
    orbitSpeed: 0.0004,
    parentHubId: "hub-webdev"
  },
  {
    id: "node-framework-migration",
    label: "Legacy Framework Migration",
    cluster: "webdev",
    tagline: "Maintenance Reduction & Speed Tuning",
    roleOrOrg: "Freelance Architecture",
    description: "Reduced client site maintenance overhead by migrating legacy layouts to modern, responsive frameworks like Next.js and Laravel, resulting in improved site performance.",
    milestones: [
      "Eliminated layout shifts and achieved mobile-responsive performance.",
      "Modernized legacy PHP codebases into modular MVC component structures."
    ],
    techStack: ["Next.js", "Laravel", "Performance Optimization"],
    radius: 12,
    orbitIndex: 1,
    baseAngle: (Math.PI * 2) / 3,
    orbitSpeed: 0.0004,
    parentHubId: "hub-webdev"
  },
  {
    id: "node-api-databases",
    label: "API Integrations & 30% Onboarding",
    cluster: "webdev",
    tagline: "Automated Data Exchange & Auth",
    roleOrOrg: "Freelance Architecture",
    description: "Engineered API integrations for five client-facing platforms over 12 months, automating data exchange between Next.js/Laravel frontends and MySQL/Supabase backends, resulting in 30% faster onboarding and enhanced transactional reliability.",
    milestones: [
      "Integrated third-party APIs and databases (MySQL, Supabase) for secure authentication.",
      "Automated bidirectional data sync between frontend states and backend databases."
    ],
    techStack: ["REST APIs", "MySQL", "Supabase", "Authentication"],
    radius: 12,
    orbitIndex: 1,
    baseAngle: (Math.PI * 4) / 3,
    orbitSpeed: 0.0004,
    parentHubId: "hub-webdev"
  },

  // 3. Hub 2: Automation, CRM, Analytics & Website Tools Practice — January 2024 - Present (Quadrant: Northwest / Orbit 2)
  {
    id: "hub-automation",
    label: "Automation & Website Practice",
    cluster: "automation",
    tagline: "n8n Workflows, Zoho CRM & Squarespace",
    roleOrOrg: "Automation & Website Tools Practice",
    period: "January 2024 — Present",
    location: "Remote / Independent",
    description: "Automated business processes using n8n workflows, increasing operational efficiency for lead management and task routing. Leveraged Zoho CRM and Google Analytics to deliver actionable insights on user engagement and conversion metrics.",
    milestones: [
      "Automated business processes using n8n workflows, increasing operational efficiency for lead management and task routing.",
      "Leveraged Zoho CRM and Google Analytics to deliver actionable insights on user engagement and conversion metrics.",
      "Managed professional web presence for clients via Squarespace, optimizing layouts for brand alignment and SEO performance."
    ],
    techStack: ["n8n", "Zoho CRM", "Google Analytics", "Squarespace", "SEO", "Lead Routing"],
    isClusterHub: true,
    radius: 25,
    orbitIndex: 2,
    baseAngle: -Math.PI * 0.65,
    orbitSpeed: 0.0003,
    glyph: "⚡",
    ringAngle: 0.35,
    telemetryCode: "n8n // 100% UP"
  },
  {
    id: "node-n8n-lead",
    label: "n8n Workflow Automation",
    cluster: "automation",
    tagline: "Automated Lead Management & Task Routing",
    roleOrOrg: "Automation Practice",
    description: "Automated business processes using n8n workflows, increasing operational efficiency for lead management, contact deduplication, and automated task routing.",
    milestones: [
      "Engineered multi-node automated workflows triggering on webhooks and incoming leads.",
      "Designed fault-tolerant error recovery routines preventing lost task dispatches."
    ],
    techStack: ["n8n", "Workflow Automation", "Webhooks", "JSON"],
    radius: 13,
    orbitIndex: 2,
    baseAngle: 0,
    orbitSpeed: 0.0003,
    parentHubId: "hub-automation"
  },
  {
    id: "node-zoho-analytics",
    label: "Zoho CRM & Google Analytics",
    cluster: "automation",
    tagline: "User Engagement & Conversion Metrics",
    roleOrOrg: "Analytics Practice",
    description: "Leveraged Zoho CRM and Google Analytics to deliver actionable insights on user engagement, audience drop-off points, and conversion metrics.",
    milestones: [
      "Configured conversion funnels and user event telemetry in Google Analytics Admin.",
      "Synchronized qualified leads with Zoho CRM pipeline stages."
    ],
    techStack: ["Zoho CRM", "Google Analytics", "Search Console", "PageSpeed"],
    radius: 12,
    orbitIndex: 2,
    baseAngle: (Math.PI * 2) / 3,
    orbitSpeed: 0.0003,
    parentHubId: "hub-automation"
  },
  {
    id: "node-squarespace-seo",
    label: "Squarespace Client Presences",
    cluster: "automation",
    tagline: "Brand Alignment & SEO Performance",
    roleOrOrg: "Website Tools Practice",
    description: "Managed professional web presence for clients via Squarespace, optimizing layouts for brand alignment, typography hierarchy, and SEO performance.",
    milestones: [
      "Custom CSS styling overrides matching client brand guidelines.",
      "Achieved high mobile lighthouse scores and search visibility."
    ],
    techStack: ["Squarespace", "SEO Optimization", "CSS", "Brand Layouts"],
    radius: 12,
    orbitIndex: 2,
    baseAngle: (Math.PI * 4) / 3,
    orbitSpeed: 0.0003,
    parentHubId: "hub-automation"
  },

  // 4. Hub 3: Intern - Technical Support and Web Development (PICTD Bukidnon) — February 2026 - May 2026 (Quadrant: Southeast / Orbit 3)
  {
    id: "hub-pictd",
    label: "Provincial ICT Division (PICTD)",
    cluster: "pictd",
    tagline: "Full-Stack Development & Network Infrastructure",
    roleOrOrg: "Provincial Government of Bukidnon",
    period: "February 2026 — May 2026",
    location: "Malaybalay City, Bukidnon",
    description: "Assisted in full-stack development tasks using Angular, NestJS, ORM, and MySQL for inventory and HRMIS-related systems. Supported provincial network operations and IT infrastructure.",
    milestones: [
      "Assisted in full-stack development tasks using Angular, NestJS, ORM, and MySQL for inventory and HRMIS-related systems.",
      "Supported network operations including DNS setup, reverse proxy configuration, IP reassignment, VLAN basics, UTP crimping, LAN repair, switch troubleshooting, and speed testing.",
      "Performed IT support tasks such as printer sharing fixes, eTRACS installation, device configuration, software troubleshooting, ICT inventory encoding, and workstation maintenance.",
      "Prepared CCTV, cabinet, and command center layout documentation for infrastructure planning and office monitoring support."
    ],
    techStack: ["Angular", "NestJS", "MySQL", "ORM", "DNS Setup", "Reverse Proxy", "VLAN", "eTRACS", "Networking"],
    isClusterHub: true,
    radius: 25,
    orbitIndex: 3,
    baseAngle: Math.PI * 0.20,
    orbitSpeed: 0.00022,
    glyph: "🏛️",
    ringAngle: -0.22,
    telemetryCode: "GOV // SECURE"
  },
  {
    id: "node-pictd-fullstack",
    label: "Angular & NestJS HRMIS",
    cluster: "pictd",
    tagline: "Government Inventory & Human Resource Systems",
    roleOrOrg: "PICTD Full-Stack Project",
    period: "2026",
    description: "Assisted in full-stack development tasks using Angular, NestJS, ORM, and MySQL for government inventory management and HRMIS-related systems.",
    milestones: [
      "Implemented modular NestJS backend services and Angular interface components.",
      "Maintained relational MySQL schemas for employee records and hardware inventory."
    ],
    techStack: ["Angular", "NestJS", "MySQL", "TypeORM"],
    radius: 13,
    orbitIndex: 3,
    baseAngle: 0,
    orbitSpeed: 0.00022,
    parentHubId: "hub-pictd"
  },
  {
    id: "node-network-ops",
    label: "Network Operations & DNS",
    cluster: "pictd",
    tagline: "VLAN, Reverse Proxy & Switch Troubleshooting",
    roleOrOrg: "PICTD Infrastructure",
    description: "Supported network operations including DNS setup, reverse proxy configuration, IP reassignment, VLAN basics, UTP crimping, LAN repair, switch troubleshooting, and speed testing.",
    milestones: [
      "Configured reverse proxies and local DNS resolution routing tables.",
      "Troubleshot hardware network switches and crimped Cat6 UTP cables for LAN."
    ],
    techStack: ["DNS", "Reverse Proxy", "VLAN", "Switching", "UTP Crimping"],
    radius: 12,
    orbitIndex: 3,
    baseAngle: (Math.PI * 2) / 3,
    orbitSpeed: 0.00022,
    parentHubId: "hub-pictd"
  },
  {
    id: "node-command-center",
    label: "Command Center & CCTV Plans",
    cluster: "pictd",
    tagline: "Infrastructure & Server Cabinet Documentation",
    roleOrOrg: "PICTD Planning",
    description: "Prepared CCTV, server cabinet, and command center layout documentation for provincial infrastructure planning and office monitoring support.",
    milestones: [
      "Created structured CAD/layout documentation for server racks and camera positioning.",
      "Supported installation of eTRACS government tax mapping workstations."
    ],
    techStack: ["CCTV Layout", "Server Cabinets", "eTRACS", "IT Support"],
    radius: 12,
    orbitIndex: 3,
    baseAngle: (Math.PI * 4) / 3,
    orbitSpeed: 0.00022,
    parentHubId: "hub-pictd"
  },

  // 5. Hub 4: Bachelor of Science in Information Technology & Honors (Bukidnon State University) (Quadrant: Northeast / Orbit 4)
  {
    id: "hub-education",
    label: "BS Information Technology",
    cluster: "education",
    tagline: "Bukidnon State University · 2022 - 2026",
    roleOrOrg: "Bukidnon State University",
    period: "2022 — 2026",
    location: "Bukidnon, Philippines",
    description: "Bachelor of Science in Information Technology. Rigorous computing education covering software engineering, relational database normalization, data structures, algorithms, and defensive networking.",
    milestones: [
      "Bachelor of Science in Information Technology candidate (2022 - 2026).",
      "Certified in CCNA: Switching, Routing, and Wireless Essentials; Cisco Cybersecurity.",
      "Awarded First Runner-Up in Hack4Gov Region X (2025) cybersecurity and solution challenge."
    ],
    techStack: ["Java", "C", "Python", "Data Structures", "Algorithms", "Cisco CCNA", "Cybersecurity"],
    isClusterHub: true,
    radius: 25,
    orbitIndex: 4,
    baseAngle: -Math.PI * 0.25,
    orbitSpeed: 0.00016,
    glyph: "🎓",
    ringAngle: -0.28,
    telemetryCode: "BSIT // 2022-2026"
  },
  {
    id: "node-cisco-ccna",
    label: "Cisco CCNA Certification",
    cluster: "education",
    tagline: "Switching, Routing, and Wireless Essentials",
    roleOrOrg: "Verified Certification",
    description: "Official Cisco certification covering enterprise switching protocols, IPv4/IPv6 subnetting, static and dynamic routing, VLAN segmentation, and wireless essentials.",
    milestones: [
      "Certified in enterprise routing and switching topology design.",
      "Mastery of packet transport, spanning tree protocol, and wireless LAN controllers."
    ],
    techStack: ["Cisco CCNA", "Routing", "Switching", "Wireless"],
    radius: 13,
    orbitIndex: 4,
    baseAngle: 0,
    orbitSpeed: 0.00016,
    parentHubId: "hub-education"
  },
  {
    id: "node-hack4gov-award",
    label: "Hack4Gov Region X 1st Runner-Up",
    cluster: "education",
    tagline: "Cybersecurity & Solution-Development Award (2025)",
    roleOrOrg: "Honors & Awards • Bukidnon 2025",
    description: "Contributed to a team-based cybersecurity and solution-development challenge involving problem analysis, defensive collaboration, vulnerability detection, and live presentation.",
    milestones: [
      "Earned First Runner-Up in regional cybersecurity challenge.",
      "Executed threat modeling, secure architecture analysis, and team defense presentation."
    ],
    techStack: ["Cybersecurity", "Incident Analysis", "Threat Modeling"],
    radius: 13,
    orbitIndex: 4,
    baseAngle: (Math.PI * 2) / 3,
    orbitSpeed: 0.00016,
    parentHubId: "hub-education"
  },
  {
    id: "node-cisco-cybersec",
    label: "Cisco Cybersecurity Credential",
    cluster: "education",
    tagline: "Network Defense & Threat Hardening",
    roleOrOrg: "Verified Certification",
    description: "Verified Cisco credential focusing on confidentiality, integrity, availability (CIA triad), cryptography fundamentals, firewall policies, and endpoint security hardening.",
    milestones: [
      "Certified in foundational network threat mitigation and security principles.",
      "Applied defensive practices across web and server application architectures."
    ],
    techStack: ["Cisco Cybersecurity", "Cryptography", "Network Security"],
    radius: 12,
    orbitIndex: 4,
    baseAngle: (Math.PI * 4) / 3,
    orbitSpeed: 0.00016,
    parentHubId: "hub-education"
  }
];

const RESUME_LINKS: TopologyLink[] = [
  // Core Origin Star to the 4 Cluster Worlds
  { source: "spade-kun", target: "hub-webdev", color: "#a855f7" },
  { source: "spade-kun", target: "hub-automation", color: "#f59e0b" },
  { source: "spade-kun", target: "hub-pictd", color: "#06b6d4" },
  { source: "spade-kun", target: "hub-education", color: "#10b981" },

  // WebDev World Moons
  { source: "hub-webdev", target: "node-4-apps", color: "#a855f7" },
  { source: "hub-webdev", target: "node-framework-migration", color: "#a855f7" },
  { source: "hub-webdev", target: "node-api-databases", color: "#a855f7" },

  // Automation World Moons
  { source: "hub-automation", target: "node-n8n-lead", color: "#f59e0b" },
  { source: "hub-automation", target: "node-zoho-analytics", color: "#f59e0b" },
  { source: "hub-automation", target: "node-squarespace-seo", color: "#f59e0b" },

  // PICTD World Moons
  { source: "hub-pictd", target: "node-pictd-fullstack", color: "#06b6d4" },
  { source: "hub-pictd", target: "node-network-ops", color: "#06b6d4" },
  { source: "hub-pictd", target: "node-command-center", color: "#06b6d4" },

  // Education World Moons
  { source: "hub-education", target: "node-cisco-ccna", color: "#10b981" },
  { source: "hub-education", target: "node-hack4gov-award", color: "#10b981" },
  { source: "hub-education", target: "node-cisco-cybersec", color: "#10b981" }
];

interface DataSpark {
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardBodyRef = useRef<HTMLDivElement>(null);
  const avatarImgRef = useRef<HTMLImageElement | null>(null);

  // States
  const [nodes, setNodes] = useState<TopologyNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TopologyNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TopologyNode | null>(null);
  const [activeCluster, setActiveCluster] = useState<string>("all");
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState<number>(1); // 0=paused, 1=normal, 2=warp
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Auto-scroll card body to top on node selection change or reset
  useEffect(() => {
    if (cardBodyRef.current) {
      cardBodyRef.current.scrollTop = 0;
    }
  }, [selectedNode?.id]);

  // Camera & Physics references
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1, targetX: 0, targetY: 0, targetZoom: 1 });
  const draggingNodeRef = useRef<TopologyNode | null>(null);
  const isPanningRef = useRef<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(1);
  const dataSparksRef = useRef<DataSpark[]>([]);
  const rafRef = useRef<number | null>(null);
  const nodesRef = useRef<TopologyNode[]>([]);
  const isIntersectingRef = useRef<boolean>(true);
  const timeRef = useRef<number>(0);

  // Pre-load Noel's Profile Image for Center Core Planet
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/Picture.png";
    img.onload = () => {
      avatarImgRef.current = img;
    };
  }, []);

  // Initialize nodes onto orbital rings
  const initializeGraph = useCallback((width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;

    // Defined orbital radii for the 4 planetary worlds with ample space
    const orbitRadii = [0, 160, 230, 300, 370];

    const initialNodes: TopologyNode[] = RESUME_NODES.map((init) => {
      if (init.isCore) {
        return {
          ...init,
          currentAngle: 0,
          x: cx,
          y: cy,
          vx: 0,
          vy: 0
        };
      }
      if (init.isClusterHub) {
        const radiusDist = orbitRadii[init.orbitIndex] || 160;
        const angle = init.baseAngle;
        const x = cx + Math.cos(angle) * radiusDist;
        const y = cy + Math.sin(angle) * (radiusDist * 0.68);
        return {
          ...init,
          currentAngle: angle,
          x,
          y,
          vx: 0,
          vy: 0
        };
      }
      return {
        ...init,
        currentAngle: init.baseAngle,
        x: cx,
        y: cy,
        vx: 0,
        vy: 0
      };
    });

    // Position satellite nodes cleanly around their parent hubs like moons
    for (let i = 0; i < initialNodes.length; i++) {
      const n = initialNodes[i];
      if (n.parentHubId) {
        const parent = initialNodes.find(p => p.id === n.parentHubId);
        if (parent) {
          const moonDist = 48;
          n.x = parent.x + Math.cos(n.baseAngle) * moonDist;
          n.y = parent.y + Math.sin(n.baseAngle) * (moonDist * 0.75);
        }
      }
    }

    nodesRef.current = initialNodes;
    setNodes(initialNodes);

    // Default select Noel's Core Node so Telemetry Deck immediately displays official summary
    setSelectedNode(initialNodes[0]);

    // Initialize cosmic data sparks
    const sparks: DataSpark[] = [];
    for (let i = 0; i < RESUME_LINKS.length; i++) {
      sparks.push({
        linkIdx: i,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.003,
        color: RESUME_LINKS[i].color || "#38bdf8"
      });
      sparks.push({
        linkIdx: i,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.003,
        color: RESUME_LINKS[i].color || "#38bdf8"
      });
    }
    dataSparksRef.current = sparks;
  }, []);

  // Resize listener: measures actual viewport dimensions for perfect centering
  useEffect(() => {
    const handleResize = () => {
      const viewport = viewportRef.current;
      const canvas = canvasRef.current;
      if (!viewport || !canvas) return;

      const rect = viewport.getBoundingClientRect();
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

  // Intersection Observer
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(
      (entries) => {
        isIntersectingRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  // Smooth, Non-Trapping Mouse Wheel Zoom
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheelNative = (e: WheelEvent) => {
      // Prevents page scroll while rolling mouse wheel over the canvas viewport
      e.preventDefault();
      e.stopPropagation();

      const factor = e.deltaY < 0 ? 1.09 : 0.91;
      const newZoom = Math.max(0.5, Math.min(2.5, cameraRef.current.targetZoom * factor));
      cameraRef.current.targetZoom = newZoom;
    };

    viewport.addEventListener("wheel", onWheelNative, { passive: false });
    return () => {
      viewport.removeEventListener("wheel", onWheelNative);
    };
  }, []);

  // Main Canvas Render & Orbital Mechanics Loop
  useEffect(() => {
    let active = true;

    const render = () => {
      if (!active) return;

      if (!isIntersectingRef.current) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

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

      timeRef.current += 0.02 * orbitSpeedMultiplier;
      const time = timeRef.current;

      // Smooth camera interpolation
      const cam = cameraRef.current;
      cam.x += (cam.targetX - cam.x) * 0.12;
      cam.y += (cam.targetY - cam.y) * 0.12;
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.12;

      // Orbital Simulation: Update node coordinates along their orbital radii
      const curNodes = nodesRef.current;
      const draggingNode = draggingNodeRef.current;
      const orbitRadii = [0, 160, 230, 300, 370];

      for (let i = 0; i < curNodes.length; i++) {
        const n = curNodes[i];
        if (n.isCore) {
          n.x = cx;
          n.y = cy;
          continue;
        }

        if (n === draggingNode) {
          continue; // User is manually dragging this node
        }

        if (n.parentHubId) {
          // Satellite node orbiting its parent hub like a moon
          const parent = curNodes.find(p => p.id === n.parentHubId);
          if (parent) {
            if (orbitSpeedMultiplier > 0) {
              n.currentAngle += 0.007 * orbitSpeedMultiplier;
            }
            const moonDist = 48;
            const targetX = parent.x + Math.cos(n.currentAngle) * moonDist;
            const targetY = parent.y + Math.sin(n.currentAngle) * (moonDist * 0.75);

            n.x += (targetX - n.x) * 0.15;
            n.y += (targetY - n.y) * 0.15;
          }
          continue;
        }

        // Advance orbital angle for Hub Planets
        if (orbitSpeedMultiplier > 0) {
          n.currentAngle += n.orbitSpeed * orbitSpeedMultiplier;
        }

        const rDist = orbitRadii[n.orbitIndex] || 160;
        const targetX = cx + Math.cos(n.currentAngle) * rDist;
        const targetY = cy + Math.sin(n.currentAngle) * (rDist * 0.68);

        // Smoothly ease towards theoretical orbital coordinate
        n.x += (targetX - n.x) * 0.1;
        n.y += (targetY - n.y) * 0.1;
      }

      // Smooth Category Planet Centering & Tracking
      if (activeCluster !== "all" && !isPanningRef.current && !draggingNodeRef.current) {
        const focusedHub = curNodes.find(n => n.cluster === activeCluster && n.isClusterHub);
        if (focusedHub) {
          cam.targetX = (cx - focusedHub.x) * cam.zoom;
          cam.targetY = (cy - focusedHub.y) * cam.zoom;
        }
      }

      // Clear Canvas
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep Space Sci-Fi Viewport Matrix Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.018)";
      ctx.lineWidth = 1;
      const gridSize = 45;
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

      // Coordinate crosshairs '+'
      ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let x = gridSize * 2; x < width; x += gridSize * 3) {
        for (let y = gridSize * 2; y < height; y += gridSize * 3) {
          ctx.fillText("+", x, y);
        }
      }

      // Apply Camera Transform
      ctx.save();
      ctx.translate(cx + cam.x, cy + cam.y);
      ctx.scale(cam.zoom, cam.zoom);
      ctx.translate(-cx, -cy);

      // ==========================================
      // DRAW VISIBLE CONCENTRIC GRAVITATIONAL ORBITS
      // ==========================================
      for (let oIdx = 1; oIdx < orbitRadii.length; oIdx++) {
        const rDist = orbitRadii[oIdx];
        ctx.beginPath();
        ctx.ellipse(cx, cy, rDist, rDist * 0.68, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.045)";
        ctx.setLineDash([3, 7]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Faint orbital ring degree labels
        ctx.font = "8px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillText(`ORBIT-0${oIdx}`, cx + rDist + 5, cy);
      }

      // Faint mini moon orbits around each hub planet
      for (let i = 0; i < curNodes.length; i++) {
        const n = curNodes[i];
        if (n.isClusterHub) {
          ctx.beginPath();
          ctx.ellipse(n.x, n.y, 48, 48 * 0.75, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
          ctx.setLineDash([2, 5]);
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // ==========================================
      // DRAW GRAVITATIONAL LINKS
      // ==========================================
      for (let k = 0; k < RESUME_LINKS.length; k++) {
        const link = RESUME_LINKS[k];
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
          ctx.lineWidth = 2.4;
        } else {
          ctx.strokeStyle = isDimmed ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1.2;
        }
        ctx.stroke();
      }

      // ==========================================
      // DRAW CELESTIAL ENERGY SPARKS
      // ==========================================
      const sparks = dataSparksRef.current;
      for (let pIdx = 0; pIdx < sparks.length; pIdx++) {
        const p = sparks[pIdx];
        p.progress += p.speed * orbitSpeedMultiplier;
        if (p.progress > 1) p.progress = 0;

        const link = RESUME_LINKS[p.linkIdx];
        if (!link) continue;
        const s = curNodes.find(n => n.id === link.source);
        const t = curNodes.find(n => n.id === link.target);
        if (!s || !t) continue;

        const px = s.x + (t.x - s.x) * p.progress;
        const py = s.y + (t.y - s.y) * p.progress;
        const angle = Math.atan2(t.y - s.y, t.x - s.x);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.rect(-3.5, -1, 7, 2);
        ctx.fillStyle = p.color || "#38bdf8";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(2.5, 0, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.restore();
      }

      // ==========================================
      // DRAW 3D PLANETS & NOEL'S CELESTIAL STAR
      // ==========================================
      for (let i = 0; i < curNodes.length; i++) {
        const node = curNodes[i];
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        const config = CLUSTER_CONFIG[node.cluster] || CLUSTER_CONFIG.webdev;

        const isConnected = (hoveredNode && RESUME_LINKS.some(l => 
          (l.source === hoveredNode.id && l.target === node.id) ||
          (l.target === hoveredNode.id && l.source === node.id)
        )) || (selectedNode && RESUME_LINKS.some(l => 
          (l.source === selectedNode.id && l.target === node.id) ||
          (l.target === selectedNode.id && l.source === node.id)
        ));

        const isDimmed = (hoveredNode || selectedNode) && !isHovered && !isSelected && !isConnected;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.18 : 1.0;

        // 1. Atmosphere Corona Glow (Planetary Backlight)
        const glowRadius = node.radius + (node.isCore ? 26 : node.isClusterHub ? 18 : 11);
        const glowGrad = ctx.createRadialGradient(
          node.x, node.y, node.radius * 0.4,
          node.x, node.y, glowRadius
        );
        glowGrad.addColorStop(0, config.bgGlow);
        glowGrad.addColorStop(0.7, config.bgGlow.replace("0.4", "0.12").replace("0.45", "0.15"));
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // 2. Interactive Expanding Cosmic Ripple on Hover / Select
        if (isHovered || isSelected) {
          const pulseR = node.radius + 8 + (Math.sin(time * 4) + 1) * 3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = config.color;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }

        // ==========================================
        // TYPE A: NOEL'S PRIMARY ORIGIN STAR (AVATAR + SATURN RINGS)
        // ==========================================
        if (node.isCore) {
          // A. Back Planetary Rings
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(node.ringAngle || -0.3);
          
          ctx.beginPath();
          ctx.ellipse(0, 0, node.radius * 1.85, node.radius * 0.52, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
          ctx.lineWidth = 2.2;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(0, 0, node.radius * 1.5, node.radius * 0.42, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 1.0;
          ctx.stroke();
          ctx.restore();

          // B. 3D Planet Sphere Base
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.clip();

          if (avatarImgRef.current && avatarImgRef.current.complete) {
            ctx.drawImage(
              avatarImgRef.current,
              node.x - node.radius,
              node.y - node.radius,
              node.radius * 2,
              node.radius * 2
            );
          } else {
            const sphereGrad = ctx.createRadialGradient(
              node.x - node.radius * 0.35, node.y - node.radius * 0.35, node.radius * 0.1,
              node.x, node.y, node.radius
            );
            sphereGrad.addColorStop(0, "#38bdf8");
            sphereGrad.addColorStop(0.5, "#0b2038");
            sphereGrad.addColorStop(1, "#030812");
            ctx.fillStyle = sphereGrad;
            ctx.fill();
          }

          // Shaded celestial overlay
          const atmoLighting = ctx.createRadialGradient(
            node.x - node.radius * 0.35, node.y - node.radius * 0.35, node.radius * 0.2,
            node.x, node.y, node.radius
          );
          atmoLighting.addColorStop(0, "rgba(56, 189, 248, 0.05)");
          atmoLighting.addColorStop(0.6, "rgba(10, 25, 45, 0.3)");
          atmoLighting.addColorStop(1, "rgba(2, 6, 14, 0.85)");
          ctx.fillStyle = atmoLighting;
          ctx.fill();

          ctx.restore();

          // Glowing Cyber Rim
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? "#ffffff" : isHovered ? "#ffffff" : "#38bdf8";
          ctx.lineWidth = isSelected ? 2.6 : 1.8;
          ctx.stroke();

          // Front Planetary Rings
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(node.ringAngle || -0.3);
          
          ctx.beginPath();
          ctx.ellipse(0, 0, node.radius * 1.85, node.radius * 0.52, 0, 0, Math.PI);
          ctx.strokeStyle = isSelected ? "#ffffff" : "#38bdf8";
          ctx.lineWidth = 2.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(0, 0, node.radius * 1.5, node.radius * 0.42, 0, 0, Math.PI);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
          ctx.lineWidth = 1.0;
          ctx.stroke();

          // Orbiting Ring Satellite
          const satAngle = time * 1.4;
          const satX = Math.cos(satAngle) * (node.radius * 1.85);
          const satY = Math.sin(satAngle) * (node.radius * 0.52);
          ctx.beginPath();
          ctx.arc(satX, satY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          ctx.restore();

        // ==========================================
        // TYPE B: CLUSTER HUB PLANETARY GIANTS
        // ==========================================
        } else if (node.isClusterHub) {
          // Back Planetary Ring
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(node.ringAngle || 0.25);
          ctx.beginPath();
          ctx.ellipse(0, 0, node.radius * 1.7, node.radius * 0.48, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = config.color + "55";
          ctx.lineWidth = 1.8;
          ctx.stroke();
          ctx.restore();

          // 3D Spherical Shaded Planet Body
          const lightX = node.x - node.radius * 0.35;
          const lightY = node.y - node.radius * 0.35;
          const planetGrad = ctx.createRadialGradient(
            lightX, lightY, node.radius * 0.1,
            node.x, node.y, node.radius
          );

          planetGrad.addColorStop(0, "#ffffff");
          planetGrad.addColorStop(0.2, config.color);
          planetGrad.addColorStop(0.65, "#0e111d");
          planetGrad.addColorStop(1, "#030408");

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = planetGrad;
          ctx.fill();

          ctx.strokeStyle = isSelected ? "#ffffff" : isHovered ? "#ffffff" : config.color;
          ctx.lineWidth = isSelected ? 2.4 : isHovered ? 2.0 : 1.4;
          ctx.stroke();

          // Central Icon / Stylized Glyph
          ctx.font = "bold 13px system-ui, sans-serif";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.glyph || "⬡", node.x, node.y);

          // Front Planetary Ring
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(node.ringAngle || 0.25);
          ctx.beginPath();
          ctx.ellipse(0, 0, node.radius * 1.7, node.radius * 0.48, 0, 0, Math.PI);
          ctx.strokeStyle = isSelected ? "#ffffff" : config.color + "cc";
          ctx.lineWidth = 2.0;
          ctx.stroke();

          // Orbiting Moon
          const moonAngle = time * 1.2 + i;
          const moonDistX = node.radius * 1.7;
          const moonDistY = node.radius * 0.48;
          const moonX = Math.cos(moonAngle) * moonDistX;
          const moonY = Math.sin(moonAngle) * moonDistY;
          ctx.beginPath();
          ctx.arc(moonX, moonY, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          ctx.restore();

        // ==========================================
        // TYPE C: MILESTONE LEAF NODES (CRYSTAL CELESTIAL MOONS)
        // ==========================================
        } else {
          const lightX = node.x - node.radius * 0.35;
          const lightY = node.y - node.radius * 0.35;
          const moonGrad = ctx.createRadialGradient(
            lightX, lightY, node.radius * 0.1,
            node.x, node.y, node.radius
          );

          moonGrad.addColorStop(0, "#ffffff");
          moonGrad.addColorStop(0.25, config.color);
          moonGrad.addColorStop(0.7, "#0c0e18");
          moonGrad.addColorStop(1, "#030408");

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = moonGrad;
          ctx.fill();

          ctx.strokeStyle = isSelected ? "#ffffff" : isHovered ? "#ffffff" : config.color;
          ctx.lineWidth = isSelected ? 2.2 : isHovered ? 1.8 : 1.2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? "#ffffff" : config.color;
          ctx.fill();
        }

        // ==========================================
        // HUD FROSTED PILL BADGE FOR LABELS
        // ==========================================
        const isMoon = !!node.parentHubId;
        const parentNode = isMoon ? curNodes.find(p => p.id === node.parentHubId) : null;
        const isAboveParent = parentNode ? node.y < parentNode.y : false;

        ctx.font = node.isCore 
          ? "bold 12px JetBrains Mono, monospace" 
          : node.isClusterHub 
            ? "600 11px JetBrains Mono, monospace" 
            : "500 9.5px JetBrains Mono, monospace";

        const textMetrics = ctx.measureText(node.label);
        const textWidth = textMetrics.width;
        const pillHeight = isMoon ? 18 : 20;
        const pillWidth = textWidth + (isMoon ? 18 : 22);
        const pillX = node.x - pillWidth / 2;
        const pillY = isMoon
          ? (isAboveParent ? node.y - node.radius - pillHeight - 4 : node.y + node.radius + 6)
          : (node.y + node.radius + 10);

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, isMoon ? 4 : 5);
        } else {
          ctx.rect(pillX, pillY, pillWidth, pillHeight);
        }
        ctx.fillStyle = isSelected
          ? "rgba(18, 24, 42, 0.95)"
          : isHovered
            ? "rgba(15, 20, 35, 0.92)"
            : "rgba(8, 10, 18, 0.85)";
        ctx.fill();
        
        ctx.strokeStyle = isSelected
          ? "#ffffff"
          : isHovered
            ? config.color
            : "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pillX + (isMoon ? 7 : 9), pillY + pillHeight / 2, isMoon ? 2 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = config.color;
        ctx.fill();

        ctx.fillStyle = isSelected 
          ? "#ffffff" 
          : isHovered 
            ? "#ffffff" 
            : isDimmed 
              ? "rgba(255, 255, 255, 0.45)" 
              : "rgba(255, 255, 255, 0.9)";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, pillX + (isMoon ? 13 : 16), pillY + pillHeight / 2);

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
  }, [hoveredNode, selectedNode, orbitSpeedMultiplier]);

  // Coordinate conversion helpers
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

  const findNodeAtCoords = useCallback((graphX: number, graphY: number) => {
    const curNodes = nodesRef.current;
    for (let i = curNodes.length - 1; i >= 0; i--) {
      const n = curNodes[i];
      const dx = graphX - n.x;
      const dy = graphY - n.y;
      if (dx * dx + dy * dy <= (n.radius + 14) * (n.radius + 14)) {
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

      if (hit.isCore) {
        handleRecenter();
      } else if (hit.isClusterHub) {
        setActiveCluster(hit.cluster);
        const canvas = canvasRef.current;
        if (canvas) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const cx = (canvas.width / dpr) / 2;
          const cy = (canvas.height / dpr) / 2;
          cameraRef.current.targetZoom = 1.25;
          cameraRef.current.targetX = (cx - hit.x) * 1.25;
          cameraRef.current.targetY = (cy - hit.y) * 1.25;
        }
      } else {
        // Satellite moon clicked: center on it
        setActiveCluster(hit.cluster);
        const canvas = canvasRef.current;
        if (canvas) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const cx = (canvas.width / dpr) / 2;
          const cy = (canvas.height / dpr) / 2;
          cameraRef.current.targetZoom = 1.35;
          cameraRef.current.targetX = (cx - hit.x) * 1.35;
          cameraRef.current.targetY = (cy - hit.y) * 1.35;
        }
      }
    } else {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { x, y } = getGraphCoords(e.clientX, e.clientY);

    if (draggingNodeRef.current) {
      draggingNodeRef.current.x = x;
      draggingNodeRef.current.y = y;
      return;
    }

    if (isPanningRef.current) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      panStartRef.current = { x: e.clientX, y: e.clientY };
      cameraRef.current.targetX += dx;
      cameraRef.current.targetY += dy;
      return;
    }

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

  // Touch Support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistRef.current = Math.sqrt(dx * dx + dy * dy);
      touchStartZoomRef.current = cameraRef.current.targetZoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.sqrt(dx * dx + dy * dy);
      const ratio = currentDist / touchStartDistRef.current;
      const newZoom = Math.max(0.4, Math.min(2.8, touchStartZoomRef.current * ratio));
      cameraRef.current.targetZoom = newZoom;
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
  };

  // Zoom Controls
  const handleZoomIn = () => {
    sounds.playClick("soft");
    cameraRef.current.targetZoom = Math.min(2.5, cameraRef.current.targetZoom * 1.2);
  };

  const handleZoomOut = () => {
    sounds.playClick("soft");
    cameraRef.current.targetZoom = Math.max(0.5, cameraRef.current.targetZoom * 0.82);
  };

  const handleRecenter = () => {
    sounds.playClick("soft");
    setActiveCluster("all");
    if (nodesRef.current[0]) {
      setSelectedNode(nodesRef.current[0]); // Reset dossier card to Noel's origin node!
    }
    cameraRef.current.targetX = 0;
    cameraRef.current.targetY = 0;
    cameraRef.current.targetZoom = 1.0;
  };

  const toggleOrbitSpeed = () => {
    sounds.playClick("toggle");
    if (orbitSpeedMultiplier === 1) setOrbitSpeedMultiplier(2);
    else if (orbitSpeedMultiplier === 2) setOrbitSpeedMultiplier(0);
    else setOrbitSpeedMultiplier(1);
  };

  // Focus a specific cluster & center on its Hub Planet
  const handleSelectCluster = (clusterKey: string) => {
    sounds.playClick("soft");
    setActiveCluster(clusterKey);
    if (clusterKey === "all") {
      handleRecenter();
    } else {
      const hub = nodesRef.current.find(n => n.cluster === clusterKey && n.isClusterHub);
      if (hub) {
        setSelectedNode(hub);
        const canvas = canvasRef.current;
        if (canvas) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const cx = (canvas.width / dpr) / 2;
          const cy = (canvas.height / dpr) / 2;
          cameraRef.current.targetZoom = 1.25;
          cameraRef.current.targetX = (cx - hub.x) * 1.25;
          cameraRef.current.targetY = (cy - hub.y) * 1.25;
        }
      }
    }
  };

  const selectedConfig = selectedNode 
    ? (CLUSTER_CONFIG[selectedNode.cluster] || CLUSTER_CONFIG.webdev)
    : null;

  const connectedNeighbors = selectedNode ? nodesRef.current.filter(n => 
    RESUME_LINKS.some(l => 
      (l.source === selectedNode.id && l.target === n.id) ||
      (l.target === selectedNode.id && l.source === n.id)
    )
  ) : [];

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full rounded-3xl border border-white/[0.1] bg-[#05060a] overflow-hidden select-none transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "h-[960px] lg:h-[660px]"
      }`}
    >
      {/* 
        =========================================================================
        INTEGRATED PANORAMIC COCKPIT (SPLIT VIEW ON DESKTOP, STACKED ON MOBILE)
        A truly unique, original approach — NOT a copy of the Lister side-drawer!
        =========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        {/* =====================================================================
            STAGE A (LEFT / 7 COLS): THE 3D CELESTIAL ORBITAL VIEWPORT
            ===================================================================== */}
        <div 
          ref={viewportRef}
          data-lenis-prevent="true"
          className="h-[520px] lg:h-full lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/[0.08] overflow-hidden bg-[#040508]"
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
          />

          {/* Top Bar: Viewport Telemetry Header & Controls */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-20">
            {/* Viewport Identifier */}
            <div className="flex items-center gap-2 pointer-events-auto bg-[#0a0b16]/90 backdrop-blur-xl border border-white/[0.1] rounded-full px-3 py-1 font-mono text-xs shadow-lg">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-white font-semibold tracking-tight text-[11px] sm:text-xs">Orbital Matrix // Systems Cockpit</span>
            </div>

            {/* Viewport Toolbar: Zoom, Recenter, Orbit Speed & Fullscreen */}
            <div className="flex items-center gap-1 pointer-events-auto bg-[#0a0b16]/90 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-1 shadow-lg font-mono text-xs">
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={handleRecenter}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="Recenter Origin"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={toggleOrbitSpeed}
                className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-mono transition-colors cursor-pointer ${
                  orbitSpeedMultiplier === 0 
                    ? "bg-red-500/20 text-red-300 border border-red-500/30" 
                    : orbitSpeedMultiplier === 2 
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
                title="Toggle Orbital Simulation Speed"
              >
                {orbitSpeedMultiplier === 0 ? <Pause className="h-3 w-3" /> : orbitSpeedMultiplier === 2 ? <FastForward className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                <span>{orbitSpeedMultiplier === 0 ? "PAUSED" : orbitSpeedMultiplier === 2 ? "2x WARP" : "1x ORBIT"}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick("soft");
                  setIsFullscreen(!isFullscreen);
                }}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewport"}
              >
                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Sub-Bar: Cluster Filter Pills Strip */}
          <div className="absolute top-12 left-3 right-3 flex items-center justify-start pointer-events-none z-20">
            <div className="flex items-center gap-1 pointer-events-auto bg-[#0a0b16]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-1 shadow-lg font-mono text-[10px] overflow-x-auto max-w-full no-scrollbar">
              <button
                onClick={() => handleSelectCluster("all")}
                className={`px-2.5 py-1 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeCluster === "all" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"
                }`}
              >
                All Worlds
              </button>
              <button
                onClick={() => handleSelectCluster("webdev")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeCluster === "webdev" ? "bg-purple-500/20 text-purple-300 border border-purple-400/40" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>Web Dev</span>
              </button>
              <button
                onClick={() => handleSelectCluster("automation")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeCluster === "automation" ? "bg-amber-500/20 text-amber-300 border border-amber-400/40" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Automation & CRM</span>
              </button>
              <button
                onClick={() => handleSelectCluster("pictd")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeCluster === "pictd" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>PICTD Gov ICT</span>
              </button>
              <button
                onClick={() => handleSelectCluster("education")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeCluster === "education" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Education & CCNA</span>
              </button>
            </div>
          </div>

          {/* Subtle Navigation Hint */}
          <div className="absolute bottom-3 left-4 pointer-events-none z-20 font-mono text-[10px] text-zinc-500/80 hidden sm:flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400/60" />
            <span>Scroll wheel zooms viewport · Drag to pan</span>
          </div>
        </div>

        {/* =====================================================================
            STAGE B (RIGHT / 5 COLS): DEDICATED LIVE MISSION TELEMETRY DECK
            (Integrated permanent console with verified data from the resume PDF!)
            ===================================================================== */}
        <div className="h-[440px] lg:h-full lg:col-span-5 xl:col-span-4 bg-[#080910] flex flex-col justify-between overflow-hidden">
          {/* Deck Pinned Header */}
          <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#0a0c16]/95 shrink-0">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <span 
                  className="h-2 w-2 rounded-full animate-pulse shadow-sm" 
                  style={{ backgroundColor: selectedConfig?.color || "#38bdf8" }}
                />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-zinc-300">
                  {selectedConfig?.badge || "SYSTEM CORE"}
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
                  {selectedNode?.telemetryCode || "200 OK"}
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                VERIFIED RESUME RECORD
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {selectedNode ? selectedNode.label : "Systems Overview // Noel C. Raterta Jr."}
            </h3>
            <p className="font-mono text-xs text-sky-400 mt-0.5">
              {selectedNode?.roleOrOrg}
            </p>
            {selectedNode?.period && (
              <div className="font-mono text-[11px] text-zinc-400 mt-0.5">
                {selectedNode.period} {selectedNode.location ? `· ${selectedNode.location}` : ""}
              </div>
            )}
          </div>

          {/* Deck Scrollable Body with Official Resume Records */}
          <div 
            ref={cardBodyRef}
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(56, 189, 248, 0.25) transparent"
            }}
          >
            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              {selectedNode?.description}
            </p>

            {/* Official Key Deliverables / Milestones */}
            {selectedNode?.milestones && selectedNode.milestones.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-sky-400" />
                  Official Resume Deliverables:
                </div>
                <div className="space-y-2">
                  {selectedNode.milestones.map((ms, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed bg-white/[0.02] border border-white/[0.05] rounded-lg p-2.5">
                      <span className="text-sky-400 font-mono text-[11px] mt-0.5">↳</span>
                      <span>{ms}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connected Planetary Neighbors */}
            {connectedNeighbors.length > 0 && (
              <div className="pt-2">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-purple-400" />
                  Orbital Gravitational Neighbors ({connectedNeighbors.length}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {connectedNeighbors.map((neighbor) => (
                    <button
                      key={neighbor.id}
                      onClick={() => {
                        sounds.playClick("crisp");
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
            {selectedNode?.techStack && (
              <div className="pt-2">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-emerald-400" />
                  Verified Technologies & Skills:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] rounded px-2 py-0.5 border border-white/[0.08] bg-white/[0.03] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Official Credentials Highlights (CCNA & Hack4Gov) */}
            <div className="pt-3 border-t border-white/[0.06] space-y-2">
              <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-sky-400" />
                Verified Credentials & Honors:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-sky-500/[0.04] border border-sky-400/10 text-[11px] text-zinc-300 font-mono">
                    <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{cert.name}</span>
                  </div>
                ))}
                {AWARDS.map((award, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/[0.04] border border-amber-400/10 text-[11px] text-zinc-300 font-mono">
                    <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{award.title} ({award.year})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deck Pinned Footer */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0a0c16]/95 shrink-0 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {onSwitchToTimeline && (
                <button
                  onClick={() => {
                    sounds.playClick("crisp");
                    onSwitchToTimeline();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white hover:border-white/[0.28] transition-colors cursor-pointer"
                >
                  <span>View Timeline</span>
                  <ChevronRight className="h-3.5 w-3.5 text-sky-400" />
                </button>
              )}
            </div>

            <a
              href={PERSONAL_INFO.links.resume}
              download
              onClick={() => sounds.playClick("crisp")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white text-black px-3.5 py-1.5 font-mono text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              <span>Download PDF</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
