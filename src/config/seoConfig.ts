/**
 * SEO Configuration for each genre
 *
 * This is the single source of truth for all SEO-related values.
 * Used by Next.js metadata API and at runtime for dynamic updates.
 */

export type Genre = 'films' | 'music' | 'books';

export interface SeoConfig {
  genre: Genre;
  siteName: string;
  siteDescription: string;
  itemName: string;
  itemNamePlural: string;
  domain: string;
  metaTitle: string;
  metaDescription: string;
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
    metaTitle: 'Filmclues - Daily Movie Connections Puzzle',
    metaDescription: 'Play Filmclues, a free daily movie puzzle! Group 16 films into 4 hidden categories. Like Wordle meets movie trivia \u2014 new puzzles every day.',
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
    metaTitle: 'Musiclues - Daily Music Connections Puzzle',
    metaDescription: 'Play Musiclues, a free daily music puzzle! Group 16 songs into 4 hidden categories. Like Wordle meets music trivia \u2014 new puzzles every day.',
    analyticsPrefix: 'musiclues',
    storagePrefix: 'musiclues',
  },
  books: {
    genre: 'books',
    siteName: 'Litclues',
    siteDescription: 'Daily literature connections puzzle',
    itemName: 'book',
    itemNamePlural: 'books',
    domain: 'litclues.space',
    metaTitle: 'Litclues - Daily Book Connections Puzzle',
    metaDescription: 'Play Litclues, a free daily book puzzle! Group 16 books into 4 hidden categories. Like Wordle meets literary trivia \u2014 new puzzles every day.',
    analyticsPrefix: 'litclues',
    storagePrefix: 'litclues',
  },
};

export const VALID_GENRES: Genre[] = ['films', 'music', 'books'];
export const DEFAULT_GENRE: Genre = 'films';

export function isValidGenre(value: string | undefined): value is Genre {
  return !!value && VALID_GENRES.includes(value as Genre);
}

export function getSeoConfig(genre: Genre): SeoConfig {
  return SEO_CONFIGS[genre];
}
