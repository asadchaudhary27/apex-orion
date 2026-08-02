import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Projects', href: '/projects' },
  { label: 'Softwares', href: '/softwares' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-500',
        isScrolled ? 'pt-4' : 'pt-6'
      )}
    >
      <div
        className={cn(
          'flex items-center transition-all duration-500 relative mx-auto',
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b lg:border border-white/10 lg:rounded-full px-4 sm:px-6 py-3 lg:py-2 shadow-2xl justify-between w-full lg:w-auto gap-4 lg:gap-12'
            : 'w-full max-w-7xl px-4 sm:px-6 lg:px-8 bg-transparent justify-between'
        )}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}
          className="flex items-center space-x-2 group flex-shrink-0"
        >
          <div className={cn(
            "flex items-center justify-center transition-all duration-500",
            isScrolled ? "w-32 h-8 sm:w-40 sm:h-10" : "w-40 h-10 sm:w-48 sm:h-12"
          )}>
            <img src="/logo_transparent.png" alt="Apex Orion Logo" className="w-full h-full object-contain" />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className={cn(
          "hidden lg:flex items-center transition-all duration-500",
          isScrolled 
            ? "space-x-6" 
            : "space-x-8 px-8 py-3"
        )}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 relative group py-1',
                  isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-0.5 bg-[#FF5722] transition-all duration-300',
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}
            className={cn(
              "inline-flex items-center justify-center font-semibold text-white bg-gradient-to-r from-[#FF5722] to-[#FF8A65] rounded-full shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)] hover:scale-105 transition-all duration-300",
              isScrolled ? "px-5 py-2 text-sm" : "px-7 py-3 text-base"
            )}
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden rounded-lg bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all",
            isScrolled ? "p-1.5" : "p-2"
          )}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className={cn(isScrolled ? "w-5 h-5" : "w-6 h-6")} /> : <Menu className={cn(isScrolled ? "w-5 h-5" : "w-6 h-6")} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-50 bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between px-6 py-12 glass-fallback">
          <div className="flex flex-col space-y-6">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'font-headline text-3xl font-bold transition-colors',
                    isActive ? 'text-[#FF5722]' : 'text-gray-200 hover:text-[#FF5722]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-8 border-t border-white/10">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#FF5722] to-[#FF8A65] rounded-xl shadow-lg"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
