import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { 
  Code2, 
  Triangle, 
  Palette, 
  Braces, 
  Cloud, 
  Server, 
  BrainCircuit, 
  Smartphone, 
  Container, 
  Database, 
  Network, 
  ShieldCheck 
} from 'lucide-react';

export interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

export const TECH_ITEMS: TechItem[] = [
  { name: 'React', category: 'Frontend', icon: <Code2 className="w-5 h-5" /> },
  { name: 'Next.js', category: 'Framework', icon: <Triangle className="w-5 h-5" /> },
  { name: 'Tailwind CSS', category: 'Styling', icon: <Palette className="w-5 h-5" /> },
  { name: 'TypeScript', category: 'Language', icon: <Braces className="w-5 h-5" /> },
  { name: 'Vercel', category: 'Edge Cloud', icon: <Cloud className="w-5 h-5" /> },
  { name: 'Node.js', category: 'Backend', icon: <Server className="w-5 h-5" /> },
  { name: 'Python', category: 'AI & Data', icon: <BrainCircuit className="w-5 h-5" /> },
  { name: 'Flutter', category: 'Mobile OS', icon: <Smartphone className="w-5 h-5" /> },
  { name: 'Docker', category: 'DevOps', icon: <Container className="w-5 h-5" /> },
  { name: 'PostgreSQL', category: 'Database', icon: <Database className="w-5 h-5" /> },
  { name: 'GraphQL', category: 'API Layer', icon: <Network className="w-5 h-5" /> },
  { name: 'Zod', category: 'Validation', icon: <ShieldCheck className="w-5 h-5" /> },
];

export const TechMarquee: React.FC = () => {
  // Triplicated array to make marquee smooth & seam-free
  const displayItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
          <span>Production-Grade Technology Arsenal</span>
        </span>
      </div>

      <GlassCard variant="default" className="py-6 px-4 overflow-hidden relative shadow-2xl border-white/10 bg-[#0c0c0c]/90">
        {/* Gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max space-x-4 sm:space-x-6 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {displayItems.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center space-x-3 px-4 sm:px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF5722]/50 hover:bg-[#FF5722]/10 transition-all duration-300 group cursor-default shadow-sm hover:shadow-[0_0_20px_rgba(255,87,34,0.2)]"
            >
              <span className="text-gray-400 group-hover:text-[#FF5722] group-hover:scale-110 transition-all flex items-center justify-center">
                {tech.icon}
              </span>
              <div className="text-left">
                <span className="block text-sm font-semibold text-white group-hover:text-[#FF5722] transition-colors font-headline">
                  {tech.name}
                </span>
                <span className="block text-[10px] text-gray-500 font-mono tracking-wider">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
};

export default TechMarquee;
