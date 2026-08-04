import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  stack: string[];
  mockupBg?: string;
  visualizationType: 'dashboard' | 'ecommerce' | 'terminal';
  image?: string;
  link?: string;
  displayLink?: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'zarco-star',
    title: 'Zarco Star Building LLC',
    category: 'Global Construction Platform',
    description: 'A multi-lingual digital platform created in 3 different languages, featuring a highly intuitive and awesome user interface for global clients.',
    metrics: '3 Languages | Seamless UI',
    stack: ['React 19', 'TypeScript', 'Tailwind v4', 'Vite 6', 'Motion', 'Lenis'],
    visualizationType: 'dashboard',
    image: '/zarcostar-building-llc.png',
    link: 'https://zarcostar.ae',
    displayLink: 'https://zarcostar.ae',
  },
  {
    id: 'techteamdesigns',
    title: 'Tech Team Designs',
    category: 'Creative Web Agency',
    description: 'A fully immersive 3D website featuring interactive 3D design cards, smooth scroll animations, and a cutting-edge creative portfolio.',
    metrics: '60 FPS 3D Rendering | WebGL',
    stack: ['Three.js', 'React Three Fiber', 'GSAP', 'Next.js', 'Tailwind'],
    mockupBg: 'from-purple-900/40 via-[#FF5722]/30 to-black',
    visualizationType: 'dashboard',
    image: '/techteamdesigns.png',
    link: 'https://techteamdesigns.com',
    displayLink: 'https://techteamdesigns.com',
  },
  {
    id: 'pos',
    title: 'ApexPure POS',
    category: 'Offline Point of Sale System',
    description: 'A completely offline-first desktop POS application built for Windows. Features interactive sales charts, offline database storage, and receipt PDF generation.',
    metrics: '100% Offline Capable | Native Windows',
    stack: ['Electron', 'React 19', 'Dexie.js', 'Vite 8', 'Zustand'],
    mockupBg: 'from-indigo-900/40 via-[#FF5722]/20 to-black',
    visualizationType: 'terminal',
    image: '/apexpure.png',
    displayLink: 'ApexPure POS.exe',
  },
];

