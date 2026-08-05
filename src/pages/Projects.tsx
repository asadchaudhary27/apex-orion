import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2 } from 'lucide-react';
import ProjectsGrid from '../components/sections/ProjectsGrid';
import GlassCard from '../components/common/GlassCard';

export const Projects: React.FC = () => {
  return (
    <div className="pt-28 pb-20 space-y-16 sm:space-y-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6 pt-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(255,87,34,0.15),transparent_70%)] rounded-full pointer-events-none" />

        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0 pointer-events-none select-none w-screen overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[100px] sm:text-[150px] md:text-[200px] lg:text-[250px] font-black text-white/[0.06] uppercase tracking-tighter leading-none whitespace-nowrap italic drop-shadow-sm"
          >
            PORTFOLIO
          </motion.span>
        </div>

        <div className="relative z-10 space-y-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[#FF5722] text-xs sm:text-sm font-semibold uppercase tracking-widest backdrop-blur-md"
        >
          <Code2 className="w-4 h-4 text-[#FF5722]" />
          <span>Curated Projects Showcase</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
        >
          Our Featured <span className="text-[#FF5722]">Projects.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl lg:text-2xl font-normal max-w-3xl mx-auto leading-relaxed"
        >
          A showcase of our cutting-edge technical execution.
        </motion.p>
        </div>
      </section>

      {/* Projects Bento Grid */}
      <ProjectsGrid />

      {/* Contact Teaser Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-8">
        <GlassCard
          variant="hover-glow"
          glowColor="orange"
          className="p-10 sm:p-16 text-center space-y-6 rounded-3xl border-white/10 shadow-2xl"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Next Project: Yours</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Let's Build Yours.
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have a custom web application, mobile product, or POS project vision? Let's bring it to reality with sub-second performance.
          </p>

          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-orange-600 to-[#FF5722] rounded-full shadow-[0_0_30px_rgba(255,87,34,0.5)] hover:shadow-[0_0_45px_rgba(255,87,34,0.8)] hover:scale-105 transition-all duration-300 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default Projects;
