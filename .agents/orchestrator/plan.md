# Execution Plan: Apex Orion Website Build

## Objective
Build a mobile-first, high-performance 4-page React website for Apex Orion meeting all requirements (R1-R4) and acceptance criteria.

## Phase 1: Setup & Design System (Milestone 1)
- Dispatch Explorers to inspect environment, node/npm tools, and structure recommendations.
- Dispatch Worker to initialize Vite React TypeScript application in `e:\Apex orion`.
- Install dependencies: `tailwindcss`, `@tailwindcss/vite` (or `autoprefixer`/`postcss`), `framer-motion`, `gsap`, `lucide-react`, `react-router-dom`, `react-hook-form`, `zod`, `@hookform/resolvers`.
- Configure Tailwind CSS theme for Deep Space Black (`#050505`), Crisp White (`#F5F5F5`/`#FFFFFF`), Orbital Orange (`#FF5722`).
- Setup typography imports for Space Grotesk and Inter.
- Implement reusable components: `Navbar`, `Footer`, `GlassCard`, `TiltCard`, `CustomCursor`.
- Reviewers and Challengers verify M1 build and functionality.
- Forensic Auditor verifies integrity.

## Phase 2: Core Pages & Copy Implementation (Milestone 2)
- Build 4 main pages with exact section flow & copy from `implementation_plan.md`:
  - **Home**: Hero (kinetic headline, orbital ring SVG/canvas), Tech Stack Ticker marquee, Core Services grid, Featured Work overlapping mockups, The Team (Alpha & Asad), Footer.
  - **Services**: Hero (slide-up mask), Service Details (alternating glassmorphic panels + glowing orange backdrop), Final CTA banner.
  - **Portfolio**: Hero, Bento-box project grid with interactive cursor trigger & tilt cards, Contact teaser.
  - **Contact**: 50/50 split layout (Left: HQ info, WhatsApp link; Right: Glassmorphic form with Zod inline validation), Floating WhatsApp button.
- Reviewers, Challengers, and Forensic Auditor verify M2.

## Phase 3: Motion, Fallbacks & Optimization (Milestone 3)
- Integrate Framer Motion & GSAP ScrollTrigger for smooth scroll reveals and kinetic typography.
- Mobile Fallbacks (< 1024px viewport):
  - Disable 3D tilt-on-hover (fallback to static glassmorphism with subtle `translate-y`).
  - Disable custom cursor on touch/mobile devices.
  - Respect `prefers-reduced-motion` media queries natively across all animations.
- Sub-second performance optimization: image lazy-loading, code splitting, asset optimization.
- Reviewers, Challengers, and Forensic Auditor verify M3.

## Phase 4: E2E Verification, Performance Audit & Delivery (Milestone 4)
- Run production build (`npm run build`).
- Verify zero console errors, zero TypeScript errors.
- Test form validation behavior.
- Test mobile view responsiveness and fallbacks.
- Audit Lighthouse performance score (> 90 desktop & mobile).
- Final Forensic Audit verification.
- Synthesize findings and report completion to user.
