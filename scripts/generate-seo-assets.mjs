/**
 * Automated XML Sitemap & robots.txt Generator for ApexOrion Tech
 * Generates public/sitemap.xml and public/robots.txt (and copies to dist/ if present)
 * Covers core routes, all 22 city overview pages, all 132 city+service pages, and all 6 blog guides.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Direct import of TypeScript data using Node 26 type stripping
import {
  LOCATIONS,
  SERVICES,
  getAllLocationServiceParams,
  BASE_SITE_URL,
} from '../src/data/seoLocationsData.ts';

import { BLOG_POSTS } from '../src/data/seoBlogsData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public');
const DIST_DIR = path.resolve(PROJECT_ROOT, 'dist');

const TODAY = new Date().toISOString().split('T')[0];



export function generateSitemapXml() {
  const entries = [];

  // 1. Core Primary Pages
  entries.push(
    { loc: `${BASE_SITE_URL}/`, lastmod: TODAY, changefreq: 'weekly', priority: '1.0' },
    { loc: `${BASE_SITE_URL}/services`, lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
    { loc: `${BASE_SITE_URL}/locations`, lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
    { loc: `${BASE_SITE_URL}/blog`, lastmod: TODAY, changefreq: 'daily', priority: '0.9' },
    { loc: `${BASE_SITE_URL}/projects`, lastmod: TODAY, changefreq: 'weekly', priority: '0.85' },
    { loc: `${BASE_SITE_URL}/softwares`, lastmod: TODAY, changefreq: 'weekly', priority: '0.85' },
    { loc: `${BASE_SITE_URL}/team`, lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
    { loc: `${BASE_SITE_URL}/contact`, lastmod: TODAY, changefreq: 'monthly', priority: '0.8' }
  );

  // 2. Specific Software Detail Pages
  const softwareIds = ['apexrestu', 'apexpure', 'veloce', 'custom'];
  softwareIds.forEach((id) => {
    entries.push({
      loc: `${BASE_SITE_URL}/software/${id}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.8',
    });
  });

  // 3. Specific Project Case Studies
  const projectIds = [
    'veloce-car-rental',
    'tech-team-designs',
    '3d-tile-visualizer',
    'eduka',
    'zarcostar-building',
    'pollus',
    'chicken-mashwi',
    'oye-biryani',
    'marhaba-home',
  ];
  projectIds.forEach((id) => {
    entries.push({
      loc: `${BASE_SITE_URL}/project/${id}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.75',
    });
  });

  // 4. City Overview Hub Pages (32 Cities Worldwide)
  LOCATIONS.forEach((loc) => {
    entries.push({
      loc: `${BASE_SITE_URL}/locations/${loc.countryCode}/${loc.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.85',
      hreflangs: [
        { hreflang: loc.hreflang, href: `${BASE_SITE_URL}/locations/${loc.countryCode}/${loc.slug}` },
        { hreflang: 'x-default', href: `${BASE_SITE_URL}/locations` },
      ],
    });
  });

  // 5. City + Service Money Pages (192 Combinations)
  const allParams = getAllLocationServiceParams();
  allParams.forEach(({ serviceId, countryCode, citySlug }) => {
    const loc = LOCATIONS.find((l) => l.slug === citySlug && l.countryCode === countryCode);
    if (loc) {
      const pageUrl = `${BASE_SITE_URL}/locations/${countryCode}/${citySlug}/${serviceId}`;
      entries.push({
        loc: pageUrl,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.85',
        hreflangs: [
          { hreflang: loc.hreflang, href: pageUrl },
          { hreflang: 'x-default', href: `${BASE_SITE_URL}/services` },
        ],
      });
    }
  });

  // 6. Blog Articles (11 In-Depth Technical Guides)
  BLOG_POSTS.forEach((blog) => {
    entries.push({
      loc: `${BASE_SITE_URL}/blog/${blog.slug}`,
      lastmod: blog.publishDate || TODAY,
      changefreq: 'monthly',
      priority: '0.8',
    });
  });

  // Generate XML Document
  const urlNodes = entries.map((entry) => {
    const hreflangTags = entry.hreflangs
      ? entry.hreflangs
          .map(
            (hl) =>
              `    <xhtml:link rel="alternate" hreflang="${hl.hreflang}" href="${hl.href}" />`
          )
          .join('\n')
      : '';

    return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${hreflangTags ? `\n${hreflangTags}` : ''}
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlNodes.join('\n')}
</urlset>
`;
}

export function generateRobotsTxt() {
  return `# ==============================================================================
# ApexOrion Tech - Robots.txt
# https://apexoriontech.com/
# ==============================================================================

User-agent: *
Allow: /

# Priority Core & Programmatic SEO Paths
Allow: /services/
Allow: /locations/
Allow: /blog/
Allow: /projects/
Allow: /softwares/
Allow: /contact

# LLM Search Engine & AI Agents
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Sitemap Index Declaration
Sitemap: ${BASE_SITE_URL}/sitemap.xml
Host: ${BASE_SITE_URL}
`;
}

// Main execution function
export function run() {
  console.log('🚀 Generating Programmatic SEO Sitemap & Robots.txt...');

  const sitemapXml = generateSitemapXml();
  const robotsTxt = generateRobotsTxt();

  // Write to public/
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const publicSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  const publicRobotsPath = path.join(PUBLIC_DIR, 'robots.txt');

  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
  fs.writeFileSync(publicRobotsPath, robotsTxt, 'utf-8');

  console.log(`✅ Saved public/sitemap.xml (${publicSitemapPath})`);
  console.log(`✅ Saved public/robots.txt (${publicRobotsPath})`);

  // Write to dist/ if dist directory already exists
  if (fs.existsSync(DIST_DIR)) {
    const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    const distRobotsPath = path.join(DIST_DIR, 'robots.txt');

    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');
    fs.writeFileSync(distRobotsPath, robotsTxt, 'utf-8');

    console.log(`✅ Synced to dist/sitemap.xml & dist/robots.txt`);
  }

  // Count total URLs
  const urlCountMatch = sitemapXml.match(/<loc>/g);
  const totalUrls = urlCountMatch ? urlCountMatch.length : 0;
  console.log(`🎯 Total URLs in sitemap: ${totalUrls}`);
}

run();
