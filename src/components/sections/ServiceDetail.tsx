import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_DATA } from './ServicesGrid';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export const ServiceDetail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveId(hash);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 400); // give time for the page transition
    }
  }, [location.hash]);

  const toggle = (id: string) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stepper-card');
      
      cards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { 
            y: 40, 
            opacity: 0 
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=80",
              toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out"
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" ref={containerRef}>
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Column: Sticky Title */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
              Capabilities
            </span>
            <h2 className="font-headline text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Our Process <br />& Engineering <span className="text-cyan-400">Arsenal</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              We execute with military precision. Click any service domain to expand its technical capabilities, designed for speed, scale, and digital dominance.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-cyan-500/30 text-white font-semibold text-sm transition-all duration-300"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Stacked Slanted Cards */}
        <div className="lg:w-2/3 flex flex-col space-y-8 relative">
          
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            const num = (index + 1).toString().padStart(2, '0');
            const isOpen = activeId === service.id;
            
            return (
              <div 
                key={service.id} 
                id={service.id}
                className="stepper-card relative w-full flex flex-col sm:block group cursor-pointer"
                onClick={() => toggle(service.id)}
              >
                {/* Mobile Number Header */}
                <div 
                  className={`sm:hidden w-full rounded-t-2xl bg-gradient-to-r ${service.gradient} p-5 flex items-center justify-between`}
                >
                  <span className="text-4xl font-headline font-bold text-white/90 drop-shadow-md">
                    {num}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Desktop Colored Number Block */}
                <div 
                  className={`hidden sm:flex absolute top-2 bottom-2 left-0 w-[45%] rounded-l-3xl rounded-r-xl bg-gradient-to-r ${service.gradient} items-center pl-8 sm:pl-12 transition-transform duration-500 ${isOpen ? 'scale-[1.02]' : 'group-hover:scale-[1.02]'}`}
                  style={{ boxShadow: isOpen ? `0 4px 40px ${service.glowColor}` : `0 4px 30px ${service.glowColor}` }}
                >
                  <span className="text-5xl sm:text-6xl font-headline font-bold text-white/80 drop-shadow-md">
                    {num}
                  </span>
                </div>

                {/* Content Block */}
                <div className={`relative w-full sm:w-[80%] sm:ml-auto shadow-2xl transition-transform duration-500 ${isOpen ? 'sm:-translate-y-1' : 'sm:group-hover:-translate-y-1'}`}>
                  <div 
                    className={`w-full h-full rounded-b-2xl sm:rounded-none sm:rounded-r-3xl p-6 sm:p-10 flex flex-col justify-center min-h-[160px] border transition-colors duration-300 ${isOpen ? 'bg-[#181818] border-white/20' : 'bg-[#111111] border-white/5 hover:border-white/10'} clip-path-none sm:[clip-path:polygon(0_0,100%_0,100%_100%,10%_100%)]`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 sm:pl-8 w-full">
                      {/* Colorful Icon (Desktop Only) */}
                      <div
                        className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-xl items-center justify-center transition-transform duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${service.glowColor.replace('0.4', '0.15')}, transparent)`,
                          boxShadow: `0 0 20px ${service.glowColor}`,
                          transform: isOpen ? 'scale(1.1)' : 'scale(1)'
                        }}
                      >
                        <Icon className={`w-7 h-7 ${service.iconColor}`} />
                      </div>
                      
                      <div className="space-y-2 flex-grow">
                        <div className="flex justify-between items-center">
                          <h3 className={`font-headline text-xl sm:text-2xl font-bold uppercase tracking-wider transition-colors duration-300 ${isOpen ? service.iconColor : 'text-white'}`}>
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden sm:pl-28 mt-4"
                        >
                          <ul className="space-y-3 pt-4 border-t border-white/10">
                            {service.highlights.map((item, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start space-x-3 text-sm text-gray-300"
                              >
                                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${service.iconColor}`} />
                                <span className="leading-snug">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
