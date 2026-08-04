import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CheckCircle2, Lock, Download } from 'lucide-react';

export interface SoftwareProduct {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: string;
  priceLifetime: string;
  features: string[];
  gradient: string;
}

const SOFTWARES_DATA: SoftwareProduct[] = [
  {
    id: 'veloce',
    name: 'Veloce',
    tagline: 'Comprehensive car rental management and booking system.',
    priceMonthly: '$49',
    priceLifetime: '$499',
    features: ['Fleet Management', 'Booking & Reservations', 'Automated Invoicing', 'Customer Portal'],
    gradient: 'from-orange-600 to-[#FF5722]'
  },
  {
    id: 'apexpure-pos',
    name: 'ApexPure POS',
    tagline: 'Specialized point of sale and route delivery software for water companies.',
    priceMonthly: '$79',
    priceLifetime: '$799',
    features: ['Bottle Tracking', 'Route Optimization', 'Delivery Scheduling', 'Offline Mode Support'],
    gradient: 'from-blue-600 to-[#06b6d4]'
  },
  {
    id: 'apexrestu-pos',
    name: 'ApexRestu POS',
    tagline: 'High-performance POS system designed exclusively for restaurants.',
    priceMonthly: '$69',
    priceLifetime: '$699',
    features: ['Table Management', 'Kitchen Display System', 'Inventory Tracking', 'Multi-Store Support'],
    gradient: 'from-rose-600 to-pink-500'
  }
];

export const Softwares: React.FC = () => {
  return (
    <div className="pt-28 pb-20 space-y-16 sm:space-y-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6 pt-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(255,87,34,0.15),transparent_70%)] rounded-full pointer-events-none" />

        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[100px] sm:text-[150px] md:text-[200px] lg:text-[250px] font-black text-white/[0.06] uppercase tracking-tighter leading-none whitespace-nowrap italic drop-shadow-sm"
          >
            SOFTWARE
          </motion.span>
        </div>

        <div className="relative z-10 space-y-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/[0.03] border border-white/10 text-[#FF5722] text-xs sm:text-sm font-semibold uppercase tracking-widest backdrop-blur-md"
        >
          <Cloud className="w-4 h-4 text-[#FF5722]" />
          <span>Ready-To-Use SaaS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
        >
          Plug & Play <span className="text-[#FF5722]">Software.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl lg:text-2xl font-normal max-w-3xl mx-auto leading-relaxed"
        >
          Battle-tested, enterprise-grade applications ready for immediate deployment. Purchase a license key and unlock scale today.
        </motion.p>
        </div>
      </section>

      {/* Softwares Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {SOFTWARES_DATA.map((software, index) => (
            <motion.div
              key={software.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-8 h-full flex flex-col justify-between group bg-black/40 border border-white/10 rounded-2xl hover:border-[#FF5722]/40 transition-all duration-300">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${software.gradient} p-0.5 shadow-[0_0_20px_rgba(255,87,34,0.3)]`}
                    >
                      <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                        <Cloud className="w-7 h-7 text-[#FF5722]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-lg font-bold text-white tracking-tight bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full shadow-sm">
                        {software.priceLifetime} <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider ml-1">Lifetime</span>
                      </span>
                      <span className="text-sm font-semibold text-gray-300 tracking-tight bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full shadow-sm">
                        {software.priceMonthly} <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider ml-1">/ Month</span>
                      </span>
                    </div>
                  </div>
  
                  <div className="space-y-2">
                    <h3 className="font-headline text-2xl font-bold text-white group-hover:text-[#FF5722] transition-colors">
                      {software.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {software.tagline}
                    </p>
                  </div>
  
                  <ul className="space-y-3 border-t border-white/10 pt-4">
                    {software.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5722]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
  
                <div className="pt-8 space-y-3">
                  <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-[#FF5722] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Purchase License</span>
                  </button>
                  <a href="#" className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4 text-gray-400" />
                    <span>Download (.exe)</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Softwares;
