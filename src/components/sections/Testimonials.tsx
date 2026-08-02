import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'CTO, OmniTech Solutions',
    content: 'Apex Orion completely transformed our digital infrastructure. Their engineering speed and attention to detail in the dark mode UI resulted in a 40% increase in user retention.',
    rating: 5,
  },
  {
    name: 'Riyaz',
    role: 'CEO, Zarcostar',
    content: 'The level of professionalism and technical dominance they brought to Zarcostar.ae was unmatched. They delivered a highly optimized, stunning corporate presence ahead of schedule.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'VP of Product, FinStream',
    content: 'We needed a high-frequency trading dashboard that wouldn\'t lag under load. Apex Orion engineered a sub-second React architecture that exceeded all our performance benchmarks.',
    rating: 5,
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-semibold uppercase tracking-widest">
          Client Success
        </span>
        <h2 className="font-headline text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Trusted by <span className="text-[#FF5722]">Industry Leaders</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          See what our partners say about our engineering excellence and delivery speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative p-8 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] hover:bg-[#0e0e0e] transition-colors duration-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
              <Quote className="w-24 h-24 text-white" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan-400 text-[#FF5722]" />
                ))}
              </div>
              
              <p className="text-gray-300 text-base leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-white font-bold">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
