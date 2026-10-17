import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Refresh ScrollTrigger after the new page mounts and DOM is ready
    // Small timeout ensures all nested components have rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      className="w-full min-h-[calc(100vh-80px)] flex flex-col"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
