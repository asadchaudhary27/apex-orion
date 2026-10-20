import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Code2,
  DollarSign,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Building2,
  Layers,
  Sparkles,
  MapPin,
  Globe2,
  ExternalLink,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import GlassCard from '../components/common/GlassCard';
import {
  CountryCode,
  getLocationBySlug,
  getServiceById,
  generateLocationServiceContent,
  generateCityHubContent,
  getLocationsByCountry,
  SERVICES,
  LOCATIONS,
} from '../data/seoLocationsData';

export const CityServicePage: React.FC = () => {
  const { countryCode, citySlug, serviceSlug } = useParams<{
    countryCode?: string;
    citySlug?: string;
    serviceSlug?: string;
  }>();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Normalize route params
  const validCountryCode = countryCode?.toLowerCase() as CountryCode | undefined;
  const validCitySlug = citySlug?.toLowerCase();
  const validServiceSlug = serviceSlug?.toLowerCase();

  const VALID_COUNTRIES: CountryCode[] = ['us', 'uk', 'ae', 'sa', 'ca', 'au', 'de'];

  // Validate country and city existence
  if (!validCountryCode || !VALID_COUNTRIES.includes(validCountryCode)) {
    return <Navigate to="/locations" replace />;
  }

  const location = validCitySlug ? getLocationBySlug(validCitySlug) : undefined;
  if (!location || location.countryCode !== validCountryCode) {
    return <Navigate to="/locations" replace />;
  }

  // CASE 1: Single Service in City (/locations/:countryCode/:citySlug/:serviceSlug)
  if (validServiceSlug) {
    const service = getServiceById(validServiceSlug);
    if (!service) {
      return <Navigate to={`/locations/${validCountryCode}/${location.slug}`} replace />;
    }

    const content = generateLocationServiceContent(service.id, location.slug);
    if (!content) {
      return <Navigate to="/locations" replace />;
    }

    // Related services in the same city (other 5 services)
    const otherServicesInCity = SERVICES.filter((s) => s.id !== service.id);

    // Other cities in the same country offering this same service
    const siblingCities = getLocationsByCountry(location.countryCode).filter(
      (loc) => loc.slug !== location.slug
    );

    const getOgLocale = (cc: CountryCode): string => {
      switch (cc) {
        case 'uk': return 'en_GB';
        case 'ae': return 'en_AE';
        case 'sa': return 'en_SA';
        case 'ca': return 'en_CA';
        case 'au': return 'en_AU';
        case 'de': return 'en_DE';
        case 'us':
        default:
          return 'en_US';
      }
    };

    return (
      <div className="min-h-screen bg-black text-[#F5F5F5] pt-24 pb-20 selection:bg-[#FF5722] selection:text-white">
        <SEO
          title={content.pageTitle}
          description={content.metaDescription}
          canonicalUrl={content.canonicalUrl}
          ogLocale={getOgLocale(location.countryCode)}
          keywords={content.keywords}
          hreflangLinks={content.hreflangLinks}
          schema={content.schemaGraph}
        />

        {/* Ambient Top Glows */}
        <div className="absolute top-16 left-1/4 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-[#FF5722]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center space-x-2 text-xs text-gray-400 mb-8 overflow-x-auto pb-2 scrollbar-none"
          >
            <Link to="/" className="hover:text-white transition-colors flex items-center">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <Link to="/locations" className="hover:text-white transition-colors flex items-center">
              Locations
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <Link
              to={`/locations#${location.countryCode}`}
              className="hover:text-white transition-colors uppercase font-mono"
            >
              {location.country}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <Link
              to={`/locations/${location.countryCode}/${location.slug}`}
              className="hover:text-white transition-colors"
            >
              {location.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <span className="text-[#FF5722] font-medium truncate">{service.shortTitle}</span>
          </nav>

          {/* Hero Section */}
          <header className="mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
              <span>{content.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              {service.name} in{' '}
              <span className="bg-gradient-to-r from-[#FF5722] via-orange-400 to-amber-300 bg-clip-text text-transparent">
                {location.name}
              </span>
              <span className="text-gray-400 block sm:inline text-2xl sm:text-4xl lg:text-5xl font-semibold mt-1 sm:mt-0">
                , {location.stateOrRegion}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl leading-relaxed mb-6 font-light">
              {content.heroSubtitle}
            </p>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-gray-300 max-w-4xl leading-relaxed mb-8">
              <strong className="text-white block font-medium mb-1">Local Tech Ecosystem Overview:</strong>
              {content.localContextNarrative}
            </div>

            {/* Price Badge & CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <div className="inline-flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-white font-medium text-sm">
                <span className="text-xl font-bold text-[#FF5722]">
                  {content.formattedStartingPrice}
                </span>
                <span className="text-xs text-gray-300 leading-tight">
                  Starting Price • {location.currencyCode}
                  <span className="block text-[10px] text-gray-400">Milestone-based billing</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#FF5722] hover:bg-[#e64a19] text-white font-semibold text-sm shadow-[0_0_25px_rgba(255,87,34,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start Project in {location.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-sm font-medium transition-all"
                >
                  <span>Case Studies</span>
                </Link>

                <a
                  href={`https://wa.me/923182834735?text=Hello%20Apex%20Orion%20Global%20Solutions!%20I'm%20inquiring%20about%20${encodeURIComponent(
                    service.name
                  )}%20for%20our%20business%20in%20${encodeURIComponent(location.name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-[#FF5722]/10 hover:bg-[#FF5722]/20 text-[#FF5722] border border-[#FF5722]/30 text-sm font-medium transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </header>

          {/* Section: Local Industry Fit */}
          <section className="mb-16">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-3">
              <Building2 className="w-4 h-4" />
              <span>Tailored for {location.name}'s Commercial Landscape</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Engineered for Key {location.name} Industries
            </h2>
            <p className="text-gray-400 max-w-3xl text-sm sm:text-base leading-relaxed mb-8">
              We understand that software in {location.name} cannot be built with generic templates.
              Our technical architects design high-concurrency systems specifically geared toward the
              operational workflows and regulatory needs of {location.name}'s primary sectors:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {location.localIndustries.map((industry, idx) => (
                <GlassCard
                  key={idx}
                  variant="interactive"
                  className="p-5 bg-black/40 border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center text-[#FF5722] text-xs font-bold font-mono mb-3">
                      0{idx + 1}
                    </div>
                    <h3 className="font-semibold text-white text-base mb-2">{industry}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Custom {service.shortTitle.toLowerCase()} built to modernize workflows, ensure
                      data compliance, and scale performance for {industry.toLowerCase()} enterprises in{' '}
                      {location.name}.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>{location.name} Hub</span>
                    <span className="text-[#FF5722]">Bespoke Architecture</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Section: Deliverables & Tech Stack Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Deliverables (7 cols) */}
              <div className="lg:col-span-7">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-3">
                  <Layers className="w-4 h-4" />
                  <span>Production Scope</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  What You Receive with {service.shortTitle}
                </h2>
                <div className="space-y-3.5">
                  {content.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start space-x-3.5 transition-colors hover:bg-white/[0.04]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#FF5722] flex-shrink-0 mt-0.5" />
                      <div className="text-sm sm:text-base text-gray-200 leading-snug">{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Core Benefits (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-3">
                    <Code2 className="w-4 h-4" />
                    <span>Engineering Stack</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Battle-Tested Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {content.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-black border border-white/10">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-3 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#FF5722]" />
                    <span>Apex Orion Guarantee</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                    {service.coreBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#FF5722] font-bold">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Why Choose Apex Orion in [City] (Cost & Speed Comparison) */}
          <section className="mb-16 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Commercial Advantage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why {location.name} Businesses Partner with Apex Orion Global Solutions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
              <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20">
                <h3 className="text-red-400 font-semibold text-base mb-2">
                  {content.localChallengeAndSolution.challengeTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {content.localChallengeAndSolution.challengeDescription}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/60 border border-[#FF5722]/30">
                <h3 className="text-[#FF5722] font-semibold text-base mb-2">
                  {content.localChallengeAndSolution.solutionTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {content.localChallengeAndSolution.solutionDescription}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 text-center sm:text-left">
              <div>
                <span className="block text-2xl font-bold text-white">50%–60%</span>
                <span className="text-xs text-gray-400">
                  Cost savings vs typical {location.name} agency billings
                </span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">{location.timezone}</span>
                <span className="text-xs text-gray-400">
                  Dedicated working overlap & daily standups
                </span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">100% IP Ownership</span>
                <span className="text-xs text-gray-400">
                  Full copyright, source code, and design tokens
                </span>
              </div>
            </div>
          </section>

          {/* Section: Localized FAQ Accordion */}
          <section className="mb-16">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions for {location.name} Clients
            </h2>

            <div className="space-y-3">
              {content.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between space-x-4 focus:outline-none"
                    >
                      <span className="font-medium text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-[#FF5722]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Internal Linking Silos (Crucial for Programmatic SEO) */}
          <section className="pt-8 border-t border-white/10">
            {/* Silo 1: Other Services in the Same City */}
            <div className="mb-12">
              <h3 className="text-lg font-bold text-white mb-2">
                Other Engineering Services in {location.name}
              </h3>
              <p className="text-xs text-gray-400 mb-5">
                Explore our full suite of technical and design offerings for {location.name} enterprises:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {otherServicesInCity.map((srv) => (
                  <Link
                    key={srv.id}
                    to={`/locations/${location.countryCode}/${location.slug}/${srv.id}`}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#FF5722]/50 hover:bg-white/[0.04] transition-all group flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#FF5722] transition-colors">
                        {srv.name} in {location.name}
                      </h4>
                      <span className="text-[11px] text-gray-400">
                        {location.currencySymbol}
                        {isUK
                          ? srv.baseGbpStartingPrice.toLocaleString()
                          : srv.baseUsdStartingPrice.toLocaleString()}{' '}
                        {location.currencyCode}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#FF5722] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Silo 2: Same Service Across Other Cities in Country */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Serving Other Major {location.country} Technology Hubs
              </h3>
              <p className="text-xs text-gray-400 mb-5">
                We provide {service.name.toLowerCase()} across all prominent {location.country} commercial centers:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {siblingCities.map((sib) => (
                  <Link
                    key={sib.slug}
                    to={`/locations/${sib.countryCode}/${sib.slug}/${service.id}`}
                    className="px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#FF5722]/50 hover:bg-white/[0.06] text-xs text-gray-300 hover:text-white transition-all flex items-center space-x-1.5"
                  >
                    <MapPin className="w-3 h-3 text-[#FF5722]" />
                    <span>
                      {service.shortTitle} in {sib.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Silo 3: Same Service Across ALL Worldwide Cities (US, UK, UAE, Saudi, Canada, Australia, Germany) */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">
                Worldwide Network for {service.name}
              </h3>
              <p className="text-xs text-gray-400 mb-5">
                Explore our engineering hubs delivering {service.shortTitle.toLowerCase()} across all 32 global commercial centers:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
                {LOCATIONS.filter((l) => l.slug !== location.slug).map((l) => (
                  <Link
                    key={l.slug}
                    to={`/locations/${l.countryCode}/${l.slug}/${service.id}`}
                    className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#FF5722]/50 hover:bg-white/[0.05] text-gray-300 hover:text-white transition-all truncate block"
                  >
                    <span className="text-[#FF5722] font-mono mr-1">📍</span>
                    <span>{l.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to Locations Directory */}
            <div className="mt-10 text-center">
              <Link
                to="/locations"
                className="inline-flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-[#FF5722] transition-colors"
              >
                <span>← View All 32 Global Commercial Hubs Worldwide</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // CASE 2: City Overview Hub (/locations/:countryCode/:citySlug)
  const cityHub = generateCityHubContent(location.slug);
  if (!cityHub) {
    return <Navigate to="/locations" replace />;
  }

  const siblingCitiesInCountry = getLocationsByCountry(location.countryCode).filter(
    (loc) => loc.slug !== location.slug
  );
  const isUK = location.countryCode === 'uk';

  return (
    <div className="min-h-screen bg-black text-[#F5F5F5] pt-24 pb-20 selection:bg-[#FF5722] selection:text-white">
      <SEO
        title={cityHub.pageTitle}
        description={cityHub.metaDescription}
        canonicalUrl={cityHub.canonicalUrl}
        ogLocale={isUK ? 'en_GB' : 'en_US'}
        hreflangLinks={cityHub.hreflangLinks}
        schema={cityHub.schemaGraph}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center space-x-2 text-xs text-gray-400 mb-8 overflow-x-auto pb-2 scrollbar-none"
        >
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
          <Link to="/locations" className="hover:text-white transition-colors">
            Locations
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
          <span className="text-gray-300 font-mono uppercase">{location.country}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
          <span className="text-[#FF5722] font-medium">{location.name}</span>
        </nav>

        {/* Hero Header */}
        <header className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
            <span>{cityHub.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Software Development & Engineering in{' '}
            <span className="bg-gradient-to-r from-[#FF5722] via-orange-400 to-amber-300 bg-clip-text text-transparent">
              {location.name}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl leading-relaxed mb-6 font-light">
            {cityHub.heroSubtitle}
          </p>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-gray-300 max-w-4xl leading-relaxed">
            <strong className="text-white block font-medium mb-1">Local Tech Context:</strong>
            {cityHub.localContextNarrative}
          </div>
        </header>

        {/* 6 Services Grid in this City */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Available Engineering Services in {location.name}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Select a specialized offering to view customized pricing, deliverables, and local case studies:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityHub.services.map(({ service: srv, formattedStartingPrice, path }) => (
              <GlassCard
                key={srv.id}
                variant="interactive"
                className="p-6 bg-black/40 border-white/10 flex flex-col justify-between group hover:border-[#FF5722]/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold font-mono">
                      From {formattedStartingPrice}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400 uppercase">
                      {location.currencyCode}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF5722] transition-colors mb-2">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{srv.shortDesc}</p>

                  <div className="space-y-1.5 mb-6">
                    {srv.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5722] flex-shrink-0 mt-0.5" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={path}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-[#FF5722] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all group-hover:shadow-[0_0_20px_rgba(255,87,34,0.3)]"
                >
                  <span>Explore {srv.shortTitle} in {location.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Section: Other Cities in Country */}
        <section className="pt-8 border-t border-white/10">
          <h3 className="text-lg font-bold text-white mb-2">
            Other Technology Hubs We Serve in {location.country}
          </h3>
          <p className="text-xs text-gray-400 mb-5">
            Compare services and local ecosystem coverage across other major {location.country} commercial centres:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {siblingCitiesInCountry.map((sib) => (
              <Link
                key={sib.slug}
                to={`/locations/${sib.countryCode}/${sib.slug}`}
                className="px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#FF5722]/50 hover:bg-white/[0.06] text-xs text-gray-300 hover:text-white transition-all flex items-center space-x-1.5"
              >
                <MapPin className="w-3 h-3 text-[#FF5722]" />
                <span>{sib.name}, {sib.stateOrRegion}</span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/locations"
              className="inline-flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-[#FF5722] transition-colors"
            >
              <span>← View All 22 Global Hubs in the United States & United Kingdom</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CityServicePage;
