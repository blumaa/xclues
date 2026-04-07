/**
 * Site Provider
 *
 * Provides site configuration throughout the app based on domain.
 * Detects genre from hostname and provides corresponding config.
 * Genre can be changed reactively via setGenre (for dev/Capacitor).
 */

import { ReactNode, useEffect, useMemo } from 'react';
import { getSiteConfig, type Genre } from '../config';
import { SiteContext, type SiteContextValue } from './useSiteContext';

interface SiteProviderProps {
  children: ReactNode;
  initialGenre?: Genre;
}

/**
 * Helper to update a meta tag's content attribute
 */
function updateMetaTag(selector: string, content: string): void {
  if (typeof window === 'undefined') return;
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', content);
  }
}

/**
 * Helper to update a link tag's href attribute
 */
function updateLinkTag(selector: string, href: string): void {
  if (typeof window === 'undefined') return;
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('href', href);
  }
}

/**
 * Update all meta tags based on site config
 */
function updateMetaTags(config: SiteContextValue): void {
  if (typeof window === 'undefined') return;
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
 * Supports reactive genre switching via setGenre.
 */
export function SiteProvider({ children, initialGenre }: SiteProviderProps) {
  const config = useMemo(() => getSiteConfig(initialGenre || 'films'), [initialGenre]);

  const contextValue: SiteContextValue = config;

  useEffect(() => {
    updateMetaTags(contextValue);
  }, [contextValue]);

  return <SiteContext.Provider value={contextValue}>{children}</SiteContext.Provider>;
}
