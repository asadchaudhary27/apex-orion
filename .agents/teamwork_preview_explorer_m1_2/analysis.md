# Milestone 1 Component Architecture & Styling Analysis

**Project**: Apex Orion Website Build  
**Author**: Explorer 2 (Component Architecture & Styling Specialist)  
**Target Milestone**: M1 (Initialization & Design System)  
**Date**: August 2, 2026  
**Status**: Completed Analysis  

---

## 1. Executive Summary

This report establishes the complete structural, technical, and responsive specifications for the design system components in Milestone 1 of the Apex Orion website. The design language combines dark space aesthetics (`#050505`), high-contrast typography (Space Grotesk & Inter), glassmorphism, dynamic CSS 3D tilt effects, and an inverted custom cursor (`mix-blend-difference`).

Key architectural findings and design specifications include:
- **Glassmorphic Panels**: Standardized Tailwind classes (`bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl`) paired with feature queries (`@supports not (backdrop-filter: blur(1px))`) to ensure cross-browser compatibility and sub-60fps rendering.
- **3D Tilt Cards**: A hardware-accelerated, math-driven tilt card component (`TiltCard.tsx`) leveraging perspective and 3D transform matrices, backed by a robust responsive disabling mechanism for viewports `< 1024px`, touch devices (`pointer: coarse`), and user motion preferences (`prefers-reduced-motion: reduce`).
- **Custom Inverted Cursor**: A dual-layer Framer Motion cursor (`CustomCursor.tsx`) utilizing `mix-blend-difference` for high-contrast visual tracking, completely bypassed on touch/mobile devices to maintain native UX.
- **Responsive Layout System**: A sticky glassmorphic navigation header (`Navbar.tsx`) with scroll-reactive opacity transitions and mobile drawer accessibility, alongside a structured 4-column responsive footer (`Footer.tsx`).

---

## 2. Focus Area 1: Glassmorphic Panel Design Specifications

### 2.1 Visual & Token Specifications
The Apex Orion visual language relies heavily on dark glass surfaces floating over a deep space background (`#050505`).

- **Base Background**: `#050505` (Deep Space Black)
- **Primary Text**: `#F5F5F5` / `#FFFFFF` (Crisp White)
- **Accent Color**: `#FF5722` (Orbital Orange)
- **Glass Panel Fill**: `rgba(255, 255, 255, 0.05)` (`bg-white/5` or `bg-white/[0.03]`)
- **Glass Panel Blur**: `backdrop-blur-md` (12px blur radius) or `backdrop-blur-lg` (16px blur radius)
- **Glass Panel Border**: `1px solid rgba(255, 255, 255, 0.1)` (`border border-white/10` or `border-white/15`)
- **Glass Panel Inner Highlight**: `inset 0 1px 0 0 rgba(255, 255, 255, 0.1)` (subtle top highlight)
- **Shadow**: `shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]`

### 2.2 `GlassCard` Component Interface & Architecture (`src/components/common/GlassCard.tsx`)

