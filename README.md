# HAMZA://OS — Personal Website

A cinematic, dark-premium personal site for Hamza Sadiq. Built to feel like exploring the digital mind of a curious engineer, not a portfolio template.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (scroll reveals, springs, page choreography)
- Three.js (interactive travel globe)
- Canvas 2D (starfield, neural network, matrix rain, confetti)
- WebAudio (synthesized crowd noise in Football Mode, zero audio assets)
- Geist / Geist Mono via the local `geist` package (no network fetch at build)

## Architecture

```
lib/data.ts          single source of truth for ALL content
lib/bus.ts           CustomEvent bus (terminal → easter egg overlays)
components/
  Experience.tsx     orchestrates the whole page (globe lazy-loaded)
  Preloader.tsx      terminal boot sequence (skipped on repeat visits)
  Starfield.tsx      fixed background: stars, aurora, shooting stars
  Cursor.tsx         glowing orb cursor (fine pointers only)
  Magnetic.tsx       magnetic-hover wrapper
  ...one file per section
```

## Editing content

Everything a visitor reads lives in [lib/data.ts](lib/data.ts) — roles, timeline, projects, skills, books, stats, terminal responses, and the Ask Hamza AI knowledge base. Edit that one file to update the site.

**Replace [public/Hamza-Sadiq-Resume.pdf](public/Hamza-Sadiq-Resume.pdf)** — the current file is a generated placeholder.

Update the LinkedIn/GitHub URLs in `lib/data.ts` (`identity`) if the handles differ.

## Hidden things

- Terminal: `help`, plus undocumented `sudo hire hamza`, `matrix`, `42`, `football`
- Konami code (↑↑↓↓←→←→BA) switches the accent theme
- Double-click the nav logo → Developer Mode
- The ⚽ in the footer → Football Mode
