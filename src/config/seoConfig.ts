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
    domain: 'filmclues.com',
    metaTitle: 'Filmclues - Daily Film Clues Puzzle Game | Movie Connections',
    metaDescription: 'Play Filmclues, a free daily film clues puzzle game! Group 16 movies into 4 hidden categories. Like Wordle meets movie trivia - test your film knowledge with new puzzles every day.',
    analyticsPrefix: 'filmclues',
    storagePrefix: 'filmclues',
  },
  music: {
    genre: 'music',
    siteName: 'Musiclues',
    siteDescription: 'Daily music connections puzzle',
    itemName: 'song',
    itemNamePlural: 'songs',
    domain: 'filmclues.com',
    metaTitle: 'Musiclues - Daily Music Clues Puzzle Game | Song Connections',
    metaDescription: 'Play Musiclues, a free daily music clues puzzle game! Group 16 songs into 4 hidden categories. Like Wordle meets music trivia - test your music knowledge with new puzzles every day.',
    analyticsPrefix: 'musiclues',
    storagePrefix: 'musiclues',
  },
  books: {
    genre: 'books',
    siteName: 'Litclues',
    siteDescription: 'Daily literature connections puzzle',
    itemName: 'book',
    itemNamePlural: 'books',
    domain: 'filmclues.com',
    metaTitle: 'Litclues - Daily Book Clues Puzzle Game | Literature Connections',
    metaDescription: 'Play Litclues, a free daily book clues puzzle game! Group 16 books into 4 hidden categories. Like Wordle meets book trivia - test your literary knowledge with new puzzles every day.',
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
