# Technical Analysis: Dependencies, Routing, & Directory Structure
**Agent**: Explorer 3 | **Milestone**: 1 (Foundation & Architecture) | **Date**: 2026-08-02

---

## 1. Executive Summary

This report provides a comprehensive architectural investigation into the dependencies, source tree structure, client-side routing, and build script setup for the **Apex Orion** website. The project is designed as a high-performance React Single Page Application (SPA) powered by Vite, TypeScript, and Tailwind CSS. 

Key conclusions:
- **10 Core Runtime Dependencies** are specified for animations, icon rendering, form validation, routing, and class utility management.
- **Source Directory Tree** strictly adheres to modular separation of concerns (`src/components/common`, `src/components/sections`, `src/pages`, `src/styles`, `src/utils`).
- **React Router v6** configuration enforces 4 core routes (`/`, `/services`, `/portfolio`, `/contact`) with smooth route-change scroll restoration.
- **Build & Dev Toolchain** in `package.json` relies on Vite for sub-second HMR and production bundling with `tsc -b` pre-build type checking.

---

## 2. Dependency Breakdown & Package Audit

### 2.1 Core Runtime Dependencies (`dependencies`)

| Package Name | Recommended Version | Primary Role & Architectural Purpose |
|---|---|---|
| `react` | `^18.3.1` | Core UI library |
| `react-dom` | `^18.3.1` | React DOM renderer |
| `react-router-dom` | `^6.26.0` | Client-side routing SPA manager (`BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation`) |
| `framer-motion` | `^11.3.0` | Kinetic typography, micro-interactions, page transition wrappers, custom cursor tracking |
| `gsap` | `^3.12.5` | High-performance scroll-driven animations and ScrollTrigger mechanics for section reveals |
| `lucide-react` | `^0.428.0` | Lightweight, customizable SVG icons (Code, Layers, Smartphone, Sparkles, Send, etc.) |
| `react-hook-form` | `^7.52.0` | Uncontrolled form state management preventing unnecessary re-renders during input |
| `zod` | `^3.23.8` | Schema validation library defining strict field contracts for lead generation |
| `@hookform/resolvers` | `^3.9.0` | Bridge binding Zod validation schemas directly into `react-hook-form` |
| `clsx` | `^2.1.1` | Utility for conditionally constructing class names |
| `tailwind-merge` | `^2.5.0` | Efficiently merges Tailwind CSS classes without conflict bugs |

### 2.2 Development Dependencies (`devDependencies`)

| Package Name | Recommended Version | Purpose |
|---|---|---|
| `typescript` | `^5.5.3` | Static typing enforcement |
| `@types/react` | `^18.3.3` | TypeScript bindings for React |
| `@types/react-dom` | `^18.3.0` | TypeScript bindings for React DOM |
| `@types/node` | `^20.14.0` | Path aliasing support (`@/` -> `./src`) |
| `@vitejs/plugin-react` | `^4.3.1` | Fast Refresh plugin for Vite |
| `vite` | `^5.4.0` | Next-generation build tool & dev server |
| `tailwindcss` | `^3.4.9` | Utility-first CSS framework |
| `postcss` | `^8.4.41` | CSS processor for Tailwind |
| `autoprefixer` | `^10.4.20` | Automatic browser vendor prefixing |
| `eslint` | `^9.9.0` | Code quality and linting rules |
| `eslint-plugin-react-hooks` | `^5.1.0-rc.0` | Linting rules for React Hooks |
| `eslint-plugin-react-refresh` | `^0.4.9` | Refresh compatibility linting |

### 2.3 Essential Helper Utility (`src/utils/cn.ts`)

To seamlessly combine `clsx` and `tailwind-merge`, the implementer must create `src/utils/cn.ts`:

