import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Smartphone, MonitorCheck, Palette, ArrowUpRight, Box, Share2, Cloud, Search, Edit3, PenTool, LayoutTemplate, Pen } from 'lucide-react';

export interface ServiceCardData {
  id: string;
  title: string;
  shortDesc: string;
  highlights: string[];
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
  glowColor: string;
}

export const SERVICES_DATA: ServiceCardData[] = [
  {
    id: 'web',
    title: 'Web Development',
    shortDesc: 'We architect and build blazing-fast, secure, and highly scalable web applications using React, Next.js, and modern serverless technologies. From complex SaaS dashboards to high-conversion corporate landing pages, we engineer solutions that dominate your market.',
    highlights: ['Next.js & React SPAs', 'Sub-second Page Loading', 'Responsive & Accessible', 'SEO-Optimized Architecture', 'Enterprise-grade Security'],
    icon: Code,
    gradient: 'from-violet-600 via-indigo-500 to-cyan-400',
    iconColor: 'text-violet-400',
    glowColor: 'rgba(139,92,246,0.4)',
  },
  {
    id: 'wordpress',
    title: 'WordPress Solutions',
    shortDesc: 'Custom WordPress development, theme customization, and WooCommerce integration. We build highly scalable, secure, and SEO-optimized WordPress websites tailored to your exact business needs.',
    highlights: ['Custom Theme Dev', 'WooCommerce Integration', 'Plugin Architecture', 'Speed Optimization', 'Advanced Security'],
    icon: LayoutTemplate,
    gradient: 'from-blue-600 via-blue-500 to-sky-400',
    iconColor: 'text-blue-400',
    glowColor: 'rgba(59,130,246,0.4)',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Designing',
    shortDesc: 'Stunning visual assets that instantly capture attention. From premium branding and logo design to eye-catching social media posts and marketing collateral, we create graphics that convert.',
    highlights: ['Brand Identity & Logos', 'Social Media Graphics', 'Marketing Materials', 'Vector Illustrations', 'Print & Digital Media'],
    icon: Pen,
    gradient: 'from-orange-500 via-rose-500 to-pink-500',
    iconColor: 'text-rose-400',
    glowColor: 'rgba(244,63,94,0.4)',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    shortDesc: 'Cross-platform mobile applications engineered for native-like performance and silky 60fps user interfaces. We use Flutter and React Native to deliver your product simultaneously on iOS and Android without compromising on quality or speed.',
    highlights: ['Flutter & React Native', 'Offline Sync Capabilities', 'iOS & Android Ready', 'Custom Animations', 'Push Notification Engines'],
    icon: Smartphone,
    gradient: 'from-sky-500 via-blue-500 to-indigo-600',
    iconColor: 'text-sky-400',
    glowColor: 'rgba(14,165,233,0.4)',
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    shortDesc: 'Data-driven campaigns and brand management to completely dominate your social presence. We handle everything from content strategy and premium creative asset design to active community management and targeted paid ad scaling.',
    highlights: ['Viral Growth Strategies', 'Premium Content Creation', 'Community Engagement', 'Influencer Outreach', 'ROI-Focused Campaigns'],
    icon: Share2,
    gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
    iconColor: 'text-fuchsia-400',
    glowColor: 'rgba(217,70,239,0.4)',
  },
  {
    id: 'brand',
    title: 'UI/UX & Brand',
    shortDesc: 'We design digital experiences that feel distinctly premium and intuitive. Our design process fuses psychology with stunning visuals, incorporating glassmorphism, kinetic typography, and fluid micro-interactions to guarantee your users say "wow".',
    highlights: ['Kinetic Design Systems', 'Fluid Micro-Interactions', 'Cohesive Brand Guidelines', 'User Journey Mapping', 'A/B Tested Layouts'],
    icon: Palette,
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    iconColor: 'text-pink-400',
    glowColor: 'rgba(236,72,153,0.4)',
  },
  {
    id: 'search-engine-optimization',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Comprehensive SEO strategies to dominate search rankings and drive massive organic traffic. We utilize technical SEO, on-page optimization, and high-quality link building to ensure your business stays at the top of search results.',
    highlights: ['Technical SEO Audits', 'On-Page Optimization', 'White-Hat Link Building', 'Keyword Strategy', 'Monthly Rank Reporting'],
    icon: Search,
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
    iconColor: 'text-lime-400',
    glowColor: 'rgba(132,204,22,0.4)',
  },
  {
    id: 'pos',
    title: 'Custom POS',
    shortDesc: 'Modern point-of-sale systems built specifically for your business operations. Our custom POS software is incredibly fast, deeply reliable, and features real-time inventory management that works even when your internet connection drops.',
    highlights: ['Real-time Inventory Sync', 'Offline Resilience', 'Custom Hardware Support', 'Multi-Store Management', 'Detailed Analytics Dashboard'],
    icon: MonitorCheck,
    gradient: 'from-orange-500 via-amber-400 to-yellow-400',
    iconColor: 'text-orange-400',
    glowColor: 'rgba(249,115,22,0.4)',
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    shortDesc: 'Engaging, SEO-optimized copy tailored specifically to capture your audience and convert visitors into loyal clients. We craft technical blogs, persuasive landing page copy, and compelling email sequences that speak your brand\'s voice.',
    highlights: ['SEO Optimized Copy', 'Brand Voice Match', 'High Conversion Rates', 'Technical Blogging', 'Email Sequences'],
    icon: Edit3,
    gradient: 'from-yellow-500 via-orange-400 to-red-500',
    iconColor: 'text-yellow-400',
    glowColor: 'rgba(234,179,8,0.4)',
  },
  {
    id: 'script-writer',
    title: 'Script Writer',
    shortDesc: 'Compelling scripts for videos, ads, and pitches that hook attention from the absolute first second. We structure narratives that maximize audience retention and drive action, perfect for YouTube, TikTok, and high-stakes investor pitches.',
    highlights: ['Viral Video Ads', 'YouTube Scripts', 'Investor Pitch Decks', 'High Retention Hooks', 'Story-Driven Sales'],
    icon: PenTool,
    gradient: 'from-red-500 via-rose-500 to-pink-600',
    iconColor: 'text-red-400',
    glowColor: 'rgba(239,68,68,0.4)',
  },
  {
    id: 'saas',
    title: 'SaaS Solutions',
    shortDesc: 'Ready-to-use software products engineered for enterprise scaling. Whether you need a robust HR platform, an automated booking system, or a custom ERP, we provide battle-tested cloud infrastructure that is ready to deploy immediately.',
    highlights: ['Plug-and-Play Setup', 'Scalable Cloud Infrastructure', 'REST/GraphQL APIs', 'Role-Based Access', 'Automated Billing'],
    icon: Cloud,
    gradient: 'from-cyan-500 via-teal-400 to-emerald-400',
    iconColor: 'text-cyan-400',
    glowColor: 'rgba(6,182,212,0.4)',
  },
  {
    id: '3d-modeling',
    title: '3D Modeling',
    shortDesc: 'Bring your products to life with stunning 3D assets and environments. We create optimized, interactive WebGL experiences that run directly in the browser, allowing your customers to explore your offerings in fully immersive 3D space.',
    highlights: ['Interactive WebGL', 'Photorealistic Renders', 'Optimized Web Assets', '3D Product Configurators', 'Three.js Integration'],
    icon: Box,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    iconColor: 'text-emerald-400',
    glowColor: 'rgba(16,185,129,0.4)',
  },
];

