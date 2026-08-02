import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Sparkles, Code2, ShieldCheck, Quote } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export interface TeamMember {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  skills: string[];
  avatarGradient: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alpha',
    role: 'Co-Founder & Lead Systems Engineer',
    tagline: 'Architecting high-scale web platforms & custom POS systems.',
    bio: 'Specializing in React, TypeScript, and distributed cloud backends. Passionate about sub-second latency and zero-compromise engineering.',
    skills: ['System Architecture', 'React & Next.js', 'Custom POS', 'TypeScript'],
    avatarGradient: 'from-[#FF5722] via-orange-600 to-[#FF8A65]',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Asad',
    role: 'Co-Founder & UI/UX Product Lead',
    tagline: 'Crafting kinetic visual identities & pixel-perfect frontends.',
    bio: 'Pioneering Gen-Z visual aesthetics, glassmorphic interfaces, and seamless multi-device user experiences with micro-interactions.',
    skills: ['UI/UX Design', 'Framer Motion', 'Brand Identity', 'Frontend Motion'],
    avatarGradient: 'from-[#FF5722] via-orange-500 to-rose-600',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header & Quote */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/50/30 text-[#FF5722] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Leadership & Engineering</span>
        </div>

        <h2 className="font-headline text-3xl sm:text-5xl font-bold text-white tracking-tight">
          The Powerhouse Behind <span className="text-[#FF5722]">Apex Orion</span>
        </h2>

        {/* Featured Quote Callout */}
        <GlassCard variant="hover-glow" glowColor="cyan" className="p-6 sm:p-8 max-w-2xl mx-auto relative overflow-hidden">
          <Quote className="w-10 h-10 text-[#FF5722]/30 absolute top-3 left-3 -scale-x-100" />
          <p className="font-headline text-lg sm:text-xl font-bold text-white relative z-10 italic">
            "Led by Alpha & Asad. Lightning-fast delivery. Zero compromises."
          </p>
          <Quote className="w-10 h-10 text-[#FF5722]/30 absolute bottom-3 right-3" />
        </GlassCard>
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {TEAM_MEMBERS.map((member, idx) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
              <div className="p-8 sm:p-10 h-full flex flex-col justify-between group bg-black/40 border border-white/10 rounded-2xl hover:border-[#FF5722]/30 transition-all duration-300">
                <div className="space-y-6">
                  {/* Header Profile Info */}
                  <div className="flex items-center space-x-5">
                    {/* Avatar Circle */}
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${member.avatarGradient} p-1 shadow-[0_0_25px_rgba(255,87,34,0.4)] group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
                    >
                      <div className="w-full h-full bg-black rounded-[22px] flex flex-col items-center justify-center text-white">
                        <span className="font-headline text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                          {member.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </div>
  
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5722] flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Co-Founder</span>
                      </span>
                      <h3 className="font-headline text-2xl font-bold text-white mt-1">
                        {member.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
  
                  {/* Tagline & Bio */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <p className="text-white font-medium text-sm sm:text-base">
                      {member.tagline}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
  
                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-black/[0.03] border border-white/10 text-xs font-medium text-gray-600 flex items-center space-x-1"
                      >
                        <Code2 className="w-3 h-3 text-[#FF5722]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
  
                {/* Social Links */}
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">Faisalabad HQ</span>
                  <div className="flex items-center space-x-3">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-black/[0.03] hover:bg-black/15 text-gray-400 hover:text-white transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-black/[0.03] hover:bg-black/15 text-gray-400 hover:text-white transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-black/[0.03] hover:bg-black/15 text-gray-400 hover:text-[#FF5722] transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
