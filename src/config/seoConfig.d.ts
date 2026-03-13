/**
 * SEO Configuration for each genre
 *
 * This is the single source of truth for all SEO-related values.
 * Used at build time to generate index.html, sitemap.xml, robots.txt
 * and at runtime for dynamic updates.
 */
export type Genre = 'films' | 'music' | 'sports' | 'books';
export interface SeoConfig {
    genre: Genre;
    siteName: string;
    siteDescription: string;
    itemName: string;
    itemNamePlural: string;
    domain: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    analyticsPrefix: string;
    storagePrefix: string;
}
export declare const SEO_CONFIGS: Record<Genre, SeoConfig>;
export declare const VALID_GENRES: Genre[];
export declare const DEFAULT_GENRE: Genre;
export declare function isValidGenre(value: string | undefined): value is Genre;
export declare function getSeoConfig(genre: Genre): SeoConfig;
