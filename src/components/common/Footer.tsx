import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-white/10 text-gray-400 pt-16 pb-12 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link to="/" onClick={scrollToTop} className="inline-block">
                <img
                  src="/logo_transparent.png"
                  alt="Apex Orion Global Solutions Logo"
                  className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              We don't just write code; we engineer digital dominance. High-performance software by Gen-Z innovators.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923182834735"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] hover:text-[#FF5722] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/softwares" className="hover:text-white transition-colors">
                  Softwares
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-[#FF5722] transition-colors">
                  Locations (Global Hubs)
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services#web" className="hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services#mobile" className="hover:text-white transition-colors">
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link to="/services#pos" className="hover:text-white transition-colors">
                  Custom POS Systems
                </Link>
              </li>
              <li>
                <Link to="/services#brand" className="hover:text-white transition-colors">
                  UI/UX & Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: HQ Location & Global Delivery */}
          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Global HQ
            </h3>
            <p className="text-sm text-gray-400 mb-2">Faisalabad, Pakistan</p>
            <p className="text-sm text-gray-400 mb-4">Serving clients worldwide with zero compromises.</p>
            <a
              href="https://wa.me/923182834735"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-semibold hover:bg-[#FF5722]/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Sleek Global Engineering Hubs Bar */}
        <div className="py-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Top Famous Hubs */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              <div className="flex items-center space-x-2 mr-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5722]" />
                </span>
                <span className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">
                  Global Hubs:
                </span>
              </div>
              <Link to="/locations/us/new-york" className="text-gray-300 hover:text-[#FF5722] transition-colors">
                New York
              </Link>
              <span className="text-white/20 select-none">•</span>
              <Link to="/locations/uk/london" className="text-gray-300 hover:text-[#FF5722] transition-colors">
                London
              </Link>
              <span className="text-white/20 select-none">•</span>
              <Link to="/locations/ae/dubai" className="text-gray-300 hover:text-[#FF5722] transition-colors">
                Dubai
              </Link>
              <span className="text-white/20 select-none">•</span>
              <Link to="/locations/ca/toronto" className="text-gray-300 hover:text-[#FF5722] transition-colors">
                Toronto
              </Link>
              <span className="text-white/20 select-none">•</span>
              <Link to="/locations/au/sydney" className="text-gray-300 hover:text-[#FF5722] transition-colors">
                Sydney
              </Link>
              <span className="text-white/20 select-none">•</span>
              <Link to="/locations/de/berlin" className="text-gray-300 hover:text-[#FF5722] transition-colors">
                Berlin
              </Link>
            </div>

            {/* Elegant Tech Pill Link */}
            <Link
              to="/locations"
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#FF5722]/10 border border-white/10 hover:border-[#FF5722]/40 text-[#FF5722] text-xs font-mono transition-all duration-300 group shadow-sm hover:shadow-[0_0_20px_rgba(255,87,34,0.2)] w-fit flex-shrink-0"
            >
              <span>View All 32 Global Engineering Hubs</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Apex Orion Global Solutions. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
