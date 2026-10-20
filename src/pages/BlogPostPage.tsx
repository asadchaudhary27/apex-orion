import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Info,
  MapPin,
  HelpCircle,
  ChevronDown,
  Building2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import GlassCard from '../components/common/GlassCard';
import { getBlogBySlug, BlogPost } from '../data/seoBlogsData';
import {
  getServiceById,
  getLocationBySlug,
  BASE_SITE_URL,
  LocationData,
} from '../data/seoLocationsData';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogBySlug(slug);
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Resolve target money-page service and related city landing pages
  const targetService = getServiceById(post.targetServiceSlug);
  const relatedCityObjects: LocationData[] = post.relatedCities
    .map((citySlug) => getLocationBySlug(citySlug))
    .filter((loc): loc is LocationData => Boolean(loc));

  const canonicalUrl = `${BASE_SITE_URL}/blog/${post.slug}`;

  // Complete JSON-LD Structured Data Graph
  const schemaGraph: Array<Record<string, any>> = [
    // 1. BreadcrumbList Schema
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumbs`,
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
          name: 'Blog',
          item: `${BASE_SITE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: canonicalUrl,
        },
      ],
    },

    // 2. Article Schema
    {
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      headline: post.title,
      description: post.metaDescription,
      datePublished: `${post.publishDate}T09:00:00+00:00`,
      dateModified: `${post.publishDate}T09:00:00+00:00`,
      mainEntityOfPage: canonicalUrl,
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Apex Orion Global Solutions',
        url: BASE_SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_SITE_URL}/logo_transparent.png`,
        },
      },
      keywords: post.tags.join(', '),
    },

    // 3. FAQPage Schema
    {
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faqs`,
      mainEntity: post.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#F5F5F5] pt-24 pb-20 selection:bg-[#FF5722] selection:text-white">
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        canonicalUrl={canonicalUrl}
        keywords={post.tags}
        schema={schemaGraph}
      />

      {/* Ambient background glows */}
      <div className="absolute top-16 left-1/3 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-36 right-1/4 w-96 h-96 bg-[#FF5722]/5 rounded-full blur-[160px] pointer-events-none" />

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
          <Link to="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
          <span className="text-gray-300 font-mono">{post.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
          <span className="text-[#FF5722] font-medium truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-xs font-mono text-[#FF5722] mb-4">
            <span>{post.category}</span>
            <span>•</span>
            <span className="text-gray-300">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 font-light">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 text-xs text-gray-400 font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white font-bold text-xs">
                {post.author.name[0]}
              </div>
              <div>
                <span className="text-white block font-medium">{post.author.name}</span>
                <span className="text-[11px] text-gray-500">{post.author.role}</span>
              </div>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Published {post.publishDate}</span>
            </div>
          </div>
        </header>

        {/* Main Grid: Content (8 cols) + Sticky Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-12">
            {/* Mobile Table of Contents */}
            <div className="lg:hidden p-5 rounded-xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#FF5722] mb-3">
                Table of Contents
              </h2>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {post.contentSections.map((sec, idx) => (
                  <li key={idx}>
                    <a
                      href={`#section-${idx}`}
                      className="hover:text-white transition-colors block py-0.5"
                    >
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Sections */}
            {post.contentSections.map((section, sIdx) => (
              <section key={sIdx} id={`section-${sIdx}`} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {section.heading}
                </h2>

                {section.subheading && (
                  <h3 className="text-base sm:text-lg font-semibold text-[#FF5722]">
                    {section.subheading}
                  </h3>
                )}

                <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Bullet Points */}
                {section.bulletPoints && (
                  <ul className="space-y-2.5 my-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-2.5 text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5722] flex-shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Callout Box */}
                {section.calloutNote && (
                  <div
                    className={`p-4 rounded-xl border my-5 text-sm leading-relaxed ${
                      section.calloutNote.type === 'warning'
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                        : section.calloutNote.type === 'tip'
                        ? 'bg-[#FF5722]/10 border-[#FF5722]/30 text-orange-200'
                        : 'bg-zinc-900/60 border-[#FF5722]/20 text-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 font-semibold text-xs font-mono uppercase tracking-wider mb-1 text-[#FF5722]">
                      {section.calloutNote.type === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      )}
                      {section.calloutNote.type === 'tip' && <Lightbulb className="w-4 h-4 text-[#FF5722]" />}
                      {section.calloutNote.type === 'insight' && <Info className="w-4 h-4 text-orange-400" />}
                      <span>Architectural {section.calloutNote.type}</span>
                    </div>
                    {section.calloutNote.text}
                  </div>
                )}

                {/* Comparison Table */}
                {section.comparisonTable && (
                  <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-white/[0.04] text-white font-mono uppercase text-[11px] border-b border-white/10">
                        <tr>
                          {section.comparisonTable.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3.5">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {section.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-3.5 font-medium text-white">{row.feature}</td>
                            <td className="p-3.5 text-gray-400">{row.traditionalOption}</td>
                            <td className="p-3.5 text-[#FF5722] font-semibold">
                              {row.apexOrionOption}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Interactive FAQ Accordion */}
            <section className="pt-8 border-t border-white/10">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-3">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Common Questions Answered
              </h2>

              <div className="space-y-3">
                {post.faqs.map((faq, idx) => {
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

            {/* AUTOMATED SEO MONEY-PAGE LINKER */}
            {targetService && relatedCityObjects.length > 0 && (
              <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FF5722]/10 via-black to-white/[0.02] border border-[#FF5722]/30 mt-10">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>Regional Delivery & Local Solutions</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Need {targetService.name} in Your City?
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 max-w-3xl">
                  Apex Orion Global Solutions provides senior engineering squads, sub-second performance, and
                  transparent milestone contracting across key commercial hubs in the US and UK.
                  Explore localized pricing, regional client FAQs, and custom deliverables for your market:
                </p>

                {/* Grid of Money-Page Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {relatedCityObjects.map((loc) => {
                    const isUK = loc.countryCode === 'uk';
                    const startingPrice = isUK
                      ? `£${targetService.baseGbpStartingPrice.toLocaleString()}`
                      : `$${targetService.baseUsdStartingPrice.toLocaleString()}`;

                    return (
                      <Link
                        key={loc.slug}
                        to={`/locations/${loc.countryCode}/${loc.slug}/${targetService.id}`}
                        className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-[#FF5722] hover:bg-black/90 transition-all group flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-[#FF5722] transition-colors flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
                            <span>
                              {targetService.shortTitle} in {loc.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-gray-400">
                            From {startingPrice} • {loc.stateOrRegion}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#FF5722] group-hover:translate-x-1 transition-all" />
                      </Link>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
                  <Link
                    to="/locations"
                    className="text-gray-300 hover:text-[#FF5722] font-mono transition-colors"
                  >
                    ← View All 32 Global Commercial Hubs
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#e64a19] text-white font-semibold shadow-[0_0_15px_rgba(255,87,34,0.3)] transition-all"
                  >
                    <span>Request Proposal for {targetService.shortTitle}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </section>
            )}
          </article>

          {/* Sticky Desktop Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents */}
              <GlassCard variant="default" className="p-5 bg-black/40 border-white/10 hidden lg:block">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
                  Table of Contents
                </h3>
                <nav className="space-y-1.5 text-xs text-gray-400">
                  {post.contentSections.map((sec, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className="block py-1 hover:text-[#FF5722] transition-colors truncate"
                    >
                      {sec.heading}
                    </a>
                  ))}
                </nav>
              </GlassCard>

              {/* Target Service Quick Card */}
              {targetService && (
                <GlassCard
                  variant="interactive"
                  className="p-5 bg-black/60 border-[#FF5722]/30 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722]/10 rounded-full blur-2xl pointer-events-none" />

                  <span className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider block mb-1">
                    Featured Offering
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{targetService.name}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {targetService.shortDesc}
                  </p>

                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-4 text-xs font-mono">
                    <span className="text-gray-400 block text-[10px]">Starting Rate:</span>
                    <span className="text-[#FF5722] font-bold text-sm">
                      ${targetService.baseUsdStartingPrice.toLocaleString()} USD / £
                      {targetService.baseGbpStartingPrice.toLocaleString()} GBP
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to="/contact"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FF5722] hover:bg-[#e64a19] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(255,87,34,0.3)] transition-all"
                    >
                      <span>Get Free Estimate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to="/locations"
                      className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <span>Browse Regional Hubs</span>
                    </Link>
                  </div>
                </GlassCard>
              )}

              {/* Author Bio Box */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-400">
                <span className="text-white font-medium block mb-1">Written by {post.author.name}</span>
                <p className="leading-relaxed">
                  {post.author.role} at Apex Orion Global Solutions. Specializing in high-performance web systems,
                  offline-first POS software, and scalable cloud engineering.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
