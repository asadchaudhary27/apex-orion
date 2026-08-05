import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, MessageCircle, Clock, Globe } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import ContactForm from '../components/sections/ContactForm';

export const Contact: React.FC = () => {
  return (
    <div className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 overflow-hidden">
      {/* Ambient background radial glow */}
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,87,34,0.15),transparent_70%)] rounded-full pointer-events-none -z-10" />

      {/* Background Watermark */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-[-1] pointer-events-none select-none">
        <motion.span 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[100px] sm:text-[150px] md:text-[200px] lg:text-[280px] font-black text-white/[0.06] uppercase tracking-tighter leading-none whitespace-nowrap italic drop-shadow-sm"
        >
          CONNECT
        </motion.span>
      </div>

      {/* 50/50 Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pt-6">
        {/* Left Side: Contact Information & Brand Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-semibold uppercase tracking-widest">
              <MessageCircle className="w-4 h-4" />
              <span>Direct Communication</span>
            </span>

            <h1 className="font-headline text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Let's build something <span className="text-[#FF5722]">extraordinary.</span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
              HQ: Faisalabad. Serving clients globally. Reach out to kick off your next project.
            </p>
          </div>

          {/* Info Glass Cards */}
          <div className="space-y-5 pt-2">
            {/* Global HQ */}
            <GlassCard variant="hover-glow" glowColor="orange" className="p-6 flex items-start space-x-4 rounded-2xl">
              <div className="p-3 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/50/30 text-[#FF5722] flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-headline text-lg font-bold text-white">Apex Orion HQ</h3>
                <p className="text-gray-400 text-sm font-medium">Faisalabad, Pakistan</p>
                <p className="text-gray-400 text-xs flex items-center space-x-1 pt-1">
                  <Globe className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>Serving visionary clients worldwide</span>
                </p>
              </div>
            </GlassCard>

            {/* Direct Email */}
            <GlassCard variant="hover-glow" glowColor="orange" className="p-6 flex items-start space-x-4 rounded-2xl">
              <div className="p-3 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/50/30 text-[#FF5722] flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-headline text-lg font-bold text-white">Direct Email Inquiry</h3>
                <p className="text-gray-400 text-sm font-medium">apexorion69@gmail.com</p>
                <p className="text-gray-400 text-xs flex items-center space-x-1 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>24-hour typical response time</span>
                </p>
              </div>
            </GlassCard>

            {/* Instant WhatsApp Integration Link */}
            <GlassCard variant="hover-glow" glowColor="orange" className="p-6 flex flex-col space-y-4 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline text-lg font-bold text-white">Instant WhatsApp Chat</h3>
                  <p className="text-gray-400 text-sm font-medium">Direct Founder Line (Alpha & Asad)</p>
                </div>
              </div>
              <a
                href="https://wa.me/923182834735"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full space-x-2 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us Now</span>
              </a>
            </GlassCard>
          </div>
        </motion.div>

        {/* Right Side: Lead Capture Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
