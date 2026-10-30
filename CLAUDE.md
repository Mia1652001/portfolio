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

## Design System — Dark High Tech Look

The colors and fonts live in `app/globals.css` (inside the `@theme` blocks). Always use the Tailwind class names below. Never type hex codes like `#1A1A1A` straight into components.

### Colors

| Role | Hex | Tailwind classes |
| --- | --- | --- |
| Background | `#07090C` | `bg-bg` |
| Main text | `#E8ECEF` | `text-text` |
| Muted text | `#A3ADB5` | `text-muted` |
| Accent (mint) | `#5CF2B8` | `text-accent`, `bg-accent`, `border-accent` |
| Border lines | `#1F262D` | `border-line`, `bg-line` |

- Mint is the only bright color. Use it sparingly: buttons, links, hover states, small highlights.
- Text on a mint background uses `text-bg` (dark) so it stays readable.
- Thin borders and dividers use `border-line`.

### Fonts

| Use | Font | Tailwind class |
| --- | --- | --- |
| Headings | Space Grotesk | `font-heading` (applied to h1–h6 automatically) |
| Body text | Inter | `font-sans` (the default) |
| Small labels, tags, numbers | JetBrains Mono | `font-mono` |

- Fonts are loaded in `app/layout.tsx` with `next/font/google`.
- Small labels: `font-mono text-xs uppercase tracking-widest text-muted` is a good starting style.

### Animation

- Use the **motion** library (package name `motion`) for animations.
- Import it in components with: `import { motion } from "motion/react"`
- Any component that uses motion needs `'use client'` at the top.
- Keep animations subtle: short fades and slides, nothing flashy.

## Portfolio Projects (to feature on the site)

1. **Betty Beach** — swimwear/bikini e-commerce brand. Built with Next.js, TypeScript, Tailwind. Custom branding: cream/terracotta/teal palette, Bodoni Moda typography. Live: bettybeachstudios.com  
2. **WEARhouse** — clothing store built for a client on Shopify. Bold gold/black palette, witty copy. Shows client work and working with an existing brand.  
3. **Fleet Manager** — rental car management web app. Add cars, rent them out, sort by name/status/return date, filter by available/rented, live data. Live: [https://mia1652001.github.io/fleet-manager-/fleet-manager.html](https://mia1652001.github.io/fleet-manager-/fleet-manager.html)

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
- [x] Dark design system set up: colors, three fonts, motion library installed

### Known Issues

- The old light colors are still typed in as inline styles in `app/page.tsx`, `app/contact/page.tsx` and `components/Nav.tsx`. They need replacing with the new Tailwind color classes.

### Next Steps

- Restyle each page and component with the new dark design system  
