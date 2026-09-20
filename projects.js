/**
 * Project data — single source of truth for the "Work" section.
 *
 * @typedef {Object} Project
 * @property {string}   id           Stable slug (used for DOM ids and the modal).
 * @property {string}   title
 * @property {string}   tagline      One line: what it is, for whom.
 * @property {string}   description  2–3 sentences, problem → solution.
 * @property {string[]} highlights   Max 4 short bullets.
 * @property {string[]} stack        Technology chips (max 5).
 * @property {string}   category     One of: fullstack | backend | frontend | systems
 * @property {string}   year
 * @property {string}   [image]      Optional 1200×675 screenshot in assets/projects/. Falls back to a designed cover.
 * @property {string}   icon         Sprite symbol id used on the cover / modal.
 * @property {string}   [github]     Source URL ("" when private).
 * @property {string}   [demo]       Live demo or video URL ("" when none).
 * @property {string}   [role]       Short role line (for the modal).
 * @property {boolean}  [featured]
 */

/** @type {Project[]} */
const projectsData = [
    {
        id: 'binga',
        title: 'BINGA — Merchant Contract Management',
        tagline: 'Internal web platform for a Moroccan FinTech · Berkeley Systems internship',
        description:
            'BINGA (binga.ma) is the first cash-payment channel on the Internet in Morocco: customers pay online purchases and bills in cash at physical points of sale. ' +
            'Affiliated merchants have contracts — bank details, pricing and per-channel commissions — that were tracked in scattered Excel files. ' +
            'I designed and built the internal application that centralises and secures them.',
        highlights: [
            'Two-step authentication: credentials + reCAPTCHA v2, then TOTP code (Google Authenticator); JWT access & refresh tokens, backup codes',
            'Merchant, bank, pricing and per-channel commission management with PDF (iText) and Excel (Apache POI) exports and Excel import',
            'Semantic search on bge-m3 embeddings (cosine similarity, Spring Cache: 260 ms → 10 ms) — 100 % local through Ollama',
            'Conversational assistant on Qwen2.5:3B with a Strategy pattern: one intent, one executor — the LLM never touches the database'
        ],
        stack: ['Spring Boot 3', 'Angular 20', 'MySQL 8', 'Spring Security · JWT · 2FA', 'Ollama · bge-m3 · Qwen2.5'],
        category: 'fullstack',
        year: 'Jun – Jul 2026',
        role: 'Software Engineering Intern — sole developer of the module, supervised by a project manager and a full-stack engineer',
        image: 'assets/projects/binga.webp',
        gallery: ['assets/projects/binga.webp', 'assets/projects/binga-merchants.webp', 'assets/projects/binga-form.webp', 'assets/projects/binga-pdf.webp', 'assets/projects/binga-assistant.webp'],
        icon: 'i-briefcase',
        github: '',
        demo: '', // TODO(anass): unlisted YouTube URL of the 78 s demo video
        featured: true
    },
    {
        id: 'emsi-learn',
        title: 'EMSI Learn — Learning Management System',
        tagline: 'Course platform with student, teacher and admin spaces',
        description:
            'A learning management system for EMSI: multi-role dashboards, course and resource management, gradebook and notifications when new material or grades are published.',
        highlights: ['Multi-role authentication (student / teacher / admin)', 'Course, enrolment and resource management', 'Gradebook and performance tracking', 'Notification system'],
        stack: ['Django', 'Python', 'MySQL', 'Tailwind CSS'],
        category: 'fullstack',
        year: '2026',
        image: 'assets/projects/emsi-learn.webp',
        icon: 'i-grad',
        github: 'https://github.com/anass-fs/EMSI-LEARN',
        demo: ''
    },
    {
        id: 'nextgen',
        title: 'NextGen — Developer Social Network',
        tagline: 'Profiles, feed, stories, messaging and notifications',
        description:
            'A professional social network for developers built with Django 5: profiles, project sharing, a social feed with stories, real-time messaging and notifications, on a modular architecture designed to grow.',
        highlights: ['Developer profiles and project showcase', 'Social feed and stories', 'Real-time messaging', 'Notification system'],
        stack: ['Django 5', 'Python', 'MySQL'],
        category: 'fullstack',
        year: '2025',
        image: 'assets/projects/nextgen.webp',
        icon: 'i-users',
        github: 'https://github.com/anass-fs/nextgen',
        demo: ''
    },
    {
        id: 'techstore',
        title: 'TechStore — E-commerce Back-Office',
        tagline: 'Admin dashboard built in vanilla JavaScript',
        description:
            'A complete back-office for an online store — products, customers, orders, invoices, categories and users — with a KPI dashboard and role-based access, written without any framework.',
        highlights: ['Role-based login (admin / user)', 'Product, order and invoice management', 'Dashboard with charts', 'Dark / light theme, keyboard shortcuts'],
        stack: ['HTML5', 'CSS3', 'JavaScript ES6+'],
        category: 'frontend',
        year: '2024',
        image: 'assets/projects/techstore.webp',
        icon: 'i-store',
        github: 'https://github.com/anass-fs/project-java-backoffice',
        demo: 'https://anass-fs.github.io/project-java-backoffice/'
    },
    {
        id: 'santeplus',
        title: 'SantéPlus — Medical Appointments',
        tagline: 'Online booking for clinics, patients and practitioners',
        description:
            'A Symfony application that digitalises medical appointment booking: authentication, doctor and patient management, time-slot scheduling and appointment history.',
        highlights: ['Online appointment booking', 'Doctor, patient and slot management', 'Authentication and roles', 'MVC architecture with Doctrine'],
        stack: ['PHP', 'Symfony 6', 'MySQL'],
        category: 'backend',
        year: '2024',
        image: 'assets/projects/santeplus.webp',
        icon: 'i-plus-circle',
        github: 'https://github.com/anass-fs/project-php',
        demo: '' // TODO(anass): public walkthrough video link
    },
    {
        id: 'hotel',
        title: 'Hotel Reservation System',
        tagline: 'Console application in C with file persistence',
        description:
            'A C program managing rooms, guests and reservations with file-based persistence, current-booking views and invoice generation — a data-structures and algorithms exercise.',
        highlights: ['Room, guest and reservation management', 'Invoice generation', 'File I/O persistence'],
        stack: ['C', 'Algorithms', 'File I/O'],
        category: 'systems',
        year: '2024',
        image: 'assets/projects/hotel.webp',
        icon: 'i-bed',
        github: 'https://github.com/anass-fs/hotel-reservation-c',
        demo: ''
    },
    {
        id: 'portfolio',
        title: 'This Portfolio',
        tagline: 'Static, accessible, dependency-free',
        description:
            'Hand-written HTML, CSS and JavaScript: dark and light themes, inline SVG icons, project modal, working contact form, structured data and Open Graph tags. Hosted on GitHub Pages.',
        highlights: ['No framework, no build step', 'Accessible (keyboard, reduced motion, contrast)', 'SEO: JSON-LD, Open Graph, sitemap'],
        stack: ['HTML5', 'CSS3', 'JavaScript'],
        category: 'frontend',
        year: '2026',
        icon: 'i-code',
        github: 'https://github.com/anass-fs/portfolio',
        demo: 'https://anass-fs.github.io/portfolio/'
    }
];

const projectCategories = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full-stack' },
    { id: 'backend', label: 'Backend' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'systems', label: 'Systems' }
];
