/**
 * Programmatic Local SEO Architecture for ApexOrion Tech
 * Centralized, strictly-typed dataset and template generator
 * Targeting Tier-1 commercial tech hubs across the United States and the United Kingdom.
 */

export type CountryName =
  | 'United States'
  | 'United Kingdom'
  | 'United Arab Emirates'
  | 'Saudi Arabia'
  | 'Canada'
  | 'Australia'
  | 'Germany';

export type CountryCode = 'us' | 'uk' | 'ae' | 'sa' | 'ca' | 'au' | 'de';
export type HreflangCode = 'en-us' | 'en-gb' | 'en-ae' | 'en-sa' | 'en-ca' | 'en-au' | 'en-de';
export type CurrencySymbol = '$' | '£' | 'AED' | 'SAR' | '€';
export type CurrencyCode = 'USD' | 'GBP' | 'AED' | 'SAR' | 'CAD' | 'AUD' | 'EUR';

export interface LocationData {
  slug: string;
  name: string;
  country: CountryName;
  countryCode: CountryCode;
  hreflang: HreflangCode;
  currencySymbol: CurrencySymbol;
  currencyCode: CurrencyCode;
  stateOrRegion: string;
  techEcosystemNote: string;
  localIndustries: [string, string, string, string];
  popularNeighborhoodsOrHubs: string[];
  timezone: string;
}

export interface ServiceData {
  id: string;
  name: string;
  shortTitle: string;
  tagline: string;
  shortDesc: string;
  baseUsdStartingPrice: number;
  baseGbpStartingPrice: number;
  deliverables: string[];
  techStack: string[];
  coreBenefits: string[];
}

export interface LocalizedFAQ {
  question: string;
  answer: string;
}

export interface LocalizedServiceContent {
  service: ServiceData;
  location: LocationData;
  canonicalPath: string;
  canonicalUrl: string;
  pageTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  heroBadge: string;
  heroSubtitle: string;
  formattedStartingPrice: string;
  pricingNote: string;
  localContextNarrative: string;
  localChallengeAndSolution: {
    challengeTitle: string;
    challengeDescription: string;
    solutionTitle: string;
    solutionDescription: string;
  };
  deliverables: string[];
  techStack: string[];
  faqs: LocalizedFAQ[];
  hreflangLinks: Array<{ href: string; hreflang: string }>;
  schemaGraph: Array<Record<string, any>>;
}

export const BASE_SITE_URL = 'https://apexoriontech.com';

// ============================================================================
// 1. LOCATIONS DATA: 12 US CITIES + 10 UK CITIES
// ============================================================================

