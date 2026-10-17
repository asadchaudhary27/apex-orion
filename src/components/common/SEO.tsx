import React, { useEffect } from 'react';

export interface HreflangLink {
  hreflang: string;
  href: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  /** Primary canonical URL or path */
  canonical?: string;
  /** Explicit canonical URL alias */
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  ogLocale?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string | string[];
  author?: string;
  noindex?: boolean;
  hreflangLinks?: HreflangLink[];
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'ApexOrion Tech | Custom Software, Web & POS Development Agency';
const DEFAULT_DESCRIPTION =
  'ApexOrion Tech is a premier software engineering agency delivering high-performance web applications, mobile apps, SaaS products, and custom POS systems with sub-second performance.';
const DEFAULT_IMAGE = 'https://apexoriontech.com/og-image.png';
const BASE_URL = 'https://apexoriontech.com';
const SCHEMA_SCRIPT_ID = 'route-specific-schema-jsonld';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  ogLocale = 'en_US',
  twitterCard = 'summary_large_image',
  keywords,
  author = 'ApexOrion Tech',
  noindex = false,
  hreflangLinks,
  schema,
}) => {
  const fullTitle = title ? `${title} | ApexOrion Tech` : DEFAULT_TITLE;

  // Resolve canonical URL safely
  const effectiveCanonical = canonicalUrl || canonical;
  const resolvedCanonicalUrl = effectiveCanonical
    ? effectiveCanonical.startsWith('http')
      ? effectiveCanonical
      : `${BASE_URL}${effectiveCanonical.startsWith('/') ? effectiveCanonical : `/${effectiveCanonical}`}`
    : BASE_URL;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to safely set or update a meta tag in <head>
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Search Engine Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'title', fullTitle);
    setMetaTag('name', 'author', author);
    setMetaTag(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    if (keywords) {
      const keywordString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      setMetaTag('name', 'keywords', keywordString);
    }

    // 3. Open Graph (Facebook / LinkedIn / WhatsApp) Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', resolvedCanonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:locale', ogLocale);
    setMetaTag('property', 'og:site_name', 'ApexOrion Tech');

    // 4. Twitter Card Tags
    setMetaTag('property', 'twitter:card', twitterCard);
    setMetaTag('property', 'twitter:title', fullTitle);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:url', resolvedCanonicalUrl);
    setMetaTag('property', 'twitter:image', ogImage);
    setMetaTag('property', 'twitter:site', '@apexoriontech');

    // 5. Canonical Link Tag
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', resolvedCanonicalUrl);

    // 6. Dynamic International Hreflang Tags
    // Clean up any previously attached dynamic hreflangs first to prevent stale tags
    const existingDynamicHreflangs = document.querySelectorAll('link[data-seo-hreflang="dynamic"]');
    existingDynamicHreflangs.forEach((el) => el.remove());

    if (hreflangLinks && hreflangLinks.length > 0) {
      hreflangLinks.forEach((link) => {
        const hreflangEl = document.createElement('link');
        hreflangEl.setAttribute('rel', 'alternate');
        hreflangEl.setAttribute('hreflang', link.hreflang);
        hreflangEl.setAttribute('href', link.href);
        hreflangEl.setAttribute('data-seo-hreflang', 'dynamic');
        document.head.appendChild(hreflangEl);
      });
    }

    // 7. Dynamic JSON-LD Structured Data Injection
    let scriptElement = document.getElementById(SCHEMA_SCRIPT_ID) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = SCHEMA_SCRIPT_ID;
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }

      const formattedSchema = Array.isArray(schema)
        ? { '@context': 'https://schema.org', '@graph': schema }
        : { '@context': 'https://schema.org', ...schema };

      scriptElement.textContent = JSON.stringify(formattedSchema, null, 2);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    // Cleanup when route changes or component unmounts
    return () => {
      const activeScript = document.getElementById(SCHEMA_SCRIPT_ID);
      if (activeScript) {
        activeScript.remove();
      }
      const activeDynamicHreflangs = document.querySelectorAll('link[data-seo-hreflang="dynamic"]');
      activeDynamicHreflangs.forEach((el) => el.remove());
    };
  }, [
    fullTitle,
    description,
    resolvedCanonicalUrl,
    ogType,
    ogImage,
    ogLocale,
    twitterCard,
    keywords,
    author,
    noindex,
    hreflangLinks,
    schema,
  ]);

  return null;
};

export default SEO;
