export {
  type Genre,
  GENRES,
  DEFAULT_GENRE,
  isValidGenre,
  getDevGenre,
  detectGenreFromDomain,
} from './domainDetector';

export {
  type SeoConfig as SiteConfig,
  SEO_CONFIGS as SITE_CONFIGS,
  getSeoConfig as getSiteConfig,
  VALID_GENRES,
} from './seoConfig';
