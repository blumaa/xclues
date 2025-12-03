/**
 * Site Configuration
 *
 * Re-exports from seoConfig.ts which is the single source of truth.
 * This maintains backward compatibility for existing imports.
 */

export {
  type Genre,
  type SeoConfig as SiteConfig,
  SEO_CONFIGS as SITE_CONFIGS,
  getSeoConfig as getSiteConfig,
  VALID_GENRES,
  DEFAULT_GENRE,
  isValidGenre,
} from './seoConfig';