```tsx
import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'hover-glow' | 'interactive' | 'solid-dark';
  glowColor?: 'orange' | 'white' | 'none';
  blurAmount?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  as?: React.ElementType;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  glowColor = 'none',
  blurAmount = 'md',
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  }[blurAmount];

  const variantClasses = {
    default: 'bg-white/5 border-white/10 shadow-2xl',
    'hover-glow': 'bg-white/5 border-white/10 hover:border-orange-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(255,87,34,0.15)] transition-all duration-300',
    interactive: 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 active:scale-[0.99] transition-all duration-200 cursor-pointer',
    'solid-dark': 'bg-[#0a0a0a]/80 border-white/10 backdrop-blur-md',
  }[variant];

  const glowClasses = {
    orange: 'before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-b before:from-orange-500/20 before:to-transparent before:-z-10',
    white: 'before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:-z-10',
    none: '',
  }[glowColor];

  return (
    <Component
      className={`relative rounded-2xl border ${blurClasses} ${variantClasses} ${glowClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
```

### 2.3 Cross-Browser Fallback Strategy
Browsers without `backdrop-filter` support (or devices running low-power modes) can fail to render blurred glass, resulting in harsh semi-transparent boxes or invisible text.

**CSS Fallback Layer (`src/styles/globals.css`)**:
```css
/* Fallback for browsers without backdrop-filter support */
@supports not (backdrop-filter: blur(1px)) {
  .glass-fallback {
    background-color: rgba(18, 18, 18, 0.92) !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
  }
}
```

### 2.4 GPU Acceleration & Performance Optimization
- Apply `transform-gpu` or `will-change-transform` to glassmorphic containers undergoing animation to force creation of dedicated compositor layers.
- Limit heavy blur (`backdrop-blur-xl`) on nested elements; stack glass cards cleanly without stacking multiple `backdrop-blur` contexts, which can cause frame drops on low-end integrated GPUs.

---

## 3. Focus Area 2: CSS 3D Tilt Card Implementation Design

### 3.1 Mathematical Model for 3D Tilt Cursor Tracking
When the cursor hovers over a 3D tilt card, the card rotates along the X and Y axes depending on the mouse pointer position relative to the element's bounding box center.

1. **Bounding Rectangle Calculation**:
   - `rect = cardRef.current.getBoundingClientRect()`
   - `centerX = rect.left + rect.width / 2`
   - `centerY = rect.top + rect.height / 2`
2. **Normalized Mouse Offsets (-1.0 to 1.0)**:
   - `normalizedX = (event.clientX - centerX) / (rect.width / 2)`
   - `normalizedY = (event.clientY - centerY) / (rect.height / 2)`
3. **Rotation Angles**:
   - `rotateX = -normalizedY * maxTiltDegrees` (tilting top down when mouse is at top)
   - `rotateY = normalizedX * maxTiltDegrees` (tilting right up when mouse is at right)
4. **Transform Matrix Application**:
   - `transform = perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`

### 3.2 `TiltCard` Component Architecture (`src/components/common/TiltCard.tsx`)

```tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation angle in degrees (default: 12)
  perspective?: number; // Perspective distance in px (default: 1000)
  scale?: number; // Hover scale factor (default: 1.02)
  glare?: boolean; // Enable shiny glare overlay
  disabled?: boolean; // Explicit disable flag
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  disabled = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glareStyle, setGlareStyle] = useState<{ opacity: number; transform: string }>({
    opacity: 0,
    transform: '',
  });
  const [isTouchOrMobile, setIsTouchOrMobile] = useState<boolean>(false);

  // Responsive & Motion media query check (< 1024px or reduced motion)
  useEffect(() => {
    const checkIsMobileOrReducedMotion = () => {
      const isMobileScreen = window.innerWidth < 1024;
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsTouchOrMobile(isMobileScreen || isCoarsePointer || prefersReducedMotion);
    };

    checkIsMobileOrReducedMotion();
    window.addEventListener('resize', checkIsMobileOrReducedMotion);
    return () => window.removeEventListener('resize', checkIsMobileOrReducedMotion);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouchOrMobile || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const normalizedX = (mouseX - cardWidth / 2) / (cardWidth / 2);
      const normalizedY = (mouseY - cardHeight / 2) / (cardHeight / 2);

      const rotateX = -normalizedY * maxTilt;
      const rotateY = normalizedX * maxTilt;

      setTransformStyle(
        `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
      );

      if (glare) {
        const glareAngle = Math.atan2(mouseY - cardHeight / 2, mouseX - cardWidth / 2) * (180 / Math.PI) - 90;
        const opacity = Math.hypot(normalizedX, normalizedY) * 0.35;
        setGlareStyle({
          opacity: Math.min(opacity, 0.4),
          transform: `rotate(${glareAngle.toFixed(2)}deg) translate(-50%, -50%)`,
        });
      }
    },
    [disabled, isTouchOrMobile, maxTilt, perspective, scale, glare]
  );

  const handleMouseLeave = useCallback(() => {
    if (disabled || isTouchOrMobile) return;
    setTransformStyle(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    setGlareStyle({ opacity: 0, transform: '' });
  }, [disabled, isTouchOrMobile, perspective]);

  // Mobile / Reduced Motion Fallback CSS
  if (isTouchOrMobile || disabled) {
    return (
      <div
        className={`relative rounded-2xl bg-white/5 border border-white/10 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: transformStyle ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`relative rounded-2xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden ${className}`}
      {...props}
    >
      {/* 3D Pop-out Inner Wrapper */}
      <div className="relative z-10 w-full h-full" style={{ transform: 'translateZ(30px)' }}>
        {children}
      </div>

      {/* Radial Glare Overlay */}
      {glare && (
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/30 to-transparent rounded-full transition-opacity duration-300 -z-0"
          style={{
            opacity: glareStyle.opacity,
            transform: glareStyle.transform,
          }}
        />
      )}
    </div>
  );
};
```

### 3.3 Layered Depth & Parallax Pop-out Mechanics
To achieve high-end depth inside the tilt card:
- Card container uses `transform-style: preserve-3d`.
- Background elements remain at `translateZ(0px)`.
- Card text/headings sit at `translateZ(20px)`.
- Floating icons, badges, or primary CTAs pop forward at `translateZ(40px)` or `translateZ(50px)`.

### 3.4 Responsive Fallback Matrix
| Viewport / Device Condition | 3D Tilt Enabled? | Hover State Mechanism |
|---|---|---|
| Desktop (≥ 1024px, Mouse Pointer) | **YES** | Hardware 3D RotateX/Y + Glare + 1.02 Scale |
| Laptop / Small Desktop (< 1024px) | **NO** | 2D Flat translateY(-4px) + Border Glow |
| Mobile Touch Device (`pointer: coarse`) | **NO** | Active scale(0.98) on tap |
| Reduced Motion Preference (`prefers-reduced-motion`) | **NO** | Static container, zero motion |

---

## 4. Focus Area 3: Custom Cursor Implementation Strategy

### 4.1 Dual-Layer Cursor Architecture (`src/components/common/CustomCursor.tsx`)
The custom cursor consists of two visual elements that track mouse movement on desktop viewports:
1. **Core Cursor Dot**: Precise 8px dot attached instantly to cursor position (0ms delay).
2. **Follower Ring**: Smooth 36px expanding ring with spring physics (`stiffness: 250, damping: 20`) via Framer Motion or requestAnimationFrame lerp.

### 4.2 Inverted Blending Mechanics (`mix-blend-difference`)
Using `mix-blend-difference` allows the white cursor to invert colors dynamically over light and dark elements on the site.

```tsx
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'view'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth follower ring spring configuration
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor on mobile / touch / screens < 1024px
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileWidth = window.innerWidth < 1024;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice || isMobileWidth || isCoarsePointer) {
      return; // Do not mount listeners or cursor on mobile
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('button, a, input, select, textarea, [data-cursor="pointer"]');
      const isProjectCard = target.closest('[data-cursor="view-project"]');

      if (isProjectCard) {
        setCursorVariant('view');
      } else if (isInteractive) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const ringVariants = {
    default: { height: 36, width: 36, backgroundColor: 'rgba(255, 255, 255, 1)', scale: 1 },
    hover: { height: 60, width: 60, backgroundColor: 'rgba(255, 255, 255, 1)', scale: 1.2 },
    view: { height: 80, width: 80, backgroundColor: 'rgba(255, 87, 34, 0.9)', scale: 1.4 },
  };

  return (
    <>
      {/* Precision Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Smooth Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40 mix-blend-difference flex items-center justify-center text-black font-semibold text-[10px] uppercase tracking-wider hidden lg:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={ringVariants[cursorVariant]}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {cursorVariant === 'view' && <span className="text-white drop-shadow-md">View</span>}
      </motion.div>
    </>
  );
};
```

### 4.3 Hardware & Viewport Fallback Mechanics
- Root CSS setting when custom cursor is active on desktop:
  ```css
  @media (min-width: 1024px) and (pointer: fine) {
    body {
      cursor: none;
    }
    a, button, [role="button"] {
      cursor: none;
    }
  }
  ```
- On touch devices or screen widths `< 1024px`, body retains standard `cursor: auto`, and `CustomCursor` renders `null` to avoid performance overhead and touch input conflicts.

---

## 5. Focus Area 4: Responsive Navbar & Footer Layout Architecture

### 5.1 Responsive Navbar Architecture (`src/components/common/Navbar.tsx`)

#### Layout Breakdown:
- **Desktop (≥ 1024px)**: Fixed full-width header with centered floating glass pill or edge-to-edge glass bar.
  - Left: Apex Orion Brand Logo with glowing Orbital Orange indicator dot.
  - Center: Nav link array (`Home`, `Services`, `Portfolio`, `Contact`) with interactive hover underlines and active page highlight.
  - Right: CTA Button ("Start a Project") rendered with Orbital Orange gradient (`from-[#FF5722] to-[#FF8A65]`).
- **Mobile (< 1024px)**: Compact bar with Brand Logo on left and Lucide `Menu` / `X` icon toggle on right.
  - Mobile Menu Drawer: Slide-down full-viewport glass container (`bg-[#050505]/95 backdrop-blur-xl z-50`).

#### Interface Specification & Code Architecture:

```tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/80 backdrop-blur-lg border-b border-white/10 py-4 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(255,87,34,0.5)]">
            <Rocket className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-white">
            APEX <span className="text-orange-500">ORION</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-md">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)] hover:scale-105 transition-all duration-300"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-50 bg-[#050505]/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between px-6 py-12 animate-fadeIn">
          <div className="flex flex-col space-y-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-3xl font-bold text-gray-200 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10">
            <a
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-lg"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
```

---

### 5.2 Responsive Footer Architecture (`src/components/common/Footer.tsx`)

#### Structural Design:
- Encapsulated in a heavy glass panel at the base of every page (`bg-[#050505] border-t border-white/10`).
- **Desktop Grid (4 Columns)**:
  - **Col 1 (Brand Info)**: Logo, slogan ("We engineer digital dominance"), social icon list (GitHub, LinkedIn, Twitter, WhatsApp).
  - **Col 2 (Quick Navigation)**: Links to main pages.
  - **Col 3 (Services Overview)**: Web Dev, Mobile Apps, Custom POS, UI/UX Design.
  - **Col 4 (HQ Location & Direct Contact)**: Faisalabad HQ, Global Client Delivery, WhatsApp direct contact button.
- **Bottom Bar**: Copyright statement, legal links, and back-to-top button.

#### Code Architecture:

```tsx
import React from 'react';
import { Rocket, ArrowUp, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 text-gray-400 pt-16 pb-12 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                APEX <span className="text-orange-500">ORION</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              We don't just write code; we engineer digital dominance. High-performance software by Gen-Z innovators.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-orange-500 transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/services#web" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="/services#mobile" className="hover:text-white transition-colors">Mobile Applications</a></li>
              <li><a href="/services#pos" className="hover:text-white transition-colors">Custom POS Systems</a></li>
              <li><a href="/services#design" className="hover:text-white transition-colors">UI/UX & Branding</a></li>
            </ul>
          </div>

          {/* Column 4: HQ Location & Global Delivery */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">Global HQ</h3>
            <p className="text-sm text-gray-400 mb-2">Faisalabad, Pakistan</p>
            <p className="text-sm text-gray-400 mb-4">Serving clients worldwide with zero compromises.</p>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Apex Orion. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

---

## 6. Summary Matrix of Component Specifications

| Component | Target File | Key Technical Features | Fallback Strategy |
|---|---|---|---|
| `GlassCard` | `src/components/common/GlassCard.tsx` | `bg-white/5`, `backdrop-blur-md`, `border-white/10`, glow variants | Semi-opaque dark background (`bg-[#121212]`) when `backdrop-filter` is unsupported |
| `TiltCard` | `src/components/common/TiltCard.tsx` | 3D perspective, matrix Math rotation, dynamic specular glare overlay | Bypassed on `< 1024px`, touch pointers, or reduced-motion. Uses flat translateY hover |
| `CustomCursor` | `src/components/common/CustomCursor.tsx` | Dual-layer dot + ring, `mix-blend-difference`, context scaling (`hover`, `view`) | Fully unmounted on `< 1024px` or touch input. Reverted to browser native cursor |
| `Navbar` | `src/components/common/Navbar.tsx` | Sticky scroll backdrop blur, active state tracking, mobile glass drawer | Fullscreen accessible drawer for mobile viewports `< 1024px` with scroll-lock |
| `Footer` | `src/components/common/Footer.tsx` | 4-column responsive grid, ambient background glow, social & HQ details | Multi-column desktop collapses to single-column vertical flow on mobile |

---

## 7. Conclusion & Recommendations

1. **Clean Separation of Concerns**: All 5 common components should reside in `src/components/common/` as specified in `PROJECT.md`.
2. **Strict Responsive Fallbacks**: The responsive checks for `TiltCard` and `CustomCursor` must be encapsulated in lightweight custom hooks (`useMediaQuery`, `useReducedMotion`) or clean media query listeners to guarantee smooth 60fps mobile execution.
3. **Accessibility**: All interactive elements (Navbar links, mobile menu button, Footer social links, Tilt cards) must include proper ARIA attributes (`aria-label`, `aria-expanded`) and keyboard focus outlines.
