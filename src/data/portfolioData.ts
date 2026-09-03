import { Project, ExperienceItem, SkillCategory, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: "MV JAYANNA",
  shortName: "Jayanna",
  title: "Software Engineer & Full-Stack Developer",
  headline: "Building Scalable Full-Stack Systems & Modern High-Performance Web Applications",
  email: "mvjayanna209@gmail.com",
  phone: "+91 96861 94573",
  location: "Chikkamagaluru, Karnataka, India",
  timezone: "Asia/Kolkata (IST, UTC+5:30)",
  education: "B.E. in Computer Science & Engineering (2022–2026), CGPA 8.2 / 10",
  institution: "Shree Devi Institute of Technology, Mangalore",
  github: "https://github.com/mvjayanna209",
  linkedin: "https://linkedin.com/in/mv-jayanna",
  instagram: "https://instagram.com/mvjayanna",
  summary: "Software Engineer with hands-on, project-based experience building full-stack web applications using Java, Python, JavaScript, TypeScript, and Node.js. Strong grounding in data structures, object-oriented design, and relational databases (MySQL), with practical exposure to REST APIs, authentication, and responsive UI development. Comfortable owning a feature end to end — from schema design and backend logic through a polished, responsive front end.",
  stats: [
    { label: "Engineering CGPA", value: "8.2", suffix: "/10", detail: "Shree Devi Institute of Technology" },
    { label: "Core Full-Stack Projects", value: "6+", suffix: "", detail: "QuickShift, Super Cipher & more" },
    { label: "Code Commits & Reviews", value: "1,200+", suffix: "", detail: "Git & Open Collaboration" },
    { label: "Frontend & Backend Tech", value: "15+", suffix: "", detail: "React, Node, TypeScript, SQL" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "quickshift",
    title: "QuickShift",
    subtitle: "Part-Time Job Finder Platform",
    category: "Full-Stack",
    period: "March 2026 – Aug 2026",
    description: "A full-stack, high-concurrency job portal connecting job seekers with employers, engineered with a normalized MySQL schema and sub-second multi-filter discovery.",
    longDescription: "QuickShift is an end-to-end recruitment platform specifically optimized for part-time and flexible gig opportunities. It features a normalized relational database design for listings, applicants, and employer management, backed by a robust Node.js and TypeScript REST API with spatial and criteria-based search.",
    metrics: [
      "Sub-200ms Search Queries with Indexed SQL",
      "Normalized 3NF MySQL Schema",
      "Full Desktop & Mobile Breakpoint Adaptation",
      "Streamlined 2-Click Application Workflow"
    ],
    technologies: ["Node.js", "TypeScript", "JavaScript", "MySQL", "HTML5", "CSS3 / Tailwind", "REST APIs"],
    highlights: [
      "Built a full-stack job portal in Node.js connecting job seekers with employers, with a normalized MySQL schema for listings, applicants, and employer accounts.",
      "Used TypeScript for key modules to add type safety and reduce runtime errors across the search and filtering logic.",
      "Implemented location-based search and multi-filter job discovery (role, pay, shift type) using SQL queries and server-side filtering logic.",
      "Designed and built REST-style endpoints to connect the front end with the Node.js backend for listings, applications, and employer accounts.",
      "Designed a responsive UI that adapts cleanly across desktop and mobile breakpoints.",
      "Optimized search response time and streamlined navigation to reduce clicks from search to application.",
      "Tested core flows manually across devices and screen sizes to catch layout and usability issues before finalizing."
    ],
    architectureHighlights: [
      "Layered REST Architecture: Controller -> Service -> Repository pattern separating business logic from MySQL drivers.",
      "Parametric SQL Queries: Prepared statements preventing SQL injection with indexing on role, location, and salary columns.",
      "Responsive Fluid Front-End: Clean CSS grid and flexbox interfaces delivering zero-layout-shift job card browsing."
    ],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1400&auto=format&fit=crop",
    githubUrl: "https://github.com/mvjayanna209/quickshift-job-finder",
    featured: true,
    interactiveType: "jobFilter"
  },
  {
    id: "super-cipher",
    title: "Super Cipher",
    subtitle: "Hybrid Cryptography & File Protection System",
    category: "Security & Crypto",
    period: "Feb 2025 – May 2025",
    description: "A hybrid security platform combining symmetric and asymmetric cryptographic algorithms for client-side and in-transit file encryption.",
    longDescription: "Super Cipher provides military-grade file privacy by combining symmetric ciphers (AES-256-GCM) with asymmetric public-key cryptography (RSA-OAEP). Designed with an intuitive, cybernetic dashboard built in Next.js, TypeScript, and Tailwind CSS.",
    metrics: [
      "Hybrid Multi-Algorithm Encryption",
      "Zero Knowledge Client-Side Processing",
      "Live Production Deployment on Vercel",
      "Modular Pipeline Architecture"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Web Crypto API", "Asymmetric RSA", "Symmetric AES"],
    highlights: [
      "Developed a hybrid cryptography platform combining multiple encryption algorithms (symmetric + asymmetric) for file protection.",
      "Designed a responsive, user-friendly dashboard for encrypting, decrypting, and managing files.",
      "Focused on secure data transmission and confidentiality throughout the encryption pipeline.",
      "Structured the codebase into clear modules (encryption, auth, file handling, UI) for maintainability.",
      "Implemented real-time client verification and key generation directly inside modern browser crypto primitives."
    ],
    architectureHighlights: [
      "Dual-Envelope Encryption: Generates unique ephemeral AES keys per payload, then secures the key with RSA-4096 public key.",
      "Zero-Server Exposure: Client-side cryptographic operations ensure raw keys and unencrypted payloads never touch remote storage unshielded.",
      "Clean Architectural Modularization: Strict separation between the cryptographic engine, UI state machines, and streaming file reader."
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1400&auto=format&fit=crop",
    liveUrl: "https://super-ciper-cryptography-ir3de173v-mvjayanna209-rgbs-projects.vercel.app/",
    githubUrl: "https://github.com/mvjayanna209/super-cipher-cryptography",
    featured: true,
    interactiveType: "cipher"
  },
  {
    id: "omnigraph",
    title: "OmniGraph",
    subtitle: "Data Structure & Algorithm Visualizer",
    category: "Systems & Backend",
    period: "2024 – 2025",
    description: "An interactive educational workbench visualizing complex graph traversals, Dijkstra shortest paths, topological sorts, and dynamic memory trees.",
    longDescription: "OmniGraph was developed to bridge the gap between abstract computer science theory and visual intuition. Features step-by-step debugger controls, custom graph adjacency matrices, and algorithmic complexity analyzers.",
    metrics: [
      "60fps Canvas Rendering",
      "8+ Core Graph & Tree Algorithms",
      "O(V + E) Step-by-Step State Inspector"
    ],
    technologies: ["TypeScript", "HTML5 Canvas", "Tailwind CSS", "Data Structures", "OOP", "Algorithm Analysis"],
    highlights: [
      "Visualized graph data structures and pathfinding algorithms with real-time execution step pausing.",
      "Engineered an interactive adjacency list and matrix editor with dynamic node weighting.",
      "Built with pure object-oriented principles separating the mathematical graph model from visual rendering."
    ],
    architectureHighlights: [
      "State-Driven Step Machine: Yield-based generator pattern allowing forward and backward stepping through recursion stacks.",
      "Optimized Canvas Rendering: Double-buffered frame drawing handling 200+ simultaneous nodes smoothly."
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    githubUrl: "https://github.com/mvjayanna209/omnigraph-visualizer",
    featured: true
  },
  {
    id: "resilient-api",
    title: "Apex REST & Cache Engine",
    subtitle: "High-Throughput Node.js & MySQL Microservice",
    category: "Systems & Backend",
    period: "2025",
    description: "A benchmarked backend service demonstrating connection pool scaling, JWT auth pipelines, and relational query profiling.",
    longDescription: "A production-grade backend showcase implementing strict REST principles, rate-limiting middleware, connection pooling for MySQL, and transactional safety.",
    metrics: [
      "Handles 2,000+ Requests/sec Locally",
      "ACID Transactional Guarantees",
      "100% Typed DTO Validation"
    ],
    technologies: ["Node.js", "Express", "TypeScript", "MySQL", "JDBC Patterns", "Postman", "Git"],
    highlights: [
      "Engineered structured REST endpoints with standardized JSON schemas and error handling.",
      "Designed normalized tables with foreign key cascades and composite indexes for high read performance.",
      "Automated integration testing for authentication and data validation suites."
    ],
    architectureHighlights: [
      "Connection Pool Lifecycle Management: Prevents connection starvation during high traffic spikes.",
      "Strict Input Sanitization & DTO Validation: Zero untrusted payload execution."
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1400&auto=format&fit=crop",
    githubUrl: "https://github.com/mvjayanna209/apex-rest-engine",
    featured: false
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "quickshift-exp",
    role: "Full-Stack Software Engineer",
    organization: "QuickShift Platform",
    location: "Karnataka, India",
    period: "March 2026 – August 2026",
    type: "Project / Production",
    description: "Architected and built an end-to-end part-time job portal connecting job seekers with local employers.",
    achievements: [
      "Constructed a normalized MySQL schema modeling user roles, job requirements, shifts, and application statuses.",
      "Engineered backend REST endpoints in Node.js and TypeScript for seamless search, authentication, and application submission.",
      "Developed location-based search and multifaceted filters (hourly pay, shift hours, role types) with sub-second response times.",
      "Ensured pixel-perfect mobile and desktop responsiveness, testing extensively across varied viewports."
    ],
    skills: ["Node.js", "TypeScript", "MySQL", "REST APIs", "Responsive Web Design", "Database Design"]
  },
  {
    id: "supercipher-exp",
    role: "Lead Developer & Cryptography Architect",
    organization: "Super Cipher Platform",
    location: "Vercel / Cloud Deployment",
    period: "February 2025 – May 2025",
    type: "Project / Production",
    description: "Designed and launched a hybrid cryptography web platform providing client-side encryption and secure file handling.",
    achievements: [
      "Engineered a hybrid cryptosystem blending symmetric (AES) and asymmetric (RSA) algorithms for robust data privacy.",
      "Built a modern, responsive web application using Next.js, TypeScript, and Tailwind CSS deployed live on Vercel.",
      "Structured the platform into decoupled modules: cryptography engine, key manager, file stream handler, and UI dashboard.",
      "Conducted rigorous security testing against common web vulnerabilities and client-side memory leakage."
    ],
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Web Crypto API", "Security Architecture", "Vercel"],
    link: "https://super-ciper-cryptography-ir3de173v-mvjayanna209-rgbs-projects.vercel.app/"
  },
  {
    id: "sdit-eng",
    role: "B.E. in Computer Science & Engineering",
    organization: "Shree Devi Institute of Technology",
    location: "Mangalore, Karnataka",
    period: "2022 – 2026",
    type: "Education",
    description: "Pursuing Bachelor of Engineering with rigorous coursework in computer systems, algorithms, databases, and software engineering.",
    achievements: [
      "Achieved a strong academic record with a cumulative CGPA of 8.2 / 10.",
      "Excelled in Data Structures & Algorithms, Object-Oriented Design, Operating Systems, and Relational Database Systems.",
      "Led multiple team hackathons and laboratory projects in full-stack web and systems programming.",
      "Active participant in technical symposiums, code reviews, and student developer groups."
    ],
    skills: ["Data Structures", "Java", "Python", "MySQL", "OOP", "Computer Networks", "Database Systems"]
  },
  {
    id: "padua-puc",
    role: "Pre-University College (PUC)",
    organization: "Padua PU College",
    location: "Mangalore, Karnataka",
    period: "2018 – 2020",
    type: "Education",
    description: "Completed Pre-University education with 71%, focusing on core Science and Mathematics foundations.",
    achievements: [
      "Built strong mathematical, logical reasoning, and analytical foundations that powered transition into computer science engineering."
    ],
    skills: ["Mathematics", "Physics", "Analytical Problem Solving"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    description: "Strong command of modern typed and object-oriented programming languages.",
    skills: [
      { name: "TypeScript", level: 92, categoryBadge: "Primary", description: "Strict typing, interfaces, generics, modern ESM" },
      { name: "JavaScript (ES6+)", level: 94, categoryBadge: "Primary", description: "Async/await, closures, event loop, DOM API" },
      { name: "Java (Core & OOP)", level: 88, categoryBadge: "Core", description: "Collections, multithreading, inheritance, JDBC" },
      { name: "Python", level: 85, categoryBadge: "Core", description: "Data manipulation, scripting, algorithms, automation" },
      { name: "SQL (MySQL)", level: 90, categoryBadge: "Primary", description: "Joins, aggregations, indexing, schema normalization" }
    ]
  },
  {
    category: "Web & Frontend",
    description: "Crafting fluid, high-contrast, accessible interfaces with cinema-grade motion.",
    skills: [
      { name: "React 19 & Next.js", level: 92, categoryBadge: "Framework", description: "Custom hooks, component hierarchy, SSR, routing" },
      { name: "Tailwind CSS", level: 95, categoryBadge: "Styling", description: "Design systems, responsive breakpoints, custom theme" },
      { name: "Framer Motion", level: 88, categoryBadge: "Animation", description: "Orchestrated layouts, spring physics, scroll triggers" },
      { name: "HTML5 & Semantic Web", level: 96, categoryBadge: "Markup", description: "Accessible DOM, microdata, clean hierarchy" },
      { name: "Responsive Design", level: 94, categoryBadge: "Layout", description: "Fluid typography, CSS grid, touch/desktop adaptation" }
    ]
  },
  {
    category: "Backend & Systems",
    description: "Building scalable server runtimes, REST endpoints, and security layers.",
    skills: [
      { name: "Node.js & Express", level: 90, categoryBadge: "Backend", description: "Event-driven runtime, routing, custom middleware" },
      { name: "RESTful API Architecture", level: 92, categoryBadge: "API", description: "Status codes, pagination, resource naming, DTOs" },
      { name: "Web Cryptography & Security", level: 86, categoryBadge: "Security", description: "AES-GCM, RSA-OAEP, hashing, data protection" },
      { name: "Authentication & JWT", level: 88, categoryBadge: "Auth", description: "Token verification, refresh flows, RBAC foundations" }
    ]
  },
  {
    category: "Data & Persistence",
    description: "Designing reliable relational schemas and high-throughput query flows.",
    skills: [
      { name: "MySQL", level: 90, categoryBadge: "RDBMS", description: "Foreign keys, constraints, composite indexes, 3NF" },
      { name: "Database Schema Design", level: 90, categoryBadge: "Modeling", description: "ER diagrams, normalization, query cost optimization" },
      { name: "JDBC & Connection Pooling", level: 85, categoryBadge: "Data Layer", description: "Connection pools, prepared statements, transactions" }
    ]
  },
  {
    category: "Tools & DevOps",
    description: "Modern developer tooling for continuous shipping and testing.",
    skills: [
      { name: "Git & GitHub", level: 92, categoryBadge: "VCS", description: "Branching workflows, commits, PR reviews, rebasing" },
      { name: "Linux / Unix Shell", level: 84, categoryBadge: "Env", description: "Bash scripting, permissions, process management" },
      { name: "Vite & Build Tooling", level: 90, categoryBadge: "Build", description: "Bundler configuration, fast HMR, asset pipelines" },
      { name: "Postman & API Testing", level: 88, categoryBadge: "Testing", description: "Endpoint benchmarking, automated test suites" },
      { name: "Unit Testing & Debugging", level: 86, categoryBadge: "Quality", description: "DevTools profiling, memory leak tracking, console" }
    ]
  },
  {
    category: "CS Foundations",
    description: "Deep mathematical and computer science fundamentals.",
    skills: [
      { name: "Data Structures & Algorithms", level: 90, categoryBadge: "Core", description: "Arrays, Trees, Graphs, DP, Binary Search, Big-O" },
      { name: "Object-Oriented Design", level: 92, categoryBadge: "Architecture", description: "SOLID principles, design patterns, modularity" },
      { name: "Analytical Problem Solving", level: 92, categoryBadge: "Mindset", description: "Deconstructing complex problems into minimal modules" }
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "full-stack-apps",
    title: "Full-Stack Web Engineering",
    description: "End-to-end development from database schema to responsive, reactive client interfaces using TypeScript, React/Next.js, and Node.js.",
    deliverables: [
      "Production-grade Node.js/TypeScript backend",
      "Responsive, mobile-first React/Next.js UI",
      "Normalized relational schema (MySQL) with optimal indexes",
      "Interactive data displays & dynamic filtering"
    ],
    iconName: "Layers",
    tag: "Core Specialty"
  },
  {
    id: "api-backend",
    title: "REST APIs & Backend Microservices",
    description: "Architecting secure, well-documented REST APIs engineered with input sanitization, token authentication, and high throughput.",
    deliverables: [
      "Robust RESTful endpoint design",
      "Secure authentication & authorization (JWT/Sessions)",
      "Database connection pooling & transactional safety",
      "Postman test suites & clear API specifications"
    ],
    iconName: "Server",
    tag: "Architecture"
  },
  {
    id: "ui-ux-engineering",
    title: "High-End Creative UI & Motion",
    description: "Translating sophisticated designs into cinematic, accessible web experiences with fluid Framer Motion animations and flawless responsive layout.",
    deliverables: [
      "High-contrast, dark-mode modern aesthetics",
      "Tailwind CSS custom styling & micro-interactions",
      "Framer Motion orchestrated entrances & scroll effects",
      "Performance-tuned 60fps rendering without jank"
    ],
    iconName: "Sparkles",
    tag: "Aesthetics"
  },
  {
    id: "crypto-security",
    title: "Secure Web & Cryptographic Pipelines",
    description: "Building security-conscious web platforms implementing symmetric/asymmetric encryption, safe credential storage, and protected data transfer.",
    deliverables: [
      "Web Crypto API client-side encryption (AES / RSA)",
      "Confidential file handling & transmission",
      "Zero-knowledge data workflows",
      "Vulnerability assessment & sanitization"
    ],
    iconName: "ShieldCheck",
    tag: "Security"
  }
];

export const STRENGTHS = [
  {
    title: "Quick Learner & Framework Agnostic",
    desc: "Comfortable picking up new languages, libraries, and codebases with minimal ramp-up time and maximum curiosity.",
    badge: "Adaptability"
  },
  {
    title: "Strong Algorithmic Foundation",
    desc: "Consistent practice with data structures, algorithms, and complexity trade-offs to build performant systems.",
    badge: "Problem Solving"
  },
  {
    title: "End-to-End Ownership",
    desc: "Comfortable driving features from database normalization and server logic through to responsive, interactive UI.",
    badge: "Full-Stack"
  },
  {
    title: "Team Player & Clear Communicator",
    desc: "Enjoys collaborating in project-based and group settings, maintaining clean git branches and respectful code reviews.",
    badge: "Collaboration"
  }
];
