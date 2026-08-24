import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SmoothScroll from './components/common/SmoothScroll';
import WhatsAppButton from './components/common/WhatsAppButton';
import IntroScreen from './components/common/IntroScreen';
import PageWrapper from './components/common/PageWrapper';

import LoadingFallback from './components/common/LoadingFallback';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Softwares = lazy(() => import('./pages/Softwares'));
const SoftwareDetail = lazy(() => import('./pages/SoftwareDetail'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/team" element={<PageWrapper><Team /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/softwares" element={<PageWrapper><Softwares /></PageWrapper>} />
        <Route path="/software/:id" element={<PageWrapper><SoftwareDetail /></PageWrapper>} />
        <Route path="/project/:id" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <SmoothScroll>
        <WhatsAppButton />
        {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
        <div className={`min-h-screen bg-black text-[#F5F5F5] font-sans antialiased selection:bg-[#FF5722] selection:text-white flex flex-col justify-between ${showIntro ? 'h-screen overflow-hidden' : ''}`}>
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
};

export default App;
