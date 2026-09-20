# Changelog

## 2026-09-20 — improve-portfolio

Rebuilt the page for a recruiter-first reading, keeping the visual identity (dark theme, orange accent, Space Grotesk / IBM Plex Sans).

### Added
- Hero with a real screenshot of the BINGA back-office (browser frame) instead of an animated headline.
- **Featured project** section for BINGA: 5-screen gallery (dashboard, merchants, contract form, PDF export, AI assistant), context, what I built, three measured results, stack.
- Real screenshots for BINGA and TechStore (`assets/projects/*.webp`); designed cover fallback for projects without a screenshot.
- Category filters (All / Full-stack / Backend / Frontend / Systems) instead of one chip per technology.
- Project detail modal with focus trap; keyboard-navigable gallery tabs.
- Formspree contact form with validation, honeypot and a mailto fallback while the form id is not configured.
- Light theme follows `prefers-color-scheme` on first visit; toggle persisted.

### Changed
- Copy rewritten: shorter, concrete, past tense for the internship (22 Jun – 22 Jul 2026), "Open to internships — summer 2027".
- Experience timeline with four measurable bullets per entry; skills regrouped (Backend / Frontend / Data & AI / Tools).
- Navigation: About · Featured · Projects · Experience · Skills · Contact + Résumé button.
- Page shortened (~35 % less scroll), fewer animations (no custom cursor, marquee or typewriter).

### Removed
- Custom cursor, marquee, typewriter, per-technology filter chips, empty gradient card headers.
