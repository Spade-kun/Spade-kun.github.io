export interface Project {
  id: string;
  title: string;
  category: "Deployed Commercial Platform" | "Full-Stack System" | "Desktop & Systems" | "Game Engine & Mechanics" | "Automation & AI Workflows";
  tagline: string;
  description: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  image?: string;
  video?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  specCode?: string;
  roleDescription?: string;
}

export interface Experience {
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
  technologies: string[];
}

export const PERSONAL_INFO = {
  name: "Noel Raterta Jr.",
  handle: "Spade-kun",
  title: "Full-Stack Developer, Web Architect & Automation Builder",
  location: "Malaybalay City, Bukidnon, Philippines",
  timezone: "UTC+8",
  status: "Available for engineering roles & select freelance contracts",
  shortBio: "Web architect and automation engineer specializing in custom frameworks (Laravel, Next.js), website builders & CMS (Shopify, Wix, Squarespace, WordPress), and autonomous n8n workflows.",
  editorialBio: "Specializing in custom framework development with Laravel & Next.js, bespoke CMS and e-commerce stores (Shopify, Wix, Squarespace, WordPress), and autonomous n8n lead generation agent pipelines. Crafting deliberate, high-converting digital solutions end-to-end.",
  contactEmail: "noelratertajr@gmail.com",
  links: {
    github: "https://github.com/Spade-kun",
    facebook: "https://web.facebook.com/noelzkie01",
    instagram: "https://www.instagram.com/_spadekun/",
    resume: "/assets/Noel_Raterta_Resume_Fullstack.pdf",
    cv: "/assets/Raterta_Noel_CV.pdf"
  }
};

export const SKILL_CATEGORIES = [
  {
    title: "Custom Frameworks & Backend",
    skills: ["Laravel", "PHP 8+", "Next.js (App Router)", "React", "Node.js", "Express", "Blade Templating", "REST APIs"]
  },
  {
    title: "CMS & Website Builders",
    skills: ["Shopify (Liquid / E-Commerce)", "Wix & Wix Studio", "Squarespace", "WordPress CMS Custom Themes", "ACF & Custom Post Types"]
  },
  {
    title: "Automation & AI Agents",
    skills: ["n8n Workflow Automation", "Autonomous Lead Generation Agents", "AI Data Enrichment", "Webhooks & API Integrations", "CRM Sync"]
  },
  {
    title: "Databases & Core Systems",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Java (Swing / JDBC)", "Python", "ACID Compliance", "Schema Design"]
  }
];

