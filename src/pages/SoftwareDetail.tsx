import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SOFTWARE_DETAILS } from '../data/softwareDetails';
import GlassCard from '../components/common/GlassCard';

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

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          to="/softwares" 
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Softwares</span>
        </Link>

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
            className="mt-8 flex flex-wrap gap-4"
          >
            <a 
              href={`https://wa.me/923182834735?text=Hi!%20I%20am%20interested%20in%20a%20demo%20for%20${encodeURIComponent(software.name)}.`} 
              target="_blank" 
              rel="noreferrer" 
              className={`px-8 py-3.5 rounded-full bg-gradient-to-r ${software.gradient} text-white font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
            >
              Contact for Demo
            </a>
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
            <h2 className="font-headline text-3xl font-bold text-white border-b border-white/10 pb-4">
              Interface Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {software.gallery.map((imgSrc, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] flex items-center justify-center relative group"
                >
                  <img 
                    src={imgSrc} 
                    alt={`${software.name} screenshot ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if image doesn't exist yet
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 800 600"%3E%3Crect fill="%23111" width="800" height="600"/%3E%3Ctext fill="%23333" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle"%3EImage Coming Soon%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SoftwareDetail;
