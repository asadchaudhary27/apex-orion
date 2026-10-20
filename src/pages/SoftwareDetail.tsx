import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SOFTWARE_DETAILS, SoftwareGalleryItem } from '../data/softwareDetails';
import GlassCard from '../components/common/GlassCard';
import SEO from '../components/common/SEO';

export const SoftwareDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const software = id ? SOFTWARE_DETAILS[id] : null;

  useEffect(() => {
    if (!software) {
      // If software not found, redirect to softwares list
      navigate('/softwares');
    }
    window.scrollTo(0, 0);
  }, [software, navigate]);

  if (!software) return null;

  const softwareSchema = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://apexoriontech.com/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Softwares',
          item: 'https://apexoriontech.com/softwares'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: software.name,
          item: `https://apexoriontech.com/software/${id}`
        }
      ]
    },
    {
      '@type': 'SoftwareApplication',
      name: software.name,
      operatingSystem: software.id === 'custom-software' ? 'Cross-Platform (Windows, Web, Cloud, Mobile)' : 'Windows, macOS, Linux',
      applicationCategory: 'BusinessApplication',
      offers: software.id === 'custom-software' ? {
        '@type': 'Offer',
        price: 'Negotiable',
        priceCurrency: 'USD'
      } : {
        '@type': 'Offer',
        price: '30.00',
        priceCurrency: 'USD'
      },
      description: software.tagline
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <SEO
        title={`${software.name} - ${software.tagline}`}
        description={`${software.name}: ${software.tagline} ${software.description || ''}`}
        canonical={`/software/${id}`}
        schema={softwareSchema}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Semantic Breadcrumbs */}
        <div className="flex items-center justify-between mb-12">
          <Link 
            to="/softwares" 
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Softwares</span>
          </Link>

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/softwares" className="hover:text-white transition-colors">Softwares</Link>
            <span>/</span>
            <span className="text-[#FF5722] font-medium">{software.name}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-headline text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${software.gradient}`}
          >
            {software.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl sm:text-2xl text-gray-300 max-w-3xl"
          >
            {software.tagline}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl"
          >
            {software.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a 
              href={`https://wa.me/923182834735?text=Hi!%20I%20am%20interested%20in%20a%20demo%20for%20${encodeURIComponent(software.name)}.`} 
              target="_blank" 
              rel="noreferrer" 
              className={`px-8 py-3.5 rounded-full bg-gradient-to-r ${software.gradient} text-white font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
            >
              Contact for Live Demo
            </a>
            {software.id === 'custom-software' ? (
              <div className="flex items-center space-x-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                <span className="font-bold text-[#FF5722]">Bespoke Quote</span>
                <span className="text-gray-500">•</span>
                <span className="font-bold text-white">Milestone-Based</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">Full Source Code Ownership</span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                <span className="font-bold text-[#FF5722] font-mono">$30 / Year</span>
                <span className="text-gray-500">•</span>
                <a
                  href={`https://wa.me/923182834735?text=Hi!%20I%20want%20to%20discuss%20the%20Lifetime%20License%20for%20${encodeURIComponent(software.name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-white hover:text-[#FF5722] transition-colors underline underline-offset-2"
                >
                  Lifetime License: Talk to Us
                </a>
                <span className="text-gray-500 hidden sm:inline">•</span>
                <span className="text-gray-400 hidden sm:inline">Windows PC (.exe)</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features Breakdown */}
        <div className="space-y-12">
          <h2 className="font-headline text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
            Core Functionalities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {software.sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="h-full p-8 rounded-3xl space-y-6">
                  <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                    <section.icon className="w-8 h-8 text-[#FF5722]" />
                    <h3 className="font-headline text-xl font-bold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-5">
                    {section.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-[#FF5722] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1">{feature.name}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        {software.gallery && software.gallery.length > 0 && (
          <div className="mt-24 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="text-xs font-semibold text-[#FF5722] uppercase tracking-wider">Visual Walkthrough</span>
                <h2 className="font-headline text-3xl font-bold text-white">
                  Interface Overview & Modules
                </h2>
              </div>
              <p className="text-sm text-gray-400 max-w-md">
                Detailed screenshots explaining daily workflows, automated operational modules, and administrative dashboards.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {software.gallery.map((item, idx) => {
                const itemData: SoftwareGalleryItem = typeof item === 'string'
                  ? { 
                      src: item, 
                      title: `${software.name} View ${idx + 1}`, 
                      tag: 'Operational Module', 
                      description: 'Operational view demonstrating system features, user ergonomics, and real-time processing capabilities.' 
                    }
                  : item;

                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[#FF5722]/50 transition-all duration-300 group shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/50 border-b border-white/10 flex items-center justify-center">
                      <img 
                        src={itemData.src} 
                        alt={`${software.name} - ${itemData.title}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback if image doesn't exist yet
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 800 600"%3E%3Crect fill="%23111" width="800" height="600"/%3E%3Ctext fill="%23333" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle"%3EImage Coming Soon%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/80 border border-white/20 text-[#FF5722] backdrop-blur-md shadow-sm">
                          {itemData.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between space-y-3">
                      <div>
                        <h3 className="text-white font-headline font-bold text-lg group-hover:text-[#FF5722] transition-colors">
                          {itemData.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mt-2">
                          {itemData.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Conversion & Internal Links Section */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-headline text-xl font-bold text-white">Need custom features for {software.name}?</h3>
            <p className="text-sm text-gray-400">Our team can customize business logic, payment APIs, and hardware devices for your workflow.</p>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold text-sm transition-colors shadow-[0_0_15px_rgba(255,87,34,0.4)]"
            >
              Request Custom Build
            </Link>
            <Link
              to="/softwares"
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-colors"
            >
              All Softwares
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SoftwareDetail;
