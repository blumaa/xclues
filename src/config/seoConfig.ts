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

export const SEO_CONFIGS: Record<Genre, SeoConfig> = {
  films: {
    genre: 'films',
    siteName: 'Filmclues',
    siteDescription: 'Daily film connections puzzle',
    itemName: 'film',
    itemNamePlural: 'films',
    domain: 'filmclues.space',
    metaTitle: 'Filmclues - Film Connections Game',
    metaDescription: 'Challenge yourself with Filmclues, the daily film connections puzzle game. Group 16 films into 4 categories based on their hidden connections. Test your movie knowledge!',
    metaKeywords: 'film game, movie puzzle, connections game, film trivia, movie connections, daily puzzle, film quiz',
    analyticsPrefix: 'filmclues',
    storagePrefix: 'filmclues',
  },
  music: {
    genre: 'music',
    siteName: 'Musiclues',
    siteDescription: 'Daily music connections puzzle',
    itemName: 'song',
    itemNamePlural: 'songs',
    domain: 'musiclues.space',
    metaTitle: 'Musiclues - Music Connections Game',
    metaDescription: 'Challenge yourself with Musiclues, the daily music connections puzzle game. Group 16 songs into 4 categories based on their hidden connections. Test your music knowledge!',
    metaKeywords: 'music game, song puzzle, connections game, music trivia, song connections, daily puzzle, music quiz',
    analyticsPrefix: 'musiclues',
    storagePrefix: 'musiclues',
  },
  sports: {
    genre: 'sports',
    siteName: 'Sportsclues',
    siteDescription: 'Daily sports connections puzzle',
    itemName: 'athlete',
    itemNamePlural: 'athletes',
    domain: 'sportsclues.space',
    metaTitle: 'Sportsclues - Sports Connections Game',
    metaDescription: 'Challenge yourself with Sportsclues, the daily sports connections puzzle game. Group 16 athletes into 4 categories based on their hidden connections. Test your sports knowledge!',
    metaKeywords: 'sports game, athlete puzzle, connections game, sports trivia, athlete connections, daily puzzle, sports quiz',
    analyticsPrefix: 'sportsclues',
    storagePrefix: 'sportsclues',
  },
  books: {
    genre: 'books',
    siteName: 'Litclues',
    siteDescription: 'Daily literature connections puzzle',
    itemName: 'book',
    itemNamePlural: 'books',
    domain: 'litclues.space',
    metaTitle: 'Litclues - Literature Connections Game',
    metaDescription: 'Challenge yourself with Litclues, the daily literature connections puzzle game. Group 16 books into 4 categories based on their hidden connections. Test your literary knowledge!',
    metaKeywords: 'book game, literature puzzle, connections game, book trivia, literature connections, daily puzzle, book quiz',
    analyticsPrefix: 'litclues',
    storagePrefix: 'litclues',
  },
};

export const VALID_GENRES: Genre[] = ['films', 'music', 'sports', 'books'];
export const DEFAULT_GENRE: Genre = 'films';

export function isValidGenre(value: string | undefined): value is Genre {
  return !!value && VALID_GENRES.includes(value as Genre);
}

export function getSeoConfig(genre: Genre): SeoConfig {
  return SEO_CONFIGS[genre];
}
