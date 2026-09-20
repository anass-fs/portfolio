# Changelog

All notable changes to this portfolio. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/), except this project has no releases.

## [Unreleased]

### Added
- New featured **BINGA — Merchant Contract Management** project card, with ground-truth
  details: Spring Boot 3, Angular 20, Spring Security (JWT + 2FA + reCAPTCHA), Ollama
  (bge-m3 + Qwen2.5), iText / Apache POI. Demo and screenshot links pending (`TODO(anass)`).
- **Experience timeline** section (`#experience`) with the Berkeley Systems internship
  (22 Jun – 22 Jul 2026, defended 16 Sept 2026) and EMSI education (2023–2028, 3IIR).
- **Project detail modal** — click "Details" on any card for architecture, impact and
  full feature list; keyboard/Escape/backdrop dismissible with focus restore.
- **Working contact form** — posts to Formspree via fetch, with honeypot, inline
  validation, success/error states and an email fallback link.
- About section: "What I'm looking for" and "Currently learning" tag lists.
- Inline **SVG icon sprite** replacing Font Awesome (37 icons, zero external requests).
- New meta/SEO layer: canonical URL, Open Graph + Twitter cards, JSON-LD `Person` schema,
  `robots.txt`, `sitemap.xml`, `site.webmanifest`, `assets/favicon.svg`, generated
  `og-image.png` and `apple-touch-icon.png`.
- Accessibility: skip link, one `h1`, `aria-pressed` filters, live region for project
  results, `prefers-reduced-motion` support, focus-visible outlines.
- Performance: scripts deferred, images lazy-loaded, font `display=swap` + preconnect,
  hero typewriter height reserved, project counter computed from data.

### Changed
- Brand renamed from "ANAS" to **Anass Zaari** across all text, meta, JSON-LD and footer.
- Projects bring their own gradient + image; TechStore card merged; NextGen dead demo link
  removed; SantéPlus broken video link removed (`TODO(anass)` for a new one); portfolio
  demo link fixed.
- Hero subtitle + marquee updated to accurate stack (browser shows Angular, not React).
- Tech Stack regrouped into four categories (Frontend / Backend / Databases & Security / AI & Tools).
- Nav renamed (Skills, Work, Experience labels) with a new Experience entry.
- README rewritten; added `.editorconfig` and this file.

## [V2] — 2026

Baseline. Font Awesome icons, demo contact form, hard-coded project counter, "ANAS" brand.