import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud, CheckCircle2, Lock, ArrowRight, MessageSquare, Wrench, ShieldCheck, Cpu, Globe, Smartphone } from 'lucide-react';
import SEO from '../components/common/SEO';

export interface SoftwareProduct {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: string;
  priceLifetime: string;
  features: string[];
  gradient: string;
  iconPath: string;
}

const SOFTWARES_SCHEMA = {
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
      name: 'Softwares',
      item: 'https://apexoriontech.com/softwares'
    }
  ]
};

const SOFTWARES_DATA: SoftwareProduct[] = [
  {
    id: 'apexrestu-pos',
    name: 'APEX POS - Restaurant & Retail Operating System',
    tagline: 'Enterprise-grade, 100% offline-first POS suite with multi-station KOT routing, recipe BOM food costing, and AI WhatsApp automation.',
    priceMonthly: '$3',
    priceLifetime: '$150',
    features: ['100% Offline-First (SQLite)', 'KDS & Multi-Station KOT', 'Recipe BOM & Food Costing', 'Automated WhatsApp Receipts'],
    gradient: 'from-[#FF5722] to-orange-600',
    iconPath: '/apexrestu.ico'
  },
  {
    id: 'apexpure-pos',
    name: 'ApexPure POS - Water Delivery & Plant Management',
    tagline: 'Comprehensive plant operations & route delivery management with bottle tracking, rider ledger, and SMS/WhatsApp bills.',
    priceMonthly: '$3',
    priceLifetime: '$150',
    features: ['Bottle Deposits & Returns', 'Delivery Route Optimization', 'Daily Rider Cash Handover', 'Customer Udhar/Ledger System'],
    gradient: 'from-amber-500 to-[#FF5722]',
    iconPath: '/apex_pure.ico'
  },
  {
    id: 'veloce',
    name: 'Veloce - Car Rental & Fleet Operations Platform',
    tagline: 'Heavy-duty car rental & fleet tracking software with meter-in/meter-out logging, dynamic contract generation, and expense tracking.',
    priceMonthly: '$3',
    priceLifetime: '$150',
    features: ['Vehicle Fleet Status Grid', 'Meter & Damage In/Out Logs', 'Dynamic Rental Agreements', 'Automated Driver & Fuel Dues'],
    gradient: 'from-[#FF5722] to-amber-500',
    iconPath: '/veloce.ico'
  },
  {
    id: 'apexrx-manager',
    name: 'ApexRx - Pharmacy & Healthcare Clinic Manager',
    tagline: 'Fast prescription dispensing, batch & near-expiry tracking, supplier GRN orders, and daily pharmacy profit margins.',
    priceMonthly: '$3',
    priceLifetime: '$150',
    features: ['Batch & Expiry Alert Engine', 'Doctor Prescription Archive', 'Supplier GRN & Bonus Stocks', 'Daily Z-Report Shift Audit'],
    gradient: 'from-orange-600 to-amber-600',
    iconPath: '/apexrx.ico'
  },
  {
    id: 'custom-software',
    name: 'Bespoke Custom Software Development',
    tagline: 'Tailor-made commercial desktop, web & mobile applications designed specifically for your proprietary business workflows.',
    priceMonthly: 'Custom',
    priceLifetime: 'Quote',
    features: ['100% Custom Business Logic', 'Dynamic Thermal & PDF Invoicing', 'Digital Weighing Scale Drivers', 'Central Cloud Head-Office Sync'],
    gradient: 'from-amber-600 to-[#FF5722]',
    iconPath: '/custom_software.ico'
  }
];

