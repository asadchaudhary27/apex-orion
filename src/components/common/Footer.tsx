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
              <div className="w-20 h-20 flex items-center justify-center">
                <img src="/logo_transparent.png" alt="Apex Orion Logo" className="w-full h-full object-contain" />
              </div>
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
                <Link to="/services#design" className="hover:text-white transition-colors">
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

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Apex Orion. All rights reserved.</p>
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
