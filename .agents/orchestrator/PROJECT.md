# Project: Apex Orion Website

## Architecture
- React (Vite + TypeScript) SPA with client-side routing (`react-router-dom`).
- Styling: Tailwind CSS for utility styling, custom CSS modules/utility classes for glassmorphic panels and CSS 3D tilt.
- Typography: Space Grotesk (headings), Inter (body).
- Animation: `framer-motion` for kinetic typography and scroll reveals, `gsap` for scroll triggers.
- Form Validation: `react-hook-form` + `zod`.
- Icons: `lucide-react`.

## Code Layout
```
e:\Apex orion\
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── TiltCard.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── TechMarquee.tsx
│   │   │   ├── FeaturedWork.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── ServiceDetail.tsx
│   │   │   ├── PortfolioGrid.tsx
│   │   │   └── ContactForm.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── motion.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── index.html
```

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Initialization & Design System | Setup Vite+React+TS, Tailwind CSS theme (#050505, #F5F5F5, #FF5722), fonts, lucide-react, layout components, glassmorphism & tilt utilities | none | DONE |
| 2 | M2: Core Pages & Content Flow | Build Home, Services, Portfolio, Contact pages with exact copy and layout from implementation_plan.md. Contact form validation with Zod. | M1 | DONE |
| 3 | M3: Motion, Fallbacks & Optimization | Kinetic typography, Framer Motion/GSAP scroll reveals, prefers-reduced-motion queries, mobile fallbacks (< 1024px disable tilt/cursor), asset lazy loading | M2 | DONE |
| 4 | M4: E2E Testing, Lighthouse & Audit | Automated & manual checks: zero console errors, form validation test, mobile fallback test, Lighthouse > 90 score, Forensic Integrity Audit | M3 | DONE |

## Interface Contracts
### Components ↔ Pages
- `TiltCard`: Props `{ children, className, disabled }`. Disables 3D tilt on screens < 1024px or reduced-motion.
- `CustomCursor`: Active on desktop (≥ 1024px) with mouse pointing device. Hidden on mobile/touch.
- `ContactForm`: Zod schema validating `name` (required), `email` (valid email format), `service` (dropdown selection), `budget` (dropdown selection), `details` (min 10 chars). Submits with visual inline validation state (green/red borders) and prevents empty submission.
