import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import ServiceDetail from '../components/sections/ServiceDetail';
import '../styles/services.css';

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State elements for GSAP context
  const heroRef = useRef<HTMLElement>(null);
  const bigResultsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // INITIAL STATES
      gsap.set(".services-title .word > span", { y: "105%" });
      gsap.set(".services-subtitle .letter", { y: 80, opacity: 0 });
      gsap.set("#subline", { opacity: 0, y: 20 });
      // INTRO TIMELINE
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(
          ".services-title .word > span",
          { y: "0%", duration: 0.9, stagger: 0.08, ease: "power3.out" },
          0.3
        )
        .to(
          ".services-subtitle .letter",
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.03, ease: "back.out(1.6)" },
          0.55
        )
        .to("#subline", { opacity: 1, y: 0, duration: 0.8 }, 1.2);

      // SCROLL: FADE AND SCALE TEXT
      gsap.timeline({
        scrollTrigger: {
          trigger: ".services-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        }
      })
      .to(".services-subtitle-wrap", { scale: 1.15, opacity: 0.5, ease: "none" }, 0)
      .to(".services-title", { y: -80, opacity: -0.5, ease: "none" }, 0)
      .to("#subline", { opacity: -1, ease: "none" }, 0);

      // Button hover effect
      document.querySelectorAll(".services-arrow-pill").forEach((btn) => {
        btn.addEventListener("click", () => {
          const el = btn as HTMLElement;
          // Smooth scroll to details
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
          gsap.fromTo(el, { scale: 1 }, {
            scale: 0.93,
            duration: 0.12,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        });
      });

      // Subtitle subtle hover interaction
      const brWrap = bigResultsWrapRef.current;
      if (brWrap) {
        brWrap.addEventListener("mouseenter", () => {
          gsap.to(".services-subtitle .letter", { y: -6, duration: 0.4, stagger: 0.02, ease: "back.out(1.6)" });
        });
        brWrap.addEventListener("mouseleave", () => {
          gsap.to(".services-subtitle .letter", { y: 0, duration: 0.5, stagger: 0.02, ease: "elastic.out(1, 0.6)" });
        });
      }

    }, containerRef); 

    return () => ctx.revert(); 
  }, []);



  return (
    <div className="services-page-container" ref={containerRef}>

      {/* GSAP ANIMATED HERO SECTION */}
      <section className="services-hero relative" ref={heroRef}>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
          <span className="text-[90px] sm:text-[140px] md:text-[180px] lg:text-[230px] font-black text-white/[0.06] uppercase tracking-tighter leading-none whitespace-nowrap italic services-watermark">
            CAPABILITIES
          </span>
        </div>

        <h1 className="services-title relative z-10">
          <span className="word"><span>12</span></span>&nbsp;<span className="word"><span>Services.</span></span>
        </h1>

        <div className="services-subtitle-wrap" ref={bigResultsWrapRef}>
          <div className="services-subtitle">
            {"One standard: Excellence.".split('').map((char, i) => (
              <span key={i} className="letter">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </div>
        </div>



        <div className="services-subline" id="subline">
          <button className="services-arrow-pill">
            Explore Capabilities
            <span className="ar">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
          <div className="services-subline-text">Scroll to expand</div>
        </div>
      </section>

      {/* EXISTING SERVICE DETAILS SECTION */}
      <div className="relative z-20 bg-black">
        <ServiceDetail />

        {/* Final Edge-to-Edge CTA Banner */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-indigo-600 via-indigo-400 to-cyan-400 p-8 sm:p-16 text-center text-white space-y-6">
            <div className="absolute inset-0 bg-black/[0.03]" />
            
            <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Ready for Immediate Deployment</span>
              </div>

              <h2 className="font-headline text-3xl sm:text-5xl font-extrabold tracking-tight">
                Ready to Accelerate Your Digital Product?
              </h2>

              <p className="text-white/90 text-base sm:text-xl leading-relaxed">
                Partner with Apex Orion for high-velocity engineering, custom software solutions, and sub-second performance.
              </p>

              <div className="pt-4 flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-3 px-10 py-5 text-base font-bold text-[#050505] bg-white rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 group"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
