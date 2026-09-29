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

export interface Certification {
  name: string;
  issuer: string;
  status: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  location: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: "Noel C. Raterta Jr.",
  handle: "Spade-kun",
  title: "Full Stack Developer",
  tagline: "Building scalable, high-performance web applications & automated pipelines",
  location: "Malaybalay City, Bukidnon, Philippines",
  phone: "0969-067-3159",
  timezone: "UTC+8",
  status: "Available for engineering roles & select freelance contracts",
  summary: "Full Stack Developer experienced in building web applications with Next.js, Laravel, and modern JavaScript frameworks. Skilled in database management (MySQL, Supabase) and process automation. Committed to delivering scalable, high-performance solutions.",
  shortBio: "Full Stack Developer experienced in Next.js, Laravel, modern JavaScript frameworks, database management (MySQL, Supabase), and n8n process automation.",
  editorialBio: "Full Stack Developer experienced in building web applications with Next.js, Laravel, and modern JavaScript frameworks. Skilled in database management (MySQL, Supabase) and process automation. Committed to delivering scalable, high-performance solutions.",
  contactEmail: "noelratertajr@gmail.com",
  links: {
    github: "https://github.com/Spade-kun",
    facebook: "https://web.facebook.com/noelzkie01",
    instagram: "https://www.instagram.com/_spadekun/",
    resume: "/assets/Noel_Raterta_Resume_Fullstack.pdf",
    cv: "/assets/Raterta_Noel_CV.pdf"
  }
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    status: "Verified Credential"
  },
  {
    name: "Cisco Cybersecurity",
    issuer: "Cisco",
    status: "Verified Credential"
  }
];

