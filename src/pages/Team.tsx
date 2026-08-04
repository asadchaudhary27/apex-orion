import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/team.css';

gsap.registerPlugin(ScrollTrigger);

export const Team: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State elements for GSAP context
  const heroRef = useRef<HTMLElement>(null);
  const bigResultsWrapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // INITIAL STATES
      gsap.set(".team-small-team .word > span", { y: "105%" });
      gsap.set(".team-big-results .letter", { y: 80, opacity: 0 });
      gsap.set("#subline", { opacity: 0, y: 20 });
      gsap.set(".team-t-card", { opacity: 0 });
      gsap.set(".team-stats-inner", { opacity: 0 });

      // Apply initial rotation and off-screen state
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rot = parseFloat(card.dataset.rot || "0");
        card.dataset.restRot = rot.toString();
        gsap.set(card, { y: -800, rotation: rot + 25, opacity: 0, scale: 0.7 });
      });

      // INTRO TIMELINE
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(
          ".team-small-team .word > span",
          { y: "0%", duration: 0.9, stagger: 0.08, ease: "power3.out" },
          0.3
        )
        .to(
          ".team-big-results .letter",
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: "back.out(1.6)" },
          0.55
        )
        .to(
          ".team-card",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: (_, el) => parseFloat(el.dataset.restRot || "0"),
            duration: 1.1,
            stagger: { each: 0.08, from: "center" },
            ease: "back.out(1.4)"
          },
          0.8
        )
        .to("#subline", { opacity: 1, y: 0, duration: 0.8 }, 1.6);

      // CONTINUOUS FLOAT ON CARDS
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const rot = parseFloat(card.dataset.restRot || "0");
        gsap.to(card, {
          y: `+=${8 + (i % 3) * 5}`,
          rotation: rot + (i % 2 === 0 ? 1.5 : -1.5),
          duration: 3 + (i % 4) * 0.5,
          delay: 1.8 + i * 0.1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      // MOUSE PARALLAX ON HERO
      let mx = 0, my = 0, tx = 0, ty = 0;
      let parallaxFrame: number;
      const heroEl = heroRef.current;
      
      const onMouseMove = (e: MouseEvent) => {
        if (!heroEl) return;
        const r = heroEl.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      
      const onMouseLeave = () => {
        mx = 0;
        my = 0;
      };

      if (heroEl) {
        heroEl.addEventListener("mousemove", onMouseMove);
        heroEl.addEventListener("mouseleave", onMouseLeave);
      }

      const renderParallax = () => {
        tx += (mx - tx) * 0.05;
        ty += (my - ty) * 0.05;
        cardsRef.current.forEach((card) => {
          if (!card) return;
          const d = parseFloat(card.dataset.depth || "8");
          card.style.transform = `translate(${tx * d}px, ${ty * d * 0.5}px)`; // Using transform for translate
        });
        parallaxFrame = requestAnimationFrame(renderParallax);
      };
      parallaxFrame = requestAnimationFrame(renderParallax);

      // CARD HOVER 3D LIFT
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        card.addEventListener("mousemove", () => {
          gsap.to(card, {
            scale: 1.12,
            zIndex: 20,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            zIndex: card.style.zIndex || "",
            duration: 0.8,
            ease: "elastic.out(1, 0.6)",
            overwrite: "auto"
          });
        });
        
        card.addEventListener("click", () => {
          gsap.fromTo(card, { scale: 1.15 }, {
            scale: 1.05,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        });
      });

      // SCROLL: CARDS FAN OUT, BIG RESULTS SCALES UP
      ScrollTrigger.create({
        trigger: ".team-hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(".team-big-results", { scale: 1 + 0.15 * p, opacity: 1 - 0.4 * p });
          gsap.set(".team-small-team", { y: -60 * p, opacity: 1 - p * 1.5 });
          
          const moves = [
            { x: -260, y: -40, rot: -25 }, { x: -200, y: 20, rot: -18 },
            { x: -120, y: 80, rot: -10 }, { x: -40, y: 120, rot: -4 },
            { x: 40, y: 120, rot: 4 }, { x: 120, y: 80, rot: 12 },
            { x: 200, y: 20, rot: 22 }, { x: 260, y: -40, rot: 28 }
          ];
          
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const m = moves[i];
            const rest = parseFloat(card.dataset.restRot || "0");
            gsap.set(card, {
              x: m.x * p,
              y: m.y * p,
              rotation: rest + m.rot * p
            });
          });
          
          gsap.set("#subline", { opacity: 1 - p * 2 });
        }
      });

      // TEAM GRID REVEAL ON SCROLL
      gsap.from(".team-eyebrow, .team-head h2, .team-head p", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-head", start: "top 80%" }
      });

      gsap.to(".team-t-card", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-grid-container", start: "top 80%" }
      });
      
      gsap.from(".team-t-card", {
        y: 80,
        scale: 0.9,
        rotation: (i) => (i % 2 === 0 ? -3 : 3),
        duration: 1,
        stagger: 0.08,
        ease: "back.out(1.3)",
        scrollTrigger: { trigger: ".team-grid-container", start: "top 80%" }
      });

      // STATS REVEAL + COUNTERS
      gsap.to(".team-stats-inner", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-stats", start: "top 80%" }
      });
      gsap.from(".team-stats-inner", {
        y: 60,
        scale: 0.97,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-stats", start: "top 80%" }
      });

      ScrollTrigger.create({
        trigger: ".team-stats",
        start: "top 75%",
        once: true,
        onEnter: () => {
          document.querySelectorAll(".team-stat-block .num").forEach((el) => {
            const htmlEl = el as HTMLElement;
            const target = parseFloat(htmlEl.dataset.count || "0");
            const span = htmlEl.querySelector("span");
            if (span) {
              const obj = { v: 0 };
              gsap.to(obj, {
                v: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  span.textContent = Math.floor(obj.v).toLocaleString();
                }
              });
            }
          });
        }
      });

      // BUTTON CLICKS (Arrow pills)
      document.querySelectorAll(".team-arrow-pill").forEach((btn) => {
        btn.addEventListener("click", () => {
          gsap.fromTo(btn, { scale: 1 }, {
            scale: 0.93,
            duration: 0.12,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        });
      });

      // Big results subtle rise
      const brWrap = bigResultsWrapRef.current;
      if (brWrap) {
        brWrap.addEventListener("mouseenter", () => {
          gsap.to(".team-big-results .letter", { y: -8, duration: 0.5, stagger: 0.03, ease: "back.out(1.6)" });
        });
        brWrap.addEventListener("mouseleave", () => {
          gsap.to(".team-big-results .letter", { y: 0, duration: 0.6, stagger: 0.03, ease: "elastic.out(1, 0.6)" });
        });
      }

      return () => {
        cancelAnimationFrame(parallaxFrame);
        if (heroEl) {
          heroEl.removeEventListener("mousemove", onMouseMove);
          heroEl.removeEventListener("mouseleave", onMouseLeave);
        }
      };

    }, containerRef); // Scope GSAP to containerRef

    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="team-page-container" ref={containerRef}>

      {/* HERO SECTION */}
      <section className="team-hero" ref={heroRef}>
        <h1 className="team-small-team">
          <span className="word"><span>Small</span></span>&nbsp;<span className="word"><span>team,</span></span>
        </h1>

        <div className="team-big-results-wrap" ref={bigResultsWrapRef}>
          <div className="team-big-results">
            <span className="letter">b</span><span className="letter">i</span><span className="letter">g</span><span className="letter">&nbsp;</span>
            <span className="letter">r</span><span className="letter">e</span><span className="letter">s</span><span className="letter">u</span>
            <span className="letter">l</span><span className="letter">t</span><span className="letter">s</span>
          </div>
        </div>

        {/* Card row of portraits */}
        <div className="team-cards-row">
          <div ref={addToCardsRef} className="team-card team-card-1" data-rot="-9" data-depth="14">
            <img src="/team/asad.jpg" alt="Asad Qaisar Founder & CEO" title="Asad Qaisar - Founder & CEO" />
          </div>
          <div ref={addToCardsRef} className="team-card team-card-2" data-rot="-5" data-depth="10">
            <img src="/team/ammar.png" alt="Ammar Saleem Co-Founder & Project Manager" title="Ammar Saleem - Co-Founder & Project Manager" />
          </div>
          <div ref={addToCardsRef} className="team-card team-card-3" data-rot="-2" data-depth="8">
            <img src="/team/sami.jpeg" alt="Sami Uthwal Lead Developer" title="Sami Uthwal - Lead Developer" />
          </div>
          <div ref={addToCardsRef} className="team-card team-card-4" data-rot="3" data-depth="12">
            <img src="/team/hamza.png" alt="Hamza Nazir Graphic Designer & UIUX" title="Hamza Nazir - Graphic Designer & UI/UX" />
          </div>
          <div ref={addToCardsRef} className="team-card team-card-5" data-rot="0" data-depth="6">
            <img src="/team/muhannad.png" alt="Muhannad Asif 3D Model Designer" title="Muhannad Asif - 3D Model Designer" />
          </div>
          <div ref={addToCardsRef} className="team-card team-card-6" data-rot="4" data-depth="11">
            <img src="/team/anjum.png" alt="Sir Anjum WordPress Dev & SEO Expert" title="Sir Anjum - WordPress Dev & SEO Expert" />
          </div>
          <div ref={addToCardsRef} className="team-card team-card-7" data-rot="7" data-depth="9">
            <img src="/team/farhan.png" alt="Muhammad Farhan Content & Script Writer" title="Muhammad Farhan - Content & Script Writer" />
          </div>
        </div>

        <div className="team-subline" id="subline">
          <button className="team-arrow-pill">
            Meet the crew
            <span className="ar">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </button>
          <div className="team-subline-text">7 people. 60+ shipped projects. Zero filler.</div>
        </div>
      </section>

      {/* TEAM GRID SECTION */}
      <section className="team-section-block">
        <div className="team-head">
          <div>
            <div className="team-eyebrow">The Crew · Seven strong</div>
            <h2>Designers, builders<br />and the <em>quietly brilliant</em>.</h2>
          </div>
          <p>Every person you see here touches every project we ship. No middle layer, no handoffs to strangers — just direct work with the people doing it.</p>
        </div>

        <div className="team-grid-container">
          {[
            { img: "/team/asad.jpg", name: "Asad Qaisar", role: "Founder & CEO" },
            { img: "/team/ammar.png", name: "Ammar Saleem", role: "Co-Founder & Project Manager" },
            { img: "/team/sami.jpeg", name: "Sami Uthwal", role: "Lead Developer" },
            { img: "/team/hamza.png", name: "Hamza Nazir", role: "Graphic Designer & UI/UX" },
            { img: "/team/muhannad.png", name: "Muhannad Asif", role: "3D Model Designer" },
            { img: "/team/anjum.png", name: "Sir Anjum", role: "WordPress Dev & SEO Expert" },
            { img: "/team/farhan.png", name: "Muhammad Farhan", role: "Content & Script Writer" },
          ].map((person, idx) => (
            <div key={idx} className="team-t-card">
              <img src={person.img} alt={person.name} title={`${person.name} - ${person.role}`} />
              <div className="team-t-meta">
                <div className="nm">{person.name}</div>
                <div className="rl">{person.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="team-stats">
        <div className="team-stats-inner">
          <h3>Seven humans.<br />One <em>tight ship</em>.</h3>
          <div className="team-stat-block">
            <div className="num" data-count="62"><span>0</span></div>
            <div className="lbl">Projects shipped</div>
          </div>
          <div className="team-stat-block">
            <div className="num" data-count="14"><span>0</span><small>yrs</small></div>
            <div className="lbl">Combined craft</div>
          </div>
          <div className="team-stat-block">
            <div className="num" data-count="9"><span>0</span><small>.4</small></div>
            <div className="lbl">Avg NPS</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