export const PROJECTS: Project[] = [
  // 1. n8n Autonomous Lead Generation & Outreach Agent (Featured AI & Automation)
  {
    id: "n8n-lead-gen-agent",
    title: "n8n Autonomous Lead Generation & AI Outreach Agent",
    category: "Automation & AI Workflows",
    tagline: "Autonomous multi-node lead harvesting, AI prospect qualification, and CRM data enrichment pipeline in n8n.",
    description: "Production-grade autonomous workflow orchestration system built with n8n. Seamlessly scrapes prospect databases, extracts verified corporate points of contact, evaluates ICP qualification using AI inference, and synchronizes enriched records with downstream CRM notification queues.",
    architecture: [
      "Autonomous n8n execution graph with intelligent error handling, retries, and rate limiting",
      "AI evaluation node dynamically analyzing prospect domain, revenue bracket, and role authority",
      "Multi-step verification pipeline checking email deliverability and eliminating duplicate contacts",
      "Automated payload dispatch to CRM systems with real-time Slack/Webhook telemetry notifications"
    ],
    metrics: [
      { label: "Automation Engine", value: "n8n Self-Hosted" },
      { label: "Agent Capability", value: "Autonomous Lead Gen" },
      { label: "Integration", value: "REST APIs · Webhooks" }
    ],
    tags: ["n8n", "Workflow Automation", "AI Agents", "Lead Generation", "Webhooks", "CRM Integration"],
    video: "/assets/n8n-lead-generation-agent.mp4",
    featured: true,
    roleDescription: "Automation Architect: Designed end-to-end n8n workflow nodes, data schemas, AI prompt filters, and webhook endpoints."
  },

  // 2. Everly Plumbing (Deployed Commercial Platform)
  {
    id: "everly-plumbing",
    title: "Everly Plumbing Commercial Web Platform",
    category: "Deployed Commercial Platform",
    tagline: "High-performance commercial service website built with Laravel, Blade, and PostgreSQL.",
    description: "Production commercial platform for Everly Plumbing engineered to capture client service inquiries, showcase commercial plumbing solutions, and ensure rapid page speeds. Developed using Laravel with server-side Blade rendering and a robust PostgreSQL relational database.",
    architecture: [
      "Laravel backend with modular MVC architecture and server-rendered Blade views",
      "PostgreSQL relational schema storing customer leads and service catalogs with index optimization",
      "Tailored SEO metadata achieving 95+ Core Web Vitals performance across mobile devices",
      "Automated lead delivery pipeline routing incoming customer inquiries to dispatch"
    ],
    metrics: [
      { label: "Stack", value: "Laravel · Blade · PostgreSQL" },
      { label: "Status", value: "Live Production" },
      { label: "Performance", value: "Sub-second LCP" }
    ],
    tags: ["Laravel", "Blade", "PostgreSQL", "PHP", "SEO", "Responsive UI"],
    liveUrl: "https://everlyplumbing.com",
    image: "/assets/everly-plumbing-preview.png",
    video: "/assets/everly-plumbing-demo.mp4",
    featured: true,
    roleDescription: "Core Contributor & Developer: Implemented responsive views, database queries, and lead routing integration."
  },

  // 3. Everly Bookkeeping (Deployed Commercial Platform)
  {
    id: "everly-bookkeeping",
    title: "Everly Bookkeeping Financial Services Platform",
    category: "Deployed Commercial Platform",
    tagline: "Clean, trustworthy financial services storefront powered by Laravel, Blade, and MySQL.",
    description: "Commercial web platform designed for accounting and bookkeeping services. Focuses on client conversion funnels, service package transparent breakdowns, and strict relational data management for client intake.",
    architecture: [
      "Laravel MVC architecture with optimized Blade component hierarchy",
      "MySQL transactional database storing consultation requests and service inquiries",
      "Custom responsive CSS framework tuned for high readability and professional trust",
      "SSL/TLS security hardening and secure contact submission endpoints"
    ],
    metrics: [
      { label: "Stack", value: "Laravel · Blade · MySQL" },
      { label: "Status", value: "Live Production" },
      { label: "Deployment", value: "Production Cloud" }
    ],
    tags: ["Laravel", "Blade", "MySQL", "PHP", "Financial Web", "Conversion Funnel"],
    liveUrl: "https://everlybookkeeping.com",
    image: "/assets/everly-bookkeeping-preview.png",
    video: "/assets/everly-bookkeeping-demo.mp4",
    featured: true,
    roleDescription: "Full-Stack Developer: Built service architecture, MySQL schema, and mobile-first Blade layouts."
  },

  // 4. Deen International (Shopify E-Commerce Store)
  {
    id: "deen-international",
    title: "Deen International Global E-Commerce Store",
    category: "Deployed Commercial Platform",
    tagline: "Custom Shopify e-commerce storefront with optimized product merchandising and checkout funnel.",
    description: "Production Shopify e-commerce storefront delivering a tailored online shopping experience. Features custom Liquid templating, streamlined category browsing, multi-currency support, and optimized checkout flow.",
    architecture: [
      "Custom Shopify Liquid theme modifications and responsive styling adjustments",
      "Optimized product gallery with dynamic variant selection and real-time inventory signals",
      "Fast checkout flow integrated with global payment processors and currency converters",
      "Mobile-optimized cart drawer and speed-optimized merchant asset loading"
    ],
    metrics: [
      { label: "Platform", value: "Shopify E-Commerce" },
      { label: "Status", value: "Live Global Store" },
      { label: "Merchandising", value: "Custom Liquid Theme" }
    ],
    tags: ["Shopify", "Liquid", "E-Commerce", "Payment Gateways", "Conversion Rate Optimization"],
    liveUrl: "https://deenintr.com",
    image: "/assets/deen-preview.png",
    video: "/assets/deen-international-demo.mp4",
    featured: true,
    roleDescription: "E-Commerce Developer: Theme customization, collection layouts, and storefront performance enhancements."
  },

  // 5. Salt Lyf Cruises (Deployed Commercial Platform)
  {
    id: "salt-lyf-cruises",
    title: "Salt Lyf Cruises Luxury Marine Tourism Experience",
    category: "Deployed Commercial Platform",
    tagline: "High-end luxury yacht and cruise booking platform built on Squarespace with bespoke CSS scripting.",
    description: "Commercial maritime experience platform for luxury ocean cruises and private yacht charter services. Features immersive photography, bespoke booking integration, tour itineraries, and responsive media handling.",
    architecture: [
      "Custom CSS overrides and JavaScript injections customizing Squarespace default layout",
      "Interactive charter inquiry workflow with multi-option package selection",
      "Responsive hero video and retina image optimization for marine photography",
      "Cross-browser tested ensuring frictionless booking across iOS and Android devices"
    ],
    metrics: [
      { label: "Platform", value: "Squarespace · Custom CSS" },
      { label: "Status", value: "Live Production" },
      { label: "Experience", value: "Luxury Maritime UI" }
    ],
    tags: ["Squarespace", "Custom CSS", "JavaScript", "Tourism & Hospitality", "Responsive Design"],
    liveUrl: "https://saltlyfcruises.com",
    image: "/assets/salt-lyf-cruises-preview.png",
    video: "/assets/salt-lyf-cruises-demo.mp4",
    featured: true,
    roleDescription: "Web Developer: Custom CSS styling, itinerary layout design, and mobile UX optimization."
  },

  // 6. Noel's WordPress Showcase (Live Deployed Showcase)
  {
    id: "wordpress-showcase",
    title: "WordPress Architecture & Custom Theme Showcase",
    category: "Deployed Commercial Platform",
    tagline: "Live demonstration of advanced WordPress CMS architecture, custom theme development, and Gutenberg blocks.",
    description: "A comprehensive live demonstration platform highlighting advanced WordPress capabilities: custom theme creation, PHP template hierarchy, custom post types (CPTs), database query optimizations, and plugin integrations.",
    architecture: [
      "Custom WordPress theme developed from scratch utilizing PHP template hierarchy",
      "Custom Post Types (CPTs) and Advanced Custom Fields (ACF) data modeling",
      "Optimized MySQL database queries with object caching to ensure rapid TTFB on shared hosting",
      "Responsive Gutenberg block integration and accessible navigation menus"
    ],
    metrics: [
      { label: "CMS", value: "WordPress · Custom PHP" },
      { label: "Database", value: "MySQL Relational" },
      { label: "Hosting", value: "Live Demonstration" }
    ],
    tags: ["WordPress", "PHP", "MySQL", "CMS Architecture", "Custom Themes"],
    liveUrl: "https://noel-wordpress-showcase.infinityfree.me/",
    image: "/assets/wordpress-showcase-preview.png",
    video: "/assets/wordpress-showcase-demo.mp4",
    featured: true,
    roleDescription: "Author & Architect: Full theme development, custom post type structuring, and database tuning."
  },

  // 7. Dental Clinic System (Core Full-Stack System)
  {
    id: "dental-clinic-system",
    title: "Dental Clinic Patient & Booking Management System",
    category: "Full-Stack System",
    tagline: "End-to-end clinic operations platform with role-based auth and automated appointment workflows.",
    description: "A comprehensive clinical administration platform engineered to replace paper scheduling. Features patient self-service appointment booking, doctor schedule collision prevention, electronic treatment catalog, and transactional record keeping.",
    architecture: [
      "Relational MySQL schema with foreign-key constraints for patient histories and booking slots",
      "Session-based role authentication separating Patients, Staff, and Dental Practitioners",
      "Dynamic AJAX schedule calendar preventing double-booking race conditions",
      "Administrative analytics dashboard displaying appointment status and revenue breakdown"
    ],
    metrics: [
      { label: "Architecture", value: "PHP / MySQL / MVC" },
      { label: "Data Integrity", value: "100% ACID" },
      { label: "Repository", value: "Open Source" }
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Apache"],
    githubUrl: "https://github.com/Spade-kun/DENTAL_CLINIC_WEBSITE",
    featured: true,
    specCode: `// Appointment Collision Prevention Logic
SELECT appointment_id 
FROM appointments 
WHERE doctor_id = :docId 
  AND scheduled_date = :reqDate 
  AND scheduled_time = :reqTime 
  AND status != 'CANCELLED';`
  },

  // 8. Student Enrollment System (Desktop & OOP Systems)
  {
    id: "student-enrollment-system",
    title: "Academic Enrollment & Student Records Engine",
    category: "Desktop & Systems",
    tagline: "High-integrity Java desktop application for academic curriculum tracking and student database operations.",
    description: "A robust desktop management system developed for educational institution registrar workflows. Provides strict CRUD operations, prerequisite validation, curriculum tracking, and synchronized persistence with a relational database.",
    architecture: [
      "Pure Java Swing GUI built with decoupled MVC architectural patterns",
      "JDBC connection pooling with parameterized SQL queries preventing injection",
      "Curriculum course-load validation enforcing credit limits and prerequisite checks",
      "Exportable grade sheets, student registration cards, and audit logs"
    ],
    metrics: [
      { label: "Core Runtime", value: "Java SE / JDBC" },
      { label: "Interface", value: "Java Swing GUI" },
      { label: "Database", value: "MySQL Relational" }
    ],
    tags: ["Java", "Swing GUI", "MySQL", "JDBC", "OOP Design"],
    githubUrl: "https://github.com/Spade-kun/Student_Enrollment_GUI",
    featured: true,
    specCode: `// Parameterized JDBC Transaction
String sql = "INSERT INTO enrollments (student_id, course_code, semester) VALUES (?, ?, ?)";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, studentId);
    pstmt.setString(2, courseCode);
    pstmt.setString(3, currentSem);
    pstmt.executeUpdate();
}`
  },

  // 9. Move or Die Game (Game Mechanics & Engine)
  {
    id: "move-or-die-game",
    title: "Move or Die — Dynamic 2D Survival Engine",
    category: "Game Engine & Mechanics",
    tagline: "Real-time action survival game featuring continuous-motion mechanics and progression systems.",
    description: "An arcade survival game built in Python using Pygame. The game enforces a strict continuous-motion loop where stopping results in rapid health depletion. Includes procedural enemy spawning, custom collision physics, boss phases, and an in-memory upgrade store.",
    architecture: [
      "Fixed 60-FPS continuous delta-time game loop with deterministic frame updates",
      "Axis-Aligned Bounding Box (AABB) collision detection and vector physics",
      "State-driven progression system tracking scores, kill streaks, and persistent unlocks",
      "State-machine hierarchy managing Menu, Play, Boss Wave, and Game Over conditions"
    ],
    metrics: [
      { label: "Target FPS", value: "60.0 Fixed" },
      { label: "Physics", value: "AABB Vector Math" },
      { label: "Language", value: "Python / Pygame" }
    ],
    tags: ["Python", "Pygame", "Game Architecture", "Physics", "State Machines"],
    githubUrl: "https://github.com/Spade-kun/MOVE_OR_DIE_GAME",
    featured: true,
    specCode: `# Continuous Movement Constraint
if player.velocity.length() < MINIMUM_VELOCITY_THRESHOLD:
    player.health -= DECAY_RATE_PER_TICK * dt
    player.trigger_decay_visual_feedback()`
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Freelance Full-Stack Developer",
    organization: "Independent Practice",
    location: "Malaybalay City, Bukidnon, PH",
    period: "2021 — Present",
    bullets: [
      "Contributed to and deployed commercial web platforms including Everly Plumbing (Laravel/PostgreSQL), Everly Bookkeeping (Laravel/MySQL), Everly Pixel & Code (Next.js), Salt Lyf Cruises, and Deen International (Shopify).",
      "Engineered full-stack solutions with relational databases (PostgreSQL, MySQL) enforcing strict transactional data integrity and index optimization.",
      "Conducted performance audits, modernizing legacy layouts to mobile-responsive standards with sub-second paint times and 95+ Core Web Vitals.",
      "Authored clean technical documentation, deployment guides, and client maintenance runbooks."
    ],
    technologies: ["Laravel", "Next.js", "React", "PHP", "PostgreSQL", "MySQL", "Shopify", "Tailwind CSS", "Git"]
  },
  {
    role: "Bachelor of Science in Information Technology",
    organization: "Bukidnon State University",
    location: "Bukidnon, Philippines",
    period: "Expected 2026",
    bullets: [
      "Major focus on Software Engineering, Advanced Database Systems, Systems Architecture, and Network Security.",
      "Active contributor and lead developer for academic capstones, student GUI systems, and database projects.",
      "Dean's lister / high academic standing in software development and computing theory."
    ],
    technologies: ["Java", "Python", "Data Structures", "Algorithms", "Relational Database Theory", "Computer Networks"]
  }
];

export const JSON_LD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": PERSONAL_INFO.name,
  "alternateName": PERSONAL_INFO.handle,
  "jobTitle": PERSONAL_INFO.title,
  "description": PERSONAL_INFO.shortBio,
  "url": "https://spade-kun.github.io/",
  "sameAs": [
    PERSONAL_INFO.links.github,
    PERSONAL_INFO.links.facebook,
    PERSONAL_INFO.links.instagram
  ],
  "knowsAbout": [
    "Laravel Backend Engineering",
    "Next.js and React Architecture",
    "PostgreSQL & MySQL Relational Systems",
    "Shopify E-Commerce Development",
    "Java Desktop Software Engineering",
    "Python Game Development"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Bukidnon State University"
  }
};

