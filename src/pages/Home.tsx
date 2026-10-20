import React from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import InteractiveTerminal from '../components/sections/InteractiveTerminal';
import TechMarquee from '../components/sections/TechMarquee';
import ServicesGrid from '../components/sections/ServicesGrid';
import Testimonials from '../components/sections/Testimonials';
import FeaturedWork from '../components/sections/FeaturedWork';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-20 bg-black pb-20">
      <SEO
        title="Custom Software, Web & POS Development Agency"
        description="Apex Orion Global Solutions is an elite software engineering agency delivering high-performance web applications, mobile apps, SaaS products, and custom POS systems with sub-second speed."
        canonical="/"
      />
      <HeroSection />
      <InteractiveTerminal />
      <TechMarquee />
      <ServicesGrid />
      <Testimonials />
      <FeaturedWork />
    </div>
  );
};

export default Home;