export const AWARDS: Award[] = [
  {
    title: "Hack4Gov Region X | First Runner-Up",
    organization: "Hack4Gov Cybersecurity Challenge",
    year: "2025",
    location: "Bukidnon",
    description: "Contributed to a team-based cybersecurity and solution-development challenge involving problem analysis, collaboration, and presentation."
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: ["Java", "C", "Python", "JavaScript", "PHP", "TypeScript", "AngularJS"]
  },
  {
    title: "Web & Frameworks",
    skills: ["HTML", "CSS", "React", "Next.js", "Laravel", "Node.js", "Express", "Angular", "NestJS", "REST APIs", "WordPress", "Squarespace"]
  },
  {
    title: "Databases & Storage",
    skills: ["MySQL", "Supabase (PostgreSQL)", "MongoDB (NoSQL)"]
  },
  {
    title: "Automation, CRM & Analytics",
    skills: ["n8n", "Zoho CRM", "Google Analytics Admin", "Google Search Console", "PageSpeed Insights"]
  },
  {
    title: "IT Support, Tools & Infrastructure",
    skills: ["Git", "GitHub", "VS Code", "Linux", "Postman", "Figma", "Canva", "Android Studio", "MS Office", "Windows OS support", "Basic Networking (DNS, VLAN, Reverse Proxy)"]
  },
  {
    title: "AI-Assisted Workflow",
    skills: ["ChatGPT", "Codex", "Gemini", "Claude"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Automation, CRM, Analytics, and Website Tools Practice",
    organization: "Automation, CRM, Analytics, and Website Tools Practice",
    location: "Remote / Independent",
    period: "January 2024 — Present",
    bullets: [
      "Automated business processes using n8n workflows, increasing operational efficiency for lead management and task routing.",
      "Leveraged Zoho CRM and Google Analytics to deliver actionable insights on user engagement and conversion metrics.",
      "Managed professional web presence for clients via Squarespace, optimizing layouts for brand alignment and SEO performance."
    ],
    technologies: ["n8n", "Zoho CRM", "Google Analytics", "Squarespace", "SEO Optimization", "Lead Routing", "Workflow Automation"]
  },
  {
    role: "Web Developer",
    organization: "Freelance Developer",
    location: "Malaybalay City, Bukidnon, PH",
    period: "January 2023 — Present",
    bullets: [
      "Developed 4 custom web applications for diverse clients, including platforms for bookkeeping and plumbing services, using a tech stack of Next.js, Laravel, PHP, and Supabase.",
      "Reduced client site maintenance overhead by migrating legacy layouts to modern, responsive frameworks like Next.js and Laravel, resulting in improved site performance.",
      "Integrated third-party APIs and databases (MySQL, Supabase) to build secure authentication and backend-driven platforms for small-scale business operations.",
      "Engineered API integrations for five client-facing platforms over 12 months, automating data exchange between Next.js/Laravel frontends and MySQL/Supabase backends, resulting in 30% faster onboarding and enhanced transactional reliability."
    ],
    technologies: ["Next.js", "Laravel", "PHP", "Supabase", "MySQL", "REST APIs", "Authentication", "Tailwind CSS"]
  },
  {
    role: "Intern - Technical Support and Web Development",
    organization: "Provincial ICT Division (PICTD) Bukidnon",
    location: "Malaybalay City, Bukidnon",
    period: "February 2026 — May 2026",
    bullets: [
      "Assisted in full-stack development tasks using Angular, NestJS, ORM, and MySQL for inventory and HRMIS-related systems.",
      "Supported network operations including DNS setup, reverse proxy configuration, IP reassignment, VLAN basics, UTP crimping, LAN repair, switch troubleshooting, and speed testing.",
      "Performed IT support tasks such as printer sharing fixes, eTRACS installation, device configuration, software troubleshooting, ICT inventory encoding, and workstation maintenance.",
      "Prepared CCTV, cabinet, and command center layout documentation for infrastructure planning and office monitoring support."
    ],
    technologies: ["Angular", "NestJS", "MySQL", "ORM", "DNS Setup", "Reverse Proxy", "VLAN", "eTRACS", "Network Support"]
  },
  {
    role: "Bachelor of Science in Information Technology",
    organization: "Bukidnon State University",
    location: "Bukidnon, Philippines",
    period: "2022 — 2026",
    bullets: [
      "Rigorous four-year computing degree with emphasis on Software Engineering, Database Systems, Network Architecture, and Solution Development.",
      "Earned Cisco CCNA certifications (Switching, Routing, and Wireless Essentials) and Cisco Cybersecurity certification.",
      "Awarded First Runner-Up in Hack4Gov Region X (2025) cybersecurity and solution-development competition."
    ],
    technologies: ["Java", "C", "Python", "Data Structures", "Algorithms", "Cisco CCNA", "Cisco Cybersecurity", "MySQL"]
  }
];

export const PROJECTS: Project[] = [
  // 1. n8n Autonomous Lead Generation & Outreach Agent (Featured AI & Automation)
  {
    id: "n8n-lead-gen-agent",
    title: "n8n Autonomous Lead Generation & AI Outreach Agent",
    category: "Automation & AI Workflows",
    tagline: "Automated business processes using n8n workflows for lead management and task routing.",
    description: "Production-grade workflow orchestration system built with n8n. Scrapes prospect databases, extracts verified contacts, qualifies with AI inference, and synchronizes enriched records with downstream CRM notification queues.",
    architecture: [
      "Automated business processes using n8n workflows, increasing operational efficiency for lead management",
      "Dynamic prospect qualification logic evaluating authority metrics and corporate alignment",
      "Structured validation checking email deliverability and eliminating duplicate contacts",
      "Automated payload dispatch to CRM systems with real-time Slack/Webhook telemetry notifications"
    ],
    metrics: [
      { label: "Engine", value: "n8n Automation" },
      { label: "Function", value: "Lead Routing" },
      { label: "Protocol", value: "REST APIs · Webhooks" }
    ],
    tags: ["n8n", "Workflow Automation", "Lead Management", "Zoho CRM", "Webhooks"],
    video: "/assets/n8n-lead-generation-agent.mp4",
    featured: true,
    roleDescription: "Automation Developer: Built end-to-end n8n workflow nodes, lead routing schemas, and webhook endpoints."
  },

  // 2. Everly Plumbing (Deployed Commercial Platform)
  {
    id: "everly-plumbing",
    title: "Everly Plumbing Services Platform",
    category: "Deployed Commercial Platform",
    tagline: "Custom web application for trade plumbing services built with Next.js, Laravel, and Supabase.",
    description: "One of 4 custom client web applications engineered for diverse clients. Built to capture client service inquiries, showcase commercial plumbing solutions, and ensure high site performance with modern responsive layouts.",
    architecture: [
      "Modern Next.js and Laravel architecture reducing maintenance overhead",
      "Relational database storage (MySQL/Supabase) storing customer leads and service catalogs",
      "Integrated third-party APIs for secure authentication and backend operations",
      "Mobile-responsive layout optimized for fast page speed and sub-second load times"
    ],
    metrics: [
      { label: "Tech Stack", value: "Next.js · Laravel · Supabase" },
      { label: "Category", value: "Plumbing Services" },
      { label: "Architecture", value: "Responsive Web" }
    ],
    tags: ["Next.js", "Laravel", "Supabase", "MySQL", "PHP", "Responsive UI"],
    liveUrl: "https://everlyplumbing.com",
    image: "/assets/everly-plumbing-preview.png",
    video: "/assets/everly-plumbing-demo.mp4",
    featured: true,
    roleDescription: "Web Developer: Built responsive views, Supabase integration, and automated lead capture routing."
  },

  // 3. Everly Bookkeeping (Deployed Commercial Platform)
  {
    id: "everly-bookkeeping",
    title: "Everly Bookkeeping Financial Services Platform",
    category: "Deployed Commercial Platform",
    tagline: "Commercial bookkeeping web application powered by Laravel, PHP, and MySQL.",
    description: "Custom web platform developed for client bookkeeping services. Features clear service breakdowns, secure client intake forms, and automated data exchange between frontend and backend.",
    architecture: [
      "Modular MVC architecture with optimized server-rendered components",
      "MySQL transactional database storing client consultation requests",
      "Modern, responsive framework migrating legacy layout to improve performance",
      "API integrations automating data exchange with transactional reliability"
    ],
    metrics: [
      { label: "Tech Stack", value: "Laravel · PHP · MySQL" },
      { label: "Category", value: "Bookkeeping Services" },
      { label: "Deployment", value: "Production Cloud" }
    ],
    tags: ["Laravel", "PHP", "MySQL", "Supabase", "Bookkeeping Services"],
    liveUrl: "https://everlybookkeeping.com",
    image: "/assets/everly-bookkeeping-preview.png",
    video: "/assets/everly-bookkeeping-demo.mp4",
    featured: true,
    roleDescription: "Web Developer: Built service architecture, MySQL schema, and responsive UI."
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
      "Fast checkout flow integrated with payment processors and currency converters",
      "Mobile-optimized cart drawer and speed-optimized merchant asset loading"
    ],
    metrics: [
      { label: "Platform", value: "Shopify E-Commerce" },
      { label: "Type", value: "Storefront" },
      { label: "Merchandising", value: "Custom Liquid Theme" }
    ],
    tags: ["Shopify", "Liquid", "E-Commerce", "Payment Gateways", "Conversion Optimization"],
    liveUrl: "https://deenintr.com",
    image: "/assets/deen-preview.png",
    video: "/assets/deen-international-demo.mp4",
    featured: true,
    roleDescription: "E-Commerce Developer: Theme customization, collection layouts, and storefront performance enhancements."
  },

  // 5. Salt Lyf Cruises (Squarespace Luxury Maritime Platform)
  {
    id: "salt-lyf-cruises",
    title: "Salt Lyf Cruises Maritime Experience",
    category: "Deployed Commercial Platform",
    tagline: "Professional web presence managed via Squarespace, optimizing layouts for brand alignment and SEO performance.",
    description: "Client web platform for luxury ocean cruises and yacht charters. Built via Squarespace with custom CSS enhancements, responsive media optimization, and brand alignment.",
    architecture: [
      "Managed professional web presence for client via Squarespace",
      "Optimized layout for brand alignment, typography harmony, and SEO performance",
      "Interactive charter inquiry workflow with multi-option package selection",
      "Speed-optimized media delivery ensuring frictionless mobile booking"
    ],
    metrics: [
      { label: "Platform", value: "Squarespace" },
      { label: "Optimization", value: "SEO & Brand Alignment" },
      { label: "Type", value: "Maritime Tourism" }
    ],
    tags: ["Squarespace", "SEO Performance", "Brand Alignment", "Custom Layouts"],
    liveUrl: "https://saltlyfcruises.com",
    image: "/assets/salt-lyf-cruises-preview.png",
    video: "/assets/salt-lyf-cruises-demo.mp4",
    featured: true,
    roleDescription: "Web Developer: Squarespace layout optimization, SEO tuning, and responsive UX styling."
  },

  // 6. Noel's WordPress Showcase (Live Deployed Showcase)
  {
    id: "wordpress-showcase",
    title: "WordPress Architecture & Custom Theme Showcase",
    category: "Deployed Commercial Platform",
    tagline: "Live demonstration of advanced WordPress CMS architecture, custom theme development, and PHP templates.",
    description: "A comprehensive live demonstration platform highlighting advanced WordPress capabilities: custom theme creation, PHP template hierarchy, custom post types (CPTs), database query optimizations, and plugin integrations.",
    architecture: [
      "Custom WordPress theme developed from scratch utilizing PHP template hierarchy",
      "Custom Post Types (CPTs) and Advanced Custom Fields (ACF) data modeling",
      "Optimized MySQL database queries with object caching to ensure rapid TTFB",
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
    description: "A clinical administration platform engineered to replace paper scheduling. Features patient self-service appointment booking, doctor schedule collision prevention, electronic treatment catalog, and transactional record keeping.",
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

export const JSON_LD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": PERSONAL_INFO.name,
  "alternateName": PERSONAL_INFO.handle,
  "jobTitle": PERSONAL_INFO.title,
  "description": PERSONAL_INFO.summary,
  "url": "https://spade-kun.github.io/",
  "sameAs": [
    PERSONAL_INFO.links.github,
    PERSONAL_INFO.links.facebook,
    PERSONAL_INFO.links.instagram
  ],
  "knowsAbout": [
    "Full Stack Development",
    "Next.js",
    "Laravel",
    "PHP",
    "MySQL",
    "Supabase",
    "n8n Workflow Automation",
    "Zoho CRM",
    "Google Analytics",
    "Angular",
    "NestJS",
    "Cisco CCNA Networking",
    "Cisco Cybersecurity"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Bukidnon State University"
  }
};

export const LLMS_TXT = `# Noel C. Raterta Jr. (Spade-kun)
> Full Stack Developer. Based in Malaybalay City, Bukidnon, Philippines.
> Contact: ${PERSONAL_INFO.contactEmail} | ${PERSONAL_INFO.phone}
> Education: BS in Information Technology at Bukidnon State University (2022 - 2026).

## Professional Summary
${PERSONAL_INFO.summary}

## Core Competencies & Skills
- Programming Languages: Java, C, Python, JavaScript, PHP, TypeScript, AngularJS.
- Web & Frameworks: HTML, CSS, React, Next.js, Laravel, Node.js, Express, Angular, NestJS, REST APIs, WordPress, Squarespace.
- Databases: MySQL, Supabase (PostgreSQL), MongoDB (NoSQL).
- Automation & Analytics: n8n, Zoho CRM, Google Analytics Admin, Google Search Console, PageSpeed Insights.
- IT Support & Networking: Git, GitHub, VS Code, Linux, Postman, Figma, Canva, Android Studio, MS Office, Windows OS support, basic networking (DNS, reverse proxy, VLAN).
- Certifications: CCNA (Switching, Routing, and Wireless Essentials), Cisco Cybersecurity.
- Awards & Honors: Hack4Gov Region X | First Runner-Up (2025).

## Verified Experience
1. Web Developer (Freelance Developer) | Jan 2023 - Present
   - Developed 4 custom web applications (bookkeeping, plumbing) using Next.js, Laravel, PHP, Supabase.
   - Migrated legacy layouts to modern, responsive frameworks.
   - Integrated third-party APIs and databases (MySQL, Supabase) for secure authentication.
   - Engineered API integrations for 5 client platforms resulting in 30% faster onboarding.

2. Automation, CRM, Analytics, and Website Tools Practice | Jan 2024 - Present
   - Automated business processes using n8n workflows for lead management and task routing.
   - Leveraged Zoho CRM and Google Analytics for user engagement and conversion insights.
   - Managed professional web presence for clients via Squarespace, optimizing for brand alignment and SEO.

3. Intern - Technical Support and Web Development (Provincial ICT Division - PICTD Bukidnon) | Feb 2026 - May 2026
   - Assisted in full-stack development tasks using Angular, NestJS, ORM, and MySQL for inventory and HRMIS.
   - Supported network operations (DNS setup, reverse proxy, IP reassignment, VLAN basics, LAN repair).
   - Performed IT support tasks (printer sharing, eTRACS installation, workstation maintenance).
   - Prepared CCTV, cabinet, and command center layout documentation.

4. BS Information Technology (Bukidnon State University) | 2022 - 2026
`;
