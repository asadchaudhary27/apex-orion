# Milestone 1 Exploration Report: Vite + React + TypeScript + Tailwind CSS Setup

**Project Root**: `e:\Apex orion`  
**Working Directory**: `e:\Apex orion\.agents\teamwork_preview_explorer_m1_1`  
**Author**: Explorer 1 (Milestone 1)  
**Date**: August 2, 2026  

---

## 1. Executive Summary

This investigation report provides the complete technical blueprint and step-by-step execution roadmap for initializing the **Apex Orion** web application. Apex Orion is a high-performance, dark-themed React single-page application (SPA) built using **Vite**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, **Lucide React**, and **React Hook Form + Zod**.

The local environment is fully equipped with modern runtimes (Node.js v24.18.0, npm v11.16.0, create-vite v9.1.2). The project directory `e:\Apex orion` is currently clean and ready for initialization.

---

## 2. Directory Audit & Existing Files

An inspection of `e:\Apex orion` yielded the following state:
- **Project Root**: `e:\Apex orion`
- **Existing Subdirectories**: `.agents/` (contains orchestrator metadata, sentinel tracking, and explorer working directories).
- **App Files**: None currently exist in the root folder (`package.json`, `index.html`, `vite.config.ts`, and `src/` are to be created during initialization).

---

## 3. Toolchain & Environment Verification

Commands executed and verified on the host system:

| Tool | Version | Status | Notes |
|---|---|---|---|
| **Node.js** | `v24.18.0` | Verified | Modern LTS node engine |
| **npm** | `11.16.0` | Verified | Package manager |
| **npx** | `11.16.0` | Verified | Package runner |
| **create-vite** | `9.1.2` | Verified | Latest Vite scaffolding tool |

---

## 4. Step-by-Step Initialization Commands

The implementer agent must execute the following commands inside `e:\Apex orion`:

### Step 4.1: Scaffold Vite + React + TypeScript App
To scaffold directly inside `e:\Apex orion` without creating a redundant subfolder:

```powershell
# Navigate to project root (if not already in it)
# Run create-vite targeting the current directory
npx create-vite . --template react-ts
```

*Note: If prompted about non-empty directory (due to `.agents/`), confirm target directory.*

### Step 4.2: Install Core Dependencies
Install runtime libraries specified in `PROJECT.md` and `implementation_plan.md`:

```powershell
npm install react-router-dom lucide-react framer-motion gsap react-hook-form zod @hookform/resolvers
```

### Step 4.3: Install Tailwind CSS & Dev Tools
Depending on the preferred Tailwind version, run one of the following options:

#### Option A: Tailwind CSS v3 (Standard & Highly Compatible with plugins)
```powershell
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

#### Option B: Tailwind CSS v4 (Modern Vite Native `@tailwindcss/vite`)
```powershell
npm install -D tailwindcss @tailwindcss/vite @types/node
```

---

## 5. Design System & Tailwind CSS Configuration

### 5.1 Color Palette Definition
- **Deep Space Black**: `#050505` (Primary background, rich dark container panels)
- **Crisp White**: `#F5F5F5` (Primary body text, headers, high-contrast UI elements)
- **Orbital Orange**: `#FF5722` (Accent glowing highlights, primary CTA buttons, glowing active states)

### 5.2 Tailwind CSS v3 Configuration (`tailwind.config.js`)
If using Tailwind v3, populate `tailwind.config.js` with the custom colors, font families, and container glassmorphism utilities:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#050505',
        'crisp-white': '#F5F5F5',
        'orbital-orange': '#FF5722',
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.10)',
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'orange-glow': '0 0 25px rgba(255, 87, 34, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
```

### 5.3 Tailwind CSS v4 Configuration (`src/styles/globals.css`)
If using Tailwind v4, add `@theme` tokens in `src/styles/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-deep-space: #050505;
  --color-crisp-white: #F5F5F5;
  --color-orbital-orange: #FF5722;
  --color-glass-bg: rgba(255, 255, 255, 0.05);
  --color-glass-border: rgba(255, 255, 255, 0.10);
  
  --font-headline: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  
  --shadow-orange-glow: 0 0 25px rgba(255, 87, 34, 0.4);
}
```

### 5.4 Glassmorphism & Custom CSS Utilities (`src/styles/globals.css`)
Include base reset and utility classes in `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #050505;
    color: #F5F5F5;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
  }
}

@layer utilities {
  .glass-panel {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.10);
  }
  
  .glass-panel-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .glass-panel-hover:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 87, 34, 0.4);
    box-shadow: 0 0 25px rgba(255, 87, 34, 0.25);
  }
}
```

---

## 6. Font Integration Strategy

To integrate **Space Grotesk** (Headlines) and **Inter** (Body text), two complementary approaches are recommended:

### Approach A: Google Fonts via HTML Head (Recommended for standard web loading)
Add the preconnect and Google Fonts link tags to `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Apex Orion — Digital Dominance</title>
    
    <!-- Google Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#050505] text-[#F5F5F5] font-body antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Approach B: NPM Self-Hosted Font Packages (`@fontsource`)
For offline / reliable bundled font loading without external CDN runtime dependencies:

```powershell
npm install @fontsource/space-grotesk @fontsource/inter
```

Import in `src/main.tsx`:
```typescript
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
```

---

## 7. Directory Structure Blueprint

The implementer agent must organize `src/` to strictly comply with `PROJECT.md`:

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
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── ServicesGrid.tsx
│   │       ├── TechMarquee.tsx
│   │       ├── FeaturedWork.tsx
│   │       ├── TeamSection.tsx
│   │       ├── ServiceDetail.tsx
│   │       ├── PortfolioGrid.tsx
│   │       └── ContactForm.tsx
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

---

## 8. Summary of Recommendations for Implementer Agent

1. Execute `npx create-vite . --template react-ts` in `e:\Apex orion`.
2. Install `react-router-dom`, `lucide-react`, `framer-motion`, `gsap`, `react-hook-form`, `zod`, `@hookform/resolvers`.
3. Install `tailwindcss`, `postcss`, `autoprefixer` and configure `tailwind.config.js` with `#050505`, `#F5F5F5`, `#FF5722`.
4. Inject Space Grotesk & Inter font links in `index.html`.
5. Create empty component shells and page routes corresponding to the target directory layout.
6. Verify development server build using `npm run dev` and type-checking using `npx tsc --noEmit`.
