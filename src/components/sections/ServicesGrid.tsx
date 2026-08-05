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
    shortDesc: 'We architect resilient, high-performance web applications using React and modern serverless technologies. From complex dashboards to fast-loading corporate pages, we engineer solutions designed to scale gracefully and captivate your audience.',
    highlights: ['Next.js & React SPAs', 'Sub-second Page Loading', 'Responsive & Accessible', 'SEO-Optimized Architecture', 'Robust Architecture'],
    icon: Code,
    gradient: 'from-violet-600 via-indigo-500 to-cyan-400',
    iconColor: 'text-violet-400',
    glowColor: 'rgba(139,92,246,0.4)',
  },
  {
    id: 'wordpress',
    title: 'WordPress Solutions',
    shortDesc: 'Custom WordPress development that goes beyond generic templates. We build scalable, beautifully tailored sites with deep WooCommerce integrations, focusing on speed, seamless management, and solid defense-in-depth practices.',
    highlights: ['Custom Theme Dev', 'WooCommerce Integration', 'Plugin Architecture', 'Speed Optimization', 'Robust Hardening'],
    icon: LayoutTemplate,
    gradient: 'from-blue-600 via-blue-500 to-sky-400',
    iconColor: 'text-blue-400',
    glowColor: 'rgba(59,130,246,0.4)',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Designing',
    shortDesc: 'Visual assets crafted to make a lasting impression. Whether it’s premium brand identity or eye-catching marketing collateral, our design language is engineered to communicate your value proposition instantly and elegantly.',
    highlights: ['Brand Identity & Logos', 'Social Media Graphics', 'Marketing Materials', 'Vector Illustrations', 'Print & Digital Media'],
    icon: Pen,
    gradient: 'from-orange-500 via-rose-500 to-pink-500',
    iconColor: 'text-rose-400',
    glowColor: 'rgba(244,63,94,0.4)',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    shortDesc: 'Cross-platform mobile applications engineered for native-like fluidity. By leveraging Flutter and React Native, we deliver exceptional, responsive experiences across iOS and Android while maintaining an agile development cycle.',
    highlights: ['Flutter & React Native', 'Offline Sync Capabilities', 'iOS & Android Ready', 'Custom Animations', 'Push Notification Engines'],
    icon: Smartphone,
    gradient: 'from-sky-500 via-blue-500 to-indigo-600',
    iconColor: 'text-sky-400',
    glowColor: 'rgba(14,165,233,0.4)',
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    shortDesc: 'Data-informed campaigns that amplify your brand\'s digital footprint. We handle everything from content strategy and creative asset design to active community engagement, turning casual scrollers into engaged followers.',
    highlights: ['Viral Growth Strategies', 'Premium Content Creation', 'Community Engagement', 'Influencer Outreach', 'ROI-Focused Campaigns'],
    icon: Share2,
    gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
    iconColor: 'text-fuchsia-400',
    glowColor: 'rgba(217,70,239,0.4)',
  },
  {
    id: 'brand',
    title: 'UI/UX & Brand',
    shortDesc: 'Digital experiences that feel distinctly premium and intuitive. Our design process fuses behavioral insights with striking visuals—utilizing sleek glassmorphism and kinetic typography to craft highly memorable user journeys.',
    highlights: ['Kinetic Design Systems', 'Fluid Micro-Interactions', 'Cohesive Brand Guidelines', 'User Journey Mapping', 'A/B Tested Layouts'],
    icon: Palette,
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    iconColor: 'text-pink-400',
    glowColor: 'rgba(236,72,153,0.4)',
  },
  {
    id: 'search-engine-optimization',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Strategic SEO implementations designed to steadily climb search rankings and build organic authority. We utilize rigorous technical audits and targeted on-page optimization to position your brand where it matters most.',
    highlights: ['Technical SEO Audits', 'On-Page Optimization', 'White-Hat Link Building', 'Keyword Strategy', 'Monthly Rank Reporting'],
    icon: Search,
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
    iconColor: 'text-lime-400',
    glowColor: 'rgba(132,204,22,0.4)',
  },
  {
    id: 'pos',
    title: 'Custom POS',
    shortDesc: 'Modern point-of-sale systems built specifically for dynamic operations. Our software is impressively fast, highly intuitive, and features resilient offline capabilities so your business keeps running seamlessly even during network hiccups.',
    highlights: ['Real-time Inventory Sync', 'Offline Resilience', 'Custom Hardware Support', 'Multi-Store Management', 'Detailed Analytics Dashboard'],
    icon: MonitorCheck,
    gradient: 'from-orange-500 via-amber-400 to-yellow-400',
    iconColor: 'text-orange-400',
    glowColor: 'rgba(249,115,22,0.4)',
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    shortDesc: 'Engaging, strategically structured copy tailored to capture attention and drive action. We craft insightful technical blogs and persuasive landing pages that resonate perfectly with your brand\'s unique voice and ethos.',
    highlights: ['SEO Optimized Copy', 'Brand Voice Match', 'High Conversion Rates', 'Technical Blogging', 'Email Sequences'],
    icon: Edit3,
    gradient: 'from-yellow-500 via-orange-400 to-red-500',
    iconColor: 'text-yellow-400',
    glowColor: 'rgba(234,179,8,0.4)',
  },
  {
    id: 'script-writer',
    title: 'Script Writer',
    shortDesc: 'Compelling narratives structured to hold attention and spark curiosity. We write dynamic scripts for video ads and investor pitches that blend authentic storytelling with sharp, persuasive hooks.',
    highlights: ['Viral Video Ads', 'YouTube Scripts', 'Investor Pitch Decks', 'High Retention Hooks', 'Story-Driven Sales'],
    icon: PenTool,
    gradient: 'from-red-500 via-rose-500 to-pink-600',
    iconColor: 'text-red-400',
    glowColor: 'rgba(239,68,68,0.4)',
  },
  {
    id: 'saas',
    title: 'SaaS Solutions',
    shortDesc: 'Cloud-native software products engineered for straightforward scaling. Whether it\'s a robust HR platform or a custom booking system, we deliver meticulously architected solutions ready to power your enterprise\'s growth.',
    highlights: ['Plug-and-Play Setup', 'Scalable Cloud Infrastructure', 'REST/GraphQL APIs', 'Role-Based Access', 'Automated Billing'],
    icon: Cloud,
    gradient: 'from-cyan-500 via-teal-400 to-emerald-400',
    iconColor: 'text-cyan-400',
    glowColor: 'rgba(6,182,212,0.4)',
  },
  {
    id: '3d-modeling',
    title: '3D Modeling',
    shortDesc: 'Bring your concepts to life with vivid 3D assets and environments. We create optimized, interactive WebGL experiences that run smoothly in the browser, allowing users to explore your vision in three immersive dimensions.',
    highlights: ['Interactive WebGL', 'Photorealistic Renders', 'Optimized Web Assets', '3D Product Configurators', 'Three.js Integration'],
    icon: Box,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    iconColor: 'text-emerald-400',
    glowColor: 'rgba(16,185,129,0.4)',
  }
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

