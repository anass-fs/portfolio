# Anass Zaari — Portfolio

Personal portfolio: **https://anass-fs.github.io/portfolio/**

Hand-written HTML, CSS and JavaScript — no framework, no build step. Hosted on GitHub Pages (branch `main`).

## Structure

| File | Role |
|---|---|
| `index.html` | Single page: hero, about, featured project (BINGA), projects, experience, skills, contact. Inline SVG icon sprite. |
| `styles.css` | Design tokens (dark / light), components, sections, responsive rules, reduced-motion. |
| `script.js` | Theme toggle, header, reveal + counters, project filters/cards/modal, featured gallery, Formspree form. |
| `projects.js` | **Project data** — the only file to edit to add or change a project. |
| `assets/projects/*.webp` | Project screenshots, 1200 × 675. A project without an image gets a designed cover automatically. |
| `assets/` | Favicon, Apple touch icon, Open Graph image. |

## Run locally

```bash
python -m http.server 8080
# open http://localhost:8080
```

## Add a project

Append an object to `projectsData` in `projects.js` (see the JSDoc typedef at the top of the file), drop an optional
`assets/projects/<id>.webp` screenshot (1200 × 675), done. Categories available for the filter bar: `fullstack`, `backend`, `frontend`, `systems`.

## Contact form

The form posts to Formspree. Create a free form at https://formspree.io, then replace `TODO_FORM_ID` in
`index.html` (`action="https://formspree.io/f/TODO_FORM_ID"`). Until then, the form falls back to opening the
visitor's email client with the message pre-filled.

## To-do (manual)

- [ ] `TODO_FORM_ID` → real Formspree form id (`index.html`)
- [ ] `demo` URL of the BINGA project → unlisted YouTube link of the 78 s demo (`projects.js`)
- [ ] Optional screenshot of this site: `assets/projects/portfolio.webp` — then add `image: 'assets/projects/portfolio.webp'` to the `portfolio` project in `projects.js`
- [ ] SantéPlus: public walkthrough video link (`projects.js`)