export const FeaturedWork: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-semibold uppercase tracking-widest">
            Selected Works
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Proof of <span className="text-[#FF5722]">Engineering Excellence</span>
          </h2>
        </div>
        <Link
          to="/portfolio"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-[#FF5722] hover:text-white transition-colors"
        >
          <span>View All Projects in Portfolio &rarr;</span>
        </Link>
      </div>

      {/* Overlapping Mockup Stack */}
      <div className="space-y-12 sm:space-y-16">
        {FEATURED_PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.1 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Project Content Box */}
            <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#FF5722] uppercase tracking-wider px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/20">
                  {project.category}
                </span>
                <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Metric Tag */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{project.metrics}</span>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-medium text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view-project"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 text-white font-semibold text-sm hover:bg-[#FF5722] hover:border-[#FF5722]/50 transition-all duration-300 shadow-lg"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    to="/portfolio"
                    data-cursor="view-project"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 text-white font-semibold text-sm hover:bg-[#FF5722] hover:border-[#FF5722]/50 transition-all duration-300 shadow-lg"
                  >
                    <span>Explore Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>

            {/* Overlapping Stylized 3D Mockup Container */}
            <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
              <GlassCard
                variant="hover-glow"
                glowColor="cyan"
                data-cursor="view-project"
                className="relative overflow-hidden p-4 sm:p-6 rounded-3xl group shadow-2xl"
              >
                {/* Device Frame Window */}
                <div
                  className={`w-full aspect-[16/10] rounded-2xl bg-gradient-to-br ${project.mockupBg} border border-white/10 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}
                >
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {project.displayLink ? project.displayLink : `https://app.apexorion.com/${project.id}`}
                    </span>
                    <Layers className="w-4 h-4 text-[#FF5722]" />
                  </div>

                  {/* Graphic UI Representation */}
                  <div className="absolute inset-0 z-0 pt-14 px-4 pb-4">
                    <div className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                      
                      {project.image ? (
                        <div className="w-full h-full rounded-lg overflow-hidden border border-white/10 shadow-2xl relative">
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                        </div>
                      ) : (
                        <>
                          {project.visualizationType === 'dashboard' && (
                            <div className="w-full h-full flex gap-3">
                              <div className="w-1/4 h-full bg-white/[0.05] rounded-lg border border-white/10 p-3 hidden sm:flex flex-col gap-2">
                                <div className="h-4 w-3/4 bg-white/[0.05] rounded mb-4" />
                                {[1, 2, 3, 4].map(i => <div key={i} className="h-2 w-full bg-white/[0.03] rounded" />)}
                              </div>
                              <div className="flex-1 flex flex-col gap-3">
                                <div className="grid grid-cols-3 gap-3">
                                  {[1, 2, 3].map(i => (
                                    <div key={i} className="h-12 bg-white/[0.05] rounded-lg border border-white/10 p-2 flex flex-col justify-between">
                                      <div className="h-1.5 w-1/2 bg-white/[0.05] rounded" />
                                      <div className="h-2 w-3/4 bg-[#FF5722]/40 rounded" />
                                    </div>
                                  ))}
                                </div>
                                <div className="flex-1 bg-white/[0.05] rounded-lg border border-white/10 relative overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF5722]/20 to-transparent" style={{ clipPath: 'polygon(0 100%, 0 60%, 20% 80%, 40% 40%, 60% 50%, 80% 20%, 100% 30%, 100% 100%)'}} />
                                </div>
                              </div>
                            </div>
                          )}

                          {project.visualizationType === 'ecommerce' && (
                            <div className="w-full h-full flex flex-col gap-3">
                              <div className="h-8 w-full bg-white/[0.05] rounded-lg border border-white/10 flex items-center px-4 justify-between">
                                <div className="h-2 w-16 bg-white/[0.05] rounded" />
                                <div className="flex gap-2">
                                  {[1, 2, 3].map(i => <div key={i} className="h-2 w-8 bg-white/[0.05] rounded" />)}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                  <div key={i} className="bg-white/[0.05] rounded-lg border border-white/10 p-2 flex flex-col gap-2">
                                    <div className="flex-1 bg-white/[0.03] rounded" />
                                    <div className="h-2 w-2/3 bg-white/[0.05] rounded" />
                                    <div className="h-2 w-1/3 bg-[#FF5722]/40 rounded" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {project.visualizationType === 'terminal' && (
                            <div className="w-full h-full bg-[#0a0a0a]/90 rounded-lg border border-white/10 p-4 font-mono text-[10px] text-green-400/70 flex flex-col gap-1 overflow-hidden">
                              <div>{'>'} INITIALIZING POS KERNEL...</div>
                              <div>{'>'} [OK] SECURE SOCKET LAYER ESTABLISHED</div>
                              <div>{'>'} [OK] OFFLINE CACHE ALLOCATED (2048MB)</div>
                              <div>{'>'} SYNCING INVENTORY DB...</div>
                              <div className="text-white/50">  - Fetching delta... 100%</div>
                              <div className="text-white/50">  - Applying patches... 100%</div>
                              <div>{'>'} [OK] INVENTORY SYNC COMPLETE</div>
                              <div className="mt-2 text-[#FF5722]">{'>'} WAITING FOR TRANSACTION... _</div>
                            </div>
                          )}
                        </>
                      )}
                      
                    </div>
                  </div>

                  {/* Overlapping floating card accent */}
                  <div className="absolute -bottom-4 -right-4 w-44 sm:w-56 p-3 sm:p-4 rounded-2xl bg-[#0a0a0a]/90 border border-white/20 shadow-2xl backdrop-blur-xl group-hover:-translate-y-2 transition-transform duration-300 hidden sm:block">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Core Technology
                    </span>
                    <span className="text-xs font-semibold text-white block mt-0.5">
                      {project.stack.join(' • ')}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;
