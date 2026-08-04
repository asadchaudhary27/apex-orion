import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  bentoSpan: string; // Tailwind grid span classes
  accentColor: string;
  imageUrl: string;
  link?: string;
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'zarcostar',
    title: 'Zarco Star Building LLC',
    category: 'Corporate Experience',
    description: 'A premium, high-performance corporate web presence engineered for Zarcostar UAE in 3 different languages, emphasizing digital dominance and scalability.',
    tags: ['React', 'Next.js', 'UI/UX', 'SEO'],
    bentoSpan: 'col-span-1 lg:col-span-1 row-span-1',
    accentColor: 'from-amber-500 to-yellow-300',
    imageUrl: '/zarcostar-building-llc.png',
    link: 'https://zarcostar.ae'
  },
  {
    id: 'tech-team-designs',
    title: 'Tech Team Designs',
    category: '3D Web Experience',
    description: 'An immersive, interactive 3D website engineered for Tech Team Designs Solutions, featuring 3D design cards and smooth scroll animations.',
    tags: ['React', 'Three.js', 'WebGL', 'Framer Motion'],
    bentoSpan: 'col-span-1 lg:col-span-1 row-span-1',
    accentColor: 'from-blue-600 to-indigo-400',
    imageUrl: '/techteamdesigns.png',
    link: 'https://techteamdesigns.com'
  },
  {
    id: 'apexpure-pos',
    title: 'ApexPure POS',
    category: 'Enterprise Operations',
    description: 'A completely offline-first desktop POS application built for Windows. Features interactive sales charts, offline database storage, and receipt generation.',
    tags: ['Electron', 'React', 'Dexie.js', 'Zustand'],
    bentoSpan: 'col-span-1 lg:col-span-1 row-span-1',
    accentColor: 'from-orange-500 to-red-500',
    imageUrl: '/apexpure.png',
  },
];

export const ProjectsGrid: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={project.bentoSpan}
          >
            <div className="p-6 h-full flex flex-col justify-between group cursor-pointer border-white/10 hover:border-[#FF5722]/40 transition-colors relative bg-black/40 border rounded-2xl">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 block" />
              ) : null}
              <div className="space-y-6">
                {/* Header: Category & Icon */}
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Project Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-headline text-2xl font-bold text-white group-hover:text-[#FF5722] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed relative z-20">
                    {project.description}
                  </p>
                </div>

                {/* Stylized Bento Graphic Representation */}
                <div
                  className={`w-full h-32 rounded-xl bg-gradient-to-br ${project.accentColor} p-0.5 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,87,34,0.3)] transition-all duration-300`}
                >
                  <div className="w-full h-full bg-black/90 rounded-[10px] p-4 flex flex-col justify-between overflow-hidden relative">
                    <div className="flex items-center justify-between opacity-60">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-white/40" />
                        <div className="w-2 h-2 rounded-full bg-white/40" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">
                        {project.id}
                      </span>
                    </div>

                    {/* Graphic Elements */}
                    <div className="absolute inset-0 z-0 pt-8 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover rounded-b-[10px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags & Footer Action */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap gap-1.5 relative z-20">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-gray-400 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-[#FF5722] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1 relative z-20">
                  <span>View Project</span>
                  <Code2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
