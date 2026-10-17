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
    highlights: ['Custom UI/UX Design', 'SEO Responsive', 'Fast Loading Speed', 'Mobile Friendly', 'Secure Architecture'],
    icon: Code,
    gradient: 'from-[#FF5722] via-[#FF7A45] to-[#FFA726]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'wordpress',
    title: 'WordPress Solutions',
    shortDesc: 'Custom WordPress development that goes beyond generic templates. We build scalable, beautifully tailored sites with deep WooCommerce integrations, focusing on speed, seamless management, and solid defense-in-depth practices.',
    highlights: ['Premium Theme Design', 'WooCommerce Setup', 'SEO Optimization', 'Speed Optimization', 'Admin Training'],
    icon: LayoutTemplate,
    gradient: 'from-[#FF7A45] via-[#FF8A65] to-[#FFAB91]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Designing',
    shortDesc: 'Visual assets crafted to make a lasting impression. Whether it’s premium brand identity or eye-catching marketing collateral, our design language is engineered to communicate your value proposition instantly and elegantly.',
    highlights: ['Custom Logo Design', 'Brand Identity Kit', 'Social Media Posts', 'Print Ready Files', 'Unlimited Revisions'],
    icon: Pen,
    gradient: 'from-[#FF5722] via-[#E64A19] to-[#BF360C]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    shortDesc: 'Cross-platform mobile applications engineered for native-like fluidity. By leveraging Flutter and React Native, we deliver exceptional, responsive experiences across iOS and Android while maintaining an agile development cycle.',
    highlights: ['iOS & Android Apps', 'Custom UI/UX', 'Offline Support', 'Push Notifications', 'App Store Submission'],
    icon: Smartphone,
    gradient: 'from-[#FF6E40] via-[#FF5722] to-[#DD2C00]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    shortDesc: 'Data-informed campaigns that amplify your brand\'s digital footprint. We handle everything from content strategy and creative asset design to active community engagement, turning casual scrollers into engaged followers.',
    highlights: ['Content Creation', 'Daily Posting', 'Follower Growth', 'Engagement Boost', 'Monthly Reports'],
    icon: Share2,
    gradient: 'from-[#FF8A65] via-[#FF5722] to-[#E64A19]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'brand',
    title: 'UI/UX & Brand',
    shortDesc: 'Digital experiences that feel distinctly premium and intuitive. Our design process fuses behavioral insights with striking visuals—utilizing sleek glassmorphism and kinetic typography to craft highly memorable user journeys.',
    highlights: ['Wireframing', 'Interactive Prototypes', 'Modern Aesthetics', 'User Flow Design', 'Developer Ready Assets'],
    icon: Palette,
    gradient: 'from-[#FF5722] via-[#FF7043] to-[#FFAB91]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'search-engine-optimization',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Strategic SEO implementations designed to steadily climb search rankings and build organic authority. We utilize rigorous technical audits and targeted on-page optimization to position your brand where it matters most.',
    highlights: ['Keyword Research', 'On-Page SEO', 'Technical Audits', 'Quality Backlinks', 'Traffic Growth'],
    icon: Search,
    gradient: 'from-[#FFA726] via-[#FF7043] to-[#FF5722]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'pos',
    title: 'Custom POS',
    shortDesc: 'Modern point-of-sale systems built specifically for dynamic operations. Our software is impressively fast, highly intuitive, and features resilient offline capabilities so your business keeps running seamlessly even during network hiccups.',
    highlights: ['Easy to Use Interface', 'Inventory Management', 'Sales Reporting', 'Offline Mode', 'Receipt Printing'],
    icon: MonitorCheck,
    gradient: 'from-[#FF5722] via-[#E64A19] to-[#D84315]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    shortDesc: 'Engaging, strategically structured copy tailored to capture attention and drive action. We craft insightful technical blogs and persuasive landing pages that resonate perfectly with your brand\'s unique voice and ethos.',
    highlights: ['Website Copywriting', 'SEO Blog Posts', 'Product Descriptions', 'Email Newsletters', 'Grammar Perfect'],
    icon: Edit3,
    gradient: 'from-[#FF7043] via-[#FF5722] to-[#BF360C]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'script-writer',
    title: 'Script Writer',
    shortDesc: 'Compelling narratives structured to hold attention and spark curiosity. We write dynamic scripts for video ads and investor pitches that blend authentic storytelling with sharp, persuasive hooks.',
    highlights: ['Video Scripts', 'Engaging Hooks', 'Ad Copywriting', 'Storytelling', 'Call to Action'],
    icon: PenTool,
    gradient: 'from-[#FF8A65] via-[#FF7043] to-[#E64A19]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: 'saas',
    title: 'SaaS Solutions',
    shortDesc: 'Cloud-native software products engineered for straightforward scaling. Whether it\'s a robust HR platform or a custom booking system, we deliver meticulously architected solutions ready to power your enterprise\'s growth.',
    highlights: ['Custom Dashboard', 'User Management', 'Payment Gateway', 'API Integration', 'Scalable Database'],
    icon: Cloud,
    gradient: 'from-[#FF5722] via-[#FF6E40] to-[#FFA726]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  },
  {
    id: '3d-modeling',
    title: '3D Modeling',
    shortDesc: 'Bring your concepts to life with vivid 3D assets and environments. We create optimized, interactive WebGL experiences that run smoothly in the browser, allowing users to explore your vision in three immersive dimensions.',
    highlights: ['Product Rendering', '3D Animations', 'Interactive WebGL', 'High Quality Textures', 'Optimized for Web'],
    icon: Box,
    gradient: 'from-[#FF6E40] via-[#FF5722] to-[#E64A19]',
    iconColor: 'text-[#FF5722]',
    glowColor: 'rgba(255,87,34,0.35)',
  }
];

export const ServicesGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono font-semibold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
          <span>Core Capabilities</span>
        </span>
        <h2 className="font-headline text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Engineering Solutions Built for <span className="bg-gradient-to-r from-[#FF5722] via-[#FF7A45] to-[#FFA726] bg-clip-text text-transparent">Dominance</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-body">
          Explore our full-stack engineering spectrum. From scalable cloud platforms to custom offline POS systems.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SERVICES_DATA.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="h-full"
            >
              <Link
                to={`/services#${service.id}`}
                className="group relative flex items-center p-5 sm:p-6 rounded-2xl border border-white/[0.06] hover:border-[#FF5722]/40 transition-all duration-300 overflow-hidden bg-[#0c0c0c]/90 hover:bg-[#141414] shadow-lg hover:shadow-[0_0_30px_rgba(255,87,34,0.2)] h-full"
              >
                {/* Subtle top border glow on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5722] via-[#FFA726] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="flex items-center space-x-4 w-full">
                  <div className="w-12 h-12 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/20 p-0.5 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FF5722]/20 group-hover:border-[#FF5722]/40 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#FF5722]" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                      {String(index + 1).padStart(2, '0')} // CAPABILITY
                    </span>
                    <h3 className="font-headline text-base sm:text-lg font-bold text-white group-hover:text-[#FF5722] transition-colors duration-200">
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.03] group-hover:bg-[#FF5722]/20 border border-transparent group-hover:border-[#FF5722]/30 transition-all flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#FF5722] transition-colors" />
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
