import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    if (isVisible) {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Wait for exit animation
    }
  };

  useEffect(() => {
    // 10 second timeout
    const timer = setTimeout(() => {
      handleDismiss();
    }, 10000);

    // Scroll listener
    const handleScroll = () => {
      // Prevent default to stop scrolling behind the overlay, but also trigger dismiss
      handleDismiss();
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
        >
          {/* Skip Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-6 right-6 text-xs font-mono text-gray-400 hover:text-white px-4 py-2 border border-white/10 rounded-full bg-[#050505]/[0.03] transition-colors"
          >
            Skip Intro
          </button>

          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#FF5722] blur-[100px] opacity-20 rounded-full" />
              <h1 className="font-headline text-5xl md:text-7xl font-bold text-white tracking-tighter relative z-10">
                APEX <span className="text-[#FF5722]">ORION</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-gray-400 text-sm md:text-base font-mono tracking-widest uppercase">
                Engineering Digital Dominance
              </p>
            </motion.div>

            {/* Loading / Timeout Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 10, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 bg-[#FF5722]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
