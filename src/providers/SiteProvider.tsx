/**
 * Site Provider
 *
 * Provides site configuration throughout the app based on domain.
 * Detects genre from hostname and provides corresponding config.
 */

import { ReactNode, useEffect } from 'react';
import { detectGenreFromDomain, getSiteConfig, type SiteConfig } from '../config';
import { SiteContext } from './useSiteContext';

interface SiteProviderProps {
  children: ReactNode;
}

/**
 * Helper to update a meta tag's content attribute
 */
function updateMetaTag(selector: string, content: string): void {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', content);
  }
}

/**
 * Helper to update a link tag's href attribute
 */
function updateLinkTag(selector: string, href: string): void {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('href', href);
  }
}

/**
 * Update all meta tags based on site config
 */
function updateMetaTags(config: SiteConfig): void {
  const siteUrl = `https://www.${config.domain}`;

  // Primary meta tags
  document.title = config.metaTitle;
  updateMetaTag('meta[name="title"]', config.metaTitle);
  updateMetaTag('meta[name="description"]', config.metaDescription);
  updateMetaTag('meta[name="author"]', config.siteName);
  updateLinkTag('link[rel="canonical"]', siteUrl);

  // Open Graph / Facebook
  updateMetaTag('meta[property="og:url"]', siteUrl);
  updateMetaTag('meta[property="og:title"]', config.metaTitle);
  updateMetaTag('meta[property="og:description"]', config.metaDescription);
  updateMetaTag('meta[property="og:site_name"]', config.siteName);

  // Twitter
  updateMetaTag('meta[name="twitter:url"]', siteUrl);
  updateMetaTag('meta[name="twitter:title"]', config.metaTitle);
  updateMetaTag('meta[name="twitter:description"]', config.metaDescription);

  // Update JSON-LD structured data
  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
  if (jsonLdScript) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": config.siteName,
      "description": config.metaDescription,
      "url": siteUrl,
      "applicationCategory": "Game",
      "genre": "Puzzle",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
    jsonLdScript.textContent = JSON.stringify(structuredData);
  }
}

/**
 * Provides site context to children.
 * Detects genre from domain and provides config.
 */
export function SiteProvider({ children }: SiteProviderProps) {
  const genre = detectGenreFromDomain();
  const config = getSiteConfig(genre);

  // Update all meta tags when config changes
  useEffect(() => {
    updateMetaTags(config);
  }, [config]);

  return <SiteContext.Provider value={config}>{children}</SiteContext.Provider>;
}
