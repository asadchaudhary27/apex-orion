# Original User Request

## 2026-08-02T10:28:57Z

# Teamwork Project Prompt — Draft

> Status: Ready for launch — awaiting user approval
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Build a premium, high-performance 4-page agency website (Home, Services, Portfolio, Contact) for "Apex Orion" using React (Vite/Next.js), Tailwind CSS, and Framer Motion, featuring a sleek dark mode aesthetic with 3D tilt cards and glassmorphism.

Working directory: `e:\Apex orion`
Integrity mode: development

## Requirements

### R1. Frontend Architecture & Styling
Implement a strict mobile-first React application using Tailwind CSS for utility styling. The design system must use a Deep Space Black background, Crisp White typography (Space Grotesk/Inter), and Orbital Orange accents.

### R2. Core Pages & Layout
Build the Home, Services, Portfolio, and Contact pages with the exact section flow and copy provided in the `C:\Users\Alpha\.gemini\antigravity\brain\8b003206-6020-4b5a-a999-84a471ba2317\implementation_plan.md` artifact. Include a dynamic project inquiry form with inline validation on the Contact page.

### R3. Advanced UI & Motion
Implement glassmorphic panels for navigation and cards. Use CSS 3D tilt-on-hover effects for portfolio/service cards on desktop. Integrate kinetic typography and scroll-triggered reveals using Framer Motion/GSAP.

### R4. Performance & Accessibility Fallbacks
Respect `prefers-reduced-motion` queries. Disable heavy 3D tilt cards and custom cursors on mobile devices (falling back to clean, static glassmorphism). Ensure sub-second load times by lazy-loading heavy assets.

## Acceptance Criteria

### Verification & Quality
- [ ] Lighthouse Performance score is > 90 on desktop and mobile.
- [ ] All 4 pages render without console errors.
- [ ] The Contact form successfully validates required fields and prevents empty submission.
- [ ] Mobile view (viewport < 1024px) successfully disables 3D tilt and custom cursor effects in favor of static glassmorphism.

---
*Next: when approved → delegate via invoke_subagent (see Delegation Protocol)*
