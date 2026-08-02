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
  color: string;
}

export const TECH_ITEMS: TechItem[] = [
  { name: 'React', category: 'Frontend', icon: <Code2 className="w-6 h-6" />, color: 'text-[#61DAFB]' },
  { name: 'Next.js', category: 'Framework', icon: <Triangle className="w-6 h-6" />, color: 'text-gray-100' },
  { name: 'Tailwind CSS', category: 'Styling', icon: <Palette className="w-6 h-6" />, color: 'text-[#38B2AC]' },
  { name: 'TypeScript', category: 'Language', icon: <Braces className="w-6 h-6" />, color: 'text-[#3178C6]' },
  { name: 'Vercel', category: 'Cloud', icon: <Cloud className="w-6 h-6" />, color: 'text-gray-100' },
  { name: 'Node.js', category: 'Backend', icon: <Server className="w-6 h-6" />, color: 'text-[#339933]' },
  { name: 'Python', category: 'AI & Data', icon: <BrainCircuit className="w-6 h-6" />, color: 'text-[#3776AB]' },
  { name: 'Flutter', category: 'Mobile', icon: <Smartphone className="w-6 h-6" />, color: 'text-[#02569B]' },
  { name: 'Docker', category: 'DevOps', icon: <Container className="w-6 h-6" />, color: 'text-[#2496ED]' },
  { name: 'PostgreSQL', category: 'Database', icon: <Database className="w-6 h-6" />, color: 'text-[#336791]' },
  { name: 'GraphQL', category: 'API', icon: <Network className="w-6 h-6" />, color: 'text-[#E10098]' },
  { name: 'Zod', category: 'Validation', icon: <ShieldCheck className="w-6 h-6" />, color: 'text-[#3E67B1]' },
];

export const TechMarquee: React.FC = () => {
  // Triplicated array to make marquee smooth & seam-free
  const displayItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-white">
          Engineered with Modern Stacks
        </p>
      </div>

      <GlassCard variant="default" className="py-6 px-4 overflow-hidden relative shadow-2xl border-black/10">
        {/* Gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max space-x-6 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {displayItems.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center space-x-3 px-5 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 hover:border-[#FF5722]/50 hover:bg-black/[0.05] transition-all duration-300 group cursor-default"
            >
              <span className={`${tech.color} group-hover:scale-110 transition-transform flex items-center justify-center`}>
                {tech.icon}
              </span>
              <div className="text-left">
                <span className={`block text-sm font-semibold text-white group-hover:${tech.color} transition-colors`}>
                  {tech.name}
                </span>
                <span className="block text-[10px] text-gray-400 font-medium">
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
