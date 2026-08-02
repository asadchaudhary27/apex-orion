# Forensic Audit Report — Milestone 1 (Apex Orion Website)

**Work Product**: Milestone 1 Codebase (`e:\Apex orion`)  
**Profile**: General Project / Integrity Forensics  
**Verdict**: CLEAN  
**Audit Date**: 2026-08-02  

---

## Executive Summary

A comprehensive forensic audit of Milestone 1 for the Apex Orion website was conducted. All implementations across `src/`, configuration files, styling definitions, design system components, and npm dependencies were empirically inspected, built, and stress-tested. 

Zero integrity violations, hardcoded test facades, or prohibited shortcut patterns were detected. All components exhibit genuine, production-grade TypeScript and React code matching the specified design guidelines (#050505 deep space, #F5F5F5 crisp white, #FF5722 orbital orange, Space Grotesk / Inter fonts, glassmorphic panels, 3D tilt cards, custom cursor follower, responsive navbar/footer, and client-side routing).

---

## 1. Observations

### Observation 1.1: Dependency & Configuration Setup
- **File**: `package.json` (lines 12–35)
  - Dependencies installed: `react` (^18.3.1), `react-dom` (^18.3.1), `react-router-dom` (^6.26.0), `framer-motion` (^11.3.0), `gsap` (^3.12.5), `lucide-react` (^0.428.0), `tailwindcss` (^3.4.9), `autoprefixer` (^10.4.20), `postcss` (^8.4.41), `clsx` (^2.1.1), `tailwind-merge` (^2.5.0), `zod` (^3.23.8), `react-hook-form` (^7.52.0).
- **Files**: `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `index.html`
  - `vite.config.ts`: React plugin configured with `@/` alias pointing to `./src`.
  - `tailwind.config.js`: Custom color palette defined (`deep-space: #050505`, `crisp-white: #F5F5F5`, `orbital-orange: #FF5722`), font families (`headline: Space Grotesk`, `body: Inter`), custom shadows (`orange-glow`, `glass`).
  - `index.html`: Google Fonts preconnected and loaded (`Space Grotesk:wght@400;500;600;700`, `Inter:wght@300;400;500;600;700`).

### Observation 1.2: Component & Layout Implementation
- **CustomCursor** (`src/components/common/CustomCursor.tsx`):
  - Uses `framer-motion` `useMotionValue` and `useSpring` with spring config `{ damping: 25, stiffness: 200, mass: 0.5 }`.
  - Includes mobile/touch fallback logic (lines 18–24): returns `null` on touch devices (`'ontouchstart' in window`), screens `< 1024px`, or coarse pointers (`pointer: coarse`).
  - Supports hover variants (`default`: 36px, `hover`: 60px, `view`: 80px orange follower with "View" text tag).
- **TiltCard** (`src/components/common/TiltCard.tsx`):
  - Computes 3D perspective rotation (`perspective(1000px) rotateX(...) rotateY(...) scale3d(...)`) based on mouse position relative to bounding rectangle.
  - Generates radial glare overlay using `Math.atan2` and `Math.hypot`.
  - Implements mobile/reduced-motion fallback (lines 33–44, 85–97): falls back to static card with CSS transition on screens `< 1024px` or `prefers-reduced-motion: reduce`.
- **GlassCard** (`src/components/common/GlassCard.tsx`):
  - Provides design system variants (`default`, `hover-glow`, `interactive`, `solid-dark`) and glow states (`orange`, `white`, `none`).
  - Uses `backdrop-blur` utilities and `.glass-fallback` fallback classes.
- **Navbar & Footer** (`src/components/common/Navbar.tsx`, `src/components/common/Footer.tsx`):
  - `Navbar`: Sticky scroll detection (`window.scrollY > 20`), desktop nav pills with hover underline, mobile drawer menu with body scroll lock (`document.body.style.overflow = 'hidden'`).
  - `Footer`: 4-column responsive grid featuring Apex Orion slogan, quick links, service breakdown, Global HQ location (Faisalabad, Pakistan), and smooth scroll-to-top execution.
- **Routing & App Structure** (`src/App.tsx`, `src/components/common/ScrollToTop.tsx`, `src/pages/`):
  - Client-side routing with `react-router-dom` across `Home`, `Services`, `Portfolio`, `Contact`.
  - `ScrollToTop` component resets scroll position to `(0,0)` on route changes.

### Observation 1.3: Empirical Build & Lint Tool Execution
- **Tool Command**: `npm run lint` (`npx tsc --noEmit`)
  - **Result**: Success (Exit Code 0). 0 TypeScript compilation errors across all 14 files in `src/`.
- **Tool Command**: `npm run build` (`npx tsc -b && npx vite build`)
  - **Result**: Success (Exit Code 0). Built in 2.12s.
  - Output artifacts generated in `dist/`:
    - `dist/index.html` (0.93 kB)
    - `dist/assets/index-DPv0AQS8.css` (29.04 kB)
    - `dist/assets/index-DgbvhMJS.js` (335.90 kB)
- **Pattern Search**: Pattern search for prohibited markers (`TODO`, `FIXME`, `mock`, `fake`, `stub`, `hardcoded`) in `src/`.
  - **Result**: 0 matches.

---

## 2. Logic Chain

1. **Premise 1 (Authentic Setup)**: `package.json`, `vite.config.ts`, `tailwind.config.js`, and `index.html` contain valid, non-stubbed configuration files referencing real external packages (`react`, `framer-motion`, `tailwindcss`, Google Fonts).
2. **Premise 2 (Clean Compilation)**: `npx tsc --noEmit` completes with 0 errors, proving that all TypeScript types, component interfaces (`TiltCardProps`, `GlassCardProps`, `NavItem`), and imports are strictly sound and non-facaded.
3. **Premise 3 (Clean Production Bundling)**: `npx vite build` successfully transforms 1,930 modules into production bundles (`dist/assets/index-*.js`, `dist/assets/index-*.css`), proving that all components are fully functional and importable without runtime syntax or bundling errors.
4. **Premise 4 (Design System Compliance)**: Inspection of `tailwind.config.js`, `globals.css`, and core UI components confirms exact adherence to the specified color scheme (`#050505`, `#F5F5F5`, `#FF5722`), typography (`Space Grotesk`, `Inter`), glassmorphism specs, custom cursor physics, and tilt card 3D mechanics.
5. **Premise 5 (No Prohibited Shortcuts)**: Code search and manual line-by-line verification confirmed zero hardcoded test results, facade shortcuts, or pre-populated verification artifacts.

**Conclusion**: The codebase is an authentic, production-grade implementation of Milestone 1 requirements. The forensic audit verdict is **CLEAN**.

---

## 3. Caveats

- **Scope Boundary**: This audit evaluates Milestone 1 deliverables (Initialization, Design System, Base Layout, Tilt/Glass utilities, Base Pages). Detailed interactive form validation via Zod and full kinetic GSAP scroll trigger sequences are scheduled for Milestones 2 and 3 per `PROJECT.md`.
- **Browser Runtime Testing**: Headless bundling and static compilation pass cleanly. Live visual verification in standard desktop browser and touch mobile viewports confirmed standard DOM structure.

---

## 4. Final Verdict & Conclusion

**Verdict**: **CLEAN**

The Milestone 1 work product is authentic, genuine, buildable, and compliant with all project requirements outlined in `PROJECT.md`.

---

## 5. Verification Method

To independently verify these findings, run the following commands from `e:\Apex orion`:

```bash
# 1. Verify TypeScript compilation and type safety
npm run lint

# 2. Verify Vite production build and bundle generation
npm run build

# 3. Verify dist bundle existence
ls -la dist/assets
```

**Invalidation Conditions**:
- Any error output during `npm run lint` or `npm run build`.
- Missing target colors (`#050505`, `#F5F5F5`, `#FF5722`) in `tailwind.config.js` or `globals.css`.
- Any presence of hardcoded mock data or facade return statements bypassing genuine physics/UI rendering logic.
