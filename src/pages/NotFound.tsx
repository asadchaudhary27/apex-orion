import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import SEO from '../components/common/SEO';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-28 relative overflow-hidden bg-black">
      <SEO
        title="Page Not Found (404)"
        description="The page you requested could not be found on Apex Orion Global Solutions."
        canonical="/404"
      />
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-[120px] pointer-events-none" />

      <GlassCard variant="hover-glow" glowColor="orange" className="p-8 sm:p-14 max-w-xl w-full text-center space-y-6 rounded-3xl border-white/10 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[#FF5722]/10 border border-[#FF5722]/30 flex items-center justify-center mx-auto text-[#FF5722]">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#FF5722] tracking-widest uppercase">
            Error 404 · Signal Lost
          </span>
          <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed pt-2">
            The coordinates you requested do not exist or have been shifted to another sector.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#FF5722] hover:bg-[#e64a19] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Orbit (Home)</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default NotFound;
