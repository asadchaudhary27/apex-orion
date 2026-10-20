import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Search,
  ArrowRight,
  Globe2,
  ChevronRight,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import GlassCard from '../components/common/GlassCard';
import {
  LOCATIONS,
  SERVICES,
  getLocationsByCountry,
  BASE_SITE_URL,
  LocationData,
} from '../data/seoLocationsData';

const HUB_SCHEMA = [
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${BASE_SITE_URL}/locations`,
      },
    ],
  },
  {
    '@type': 'CollectionPage',
    name: 'Global Engineering Hubs | Apex Orion Global Solutions',
    description:
      'Regional directory of software engineering, custom web development, mobile apps, and offline POS systems across 32 key commercial centers in the US, UK, Middle East, Canada, Australia, and Europe.',
    url: `${BASE_SITE_URL}/locations`,
    hasPart: LOCATIONS.map((loc) => ({
      '@type': 'WebPage',
      name: `Software Development in ${loc.name}`,
      url: `${BASE_SITE_URL}/locations/${loc.countryCode}/${loc.slug}`,
    })),
  },
];

type RegionFilter = 'all' | 'us' | 'uk' | 'middle-east' | 'ca-au' | 'europe';

export const LocationsHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('all');

  const usLocations = getLocationsByCountry('us');
  const ukLocations = getLocationsByCountry('uk');
  const meLocations = [...getLocationsByCountry('ae'), ...getLocationsByCountry('sa')];
  const caAuLocations = [...getLocationsByCountry('ca'), ...getLocationsByCountry('au')];
  const europeLocations = getLocationsByCountry('de');

  const filterLocations = (locationsList: LocationData[]) => {
    return locationsList.filter((loc) => {
      const query = searchTerm.toLowerCase();
      return (
        loc.name.toLowerCase().includes(query) ||
        loc.stateOrRegion.toLowerCase().includes(query) ||
        loc.country.toLowerCase().includes(query) ||
        loc.localIndustries.some((ind) => ind.toLowerCase().includes(query))
      );
    });
  };

  const filteredUS = filterLocations(usLocations);
  const filteredUK = filterLocations(ukLocations);
  const filteredME = filterLocations(meLocations);
  const filteredCaAu = filterLocations(caAuLocations);
  const filteredEurope = filterLocations(europeLocations);

  const renderCityCardGrid = (locations: LocationData[], emptyMsg: string) => {
    if (locations.length === 0) {
      return <p className="text-sm text-gray-500 py-6">{emptyMsg}</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {locations.map((loc) => (
          <GlassCard
            key={`${loc.countryCode}-${loc.slug}`}
            variant="interactive"
            className="p-5 bg-black/40 border-white/10 flex flex-col justify-between group hover:border-[#FF5722]/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#FF5722] font-semibold">
                  {loc.stateOrRegion} • {loc.country}
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  {loc.timezone.split(' ')[0]}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#FF5722] transition-colors mb-2 flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#FF5722] flex-shrink-0" />
                <span>{loc.name}</span>
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                {loc.techEcosystemNote}
              </p>

              {/* Local Industries Chips */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {loc.localIndustries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10px] text-gray-300 font-mono"
                  >
                    {ind}
                  </span>
                ))}
              </div>

              {/* Direct Links to top 3 services in this city */}
              <div className="space-y-1 mb-5 pt-3 border-t border-white/5">
                <div className="text-[10px] uppercase font-mono text-gray-500 mb-1.5">
                  Top Services in {loc.name}:
                </div>
                {SERVICES.slice(0, 3).map((srv) => (
                  <Link
                    key={srv.id}
                    to={`/locations/${loc.countryCode}/${loc.slug}/${srv.id}`}
                    className="block text-xs text-gray-300 hover:text-[#FF5722] transition-colors truncate"
                  >
                    • {srv.shortTitle} in {loc.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to={`/locations/${loc.countryCode}/${loc.slug}`}
              className="w-full py-2 px-3 rounded-lg bg-white/[0.03] hover:bg-[#FF5722] text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-all group-hover:shadow-[0_0_15px_rgba(255,87,34,0.3)]"
            >
              <span>View All 6 Services in {loc.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </GlassCard>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-[#F5F5F5] pt-24 pb-20 selection:bg-[#FF5722] selection:text-white">
      <SEO
        title="Global Locations & Regional Engineering Hubs (US, UK, UAE, KSA, CA, AU, DE)"
        description="Explore Apex Orion Global Solutions' regional software engineering and custom web development hubs across 32 premier commercial cities across the United States, United Kingdom, Middle East, Canada, Australia, and Germany."
        canonicalUrl="/locations"
        keywords={[
          'Apex Orion Global Solutions locations',
          'software agency US cities',
          'software agency UK cities',
          'custom software Dubai',
          'SaaS development Riyadh',
          'mobile apps Toronto',
          'web developers Sydney',
          'enterprise software Berlin',
        ]}
        schema={HUB_SCHEMA}
      />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-48 right-1/4 w-96 h-96 bg-[#FF5722]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center space-x-2 text-xs text-gray-400 mb-8"
        >
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#FF5722] font-medium">Locations Directory</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 mb-4">
            <Globe2 className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>32 Commercial Hubs Across 4 Continents</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Global Engineering{' '}
            <span className="bg-gradient-to-r from-[#FF5722] via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Hubs & Coverage
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8 font-light">
            Apex Orion Global Solutions delivers sub-second web platforms, cross-platform mobile apps, offline-first
            POS systems, and scalable SaaS solutions tailored to the distinct commercial landscapes of
            the United States, United Kingdom, Middle East, Canada, Australia, and Germany.
          </p>

          {/* Search & Country Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 sm:p-3 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search city, state, or industry (e.g. Dubai, London, Toronto, FinTech)..."
                className="w-full bg-transparent pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setSelectedRegion('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRegion === 'all'
                    ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All (32)
              </button>
              <button
                onClick={() => setSelectedRegion('us')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRegion === 'us'
                    ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                United States (12)
              </button>
              <button
                onClick={() => setSelectedRegion('uk')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRegion === 'uk'
                    ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                United Kingdom (10)
              </button>
              <button
                onClick={() => setSelectedRegion('middle-east')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRegion === 'middle-east'
                    ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Middle East (4)
              </button>
              <button
                onClick={() => setSelectedRegion('ca-au')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRegion === 'ca-au'
                    ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Canada & Australia (4)
              </button>
              <button
                onClick={() => setSelectedRegion('europe')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRegion === 'europe'
                    ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Europe (2)
              </button>
            </div>
          </div>
        </header>

        {/* Section 1: United States (12 Hubs) */}
        {(selectedRegion === 'all' || selectedRegion === 'us') && (
          <section id="us" className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-xl">🇺🇸</span>
              <div>
                <h2 className="text-2xl font-bold text-white">United States Commercial Hubs</h2>
                <p className="text-xs text-gray-400">
                  Targeted technology and software engineering across 12 tier-one US metropolitan centers.
                </p>
              </div>
            </div>
            {renderCityCardGrid(filteredUS, 'No US cities match your search filter.')}
          </section>
        )}

        {/* Section 2: United Kingdom (10 Hubs) */}
        {(selectedRegion === 'all' || selectedRegion === 'uk') && (
          <section id="uk" className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-xl">🇬🇧</span>
              <div>
                <h2 className="text-2xl font-bold text-white">United Kingdom Commercial Hubs</h2>
                <p className="text-xs text-gray-400">
                  Precision digital products and enterprise software across 10 major UK regional centers.
                </p>
              </div>
            </div>
            {renderCityCardGrid(filteredUK, 'No UK cities match your search filter.')}
          </section>
        )}

        {/* Section 3: Middle East (UAE & Saudi Arabia - 4 Hubs) */}
        {(selectedRegion === 'all' || selectedRegion === 'middle-east') && (
          <section id="middle-east" className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-xl">🇦🇪 🇸🇦</span>
              <div>
                <h2 className="text-2xl font-bold text-white">Middle East Commercial Centers</h2>
                <p className="text-xs text-gray-400">
                  Bespoke software, ZATCA Phase 2 e-invoicing, FTA VAT compliance, and offline-first POS systems across Dubai, Abu Dhabi, Riyadh, and Jeddah.
                </p>
              </div>
            </div>
            {renderCityCardGrid(filteredME, 'No Middle Eastern cities match your search filter.')}
          </section>
        )}

        {/* Section 4: Canada & Australia (4 Hubs) */}
        {(selectedRegion === 'all' || selectedRegion === 'ca-au') && (
          <section id="ca-au" className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-xl">🇨🇦 🇦🇺</span>
              <div>
                <h2 className="text-2xl font-bold text-white">Canada & Australia Innovation Hubs</h2>
                <p className="text-xs text-gray-400">
                  Capital-efficient SaaS MVPs, cross-platform mobile apps (PIPEDA compliant), and continuous 24-hour engineering velocity for Toronto, Vancouver, Sydney, and Melbourne.
                </p>
              </div>
            </div>
            {renderCityCardGrid(filteredCaAu, 'No Canadian or Australian cities match your search filter.')}
          </section>
        )}

        {/* Section 5: Europe (Germany - 2 Hubs) */}
        {(selectedRegion === 'all' || selectedRegion === 'europe') && (
          <section id="europe" className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-xl">🇩🇪 🇪🇺</span>
              <div>
                <h2 className="text-2xl font-bold text-white">European Tech Corridors</h2>
                <p className="text-xs text-gray-400">
                  Sub-second Core Web Vitals, zero-telemetry architectures, and strict GDPR/TTDSG compliant enterprise systems in Berlin and Munich.
                </p>
              </div>
            </div>
            {renderCityCardGrid(filteredEurope, 'No European cities match your search filter.')}
          </section>
        )}

        {/* Global CTA Banner */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-black via-white/[0.02] to-black border border-white/10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Don't See Your City Listed?
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-6">
            We operate fully remote agile engineering teams supporting international clients across
            all 50 US states, nationwide UK territories, the Gulf region, Canada, Australia, and the European Union.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#FF5722] hover:bg-[#e64a19] text-white font-semibold text-sm shadow-[0_0_25px_rgba(255,87,34,0.35)] transition-all hover:scale-[1.02]"
          >
            <span>Discuss Custom Engagement</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default LocationsHub;
