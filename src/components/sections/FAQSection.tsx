import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    question: "What software and web development services does Apex Orion Global Solutions provide?",
    answer: "Apex Orion Global Solutions offers end-to-end software engineering including custom web applications (React, Next.js, Node.js), mobile applications (React Native, Flutter), desktop & cloud POS systems, SaaS product engineering, 3D WebGL experiences, UI/UX brand design, and technical SEO optimization."
  },
  {
    question: "Do your custom POS systems operate 100% offline?",
    answer: "Yes. Our flagship POS solutions (including ApexPure POS, Veloce, and ApexRestu POS) are built with an offline-first architecture. They process sales, print receipts, and manage inventory without internet connectivity, automatically syncing with the central database as soon as a connection is restored."
  },
  {
    question: "How long does it take to develop a custom web application or MVP?",
    answer: "A standard minimum viable product (MVP) or custom web application typically delivers in 3 to 6 weeks depending on feature complexity. Enterprise platforms or custom POS suites usually take 6 to 12 weeks with weekly sprint demos and continuous client communication."
  },
  {
    question: "What is your pricing and payment structure for international clients?",
    answer: "We offer both fixed-price milestone contracts and dedicated monthly retainer models. We accept international payments via wire transfer, credit card, and multi-currency accounts across the US, UK, UAE, Saudi Arabia, Europe, and Pakistan with transparent invoicing."
  },
  {
    question: "Can you integrate existing software with custom APIs, cloud databases, or AI models?",
    answer: "Absolutely. Our engineers specialize in legacy system modernization, REST/GraphQL API architectures, payment gateway integrations (Stripe, PayPal, local merchant APIs), and modern AI/ML embeddings for smart search and process automation."
  },
  {
    question: "What ongoing maintenance and warranty do you provide after launch?",
    answer: "Every project includes a standard 30 to 90 days bug-free warranty alongside optional 24/7 SLA maintenance packages covering server uptime, security patches, database backups, and feature enhancements."
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-semibold uppercase tracking-widest">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="font-headline text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Everything You <span className="text-[#FF5722]">Need to Know</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          Clear answers about our engineering process, pricing, timelines, and technical standards.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <GlassCard
              key={idx}
              variant="solid-dark"
              className="rounded-2xl border-white/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-headline text-lg sm:text-xl font-semibold text-white">
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#FF5722] border-[#FF5722]/30 bg-[#FF5722]/10' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-white/5 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
