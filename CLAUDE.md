# CLAUDE.md

Guidance for AI assistants (Claude Code and others) working in this repository.

## Project overview

Static marketing website for **Habaneros de la Lavanda Canarias**, a family-run
dog breeder and registered *núcleo zoológico* (registered animal-breeding
facility) in Vega de San Mateo, Gran Canaria, dedicated to responsible breeding
of the **Bichón Habanero** (Havanese). The breeder is Diana Martel Suárez.

It is a single-page (one-page, anchor-navigated) site plus a few standalone
legal pages. There is **no backend, no build step, and no dependencies** — just
hand-written HTML, CSS, and vanilla JavaScript served as flat files.

The site content and all user-facing copy are in **Spanish (es)**. The site also
cross-promotes a vacation rental ("La Lavanda") owned by the breeder.

## Repository structure

```text
Bichonhabanero/
├── index.html          # Main one-page site (~500 lines, all sections)
├── aviso-legal.html    # Legal notice (LSSI)
├── privacidad.html     # Privacy policy (GDPR/RGPD)
├── cookies.html        # Cookie policy
├── css/
│   └── styles.css      # All styling: design tokens + responsive layout (~660 lines)
├── js/
│   ├── script.js       # Main site interactivity (IIFE, modular by responsibility)
│   └── cookies.js       # Cookie-consent banner (localStorage)
├── assets/             # Images: logo.png, logo-favicon.png, hero.jpg, lavanda-*.jpg
├── README.md           # Human-facing usage guide (Spanish)
├── SDD.md              # Software Design Document (Spanish, detailed)
└── .nojekyll           # Disables Jekyll processing (served via GitHub Pages)
```

## How to run / preview

No build. Open `index.html` directly, or serve the folder statically for a
production-faithful preview:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
# or: npx serve .
```

There are **no tests, linters, or CI configured**. Validation is manual:
load the page in a browser and check the affected sections.

## Architecture & conventions

### Separation of concerns
- `index.html` — semantic structure and content only.
- `css/styles.css` — all presentation.
- `js/script.js` — all behavior (one wrapping IIFE in `"use strict"` mode).

Keep this split. Do not inline styles or scripts into the HTML, and do not add a
framework, bundler, or package manager — the "no build, no dependencies"
constraint is intentional (see `SDD.md` §2.1).

### CSS
- **Design tokens** live as CSS custom properties in `:root` at the top of
  `styles.css` (colors like `--habano`, `--cream`, `--gold`; plus `--radius`,
  `--shadow`, `--maxw`, font stacks). Reuse these variables — do not hard-code
  colors or sizes that a token already covers.
- Palette is warm "habano" tones (sand/cream/brown). Fonts: `Fraunces`
  (display/headings) and `Nunito Sans` (body), loaded from Google Fonts with a
  system-font fallback.
- Layout uses CSS Grid and Flexbox. Responsive **breakpoints: 900px (tablet)
  and 680px (mobile)**.

### JavaScript
- `js/script.js` is a single IIFE. Each feature is an independent, commented
  block guarded by an existence check (`if (el) { ... }`) so a missing element
  never throws. Follow this pattern when adding behavior.
- Features currently implemented: dynamic footer year, mobile hamburger menu,
  reading-progress bar, animated hero counters (`[data-count]`), back-to-top
  button, generated gallery + lightbox, the "La Lavanda" photo carousel,
  contact-form client-side validation, and reveal-on-scroll animations via
  `IntersectionObserver`.
- The gallery tiles (`galleryData`) and the carousel photos (`lavandaPhotos`)
  are defined as arrays in `script.js` — edit those arrays to change images.
- `js/cookies.js` is a separate IIFE for the consent banner; it stores the
  choice under the `localStorage` key `hl_cookie_consent`. The site uses **no
  tracking cookies** — keep it that way.

### HTML
- `lang="es"`; use Spanish for all copy.
- Section ids are the nav anchors: `#nosotros`, `#raza`, `#entorno`,
  `#ejemplares`, `#camadas`, `#galeria`, `#faq`, `#contacto` (plus `#top` and
  `#contenido`). Adding a section means adding both the `<section id>` and a nav
  `<li>` link in the header.
- Both scripts are loaded at the end of `<body>`: `js/script.js` then
  `js/cookies.js`.

### Accessibility (maintain this)
The site targets WCAG 2.1 AA. Preserve: the `skip-link`, `aria-*` attributes,
`aria-live`/`role="status"` on dynamic states, keyboard support (`Escape`
closes the lightbox), visible focus, and `prefers-reduced-motion` handling.
New interactive elements must keep these guarantees.

## Important data & known placeholders

Real, integrated data (do not invent replacements): breeder name (Diana Martel
Suárez), location (La Vega de San Mateo, Gran Canaria), registration numbers
`ES350330027837` (Gobierno de Canarias) and `20/2023` (Sociedad Canina de
Valencia), Instagram `@habaneros__la_lavanda_canarias`, WhatsApp
`+34 609 468 049`, Facebook `diana.martelsuarez`.

Still placeholder / pending (per README & SDD — don't present as final):
- The contact form **does not send anything**; submit is validated client-side
  only. Wiring it to a real service (Formspree, Netlify Forms, etc.) is future
  work.
- Dog and litter names in `#ejemplares` / `#camadas` are examples.
- The main `#galeria` tiles are emoji/gradient placeholders, not real photos.
- `aviso-legal.html` and `privacidad.html` are missing the owner's **NIF** and a
  **contact email** (marked pending in those files).

## Git workflow & conventions

- **Commit messages are written in Spanish**, imperative mood, one concise line
  (e.g. "Añadir foto del baño al carrusel de La Lavanda"). Match this style.
- Do not create pull requests unless explicitly asked.
- Deployment is static hosting (GitHub Pages / Netlify / Vercel). The
  `.nojekyll` file indicates GitHub Pages; no environment variables or build
  steps are involved.

## Further reading

- `README.md` — usage, customization table (what to change and where).
- `SDD.md` — full design document: architecture decisions, component map,
  non-functional requirements, deployment, and the future-work backlog.
