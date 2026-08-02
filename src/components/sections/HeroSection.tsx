import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, ArrowRight, Server, Zap, GitBranch } from 'lucide-react';

// The code snippet we want to type out
const CODE_SNIPPET = `import { build } from '@apex-orion/core';

async function executeVision() {
  const product = await build({
    vision: 'extraordinary',
    founder: 'CEO AND FOUNDER ASAD QAISAR',
    performance: 'sub-second',
    stack: ['React', 'Node.js', 'Rust'],
    design: '2026_future_proof'
  });

  await product.deploy();
  return { status: 200, system: 'online' };
}`;

export const HeroSection: React.FC = () => {
  const [typedCode, setTypedCode] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    
    // Initial delay before typing starts
    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < CODE_SNIPPET.length) {
          setTypedCode(CODE_SNIPPET.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 25); // Speed of typing

      return () => clearInterval(typingInterval);
    }, 800);

    return () => clearTimeout(startTimeout);
  }, []);

  // Simple syntax highlighting via regex replacement
  const renderHighlightedCode = (code: string) => {
    return code.split('\n').map((line, i) => {
      // Very basic highlighter just for the visual effect
      let html = line
        .replace(/(import|from|async|function|await|const|return)/g, '<span class="text-pink-500">$1</span>')
        .replace(/('[^']*')/g, '<span class="text-green-400">$1</span>')
        .replace(/(build|executeVision|deploy)/g, '<span class="text-[#FF5722]">$1</span>')
        .replace(/({|}|\[|\]|\(|\))/g, '<span class="text-gray-400">$1</span>');
        
      return (
        <div key={i} className="flex">
          <span className="w-8 text-right pr-4 text-gray-600 select-none opacity-50 font-mono text-sm">{i + 1}</span>
          <span className="font-mono text-sm sm:text-base text-gray-300" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      );
    });
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black flex items-center">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* Radial Gradient for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Content Area */}
        <div className="space-y-8 max-w-2xl">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]"
          >
            We Build What Others Can't <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#FF8A65]">Compile.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed max-w-xl"
          >
            Elite software engineering for visionary brands. We ship enterprise-grade code that scales infinitely and performs flawlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
          >
            <Link
              to="/contact"
              className="px-8 py-4 text-base font-bold text-[#050505] bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 flex items-center space-x-3 group w-full sm:w-auto justify-center"
            >
              <span>Initialize Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/projects"
              className="px-8 py-4 text-base font-bold text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center"
            >
              <GitBranch className="w-5 h-5 text-[#FF5722]" />
              <span>View Source</span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center space-x-6 text-sm text-gray-500 pt-8 border-t border-white/10"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
              <span>Latency: 12ms</span>
            </div>
            <div className="flex items-center space-x-2">
              <Server className="w-4 h-4" />
              <span>99.99% Uptime</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content Area: Glass Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          style={{ perspective: 1000 }}
          className="relative lg:ml-auto w-full max-w-[600px] mt-10 lg:mt-0 group"
        >
          {/* Terminal Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF5722] to-[#FF8A65] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
            
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto flex items-center space-x-2 text-gray-400 text-xs font-mono">
                <Code2 className="w-3.5 h-3.5" />
                <span>execute.ts</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[380px] overflow-hidden bg-transparent">
              <div className="font-mono text-sm leading-loose">
                {renderHighlightedCode(typedCode)}
                <AnimatePresence>
                  {!isTypingComplete && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2.5 h-5 bg-[#FF5722] ml-1 translate-y-1"
                    />
                  )}
                </AnimatePresence>
              </div>
              
              {isTypingComplete && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-4 border-t border-white/10 font-mono text-sm"
                >
                  <div className="flex items-center space-x-2 text-green-400">
                    <Zap className="w-4 h-4" />
                    <span>Deployment successful. Systems nominal.</span>
                  </div>
                  <div className="text-gray-500 mt-2 pl-6">
                    Ready for input...
                    <span className="inline-block w-2.5 h-4 bg-gray-500 ml-2 animate-pulse" />
                  </div>
                </motion.div>
              )}
            </div>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
