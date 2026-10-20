export interface ProjectDetailData {
  id: string;
  name: string;
  description: string;
  category?: string;
  tags?: string[];
  gallery: string[];
}

export const PROJECT_DETAILS: Record<string, ProjectDetailData> = {
  '3d-tile-visualizer-&-calculator': {
    id: '3d-tile-visualizer-&-calculator',
    name: '3D Tile Visualizer & Calculator',
    category: '3D Web Application',
    tags: ['Three.js', 'WebGL', 'React', 'Calculators'],
    description: 'An interactive 3D WebGL visualizer and precision surface tile calculator. Enables homeowners and contractors to configure tile layouts, simulate realistic room lighting in real time, and generate instantaneous area and material cost estimations.',
    gallery: [
      '/3d tile visualizer & calculator/3d-tile-visualizer-&-calculator-1.webp',
      '/3d tile visualizer & calculator/3d-tile-visualizer-&-calculator-2.webp',
      '/3d tile visualizer & calculator/3d-tile-visualizer-&-calculator-3.webp'
    ]
  },
  'acme-skill': {
    id: 'acme-skill',
    name: 'Acme Skill',
    category: 'Corporate EdTech Platform',
    tags: ['React', 'LMS', 'UI/UX Design', 'Dashboards'],
    description: 'A corporate skills development platform and training portal. Engineered with modern React state architecture, interactive course modules, and real-time competency assessments to accelerate enterprise team onboarding and technical upskilling.',
    gallery: [
      '/Acme skill/acme-skill-1.webp',
      '/Acme skill/acme-skill-2.webp',
      '/Acme skill/acme-skill-3.webp'
    ]
  },
  'chicken-mashwi-pos': {
    id: 'chicken-mashwi-pos',
    name: 'Chicken Mashwi POS',
    category: 'Restaurant Point of Sale',
    tags: ['Electron', 'Offline SQLite', 'POS', 'Invoicing'],
    description: 'Custom offline-first desktop point-of-sale system engineered specifically for Chicken Mashwi. Features high-velocity touch checkout, instant table order routing, daily closing drawer tallying, and thermal receipt printing without internet dependence.',
    gallery: [
      '/Apexrestu/apexrestu-1.webp',
      '/Apexrestu/apexrestu-2.webp',
      '/Apexrestu/apexrestu-3.webp'
    ]
  },
  'chicken-mashwi-web': {
    id: 'chicken-mashwi-web',
    name: 'Chicken Mashwi Web',
    category: 'Food Ordering Experience',
    tags: ['React', 'Next-Gen UI', 'E-Commerce', 'Mobile First'],
    description: 'A high-conversion online food ordering and digital menu platform for Chicken Mashwi. Engineered with sub-second page loads, sensory visual menus, seamless cart customization, and direct instant order routing via WhatsApp.',
    gallery: [
      '/Chicken mashwi web/chicken-mashwi-web-1.webp',
      '/Chicken mashwi web/chicken-mashwi-web-2.webp',
      '/Chicken mashwi web/chicken-mashwi-web-3.webp'
    ]
  },
  'eduka': {
    id: 'eduka',
    name: 'Eduka',
    category: 'Education Management Portal',
    tags: ['EdTech', 'React', 'Analytics', 'Enterprise'],
    description: 'A modern educational management system and administrative portal. Centralizes student enrollments, attendance records, gradebook distributions, and curriculum tracking through high-clarity data dashboards and role-based permissions.',
    gallery: [
      '/eduka/eduka-1.webp',
      '/eduka/eduka-2.webp',
      '/eduka/eduka-3.webp',
      '/eduka/eduka-4.webp',
      '/eduka/eduka-5.webp'
    ]
  },
  'marhaba-home': {
    id: 'marhaba-home',
    name: 'Marhaba Home',
    category: 'Real Estate Showcase',
    tags: ['Real Estate', 'React', 'Property Filter', 'UI/UX'],
    description: 'A luxury real estate property showcase and client acquisition platform. Features immersive property galleries, neighborhood amenity filters, virtual tour showcases, and high-conversion direct inquiry scheduling for buyers and investors.',
    gallery: [
      '/Marhaba Home/marhaba-home-1.webp',
      '/Marhaba Home/marhaba-home-2.webp',
      '/Marhaba Home/marhaba-home-3.webp',
      '/Marhaba Home/marhaba-home-4.webp'
    ]
  },
  'oye-biryani': {
    id: 'oye-biryani',
    name: 'Oye Biryani',
    category: 'Restaurant Web Platform',
    tags: ['Food Delivery', 'Mobile Web', 'Framer Motion'],
    description: 'A fast-loading, appetizing food delivery and takeout ordering platform for Oye Biryani. Designed with kinetic food imagery, streamlined combo builders, and direct mobile checkout for frictionless customer conversions.',
    gallery: [
      '/oye biryani/oye-biryani-1.webp',
      '/oye biryani/oye-biryani-2.webp',
      '/oye biryani/oye-biryani-3.webp',
      '/oye biryani/oye-biryani-4.webp'
    ]
  },
  'pollus': {
    id: 'pollus',
    name: 'Pollus',
    category: 'Business Operations Dashboard',
    tags: ['Business Intelligence', 'Analytics', 'React', 'Charts'],
    description: 'An executive business operations and team productivity intelligence dashboard. Transforms raw operational data into actionable revenue metrics, project velocity charts, and team KPI visualizations.',
    gallery: [
      '/pollus/pollus-1.webp',
      '/pollus/pollus-2.webp',
      '/pollus/pollus-3.webp'
    ]
  },
  'zarcostar': {
    id: 'zarcostar',
    name: 'Zarco Star Building LLC',
    category: 'Global Construction Platform',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'Vite', 'Motion', 'Lenis'],
    description: 'A multi-lingual digital platform created in 3 different languages, featuring a highly intuitive and awesome user interface for global clients. Built with sub-second performance, international SEO, and interactive corporate showcases.',
    gallery: [
      '/zarcostar-building-llc.png',
      '/zarco-star.png'
    ]
  },
  'zarco-star': {
    id: 'zarco-star',
    name: 'Zarco Star Building LLC',
    category: 'Global Construction Platform',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'Vite', 'Motion', 'Lenis'],
    description: 'A multi-lingual digital platform created in 3 different languages, featuring a highly intuitive and awesome user interface for global clients. Built with sub-second performance, international SEO, and interactive corporate showcases.',
    gallery: [
      '/zarcostar-building-llc.png',
      '/zarco-star.png'
    ]
  },
  'tech-team-designs': {
    id: 'tech-team-designs',
    name: 'Tech Team Designs',
    category: 'Creative 3D Web Agency',
    tags: ['Three.js', 'React Three Fiber', 'GSAP', 'WebGL', 'Tailwind'],
    description: 'A fully immersive 3D website featuring interactive 3D design cards, smooth scroll animations, and a cutting-edge creative portfolio showcasing technical excellence and design innovation.',
    gallery: [
      '/techteamdesigns.png'
    ]
  },
  'techteamdesigns': {
    id: 'techteamdesigns',
    name: 'Tech Team Designs',
    category: 'Creative 3D Web Agency',
    tags: ['Three.js', 'React Three Fiber', 'GSAP', 'WebGL', 'Tailwind'],
    description: 'A fully immersive 3D website featuring interactive 3D design cards, smooth scroll animations, and a cutting-edge creative portfolio showcasing technical excellence and design innovation.',
    gallery: [
      '/techteamdesigns.png'
    ]
  },
};