```typescript
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 3. Source Tree Blueprint

The file structure is organized to ensure clear boundaries between reusable UI components, full-page sections, page routes, and utility functions.

```
e:\Apex orion\
├── public/
│   ├── favicon.ico
│   └── assets/
│       ├── logo.jpeg
│       └── mockups/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CustomCursor.tsx    # Mix-blend-difference cursor (≥1024px, pointer only)
│   │   │   ├── TiltCard.tsx        # 3D perspective hover card wrapper (disabled <1024px)
│   │   │   ├── GlassCard.tsx       # Standardized glassmorphism container wrapper
│   │   │   ├── Navbar.tsx          # Fixed glassmorphic navigation header with active indicator
│   │   │   └── Footer.tsx          # Site footer with brand, sitemap, legal, HQ details
│   │   └── sections/
│   │       ├── HeroSection.tsx     # Kinetic typography headline, 3D ring background, CTA
│   │       ├── ServicesGrid.tsx    # 2x2 / 4-column core services cards (Home)
│   │       ├── TechMarquee.tsx     # Infinite horizontal ticker of technology badges
│   │       ├── FeaturedWork.tsx    # Asymmetrical bento project previews (Home)
│   │       ├── TeamSection.tsx     # Founder portrait cards (Alpha & Asad)
│   │       ├── ServiceDetail.tsx   # Glassmorphic deep-dive rows for Services page
│   │       ├── PortfolioGrid.tsx   # Bento grid showcasing projects with cursor hover dynamics
│   │       └── ContactForm.tsx     # React Hook Form + Zod interactive form
│   ├── pages/
│   │   ├── Home.tsx                # Aggregates Hero, TechMarquee, ServicesGrid, FeaturedWork, TeamSection
│   │   ├── Services.tsx            # Aggregates Services Hero, ServiceDetail rows, CTA Banner
│   │   ├── Portfolio.tsx           # Aggregates Portfolio Hero, PortfolioGrid, Contact Teaser
│   │   └── Contact.tsx             # 50/50 Split layout: Company HQ info + ContactForm
│   ├── styles/
│   │   └── globals.css             # Tailwind directives, font imports (@import Space Grotesk & Inter), glass utility classes
│   ├── utils/
│   │   ├── cn.ts                   # Class merging helper (clsx + tailwind-merge)
│   │   └── motion.ts               # Reusable Framer Motion variants & GSAP animation configs
│   ├── App.tsx                     # Main Router layout wrapper, ScrollToTop, Route definitions
│   ├── main.tsx                    # React root renderer
│   └── vite-env.d.ts               # Vite environmental TypeScript definitions
├── package.json                    # Project manifest, dependencies, scripts
├── tsconfig.json                   # TypeScript project configuration & path aliases
├── tsconfig.app.json               # Application-specific TS config
├── tsconfig.node.json              # Node-specific TS config (for vite.config.ts)
├── tailwind.config.js              # Tailwind custom theme (Colors, Fonts, Animations)
├── postcss.config.js               # PostCSS config (Tailwind & Autoprefixer)
├── vite.config.ts                  # Vite build configuration (Path aliases `@/`)
└── index.html                      # HTML5 entry template with viewport & Google Fonts links
```

---

## 4. Client-Side Routing Architecture

### 4.1 Route Map

| Path | Page Component | Description |
|---|---|---|
| `/` | `Home` | High-impact landing page featuring kinetic hero, tech ticker, services grid, featured work, team |
| `/services` | `Services` | Comprehensive breakdown of technical services (Web/App, POS, UI/UX, SEO) with quote CTA |
| `/portfolio` | `Portfolio` | Bento-box showcase of past projects with interactive custom cursor hover states |
| `/contact` | `Contact` | Split 50/50 layout with Faisalabad HQ contact details and Zod-validated lead form |
| `*` | `Home` (or 404 Fallback) | Catch-all redirect maintaining smooth user navigation |

### 4.2 Route Restoration Utility (`src/components/common/ScrollToTop.tsx`)

To ensure that navigation between pages resets the viewport scroll to top:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

### 4.3 `App.tsx` Implementation Blueprint

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CustomCursor from './components/common/CustomCursor';
import ScrollToTop from './components/common/ScrollToTop';

import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-[#FF5722] selection:text-white flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
```

---

## 5. Package Manifest & Build System Specification

### 5.1 Proposed `package.json`

```json
{
  "name": "apex-orion-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "clsx": "^2.1.1",
    "framer-motion": "^11.3.0",
    "gsap": "^3.12.5",
    "lucide-react": "^0.428.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.52.0",
    "react-router-dom": "^6.26.0",
    "tailwind-merge": "^2.5.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.9",
    "typescript": "^5.5.3",
    "vite": "^5.4.0"
  }
}
```

### 5.2 `vite.config.ts` with Path Alias Resolution

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 6. Mobile & Accessibility Constraints Integration

1. **Custom Cursor Gate**: The `CustomCursor` component must check `window.innerWidth >= 1024` and `window.matchMedia('(pointer: fine)').matches` before mounting mouse event listeners to avoid execution overhead on mobile devices.
2. **TiltCard Mobile Fallback**: The `TiltCard` wrapper must disable 3D transformations on screens `< 1024px` or when `prefers-reduced-motion` is active.
3. **Route Changes**: Page navigation must scroll to top smoothly and trigger a clean fade-in reveal via Framer Motion without layout shifts (CLS < 0.1).

---

## 7. Verification Method for Implementers

1. **Dependency Installation**:
   ```bash
   npm install
   ```
   Verify no version conflicts or missing peer dependencies.

2. **TypeScript & Build Verification**:
   ```bash
   npm run build
   ```
   Ensures zero type errors in `tsc` and confirms Vite successfully outputs clean static bundles to `/dist`.

3. **Development Server Check**:
   ```bash
   npm run dev
   ```
   Verify routing between `/`, `/services`, `/portfolio`, `/contact` functions smoothly with instant HMR updates.