export const Softwares: React.FC = () => {
  return (
    <div className="pt-28 pb-20 space-y-16 sm:space-y-20 overflow-hidden">
      <SEO
        title="Commercial Offline POS & Custom Software Development"
        description="Discover Apex Orion Global Solutions' proprietary enterprise software suites: APEX POS for restaurants, ApexPure POS for water delivery, Veloce Car Rental platform, and Bespoke Custom Software Development."
        canonical="/softwares"
        schema={SOFTWARES_SCHEMA}
      />
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6 pt-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(255,87,34,0.15),transparent_70%)] rounded-full pointer-events-none" />

        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0 pointer-events-none select-none w-screen overflow-hidden">
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
            <span>Ready-To-Use SaaS & Bespoke Systems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Enterprise <span className="text-[#FF5722]">Software Suites.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl lg:text-2xl font-normal max-w-3xl mx-auto leading-relaxed"
          >
            Battle-tested, 100% offline-first software applications and custom engineering solutions built for high-throughput commercial operations.
          </motion.p>
        </div>
      </section>

      {/* Softwares Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {SOFTWARES_DATA.map((software, index) => (
            <motion.div
              key={software.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <div className="p-8 h-full flex flex-col justify-between group bg-black/40 border border-white/10 rounded-2xl hover:border-[#FF5722]/40 transition-all duration-300">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${software.gradient} p-0.5 shadow-[0_0_20px_rgba(255,87,34,0.3)]`}
                    >
                      <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center overflow-hidden">
                        <img src={software.iconPath} alt={`${software.name} icon`} className="w-full h-full object-cover scale-[1.35] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                      </div>
                    </div>
                    {software.id === 'custom-software' ? (
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-base font-bold text-[#FF5722] tracking-tight bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full shadow-sm font-mono">
                          Bespoke Quote
                        </span>
                        <span className="text-xs font-semibold text-gray-300 tracking-tight bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full shadow-sm font-mono">
                          Milestone-Based
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-lg font-bold text-white tracking-tight bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full shadow-sm font-mono">
                          {software.priceLifetime} <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider ml-1">Lifetime</span>
                        </span>
                        <span className="text-sm font-semibold text-gray-300 tracking-tight bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full shadow-sm font-mono">
                          {software.priceMonthly} <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider ml-1">/ Month</span>
                        </span>
                      </div>
                    )}
                  </div>
  
                  <div className="space-y-2">
                    <h3 className="font-headline text-2xl font-bold text-white group-hover:text-[#FF5722] transition-colors leading-snug">
                      {software.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {software.tagline}
                    </p>
                  </div>
  
                  <ul className="space-y-3 border-t border-white/10 pt-4">
                    {software.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
  
                <div className="pt-8 space-y-3 flex flex-col items-center">
                  <Link 
                    to={`/software/${software.id}`} 
                    className="w-full py-3.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>View Features & Screenshots</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <a 
                      href={`https://wa.me/923182834735?text=Hi!%20I%20am%20interested%20in%20a%20live%20demo%20for%20${encodeURIComponent(software.name)}.`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-[#FF5722] text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                    <Link 
                      to="/contact" 
                      className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#FF5722]" />
                      <span>Custom Quote</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bespoke Custom Software Engineering Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-[#FF5722]/30 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-8 sm:p-12 shadow-[0_0_50px_rgba(255,87,34,0.15)]">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[radial-gradient(circle,rgba(255,87,34,0.2),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-semibold uppercase tracking-wider font-mono">
                <Wrench className="w-3.5 h-3.5" />
                <span>Bespoke Engineering</span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-white leading-tight">
                Bespoke Software <span className="text-[#FF5722]">Engineered To Your Exact Spec</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                When off-the-shelf software falls short, Apex Orion Global Solutions engineers 100% custom commercial software tailored to your company's proprietary workflows — including hardware-integrated thermal invoicing, digital scale (kanta) drivers, biometric authentication, and multi-branch cloud sync.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                  <span>100% Offline-First Speed (SQLite)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                  <span>Hardware-Locked Anti-Piracy Vault</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                  <span>Dynamic Thermal & PDF Invoicing</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                  <span>Lifetime Ownership & Full Source Code</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
              <Link
                to="/software/custom-software"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-[#FF5722] text-white font-bold text-sm text-center shadow-[0_0_25px_rgba(255,87,34,0.4)] hover:shadow-[0_0_35px_rgba(255,87,34,0.7)] hover:scale-105 transition-all duration-300"
              >
                Custom Software Overview
              </Link>
              <a
                href="https://wa.me/923182834735?text=Hi%20Apex%20Orion%20Global%20Solutions!%20I%20want%20to%20discuss%20a%20custom%20software%20requirement%20for%20my%20business."
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm text-center transition-all duration-300"
              >
                Direct WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Softwares;