export const LOCATIONS: LocationData[] = [
  // --- UNITED STATES (12 CITIES) ---
  {
    slug: 'new-york',
    name: 'New York',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'New York (NY)',
    techEcosystemNote:
      'A hyper-competitive commercial powerhouse spanning Silicon Alley, Wall Street FinTech, Madison Avenue digital agencies, and enterprise SaaS. Businesses here demand ultra-low latency, high-concurrency systems, and distinctive digital branding to outpace tier-one market competition.',
    localIndustries: [
      'FinTech & Capital Markets',
      'Media, Advertising & Publishing',
      'Healthcare & Life Sciences',
      'Enterprise SaaS & E-commerce',
    ],
    popularNeighborhoodsOrHubs: ['Manhattan / Wall St', 'Silicon Alley / Flatiron', 'DUMBO Brooklyn', 'Hudson Yards'],
    timezone: 'EST (UTC-5)',
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'California (CA)',
    techEcosystemNote:
      'The heart of Silicon Beach, blending Hollywood entertainment, streaming media platforms, aerospace engineering, and direct-to-consumer lifestyle brands that require visually stunning, interactive, and mobile-first digital solutions.',
    localIndustries: [
      'Entertainment & Media Tech',
      'Silicon Beach Startups & D2C',
      'Aerospace & Clean Tech',
      'Fashion, Gaming & Experiential Web',
    ],
    popularNeighborhoodsOrHubs: ['Venice / Silicon Beach', 'Santa Monica', 'Culver City', 'Downtown LA'],
    timezone: 'PST (UTC-8)',
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Illinois (IL)',
    techEcosystemNote:
      'The Midwest economic capital dominated by high-frequency proprietary trading firms, nationwide logistics networks, manufacturing supply chains, and B2B SaaS corporations requiring mission-critical reliability and offline-capable software architectures.',
    localIndustries: [
      'Commodities & Algorithmic Trading',
      'Supply Chain & Freight Logistics',
      'Healthcare Informatics',
      'B2B Enterprise Software',
    ],
    popularNeighborhoodsOrHubs: ['The Loop', 'Fulton Market', 'River North', 'West Loop'],
    timezone: 'CST (UTC-6)',
  },
  {
    slug: 'houston',
    name: 'Houston',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Texas (TX)',
    techEcosystemNote:
      'Global energy capital and medical research vanguard with the Texas Medical Center. Companies require industrial-grade cloud architectures, robust IoT integration, field-ready POS systems, and resilient enterprise data pipelines.',
    localIndustries: [
      'Energy & Renewable Tech',
      'Biomedical & Healthcare',
      'Aerospace & Commercial Defense',
      'Commercial Trade & Logistics',
    ],
    popularNeighborhoodsOrHubs: ['Downtown Houston', 'Texas Medical Center', 'The Galleria', 'The Woodlands'],
    timezone: 'CST (UTC-6)',
  },
  {
    slug: 'austin',
    name: 'Austin',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Texas (TX)',
    techEcosystemNote:
      'The vibrant "Silicon Hills" tech hub home to major enterprise tech headquarters, venture-backed accelerators, and innovative startups modernizing away from legacy codebases into high-velocity React, Next.js, and cloud-native microservices.',
    localIndustries: [
      'Enterprise Software & SaaS',
      'Semiconductors & Deep Tech',
      'Digital Marketing & Creator Economy',
      'Consumer Tech & PropTech',
    ],
    popularNeighborhoodsOrHubs: ['Downtown Austin', 'The Domain', 'East Austin', 'South Congress'],
    timezone: 'CST (UTC-6)',
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Texas (TX)',
    techEcosystemNote:
      'The Dallas-Fort Worth metroplex is a dominant hub for Fortune 500 headquarters, telecom networks, enterprise logistics, and real estate empires seeking custom workflow automation, mobile apps, and scalable web platforms.',
    localIndustries: [
      'Telecommunications & 5G',
      'Financial Services & Insurance',
      'Real Estate Tech & Construction',
      'Retail & Franchise Operations',
    ],
    popularNeighborhoodsOrHubs: ['Uptown Dallas', 'Plano Legacy West', 'Deep Ellum', 'Las Colinas Irving'],
    timezone: 'CST (UTC-6)',
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'California (CA)',
    techEcosystemNote:
      'The epicenter of global technology innovation, Silicon Valley venture capital, generative AI advancements, and developer infrastructure. Founders require bleeding-edge UI/UX, performant full-stack engineering, and rapid MVP turnarounds.',
    localIndustries: [
      'Artificial Intelligence & LLMs',
      'Developer Tools & Cloud Infrastructure',
      'Venture-Backed SaaS',
      'Web3 & Autonomous Tech',
    ],
    popularNeighborhoodsOrHubs: ['SoMa', 'Mission District', 'Financial District', 'Palo Alto / South Bay'],
    timezone: 'PST (UTC-8)',
  },
  {
    slug: 'miami',
    name: 'Miami',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Florida (FL)',
    techEcosystemNote:
      'A rapidly booming international tech and financial gateway connecting North America and LATAM. Miami’s startup scene thrives on luxury hospitality tech, fintech, real estate technology, and high-conversion mobile commerce.',
    localIndustries: [
      'FinTech & Digital Assets',
      'Hospitality & Restaurant POS',
      'Luxury Real Estate Tech',
      'International Cross-Border Commerce',
    ],
    popularNeighborhoodsOrHubs: ['Brickell Financial District', 'Wynwood Tech District', 'Design District', 'Miami Beach'],
    timezone: 'EST (UTC-5)',
  },
  {
    slug: 'seattle',
    name: 'Seattle',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Washington (WA)',
    techEcosystemNote:
      'The premier cloud computing capital anchored by AWS and Microsoft ecosystems, boasting world-class software engineering talent, global e-commerce supply chains, and demanding standards for cloud resilience and system design.',
    localIndustries: [
      'Cloud Computing & DevOps',
      'E-commerce Platforms & Warehousing',
      'Interactive Gaming & AR/VR',
      'Biotech & Global Health',
    ],
    popularNeighborhoodsOrHubs: ['South Lake Union', 'Downtown Seattle', 'Bellevue', 'Pioneer Square'],
    timezone: 'PST (UTC-8)',
  },
  {
    slug: 'boston',
    name: 'Boston',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Massachusetts (MA)',
    techEcosystemNote:
      'An intellectual and deep-tech powerhouse driven by MIT and Harvard spin-offs, Kendall Square biotech institutions, edtech pioneers, and enterprise robotics requiring mathematically rigorous and compliant software.',
    localIndustries: [
      'Biotechnology & Genomics',
      'Higher Education & EdTech',
      'Robotics & Hardware Systems',
      'HealthTech & Medical Devices',
    ],
    popularNeighborhoodsOrHubs: ['Kendall Square Cambridge', 'Seaport Innovation District', 'Back Bay', 'Financial District'],
    timezone: 'EST (UTC-5)',
  },
  {
    slug: 'atlanta',
    name: 'Atlanta',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Georgia (GA)',
    techEcosystemNote:
      'The premier tech and corporate capital of the American Southeast, processing over 70% of US transaction card payments ("Transaction Alley"), with booming healthcare tech, logistics networks, and digital media production.',
    localIndustries: [
      'Payment Processing & Transaction Alley',
      'Supply Chain & Freight Tech',
      'Health IT & Public Health Systems',
      'Film, Music & Digital Media',
    ],
    popularNeighborhoodsOrHubs: ['Midtown Tech Square', 'Buckhead', 'Downtown Atlanta', 'Perimeter Center'],
    timezone: 'EST (UTC-5)',
  },
  {
    slug: 'denver',
    name: 'Denver',
    country: 'United States',
    countryCode: 'us',
    hreflang: 'en-us',
    currencySymbol: '$',
    currencyCode: 'USD',
    stateOrRegion: 'Colorado (CO)',
    techEcosystemNote:
      'The Mountain West innovation epicenter, combining high lifestyle appeal with a surging enterprise software corridor in the Denver Tech Center, clean tech startups, telecom infrastructure, and outdoor sports e-commerce.',
    localIndustries: [
      'Enterprise B2B Software',
      'Aerospace & Earth Sciences',
      'Renewable Energy & Cleantech',
      'Outdoor Recreation & Direct-to-Consumer',
    ],
    popularNeighborhoodsOrHubs: ['Denver Tech Center (DTC)', 'RiNo Art District', 'LoDo / Downtown', 'Boulder Tech Corridor'],
    timezone: 'MST (UTC-7)',
  },

  // --- UNITED KINGDOM (10 CITIES) ---
  {
    slug: 'london',
    name: 'London',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'Greater London',
    techEcosystemNote:
      "Europe's undisputed financial and technology capital spanning the City, Canary Wharf, and East London's Silicon Roundabout. Demands banking-grade security, FCA compliance readiness, and elite design aesthetics for international audiences.",
    localIndustries: [
      'FinTech & Digital Banking',
      'Corporate Law & Professional Services',
      'Creative & AdTech Agencies',
      'High-Growth Tech Startups',
    ],
    popularNeighborhoodsOrHubs: ['City of London', 'Canary Wharf', 'Shoreditch / Silicon Roundabout', 'Mayfair / Soho'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'Greater Manchester',
    techEcosystemNote:
      'The technological heartbeat of the Northern Powerhouse and MediaCityUK, driving major European e-commerce retail groups, digital marketing agencies, and cutting-edge software development hubs.',
    localIndustries: [
      'Fast Fashion & Retail E-Commerce',
      'Media, Broadcasting & Digital Content',
      'HealthTech & Manchester Science Park',
      'Cybersecurity & GovTech',
    ],
    popularNeighborhoodsOrHubs: ['Spinningfields', 'Northern Quarter', 'MediaCityUK Salford', 'Manchester Oxford Road Corridor'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'birmingham',
    name: 'Birmingham',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'West Midlands',
    techEcosystemNote:
      "The UK's second city and a bustling hub for advanced automotive engineering, smart manufacturing, financial services relocation, and a vibrant local hospitality and retail sector demanding modern POS systems.",
    localIndustries: [
      'Advanced Automotive & Manufacturing',
      'Business & Financial Shared Services',
      'Hospitality & Commercial Retail POS',
      'Smart City & Public Transport Infrastructure',
    ],
    popularNeighborhoodsOrHubs: ['Colmore Business District', 'Digbeth Creative Quarter', 'Jewellery Quarter', 'Edgbaston'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'leeds',
    name: 'Leeds',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'West Yorkshire',
    techEcosystemNote:
      "One of the UK's largest financial and legal centres outside London, recognized as a primary hub for digital health innovation (NHS Digital headquarters) and large-scale data engineering operations.",
    localIndustries: [
      'Digital Health & NHS HealthTech',
      'Banking, Building Societies & FinTech',
      'LegalTech & Professional Services',
      'Telecommunications & Gaming',
    ],
    popularNeighborhoodsOrHubs: ['Leeds City Centre', 'South Bank Innovation Hub', 'Holbeck Urban Village', 'Headingley'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'glasgow',
    name: 'Glasgow',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'Scotland',
    techEcosystemNote:
      "Scotland's largest metropolitan economy and a thriving technology hub known for satellite data engineering, maritime logistics tech, energy transition software, and vibrant creative studios.",
    localIndustries: [
      'SpaceTech & Satellite Data Analytics',
      'Engineering & Precision Manufacturing',
      'Renewable Energy Systems',
      'Creative Digital Media & Web',
    ],
    popularNeighborhoodsOrHubs: ['Merchant City', 'West End', 'Glasgow City Innovation District', 'Pacific Quay'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'Scotland',
    techEcosystemNote:
      "World-renowned for AI research from the University of Edinburgh, high-value asset management institutions, Scottish tech unicorns like Skyscanner, and top-tier data science incubation.",
    localIndustries: [
      'Artificial Intelligence & Data Science',
      'Wealth Management & Asset Services',
      'TravelTech & Marketplace Platforms',
      'Higher Education & Research Spin-outs',
    ],
    popularNeighborhoodsOrHubs: ['Edinburgh BioQuarter', 'Exchange District', 'Leith Tech Hub', 'Old Town / Informatics Forum'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'bristol',
    name: 'Bristol',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'South West England',
    techEcosystemNote:
      'A leading UK tech cluster renowned for microelectronics, aerospace innovation, creative animation studios (Aardman), and purpose-driven green-tech and sustainability platforms.',
    localIndustries: [
      'Microelectronics & Semiconductor Design',
      'Aerospace & Defense Systems',
      'Creative Animation & Interactive Media',
      'CleanTech & Environmental SaaS',
    ],
    popularNeighborhoodsOrHubs: ['Temple Quarter Enterprise Zone', 'Harbourside', 'Clifton', 'Stokes Croft'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'Merseyside',
    techEcosystemNote:
      'Maritime commerce capital transitioning into a creative and gaming hub (Baltic Triangle), with major strengths in life sciences, retail logistics, and immersive digital agency productions.',
    localIndustries: [
      'Maritime Logistics & Global Port Systems',
      'Creative & Digital Baltic Triangle Hub',
      'Video Game Development & Interactive 3D',
      'Biomanufacturing & Materials Science',
    ],
    popularNeighborhoodsOrHubs: ['Baltic Triangle', 'Commercial District', 'Knowledge Quarter', 'Royal Albert Dock'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'newcastle',
    name: 'Newcastle',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'Tyne and Wear',
    techEcosystemNote:
      'The digital flagship of North East England, home to FTSE 100 Sage Group, the National Innovation Centre for Data, and expanding software clusters in digital gaming and cloud management.',
    localIndustries: [
      'Enterprise Accounting & Cloud Software',
      'National Data Science & AI',
      'FinTech & Shared Services',
      'Subsea Engineering & Renewable Energy',
    ],
    popularNeighborhoodsOrHubs: ['Newcastle Helix', 'Quayside', 'Ouseburn Cultural Valley', 'Grey Street'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },
  {
    slug: 'cambridge',
    name: 'Cambridge',
    country: 'United Kingdom',
    countryCode: 'uk',
    hreflang: 'en-gb',
    currencySymbol: '£',
    currencyCode: 'GBP',
    stateOrRegion: 'Cambridgeshire',
    techEcosystemNote:
      'The legendary "Silicon Fen", Europe’s premier cluster for deep-tech, artificial intelligence, biotechnology, and semiconductor IP (ARM). Requires rigorous mathematical architecture and high-reliability systems.',
    localIndustries: [
      'DeepTech & Semiconductor IP',
      'Biotechnology & Life Sciences (AstraZeneca/Genome)',
      'Artificial Intelligence & Quantum Software',
      'Academic Research & Spin-out Commercialization',
    ],
    popularNeighborhoodsOrHubs: ['Cambridge Science Park', 'Silicon Fen St John’s Innovation Centre', 'Cambridge Biomedical Campus', 'CB1 Station District'],
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
  },

  // --- UNITED ARAB EMIRATES (2 CITIES) ---
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'ae',
    hreflang: 'en-ae',
    currencySymbol: 'AED',
    currencyCode: 'AED',
    stateOrRegion: 'Dubai Emirate',
    techEcosystemNote:
      'The Middle East’s preeminent technological and economic nexus, recognized globally for Dubai Internet City, DIFC FinTech accelerators, and luxury commercial dining. Enterprises mandate bilingual Arabic/English interfaces, FTA e-invoicing compliance, and sub-second payment workflows.',
    localIndustries: [
      'FinTech & Digital Assets (DIFC)',
      'Luxury Hospitality & Commercial Dining',
      'Real Estate PropTech & Brokerage Portals',
      'Cross-Border Supply Chain & Trade Logistics',
    ],
    popularNeighborhoodsOrHubs: ['DIFC Financial District', 'Dubai Internet City', 'Business Bay', 'Downtown Dubai'],
    timezone: 'GST (UTC+4)',
  },
  {
    slug: 'abu-dhabi',
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    countryCode: 'ae',
    hreflang: 'en-ae',
    currencySymbol: 'AED',
    currencyCode: 'AED',
    stateOrRegion: 'Abu Dhabi Emirate',
    techEcosystemNote:
      'The institutional capital of the UAE, anchored by Hub71, sovereign wealth funds (ADIA/Mubadala), clean energy innovators (Masdar City), and enterprise GovTech architectures requiring bank-grade security and national cloud compliance.',
    localIndustries: [
      'Sovereign Wealth & Financial Services',
      'Clean Energy & Masdar Smart City',
      'Aerospace, Defense & GovTech',
      'Healthcare Informatics & Life Sciences',
    ],
    popularNeighborhoodsOrHubs: ['Al Maryah Island (ADGM)', 'Hub71 Innovation Hub', 'Masdar City', 'Corniche Business Corridor'],
    timezone: 'GST (UTC+4)',
  },

  // --- SAUDI ARABIA (2 CITIES) ---
  {
    slug: 'riyadh',
    name: 'Riyadh',
    country: 'Saudi Arabia',
    countryCode: 'sa',
    hreflang: 'en-sa',
    currencySymbol: 'SAR',
    currencyCode: 'SAR',
    stateOrRegion: 'Riyadh Province',
    techEcosystemNote:
      'The dynamic headquarters of Saudi Arabia’s Vision 2030 digital transformation and LEAP tech vanguard. Rapidly modernizing government, retail, and enterprise systems that mandate ZATCA Phase 2 e-invoicing integration and in-kingdom data residency.',
    localIndustries: [
      'Vision 2030 Enterprise Platforms',
      'ZATCA E-Invoicing & FinTech',
      'Giga-Project Infrastructure (NEOM Ecosystem)',
      'Government Tech & Public Sector Modernization',
    ],
    popularNeighborhoodsOrHubs: ['King Abdullah Financial District (KAFD)', 'Digital City', 'Olaya Business District', 'Riyadh Front'],
    timezone: 'AST (UTC+3)',
  },
  {
    slug: 'jeddah',
    name: 'Jeddah',
    country: 'Saudi Arabia',
    countryCode: 'sa',
    hreflang: 'en-sa',
    currencySymbol: 'SAR',
    currencyCode: 'SAR',
    stateOrRegion: 'Makkah Province',
    techEcosystemNote:
      'The historic commercial gateway and seaport of the Kingdom along the Red Sea, leading massive initiatives in Red Sea tourism infrastructure, international maritime logistics, and high-growth retail e-commerce.',
    localIndustries: [
      'Maritime Shipping & Port Operations',
      'Red Sea Tourism & Hospitality POS',
      'Retail E-Commerce & FMCG Logistics',
      'Commercial Trade & Construction Tech',
    ],
    popularNeighborhoodsOrHubs: ['Jeddah Waterfront / Corniche', 'Al-Balad Heritage Tech District', 'Al-Rawdah Commercial Strip', 'King Abdullah Port Corridor'],
    timezone: 'AST (UTC+3)',
  },

  // --- CANADA (2 CITIES) ---
  {
    slug: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    countryCode: 'ca',
    hreflang: 'en-ca',
    currencySymbol: '$',
    currencyCode: 'CAD',
    stateOrRegion: 'Ontario (ON)',
    techEcosystemNote:
      'Canada’s premier financial and technological powerhouse along Bay Street and the Toronto-Waterloo AI corridor. Boasting world-class deep learning labs (Vector Institute), major banking institutions, and venture-backed SaaS firms requiring PIPEDA compliance.',
    localIndustries: [
      'Bay Street FinTech & Banking',
      'Artificial Intelligence & Deep Learning',
      'Biomedical & Healthcare Systems',
      'B2B Enterprise Software & PropTech',
    ],
    popularNeighborhoodsOrHubs: ['Financial District (Bay St)', 'MaRS Discovery District', 'King West Tech Corridor', 'Liberty Village'],
    timezone: 'EST (UTC-5)',
  },
  {
    slug: 'vancouver',
    name: 'Vancouver',
    country: 'Canada',
    countryCode: 'ca',
    hreflang: 'en-ca',
    currencySymbol: '$',
    currencyCode: 'CAD',
    stateOrRegion: 'British Columbia (BC)',
    techEcosystemNote:
      'The Pacific gateway and centerpiece of the Cascadia Innovation Corridor, blending a booming direct-to-consumer e-commerce ecosystem with leading video game development studios, cleantech pioneers, and cloud infrastructure firms.',
    localIndustries: [
      'Interactive Gaming & VFX/3D Modeling',
      'CleanTech & Environmental Engineering',
      'D2C E-Commerce & Retail Tech',
      'Cloud Enterprise SaaS',
    ],
    popularNeighborhoodsOrHubs: ['Yaletown', 'Gastown Innovation Hub', 'Mount Pleasant Tech Cluster', 'Downtown Vancouver'],
    timezone: 'PST (UTC-8)',
  },

  // --- AUSTRALIA (2 CITIES) ---
  {
    slug: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    countryCode: 'au',
    hreflang: 'en-au',
    currencySymbol: '$',
    currencyCode: 'AUD',
    stateOrRegion: 'New South Wales (NSW)',
    techEcosystemNote:
      'The undisputed financial and technology engine of Australasia, anchored by the Atlassian tech precinct, Barangaroo banking sector, and innovative venture startups seeking high-speed engineering without steep local agency billings.',
    localIndustries: [
      'FinTech & Digital Banking (Barangaroo)',
      'Enterprise SaaS & Cloud Infrastructure',
      'Logistics & Global Supply Chains',
      'Media, Advertising & Creative Studios',
    ],
    popularNeighborhoodsOrHubs: ['Tech Central / Surry Hills', 'Barangaroo Financial Hub', 'Pyrmont Creative District', 'North Sydney'],
    timezone: 'AEST / AEDT (UTC+10 / UTC+11)',
  },
  {
    slug: 'melbourne',
    name: 'Melbourne',
    country: 'Australia',
    countryCode: 'au',
    hreflang: 'en-au',
    currencySymbol: '$',
    currencyCode: 'AUD',
    stateOrRegion: 'Victoria (VIC)',
    techEcosystemNote:
      'Australia’s cultural and research capital, renowned for its Parkville biomedical precinct, leading e-commerce retail networks, cutting-edge creative agencies, and bustling hospitality venues needing mission-critical POS solutions.',
    localIndustries: [
      'Biomedical & Medical Devices',
      'Retail E-Commerce & D2C Brands',
      'Hospitality & Commercial POS Systems',
      'Education Technology (EdTech)',
    ],
    popularNeighborhoodsOrHubs: ['Cremorne Silicon Yarra', 'Docklands', 'Carlton / Parkville Innovation Precinct', 'Southbank'],
    timezone: 'AEST / AEDT (UTC+10 / UTC+11)',
  },

  // --- GERMANY (2 CITIES) ---
  {
    slug: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    countryCode: 'de',
    hreflang: 'en-de',
    currencySymbol: '€',
    currencyCode: 'EUR',
    stateOrRegion: 'Berlin State',
    techEcosystemNote:
      'Continental Europe’s most energetic startup laboratory and venture capital hub, renowned for Silicon Allee, fintech innovators (N26), green mobility platforms, and high-concurrency developer tooling demanding strict GDPR compliance.',
    localIndustries: [
      'FinTech & Digital Banking',
      'Mobility & Sustainable CleanTech',
      'Developer Tools & Web3 Infrastructure',
      'B2B Marketplaces & SaaS',
    ],
    popularNeighborhoodsOrHubs: ['Mitte / Silicon Allee', 'Kreuzberg', 'Prenzlauer Berg', 'Adlershof Technology Park'],
    timezone: 'CET / CEST (UTC+1 / UTC+2)',
  },
  {
    slug: 'munich',
    name: 'Munich',
    country: 'Germany',
    countryCode: 'de',
    hreflang: 'en-de',
    currencySymbol: '€',
    currencyCode: 'EUR',
    stateOrRegion: 'Bavaria (BY)',
    techEcosystemNote:
      'The industrial, enterprise, and deep-tech powerhouse of southern Germany, anchored by DAX corporations (BMW, Siemens), quantum computing institutes, smart manufacturing IoT, and aerospace engineering.',
    localIndustries: [
      'Industrial IoT & Smart Manufacturing',
      'Automotive Software & Autonomous Mobility',
      'Enterprise B2B Cloud Software',
      'InsurTech & Asset Management',
    ],
    popularNeighborhoodsOrHubs: ['Maxvorstadt', 'Schwabing', 'Werksviertel-Mitte', 'Garching Research Campus'],
    timezone: 'CET / CEST (UTC+1 / UTC+2)',
  },
];

// ============================================================================
// 2. CORE SERVICES DATA: 6 SERVICES
// ============================================================================

export const SERVICES: ServiceData[] = [
  {
    id: 'custom-web-development',
    name: 'Custom Web Development & SaaS',
    shortTitle: 'Web Development',
    tagline: 'Scalable, sub-second web platforms & enterprise SaaS architectures engineered with React, Node, and Cloud-native infrastructure.',
    shortDesc: 'We architect resilient, high-performance web applications using React, Next.js, TypeScript, and modern cloud technologies with sub-second page loads and bank-grade security.',
    baseUsdStartingPrice: 1499,
    baseGbpStartingPrice: 1199,
    deliverables: [
      'Bespoke, responsive Single-Page or Multi-Page React architecture',
      'Sub-second Core Web Vitals performance tuning (95+ Lighthouse scores)',
      'Secure REST & GraphQL API integrations with PostgreSQL / MongoDB',
      'Enterprise-grade authentication, role-based access control (RBAC), and encryption',
      'Automated CI/CD deployment pipeline with Docker & AWS / Vercel cloud hosting',
    ],
    techStack: ['React 18', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'GraphQL', 'AWS / Vercel'],
    coreBenefits: [
      'Sub-second latency that maximizes customer conversion rates',
      'Modular clean-code architecture built to scale to millions of monthly active users',
      'Zero vendor lock-in with 100% full intellectual property & code ownership transferred to you',
    ],
  },
  {
    id: 'mobile-app-development',
    name: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    tagline: 'High-performance cross-platform iOS & Android mobile applications engineered for native fluidity and offline reliability.',
    shortDesc: 'Cross-platform mobile applications engineered for native-like fluidity using Flutter and React Native, delivering seamless user journeys with offline synchronization.',
    baseUsdStartingPrice: 1999,
    baseGbpStartingPrice: 1599,
    deliverables: [
      'Single cross-platform codebase delivering native iOS and Android builds',
      'Offline-first data architecture with SQLite and real-time cloud sync',
      'Hardware integration (Biometric FaceID, GPS geofencing, Camera, Bluetooth, Apple Pay / Google Pay)',
      'Push notification messaging engine via Firebase Cloud Messaging (FCM)',
      'Complete Apple App Store & Google Play Store submission and certification approval',
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'SQLite', 'WebSockets', 'App Store Connect'],
    coreBenefits: [
      'Save 40–50% in development and maintenance costs compared to maintaining dual native codebases',
      'Consistent 60fps/120fps fluid micro-interactions that delight mobile users',
      'Guaranteed store compliance adhering strictly to Apple Human Interface and Google Material guidelines',
    ],
  },
  {
    id: 'custom-pos-systems',
    name: 'Custom POS Systems',
    shortTitle: 'Custom POS',
    tagline: 'Mission-critical, offline-first point-of-sale software engineered for retail chains, restaurants, and hospitality businesses.',
    shortDesc: 'Modern point-of-sale systems built specifically for dynamic operations. Sub-second order processing with 100% offline-first capabilities so transactions never halt.',
    baseUsdStartingPrice: 1299,
    baseGbpStartingPrice: 999,
    deliverables: [
      '100% offline-capable order terminal with automatic bidirectional cloud sync',
      'Real-time multi-terminal inventory tracking, low-stock triggers, and barcode scanning',
      'Thermal receipt printing engine with custom logo, QR code, and kitchen display integration (KDS)',
      'Comprehensive cashier shift management, sales auditing, tax reporting, and till reconciliation',
      'Direct card terminal integration (Stripe Terminal, SumUp, Square, Pax, Verifone EMV)',
    ],
    techStack: ['React', 'Electron / Tauri', 'SQLite', 'Node.js', 'WebSockets', 'Thermal Printer ESC/POS', 'Stripe Terminal'],
    coreBenefits: [
      'Zero downtime guarantee: keeps selling smoothly even when internet service drops completely',
      'No recurring monthly software extortion fees typical of proprietary legacy POS providers',
      'Customized precisely to your kitchen, barcode, wholesale, or multi-location workflow',
    ],
  },
  {
    id: 'ui-ux-brand-design',
    name: 'UI/UX & Brand Identity Design',
    shortTitle: 'UI/UX & Brand',
    tagline: 'Futuristic glassmorphism, intuitive user journeys, and cohesive brand design systems that command authority.',
    shortDesc: 'Digital experiences that feel distinctly premium and intuitive. We fuse behavioral psychology with cutting-edge visual hierarchy, glassmorphism, and responsive design systems.',
    baseUsdStartingPrice: 999,
    baseGbpStartingPrice: 799,
    deliverables: [
      'User journey mapping, information architecture, and clickable Figma prototypes',
      'Design Token architecture (colors, typography, spacing, shadows, responsive grids)',
      'Complete vector Brand Identity Kit (Primary logo, badges, favicons, corporate typography, color palettes)',
      'Comprehensive UI Component Library built ready for instant front-end developer implementation',
      'Interactive micro-animations and motion design specifications for high conversion',
    ],
    techStack: ['Figma', 'Adobe Creative Suite', 'Spline 3D', 'Framer Motion', 'Tailwind Design Tokens', 'FigJam'],
    coreBenefits: [
      'Elevates your brand perception into the top 1% of your regional competitive market',
      'Drastically slashes developer rework by delivering pixel-perfect specs and tokenized assets',
      'Proven UX patterns that reduce customer churn and streamline user onboarding flows',
    ],
  },
  {
    id: 'wordpress-woocommerce-development',
    name: 'WordPress & WooCommerce Development',
    shortTitle: 'WordPress Solutions',
    tagline: 'High-speed bespoke WordPress themes and conversion-optimized WooCommerce stores with zero bloated plugins.',
    shortDesc: 'Custom WordPress development that goes beyond generic templates. Scalable, speed-optimized, and hardened against security vulnerabilities with custom block editors.',
    baseUsdStartingPrice: 799,
    baseGbpStartingPrice: 649,
    deliverables: [
      '100% custom lightweight block-based theme built without page-builder bloat',
      'Custom WooCommerce store configuration with one-step checkout and multi-currency support',
      'Advanced Custom Fields (ACF Pro) content modeling for effortless client dashboard management',
      'Enterprise security hardening: brute-force mitigation, firewall rules, and SSL optimization',
      'Technical SEO architecture, schema markup, and Redis / Object Caching speed acceleration',
    ],
    techStack: ['WordPress Core', 'WooCommerce', 'PHP 8.2+', 'Bedrock', 'Tailwind CSS', 'ACF Pro', 'WPGraphQL', 'MySQL'],
    coreBenefits: [
      'Sub-1.2-second page load times that avoid the typical slow WordPress bloat',
      'Intuitive admin dashboard so your marketing team can update content without breaking layouts',
      'Robust e-commerce infrastructure ready to handle flash sales and high traffic surges',
    ],
  },
  {
    id: 'seo-digital-growth',
    name: 'Search Engine Optimization & Digital Growth',
    shortTitle: 'SEO & Growth',
    tagline: 'Technical SEO audits, programmatic landing architectures, and high-intent organic ranking strategies.',
    shortDesc: 'Strategic SEO implementations designed to steadily climb Google rankings and build organic authority through technical audits, structured data, and high-intent keyword capture.',
    baseUsdStartingPrice: 699,
    baseGbpStartingPrice: 549,
    deliverables: [
      'Full technical SEO audit covering crawlability, indexation, canonicals, and Core Web Vitals',
      'High-intent commercial keyword mapping targeting high-conversion local and national buyers',
      'Programmatic landing page architecture and complete JSON-LD Structured Data suite',
      'Competitor backlink gap analysis, on-page content optimization, and semantic search alignment',
      'Automated Google Search Console and analytics tracking with monthly executive ranking reports',
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Schema.org JSON-LD', 'Screaming Frog', 'Core Web Vitals'],
    coreBenefits: [
      'Capture ready-to-buy decision makers searching specifically for your services in your territory',
      'Eliminate technical debt and crawl traps that prevent Googlebot from indexing your pages',
      'Predictable organic traffic growth that reduces your dependency on costly Google and Meta ads',
    ],
  },
];

// ============================================================================
// 3. LOOKUP & QUERY HELPERS
// ============================================================================

export const getAllLocations = (): LocationData[] => LOCATIONS;

export const getAllServices = (): ServiceData[] => SERVICES;

export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return LOCATIONS.find((loc) => loc.slug.toLowerCase() === slug.toLowerCase());
};

export const getServiceById = (id: string): ServiceData | undefined => {
  return SERVICES.find((srv) => srv.id.toLowerCase() === id.toLowerCase());
};

export interface RouteParamCombination {
  serviceId: string;
  countryCode: CountryCode;
  citySlug: string;
}

/**
 * Returns all 132 valid route parameter combinations (22 cities * 6 services)
 */
export const getAllLocationServiceParams = (): RouteParamCombination[] => {
  const combinations: RouteParamCombination[] = [];
  for (const srv of SERVICES) {
    for (const loc of LOCATIONS) {
      combinations.push({
        serviceId: srv.id,
        countryCode: loc.countryCode,
        citySlug: loc.slug,
      });
    }
  }
  return combinations;
};

// ============================================================================
// 4. PROGRAMMATIC CONTENT & METADATA GENERATOR (WITH LOCAL ECOSYSTEM CONTEXT)
// ============================================================================

export const getLocalizedStartingPrice = (cur: CurrencyCode, srv: ServiceData): number => {
  switch (cur) {
    case 'GBP':
      return srv.baseGbpStartingPrice;
    case 'AED':
      return Math.round(srv.baseUsdStartingPrice * 3.67);
    case 'SAR':
      return Math.round(srv.baseUsdStartingPrice * 3.75);
    case 'CAD':
      return Math.round(srv.baseUsdStartingPrice * 1.35);
    case 'AUD':
      return Math.round(srv.baseUsdStartingPrice * 1.5);
    case 'EUR':
      return Math.round(srv.baseGbpStartingPrice * 1.15);
    case 'USD':
    default:
      return srv.baseUsdStartingPrice;
  }
};

export function generateLocationServiceContent(
  serviceId: string,
  citySlug: string
): LocalizedServiceContent | null {
  const service = getServiceById(serviceId);
  const location = getLocationBySlug(citySlug);

  if (!service || !location) {
    return null;
  }

  const { name: cityName, country, countryCode, currencySymbol, currencyCode, stateOrRegion, techEcosystemNote, localIndustries } = location;

  const basePrice = getLocalizedStartingPrice(currencyCode, service);
  const formattedStartingPrice = `${currencySymbol}${basePrice.toLocaleString()}`;
  const pricingNote = `Starting from ${formattedStartingPrice} ${currencyCode} • Milestone-based contracting with zero hidden fees`;

  // Canonical paths matching /locations/:countryCode/:citySlug/:serviceSlug
  const canonicalPath = `/locations/${countryCode}/${location.slug}/${service.id}`;
  const canonicalUrl = `${BASE_SITE_URL}${canonicalPath}`;

  // Unique Headings and Meta Content
  const pageTitle = `${service.name} in ${cityName}, ${stateOrRegion} | ApexOrion Tech`;
  const metaDescription = `Premier ${service.shortTitle.toLowerCase()} services in ${cityName}, ${stateOrRegion}. ApexOrion Tech delivers high-performance digital solutions tailored for ${cityName}'s ${localIndustries[0]} and ${localIndustries[1]} sectors. Starting from ${formattedStartingPrice}.`;
  
  const keywords = [
    `${service.shortTitle} ${cityName}`,
    `${service.name} ${cityName}`,
    `${cityName} software agency`,
    `${service.shortTitle} ${stateOrRegion}`,
    `best ${service.shortTitle.toLowerCase()} company in ${cityName}`,
    `${cityName} ${localIndustries[0].toLowerCase()}`,
    `${cityName} ${localIndustries[1].toLowerCase()}`,
    `hire ${service.shortTitle.toLowerCase()} developers ${cityName}`,
  ];

  const h1 = `${service.name} in ${cityName}`;
  const heroBadge = `Serving ${cityName}, ${stateOrRegion} & Greater Metro Area`;
  const heroSubtitle = `High-velocity software engineering, sub-second performance, and custom enterprise architectures tailored specifically for businesses in ${cityName}.`;

  // Deep Local Context Narrative (Prevents Doorway Page Penalties)
  const localContextNarrative = `Operating at the forefront of modern software engineering, ApexOrion Tech partners with innovative founders, established enterprises, and fast-scaling teams across ${cityName} and the wider ${stateOrRegion} region. As ${techEcosystemNote} our engineering team delivers bespoke ${service.shortTitle.toLowerCase()} solutions calibrated precisely to the competitive pressures of the ${cityName} market—particularly within prominent regional pillars such as ${localIndustries.join(', ')}. By combining senior full-stack craftsmanship with rapid milestone-driven sprints, we help ${cityName} organizations modernize legacy systems, automate complex workflows, and establish unshakeable digital dominance.`;

  // Localized Market Challenge & Solution
  const challengeTitle = `The Digital Engineering Challenge in ${cityName}`;
  let challengeDescription = '';
  if (countryCode === 'us') {
    challengeDescription = `Companies in ${cityName} often face exorbitant local software agency retainers ranging from $150 to $300/hour, bloated project scopes, and prolonged delivery delays. Startups and mid-market firms frequently find themselves priced out of senior engineering talent or trapped with legacy architectures that fail under high customer concurrency.`;
  } else if (countryCode === 'uk') {
    challengeDescription = `Enterprises and growing businesses in ${cityName} frequently struggle with steep local UK agency day-rates (typically £750 to £1,200/day), sluggish development turnaround times, and off-the-shelf templates that lack bespoke operational integration or fail stringent UK/EU data governance standards.`;
  } else if (countryCode === 'ae') {
    challengeDescription = `Organizations in ${cityName} encounter inflated local agency retainers (AED 450 to AED 850/hour) and rigid legacy vendors that lack agility, modern e-invoicing compliance (FTA), or native bilingual Arabic/English digital experiences.`;
  } else if (countryCode === 'sa') {
    challengeDescription = `Enterprises in ${cityName} navigating Vision 2030 transformations frequently encounter high agency premiums and long waitlists for teams capable of delivering ZATCA Phase 2 compliant e-invoicing, localized cloud infrastructure, and bilingual enterprise systems.`;
  } else if (countryCode === 'ca') {
    challengeDescription = `Businesses across ${cityName} grapple with rising domestic agency rates ($180 to $260 CAD/hour) and talent shortages in high-growth corridors, often forcing founders to compromise on software speed or security.`;
  } else if (countryCode === 'au') {
    challengeDescription = `Companies in ${cityName} face steep Australian agency billing rates ($180 to $320 AUD/hour) and lengthy delivery cycles, while rigid offshore alternatives fail to provide timezone-aligned agile collaboration.`;
  } else {
    challengeDescription = `Enterprises in ${cityName} require strict GDPR compliance, robust data residency, and sub-second performance, but local European development consultancies frequently bill €120 to €220/hour with months-long project backlogs.`;
  }

  const solutionTitle = `How ApexOrion Tech Solves This for ${cityName} Businesses`;
  const solutionDescription = `ApexOrion Tech breaks the traditional agency paradigm. We assign a dedicated squad of senior software architects, UI/UX designers, and QA engineers working directly with your stakeholders in ${cityName}. With transparent milestone pricing starting from ${formattedStartingPrice}, daily asynchronous updates, scheduled timezone-aligned standups, and rigorous automated testing, you receive Silicon Valley-caliber ${service.shortTitle.toLowerCase()} without local agency overheads.`;

  // 4 City-Specific Contextualized FAQs
  const faqs: LocalizedFAQ[] = [
    {
      question: `Why should our ${cityName}-based business choose ApexOrion Tech for ${service.shortTitle.toLowerCase()}?`,
      answer: `ApexOrion Tech gives ${cityName} companies direct access to senior full-stack engineers and certified technical architects without the inflated overhead of local agency retainers. We have extensive experience building scalable solutions tailored for ${cityName}'s dominant industries—including ${localIndustries[0]} and ${localIndustries[1]}—delivering sub-second performance, bulletproof security, and full code ownership.`,
    },
    {
      question: `How do you handle time zone differences and project communication with teams in ${cityName}?`,
      answer: `Our project managers and lead engineers maintain dedicated working hours overlapping with ${location.timezone} business hours. We collaborate seamlessly via dedicated Slack or Microsoft Teams channels, conduct scheduled video sprint reviews, and provide transparent Jira/Trello boards so you have real-time visibility into every commit and deliverable.`,
    },
    {
      question: `What is the estimated budget and delivery timeline for a ${service.shortTitle} project in ${cityName}?`,
      answer: `Our ${service.name} engagements for ${cityName} clients start at ${formattedStartingPrice} ${currencyCode}. Production timelines typically range between 2 to 6 weeks for core phases, organized into transparent sprint milestones. We provide a firm, fixed-scope proposal before writing a single line of code, ensuring zero unexpected budget overruns.`,
    },
    {
      question: `Do we retain 100% intellectual property (IP) and source code ownership?`,
      answer: `Yes, absolutely. Upon completion of each project milestone, all intellectual property, source repositories (GitHub/GitLab), design systems (Figma), database schemas, and deployment keys are transferred 100% to your organization under standard commercial contract terms aligned with ${country} business law. We sign mutual Non-Disclosure Agreements (NDAs) prior to project discovery.`,
    },
  ];

  // International Hreflang Tags (US & UK Cross-Linking)
  const hreflangLinks = [
    {
      hreflang: location.hreflang,
      href: canonicalUrl,
    },
    {
      hreflang: 'x-default',
      href: `${BASE_SITE_URL}/services/${service.id}`,
    },
  ];

  // Comprehensive JSON-LD Structured Data Schema Graph
  const schemaGraph: Array<Record<string, any>> = [
    // 1. BreadcrumbList Schema
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${BASE_SITE_URL}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.name,
          item: `${BASE_SITE_URL}/services`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: `${service.shortTitle} in ${cityName}`,
          item: canonicalUrl,
        },
      ],
    },

    // 2. Organization Schema
    {
      '@type': 'Organization',
      '@id': `${BASE_SITE_URL}/#organization`,
      name: 'ApexOrion Tech',
      url: BASE_SITE_URL,
      logo: `${BASE_SITE_URL}/logo_transparent.png`,
      email: 'contact@apexoriontech.com',
      telephone: '+923182834735',
      sameAs: [
        'https://linkedin.com/company/apexoriontech',
        'https://github.com/apexoriontech',
      ],
    },

    // 3. ProfessionalService / Local Provider Schema
    {
      '@type': 'ProfessionalService',
      '@id': `${canonicalUrl}#provider`,
      name: `ApexOrion Tech - ${service.name} (${cityName})`,
      url: canonicalUrl,
      email: 'contact@apexoriontech.com',
      telephone: '+923182834735',
      priceRange: '$$',
      currenciesAccepted: currencyCode,
      paymentAccepted: 'Credit Card, Stripe, International Wire Transfer, Wise',
      areaServed: [
        {
          '@type': 'City',
          name: cityName,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: stateOrRegion,
          },
        },
        {
          '@type': 'Country',
          name: country,
        },
      ],
      description: metaDescription,
    },

    // 4. Service Schema
    {
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: `${service.name} in ${cityName}`,
      serviceType: service.name,
      description: service.shortDesc,
      provider: {
        '@id': `${BASE_SITE_URL}/#organization`,
      },
      areaServed: {
        '@type': 'City',
        name: cityName,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${service.name} Packages`,
        itemListElement: [
          {
            '@type': 'Offer',
            name: `Professional ${service.name} Package`,
            price: basePrice,
            priceCurrency: currencyCode,
            priceValidUntil: '2028-12-31',
            availability: 'https://schema.org/InStock',
            url: canonicalUrl,
          },
        ],
      },
    },

    // 5. FAQPage Schema
    {
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faqs`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return {
    service,
    location,
    canonicalPath,
    canonicalUrl,
    pageTitle,
    metaDescription,
    keywords,
    h1,
    heroBadge,
    heroSubtitle,
    formattedStartingPrice,
    pricingNote,
    localContextNarrative,
    localChallengeAndSolution: {
      challengeTitle,
      challengeDescription,
      solutionTitle,
      solutionDescription,
    },
    deliverables: service.deliverables,
    techStack: service.techStack,
    faqs,
    hreflangLinks,
    schemaGraph,
  };
}

// ============================================================================
// 5. CITY OVERVIEW HUB GENERATOR (/locations/:countryCode/:citySlug)
// ============================================================================

export interface CityHubServiceSummary {
  service: ServiceData;
  formattedStartingPrice: string;
  path: string;
}

export interface CityHubContent {
  location: LocationData;
  canonicalPath: string;
  canonicalUrl: string;
  pageTitle: string;
  metaDescription: string;
  h1: string;
  heroBadge: string;
  heroSubtitle: string;
  localContextNarrative: string;
  services: CityHubServiceSummary[];
  hreflangLinks: Array<{ href: string; hreflang: string }>;
  schemaGraph: Array<Record<string, any>>;
}

export const getLocationsByCountry = (countryCode: CountryCode): LocationData[] => {
  return LOCATIONS.filter((loc) => loc.countryCode.toLowerCase() === countryCode.toLowerCase());
};

export function generateCityHubContent(citySlug: string): CityHubContent | null {
  const location = getLocationBySlug(citySlug);
  if (!location) return null;

  const { name: cityName, countryCode, currencySymbol, currencyCode, stateOrRegion, techEcosystemNote, localIndustries } = location;
  const isUS = countryCode === 'us';
  const canonicalPath = `/locations/${countryCode}/${location.slug}`;
  const canonicalUrl = `${BASE_SITE_URL}${canonicalPath}`;

  const pageTitle = `Software Development & Engineering in ${cityName}, ${stateOrRegion} | ApexOrion Tech`;
  const metaDescription = `Elite software engineering, bespoke web development, mobile apps, and custom offline POS systems for enterprises and startups in ${cityName}, ${stateOrRegion}.`;

  const h1 = `Software Development & Engineering in ${cityName}`;
  const heroBadge = `Regional Technology Hub • ${cityName}, ${stateOrRegion}`;
  const heroSubtitle = `ApexOrion Tech delivers sub-second digital products, cloud platforms, and offline-first software designed for ${cityName}'s competitive enterprise ecosystem.`;

  const localContextNarrative = `Operating across ${cityName} and the wider ${stateOrRegion} commercial corridor, ApexOrion Tech delivers end-to-end software engineering for fast-scaling companies and market leaders. As ${techEcosystemNote} We engineer digital solutions built to dominate in ${localIndustries.join(', ')}.`;

  const services: CityHubServiceSummary[] = SERVICES.map((srv) => {
    const basePrice = getLocalizedStartingPrice(currencyCode, srv);
    return {
      service: srv,
      formattedStartingPrice: `${currencySymbol}${basePrice.toLocaleString()}`,
      path: `/locations/${countryCode}/${location.slug}/${srv.id}`,
    };
  });

  const hreflangLinks = [
    { hreflang: location.hreflang, href: canonicalUrl },
    { hreflang: 'x-default', href: `${BASE_SITE_URL}/locations` },
  ];

  const schemaGraph: Array<Record<string, any>> = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Locations', item: `${BASE_SITE_URL}/locations` },
        { '@type': 'ListItem', position: 3, name: `${cityName}, ${stateOrRegion}`, item: canonicalUrl },
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${canonicalUrl}#organization`,
      name: `ApexOrion Tech - ${cityName}`,
      url: canonicalUrl,
      email: 'contact@apexoriontech.com',
      telephone: '+923182834735',
      priceRange: currencySymbol === '$' ? '$$' : '££',
      currenciesAccepted: currencyCode,
      areaServed: {
        '@type': 'City',
        name: cityName,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: stateOrRegion,
        },
      },
      description: metaDescription,
    },
  ];

  return {
    location,
    canonicalPath,
    canonicalUrl,
    pageTitle,
    metaDescription,
    h1,
    heroBadge,
    heroSubtitle,
    localContextNarrative,
    services,
    hreflangLinks,
    schemaGraph,
  };
}

