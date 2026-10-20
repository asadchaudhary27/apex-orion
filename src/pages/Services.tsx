import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import ServiceDetail from '../components/sections/ServiceDetail';
import FAQSection, { FAQS_DATA } from '../components/sections/FAQSection';
import SEO from '../components/common/SEO';
import '../styles/services.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_SCHEMA = [
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
        name: 'Services',
        item: 'https://apexoriontech.com/services'
      }
    ]
  },
  {
    '@type': 'FAQPage',
    mainEntity: FAQS_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
];

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
      <SEO
        title="Custom Software & Web Development Services"
        description="Explore Apex Orion Global Solutions' full suite of software development services: custom React web applications, offline-first POS systems, mobile apps, SaaS engineering, 3D WebGL, and UI/UX design."
        canonical="/services"
        schema={SERVICES_SCHEMA}
      />

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

        {/* Rich Interactive FAQ Accordion */}
        <FAQSection />

        {/* Final Edge-to-Edge CTA Banner */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#141414] via-[#1f1008] to-[#0a0a0a] border border-[#FF5722]/30 p-8 sm:p-16 text-center text-white space-y-6">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#FF5722]" />
                <span>Ready for Immediate Deployment</span>
              </div>

              <h2 className="font-headline text-3xl sm:text-5xl font-extrabold tracking-tight">
                Ready to Accelerate Your <span className="bg-gradient-to-r from-[#FF5722] via-[#FF7A45] to-[#FFA726] bg-clip-text text-transparent">Digital Product?</span>
              </h2>

              <p className="text-gray-300 text-base sm:text-xl leading-relaxed font-body">
                Partner with Apex Orion Global Solutions for high-velocity engineering, custom software solutions, and sub-second performance.
              </p>

              <div className="pt-4 flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-3 px-10 py-5 text-base font-bold text-white bg-[#FF5722] hover:bg-[#e64a19] rounded-full shadow-[0_0_30px_rgba(255,87,34,0.4)] hover:scale-105 transition-all duration-300 group"
                >
                  <span>Get a Custom Quote</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
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