export const ServicesGrid: React.FC = () => {

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
          Core Capabilities
        </span>
        <h2 className="font-headline text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Engineering Solutions Built for <span className="text-cyan-400">Dominance</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          Click any service to explore its full capabilities. From scalable platforms to custom POS systems.
        </p>
      </div>

      {/* 10 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SERVICES_DATA.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="h-full"
            >
              <Link
                to={`/services#${service.id}`}
                className="group relative flex items-center p-5 sm:p-6 rounded-2xl border border-white/[0.06] hover:border-white/20 transition-all duration-300 overflow-hidden bg-[#0a0a0a]/80 hover:bg-[#111111] shadow-lg hover:shadow-2xl h-full"
                style={{
                  boxShadow: `0 4px 20px -10px ${service.glowColor}`,
                }}
              >
                {/* Gradient border on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="flex items-center space-x-4 w-full">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <div className="w-full h-full bg-[#0a0a0a] rounded-[10px] flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${service.iconColor}`} />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest block mb-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-headline text-base sm:text-lg font-bold text-white group-hover:text-gray-200 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.03] group-hover:bg-white/10 transition-colors flex-shrink-0">
                    <ArrowUpRight className={`w-4 h-4 text-gray-500 group-hover:${service.iconColor} transition-colors`} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesGrid;

