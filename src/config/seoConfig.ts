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
    metaTitle: 'Filmclues - Daily Film Clues Puzzle Game | Movie Connections',
    metaDescription: 'Play Filmclues, a free daily film clues puzzle game! Group 16 movies into 4 hidden categories. Like Wordle meets movie trivia - test your film knowledge with new puzzles every day.',
    metaKeywords: 'filmclues, film clues, film clues puzzle game, movie puzzle game, film connections game, daily movie puzzle, movie trivia game, wordle for movies, film guessing game, movie category game, free puzzle game, daily film game',
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
    metaTitle: 'Musiclues - Daily Music Clues Puzzle Game | Song Connections',
    metaDescription: 'Play Musiclues, a free daily music clues puzzle game! Group 16 songs into 4 hidden categories. Like Wordle meets music trivia - test your music knowledge with new puzzles every day.',
    metaKeywords: 'musiclues, music clues, music clues puzzle game, song puzzle game, music connections game, daily music puzzle, music trivia game, wordle for music, song guessing game, music category game, free puzzle game, daily music game',
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
    metaTitle: 'Sportsclues - Daily Sports Clues Puzzle Game | Athlete Connections',
    metaDescription: 'Play Sportsclues, a free daily sports clues puzzle game! Group 16 athletes into 4 hidden categories. Like Wordle meets sports trivia - test your sports knowledge with new puzzles every day.',
    metaKeywords: 'sportsclues, sports clues, sports clues puzzle game, athlete puzzle game, sports connections game, daily sports puzzle, sports trivia game, wordle for sports, athlete guessing game, sports category game, free puzzle game, daily sports game',
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
    metaTitle: 'Litclues - Daily Book Clues Puzzle Game | Literature Connections',
    metaDescription: 'Play Litclues, a free daily book clues puzzle game! Group 16 books into 4 hidden categories. Like Wordle meets book trivia - test your literary knowledge with new puzzles every day.',
    metaKeywords: 'litclues, lit clues, book clues puzzle game, literature puzzle game, book connections game, daily book puzzle, book trivia game, wordle for books, book guessing game, literature category game, free puzzle game, daily book game',
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
