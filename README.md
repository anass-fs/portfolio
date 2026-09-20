# Anass Zaari — Portfolio

A fast, accessible, vanilla HTML/CSS/JS portfolio for **Anass Zaari** — Software Engineering
(IIR) student at EMSI, Casablanca, and full-stack developer (Spring Boot, Angular, Django, Symfony).

Live: https://anass-fs.github.io/portfolio/

## Features

- **Vanilla stack** — HTML5, CSS3, JavaScript (ES6+). No frameworks, no build step.
- **Inline SVG icons** — zero icon-library requests, only self-hosted fonts hit the network.
- **Dark / light theme** — persistent, with `prefers-color-scheme` friendly toggle.
- **Accessible** — semantic landmarks, one `h1`, visible focus styles, ARIA labels,
  reduced-motion support, keyboard-friendly project modal.
- **SEO** — descriptive meta tags, Open Graph / Twitter cards, JSON-LD Person schema,
  `robots.txt`, `sitemap.xml`, `site.webmanifest`.
- **Dynamic projects** — data lives in `projects.js`; cards, filters and the counter are
  rendered from it. Images go in `assets/projects/*.webp` and are lazy-loaded.
- **Working contact form** — posts to Formspree (fetch + JSON), with honeypot and an email
  fallback so visitors can always reach out.

## Local development

```bash
python -m http.server 8080
# then open http://localhost:8080
```

Or run `npx serve` / any static-server of your choice. Opening `index.html` directly from
disk also works, but the HTTP server avoids any file:// edge cases.

> `projects.js` and `script.js` are loaded with `defer`, so the page renders without them.

## Project structure

```text
.
├── index.html            # Semantic structure, meta/SEO, inline SVG sprite
├── styles.css            # Variables, components, sections, responsive
├── script.js             # Rendering, interactions, form, modal, a11y helpers
├── projects.js           # Central project data (editable here)
├── assets/
│   ├── favicon.svg        # "AZ" monogram
│   ├── og-image.png       # Social share image (1200 x 630)
│   ├── apple-touch-icon.png
│   └── projects/          # Screenshots: assets/projects/README.md
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Customization

- **Projects**: edit `projects.js`. Keep the JSDoc `@typedef` shape; images are optional.
- **Contact form**: replace `TODO_FORM_ID` in `index.html` with your real Formspree form ID
  (`https://formspree.io/f/...`). The form already submits cleanly — no page reload.
- **Personal info**: name, email, phone and links are centralized in `index.html` (meta,
  hero, about, contact, footer) and in the JSON-LD block.
- **Screenshots**: drop images into `assets/projects/` (1200 x 675 WebP). See
  `assets/projects/README.md`.

## Notes for the owner

Pending items (marked with `TODO(anass)` in the code where relevant):

1. Real Formspree form ID.
2. BINGA demo video URL (`projects.js`) and/or a dashboard screenshot (`assets/projects/binga.webp`).
3. SantéPlus public demo/video link (`projects.js`).

## Contact

- LinkedIn: https://www.linkedin.com/in/anass-zaari
- GitHub: https://github.com/anass-fs
- Email: zaaria46@gmail.com
- CV: https://drive.google.com/file/d/1xHHCDoHBneSHsE5vm3JZtkq1zgB7zaCM/view?usp=sharing

Built with patience and a bit of JavaScript.