## 2026-08-02T15:38:24Z
You are Worker 2 executing Milestone 2 (Core Pages & Copy Implementation + M1 Fix) for Apex Orion website build.

Working Directory: e:\Apex orion\.agents\teamwork_preview_worker_m2
Project Root: e:\Apex orion
Scope Document: e:\Apex orion\.agents\orchestrator\PROJECT.md
Implementation Plan Artifact: C:\Users\Alpha\.gemini\antigravity\brain\8b003206-6020-4b5a-a999-84a471ba2317\implementation_plan.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks:
1. Fix `src/components/common/CustomCursor.tsx`: Add `(prefers-reduced-motion: reduce)` query check to the `useEffect` initialization logic so the cursor is auto-disabled when reduced motion is requested.
2. Build Home Page (`src/pages/Home.tsx` + sub-components):
   - Hero Section: Full viewport height, bold headline "We don't just write code; we engineer digital dominance.", subhead "Apex Orion is a powerhouse team of Gen-Z developers delivering lightning-fast, premium digital solutions.", CTA button "Start a Project", kinetic typography (character-by-character animate in), slowly rotating 3D orbital ring SVG/Canvas.
   - Tech Stack Ticker (`src/components/sections/TechMarquee.tsx`): Infinite marquee of tech logos (React, Next, Tailwind, Vercel, Node, Python, etc.) inside glassmorphic panel.
   - Core Services Grid (`src/components/sections/ServicesGrid.tsx`): 4 cards (Web Development, Mobile Apps, Custom POS, UI/UX & Brand) using `TiltCard` with 3D tilt hover effects.
   - Featured Work (`src/components/sections/FeaturedWork.tsx`): 2-3 overlapping 3D project mockups with scroll-triggered fade up.
   - The Team (`src/components/sections/TeamSection.tsx`): Portrait cards for Alpha & Asad with quote "Led by Alpha & Asad. Lightning-fast delivery. Zero compromises."
3. Build Services Page (`src/pages/Services.tsx` + sub-components):
   - Hero Section: Headline "High-Performance Engineering.", subhead "From scalable web apps to seamless POS systems, we build tech that moves as fast as you do.", slide-up mask animation.
   - Service Details (`src/components/sections/ServiceDetail.tsx`): 4 alternating left/right glassmorphic panels for Service 1 (Web & App Dev), Service 2 (Custom POS), Service 3 (Brand & UI/UX), Service 4 (SEO & Social) with Orbital Orange glowing backdrops.
   - Final CTA Banner: Edge-to-edge banner with Orbital Orange gradient overlay and CTA "Get a Quote".
4. Build Portfolio Page (`src/pages/Portfolio.tsx` + sub-components):
   - Hero Section: Headline "Your vision, deployed.", subhead "A showcase of our cutting-edge technical execution."
   - Bento-box Project Grid (`src/components/sections/PortfolioGrid.tsx`): Asymmetrical grid of 6 project cards ("Fintech Dashboard", "E-Commerce App", "AI Analytics Platform", "Crypto Wallet", "SaaS POS System", "Brand Experience") with hover cursor circle ("View Project"), 3D tilt on desktop, static glassmorphic fallback on mobile.
   - Contact Teaser: "Let's Build Yours."
5. Build Contact Page (`src/pages/Contact.tsx` + `src/components/sections/ContactForm.tsx`):
   - 50/50 Split Layout:
     - Left Side: Headline "Let's build something extraordinary.", body "HQ: Faisalabad. Serving clients globally. Reach out to kick off your next project.", WhatsApp integration link, HQ details.
     - Right Side: Clean glassmorphic lead capture form floating over dark background. Fields: Name (text), Email (email), Service Needed (dropdown: Web, App, POS, Design, Other), Budget Range (dropdown), Project Details (textarea).
     - Zod Schema Validation (`react-hook-form` + `@hookform/resolvers/zod`): Real-time/onSubmit inline validation with subtle green (valid) and red (error) glows around input borders. Prevents empty submission and displays clear validation messages.
   - Floating WhatsApp action button fixed to bottom-right corner.
6. Verify production build execution: Run `npm run build` (`npx tsc -b && npx vite build`) in `e:\Apex orion` to ensure 0 type errors and production bundle generated cleanly.
