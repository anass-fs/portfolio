/**
 * @typedef {Object} Project
 * @property {string} title        – Project name (keeps French spelling when applicable, e.g. "SantéPlus")
 * @property {string} description  – One-sentence problem → solution
 * @property {string[]} features   – 3–4 concrete highlights (max 4 shown on card)
 * @property {string} icon         – <symbol> id suffix from the inline SVG sprite (e.g. "briefcase")
 * @property {string} image        – Path under assets/projects/*.webp (1200×675). Empty string → gradient only.
 * @property {boolean} isNew       – Show the "New" pill
 * @property {boolean} isFeatured  – Bento-style full-width card (only when filter === "All")
 * @property {string} gradient     – CSS gradient for the card header (used as --card-gradient)
 * @property {string[]} badges     – Tech badge labels (also drive the filter chips)
 * @property {string} github       – Source link; empty string when the repo is private/none
 * @property {string} demo         – Live demo / video link; empty string when none
 * @property {string} impact       – Short 2-line impact stat line (optional)
 * @property {string} architecture – One-line architecture summary (optional, shown in modal)
 */

/** @type {Project[]} */
const projectsData = [
    {
        "title": "BINGA — Merchant Contract Management",
        "description": "BINGA is Morocco's first cash-payment channel (binga.ma). As a Software Engineering Intern at Berkeley Systems (Casablanca), I built the internal web app that manages the contracts of affiliated merchants — bank details, pricing and per-channel commissions.",
        "features": [
            "Merchant & contract management (bank details, pricing, per-channel commissions)",
            "Spring Security · JWT (30 min) + refresh (7 days) · 2FA TOTP · reCAPTCHA v2 · backup codes",
            "100% local AI — bge-m3 semantic search (cosine similarity, Spring Cache 260 ms → 10 ms) + Qwen2.5:3B assistant (Strategy: 1 intent = 1 executor)",
            "PDF (iText) & Excel (Apache POI) exports · Excel import · KPI dashboard"
        ],
        "icon": "briefcase",
        "image": "assets/projects/binga.webp",
        "isNew": true,
        "isFeatured": true,
        "gradient": "linear-gradient(135deg, #ff6a3d 0%, #ffd166 100%)",
        "badges": ["Spring Boot 3", "Angular 20", "MySQL", "Spring Security · JWT · 2FA", "Ollama · bge-m3 · Qwen2.5", "iText / Apache POI"],
        "github": "",
        // TODO(anass): paste the unlisted YouTube URL of the 78 s demo video
        "demo": "",
        "impact": "Replaced Excel-based contract tracking · 14/14 functional test cases · semantic search 260 ms → 10 ms cached (relevance: 100% exact · ~85% approximate · ~80% natural language on 20 queries)",
        "architecture": "Spring Boot 3 / Java 17 REST API · Angular 20 + Bootstrap 5 · MySQL 8 (JPA/Hibernate) · Ollama local LLMs"
    },
    {
        "title": "EMSILearn — LMS",
        "description": "A learning management system for EMSI: multi-role dashboards for students, teachers and admins with course management, secure file sharing and real-time grade tracking.",
        "features": [
            "Multi-role authentication",
            "Course & content management",
            "Interactive gradebook",
            "Secure file storage"
        ],
        "icon": "grad",
        "image": "assets/projects/emsi-learn.webp",
        "isNew": true,
        "isFeatured": false,
        "gradient": "linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)",
        "badges": ["Django", "Python", "MySQL", "Tailwind CSS"],
        "github": "https://github.com/anass-fs/EMSI-LEARN",
        "demo": "",
        "impact": "",
        "architecture": "Django · MySQL · Tailwind CSS"
    },
    {
        "title": "NextGen — DevConnect",
        "description": "A professional social network for developers: project collaboration, real-time messaging and community building through shared technical stories.",
        "features": [
            "Project collaboration",
            "Real-time messaging",
            "Developer profiles",
            "Social feed"
        ],
        "icon": "users",
        "image": "assets/projects/nextgen.webp",
        "isNew": true,
        "isFeatured": false,
        "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "badges": ["Django", "Python", "MySQL"],
        "github": "https://github.com/anass-fs/nextgen",
        "demo": "",
        "impact": "",
        "architecture": "Django · MySQL"
    },
    {
        "title": "TechStore Back-Office",
        "description": "A complete back-office web app to run an online store — inventory, orders and customer management — built entirely with vanilla front-end technologies.",
        "features": [
            "Inventory management",
            "Order processing",
            "Product catalogue",
            "Dashboard"
        ],
        "icon": "store",
        "image": "assets/projects/techstore.webp",
        "isNew": false,
        "isFeatured": false,
        "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "badges": ["HTML5", "CSS3", "JavaScript ES6+"],
        "github": "https://github.com/anass-fs/project-java-backoffice",
        "demo": "https://anass-fs.github.io/project-java-backoffice/",
        "impact": "",
        "architecture": "HTML5 · CSS3 · Vanilla JavaScript (ES6+)"
    },
    {
        "title": "SantéPlus — Healthcare Platform",
        "description": "An online medical appointment-booking platform that connects patients and providers with scheduling, provider availability and patient records.",
        "features": [
            "Online appointment booking",
            "Patient records",
            "Provider scheduling"
        ],
        "icon": "plus-circle",
        "image": "assets/projects/santeplus.webp",
        "isNew": false,
        "isFeatured": false,
        "gradient": "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        "badges": ["PHP", "Symfony", "MySQL"],
        "github": "https://github.com/anass-fs/project-php",
        // TODO(anass): public demo / walkthrough video link (the previous Google Docs video is private)
        "demo": "",
        "impact": "",
        "architecture": "PHP · Symfony · MySQL"
    },
    {
        "title": "Hotel Management System",
        "description": "A console application for hotel operations built in C, implementing data structures and algorithms for reservations, billing and room availability.",
        "features": [
            "Reservation management",
            "Automated billing",
            "Room tracking",
            "File-based persistence"
        ],
        "icon": "bed",
        "image": "assets/projects/hotel.webp",
        "isNew": false,
        "isFeatured": false,
        "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "badges": ["C", "Algorithms", "File I/O"],
        "github": "https://github.com/anass-fs/hotel-reservation-c",
        "demo": "",
        "impact": "",
        "architecture": "C (console application)"
    },
    {
        "title": "Professional Portfolio",
        "description": "This site — a vanilla HTML/CSS/JS portfolio optimized for performance, accessibility and SEO, deployed on GitHub Pages.",
        "features": [
            "Responsive design",
            "Dark / light mode",
            "Dynamic projects & filters",
            "SEO + accessibility"
        ],
        "icon": "layout",
        "image": "assets/projects/portfolio.webp",
        "isNew": false,
        "isFeatured": false,
        "gradient": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "badges": ["HTML5", "CSS3", "JavaScript"],
        "github": "https://github.com/anass-fs/portfolio",
        "demo": "https://anass-fs.github.io/portfolio/",
        "impact": "",
        "architecture": "HTML5 · CSS3 · Vanilla JavaScript (ES6+)"
    }
];