export const LLMS_TXT = `# Noel Raterta Jr. (Spade-kun)
> Full-Stack Developer & Systems Builder. Based in Malaybalay City, Bukidnon, Philippines.
> Education: BS in Information Technology at Bukidnon State University (Class of 2026).

## Core Competencies
- Full-Stack Web Development: Laravel, Next.js, React, Node.js, PHP, Tailwind CSS, HTML5.
- Databases: PostgreSQL, MySQL (schema architecture, transaction isolation, indexing), MongoDB.
- Platforms: Shopify (Liquid, e-commerce stores), WordPress (custom themes, PHP), Squarespace.
- Systems & Desktop Programming: Java (Swing, OOP, JDBC), C, Python (Pygame game loops).

## Deployed Commercial Works
1. Everly Plumbing (https://everlyplumbing.com): Laravel / Blade / PostgreSQL commercial platform.
2. Everly Bookkeeping (https://everlybookkeeping.com): Laravel / Blade / MySQL financial platform.
3. Deen International (https://deenintr.com): Shopify global e-commerce storefront.
4. Salt Lyf Cruises (https://saltlyfcruises.com): Squarespace luxury marine tourism experience.
5. WordPress Architecture Showcase (https://noel-wordpress-showcase.infinityfree.me/): Custom WordPress theme.

## Engineered Systems & Open Source
1. Dental Clinic Management System (PHP/MySQL): https://github.com/Spade-kun/DENTAL_CLINIC_WEBSITE
2. Student Enrollment GUI (Java/Swing/JDBC): https://github.com/Spade-kun/Student_Enrollment_GUI
3. Move or Die 2D Survival Game (Python/Pygame): https://github.com/Spade-kun/MOVE_OR_DIE_GAME

## Contact & Links
- Website: https://spade-kun.github.io/
- GitHub: https://github.com/Spade-kun
- Email: ${PERSONAL_INFO.contactEmail}
`;
