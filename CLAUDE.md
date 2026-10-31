# CLAUDE.md — Mia's Web Developer Portfolio

This file gives Claude Code context about this project. Read it at the start of every session.

## Project Overview

A professional portfolio website built to attract paying clients for web design and development work. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Commands

\# Start development server npm run dev

\# Build for production npm run build

\# Check for errors npm run lint

\# Install a new package npm install 

The dev server runs at: [http://localhost:3000](http://localhost:3000)

## Project Structure

/app /components       ← reusable UI components (Hero, ProjectCard, Nav, etc.) /lib              ← helper functions and portfolio project data /public             ← images and screenshots of my work CLAUDE.md           ← this file

## Code Conventions

- **Language:** TypeScript  
- **Components:** functional only, named exports  
- **Styling:** Tailwind CSS classes only — no inline styles, no separate CSS files  
- **Client components:** add `'use client'` at the top if using hooks (useState, useEffect) or event handlers  
- **Comments:** add a short comment above every function explaining what it does  
- Always include loading states and error handling

## Design System — Light, High End, Apple Style Look

The colors, shadows and fonts live in `app/globals.css` (inside the `@theme` blocks). Always use the Tailwind class names below. Never type hex codes like `#0F1115` straight into components.

### Colors

| Role | Hex | Tailwind classes |
| --- | --- | --- |
| Page background | `#FFFFFF` | `bg-bg` (also `text-bg` for white text on black buttons) |
| Soft panels and cards | `#F6F7F9` | `bg-panel` |
| Border lines | `#E6E8EC` | `border-line`, `bg-line` |
| Main text | `#0F1115` | `text-text`, `bg-text` (black buttons) |
| Muted text | `#5B616B` | `text-muted` |
| Light grey text | `#8A9099` | `text-faint` |
| Accent (deep green) | `#0F7A5A` | `text-accent`, `bg-accent`, `border-accent` |
| Pale green | `#E8F3EE` | `bg-accent-soft` |

- Mostly white, black and grey. Deep green is the only accent: use it sparingly for small highlights (status dots, section numbers, icons, links).
- Main buttons are black pills: `rounded-full bg-text text-bg`. Second buttons are white pills with a border: `rounded-full border border-line bg-bg text-text`.
- Pale green (`bg-accent-soft`) goes behind green icons and small badges.
- Thin borders and dividers use `border-line`. Cards and panels use `bg-panel` with `border-line`.
- No glows, neon or dark backgrounds.

### Shadows

| Use | Tailwind class |
| --- | --- |
| Nav, pills, cards | `shadow-soft` |
| Laptop and phone frames | `shadow-device` |

### Fonts

| Use | Font | Tailwind class |
| --- | --- | --- |
| Everything (headings and body) | Geist | `font-sans` (the default) |
| Small labels in capitals | Geist Mono | `font-mono` |

- Fonts are loaded in `app/layout.tsx` with `next/font/google`.
- Headings: `font-semibold` with tight letter spacing, e.g. `tracking-[-0.04em]` for big headlines, `tracking-[-0.03em]` for smaller ones.
- Small labels: `font-mono text-xs uppercase tracking-widest text-faint` is a good starting style.

### Animation

- Use the **motion** library (package name `motion`) for animations.
- Import it in components with: `import { motion } from "motion/react"`
- Any component that uses motion needs `'use client'` at the top.
- Keep animations subtle and calm: short fades, gentle rises and soft blur, nothing flashy.
- Only animate movement (`x`, `y`, `scale`, `rotate`), fading (`opacity`) and blur — never width, height or position, so it stays smooth on phones.
- Motion values (scroll effects, magnetic pull) go through motion's `style` prop. This is the one allowed exception to "no inline styles".
- Reduced motion: every animation must turn off when the visitor has it switched on. Check it with `usePrefersReducedMotion()` from `lib/useMediaQuery.ts` (not motion's own `useReducedMotion`, which can cause a server/browser mismatch). For CSS animations use the `motion-safe:` prefix.
- Hero (`components/Hero.tsx`): text only, fills the screen with everything centred. Faint dot grid background (the `dot-grid` class), headline words rise from blurred into focus one after another, and a small scroll cue at the bottom.
- VeFlow case study (`components/VeFlowShowcase.tsx`, inside the work section): laptop and phone using `LaptopFrame`, `PhoneFrame` and `FloatingPhone`. The laptop tilts up into place when it scrolls into view and grows slightly while scrolling; the phone floats gently.

## Portfolio Projects (to feature on the site)

All project text, links, numbers and screenshot paths live in `lib/projects.ts`, and so does the services section text. Edit that file to update the work and services sections. Screenshots go in `public/projects`.

1. **VeFlow** (featured case study) — my own SaaS car rental software, used by rental companies across Mauritius. Paying customers, English and French, new releases every week. Live: [veflowapp.com](https://veflowapp.com)  
2. **Betty Beach** — swimwear/bikini e-commerce brand. Built with Next.js, TypeScript, Tailwind. Custom branding: cream/terracotta/teal palette, Bodoni Moda typography. Live: bettybeachstudios.com  
3. **WEARhouse** — clothing store built for a client on Shopify. Bold gold/black palette, witty copy. Shows client work and working with an existing brand.

## Site Sections

- **Hero** — name \+ what I do \+ a clear "let's work together" button  
- **Projects** — the three projects above, each with image, description, and link  
- **About** — short, friendly intro about me and what I offer  
- **Services** — what I can build (websites, e-commerce, simple systems/tools)  
- **Contact** — email or contact form

## Beginner-Friendly Rules for Claude Code

- Always show the **full file content** when creating or editing a file  
- Tell me the **exact file path** for every file you create or edit  
- Tell me whether each command goes in **Mac Terminal** or this **Claude Code** session  
- If a change touches more than one file, list all files at the start  
- Never delete or overwrite files without confirming first  
- Prefer the **simplest solution** and explain any jargon — I'm a beginner  
- I type commands rather than paste them — keep commands short and simple, avoid special characters

## What's Done / What's Next

### Done

- [x] Project created with `create-next-app` (TypeScript, Tailwind, App Router)
- [x] Motion library installed
- [x] Light, Apple style design system: colors, shadows, Geist fonts
- [x] New floating pill nav and full screen, text only hero
- [x] VeFlow case study: laptop and phone showcase replaces the old 5 step scroll story

### Known Issues

- None right now.

### Next Steps

- Polish the work, services, about and contact sections in the new light style  
