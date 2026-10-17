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
        'obsidian': '#080808',
        'crisp-white': '#F5F5F5',
        'orbital-orange': '#FF5722',
        'cyber-orange': '#FF5722',
        'glass-bg': 'rgba(255, 255, 255, 0.03)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        tech: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'orange-glow': '0 0 30px rgba(255, 87, 34, 0.35)',
        'cyber-glow': '0 0 35px rgba(255, 87, 34, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333333%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 1.5s infinite'
      },
    },
  },
  plugins: [],
};
