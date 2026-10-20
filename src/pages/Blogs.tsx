import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  User,
  ChevronRight,
  Sparkles,
  MapPin,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import GlassCard from '../components/common/GlassCard';
import { BLOG_POSTS, BlogPost } from '../data/seoBlogsData';
import { BASE_SITE_URL } from '../data/seoLocationsData';

const CATEGORIES = [
  'All',
  'Web & SaaS',
  'POS Systems',
  'Mobile Apps',
  'UI/UX Design',
  'E-Commerce',
  'Technical SEO',
] as const;

const BLOGS_SCHEMA = [
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
        name: 'Blog & Engineering Insights',
        item: `${BASE_SITE_URL}/blog`,
      },
    ],
  },
  {
    '@type': 'CollectionPage',
    name: 'Apex Orion Global Solutions Engineering Insights & Software Guides',
    description:
      'In-depth software engineering guides, SaaS MVP cost breakdowns, POS architecture comparisons, and technical SEO strategies for US, UK, Middle East, Canadian, Australian, and European founders.',
    url: `${BASE_SITE_URL}/blog`,
    hasPart: BLOG_POSTS.map((post) => ({
      '@type': 'Article',
      headline: post.title,
      url: `${BASE_SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishDate,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  },
];

export const Blogs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-black text-[#F5F5F5] pt-24 pb-20 selection:bg-[#FF5722] selection:text-white">
      <SEO
        title="Engineering Insights, SaaS Cost Guides & Architecture"
        description="Explore technical articles, cost guides, and architectural benchmarks for custom web applications, offline-first POS systems, mobile apps, and programmatic SEO across the US, UK, Middle East, Canada, Australia, and Europe."
        canonicalUrl="/blog"
        keywords={[
          'SaaS development cost guide',
          'custom POS architecture Dubai',
          'Saudi ZATCA Phase 2 development',
          'Flutter vs React Native Canada',
          'software outsourcing Australia',
          'GDPR enterprise web platforms Germany',
          'Apex Orion Global Solutions insights',
        ]}
        schema={BLOGS_SCHEMA}
      />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-[140px] pointer-events-none" />
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
          <span className="text-[#FF5722] font-medium">Insights & Blog</span>
        </nav>

        {/* Hero Header */}
        <header className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>Technical Insights & Commercial Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Engineering{' '}
            <span className="bg-gradient-to-r from-[#FF5722] via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Insights & Guides
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8 font-light">
            Actionable technical playbooks, software cost guides, and architectural benchmarks
            engineered to help founders and corporate leaders in the US, UK, Middle East, Canada, Australia, and Europe scale without technical debt.
          </p>

          {/* Search Bar & Category Filters */}
          <div className="space-y-4">
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by keyword, tech, or topic..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5722]/50 transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                      : 'bg-white/[0.03] text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Article Card (When no filter or search applied) */}
        {selectedCategory === 'All' && !searchTerm && featuredPost && (
          <div className="mb-14">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Featured Engineering Guide</span>
            </div>

            <GlassCard
              variant="interactive"
              className="p-6 sm:p-8 bg-gradient-to-r from-white/[0.03] via-black to-black border-white/10 group hover:border-[#FF5722]/50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="flex items-center space-x-3 text-xs text-gray-400 mb-3 font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-[#FF5722]/10 text-[#FF5722] font-semibold">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{featuredPost.publishDate}</span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#FF5722] transition-colors mb-3 leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] font-mono text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-400">
                    By <strong className="text-white">{featuredPost.author.name}</strong>,{' '}
                    {featuredPost.author.role}
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#FF5722] text-white text-xs font-semibold shadow-[0_0_20px_rgba(255,87,34,0.3)] transition-all flex-shrink-0 group-hover:bg-[#e64a19]"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {selectedCategory === 'All' ? 'All Engineering Articles' : `${selectedCategory} Articles`}
              <span className="text-xs font-mono text-gray-400 ml-2">({filteredPosts.length})</span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No articles match your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <GlassCard
                  key={post.slug}
                  variant="interactive"
                  className="p-6 bg-black/40 border-white/10 flex flex-col justify-between group hover:border-[#FF5722]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3 font-mono">
                      <span className="px-2.5 py-0.5 rounded bg-white/[0.04] text-[#FF5722] font-semibold">
                        {post.category}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#FF5722] transition-colors mb-2.5 leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-gray-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">{post.publishDate}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-medium text-[#FF5722] hover:text-[#ff784e] flex items-center space-x-1 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Global Locations Silo Banner */}
        <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#FF5722]" />
              <span>Looking for Local Software Engineering in the US or UK?</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
              We operate dedicated engineering hubs across 22 major cities—including London, Manchester,
              New York, Austin, Chicago, and San Francisco. Explore localized pricing and regional case studies.
            </p>
          </div>
          <Link
            to="/locations"
            className="px-5 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#e64a19] text-white text-xs font-semibold shadow-[0_0_20px_rgba(255,87,34,0.3)] transition-all flex-shrink-0"
          >
            Explore 22 City Hubs
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
