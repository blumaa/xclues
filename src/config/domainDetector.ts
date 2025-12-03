import {
  type Genre,
  VALID_GENRES,
  DEFAULT_GENRE,
  isValidGenre as isValidGenreBase,
} from './seoConfig';

// Re-export for backward compatibility
export type { Genre };
export { VALID_GENRES as GENRES, DEFAULT_GENRE };

/**
 * Domain to genre mapping
 */
const DOMAIN_TO_GENRE: Record<string, Genre> = {
  'filmecules.space': 'films',
  'www.filmecules.space': 'films',
  'musicules.space': 'music',
  'www.musicules.space': 'music',
  'filmclues.space': 'films',
  'www.filmclues.space': 'films',
  'musiclues.space': 'music',
  'www.musiclues.space': 'music',
  'sportsclues.space': 'sports',
  'www.sportsclues.space': 'sports',
  'litclues.space': 'books',
  'www.litclues.space': 'books',
};

/**
 * Check if a string is a valid genre
 * Handles null/undefined for browser context
 */
export function isValidGenre(value: string | null | undefined): value is Genre {
  if (!value) return false;
  return isValidGenreBase(value);
}

/**
 * Get genre override for development/testing
 * Checks URL parameter first, then localStorage
 */
export function getDevGenre(): Genre {
  // Check URL param first: ?genre=music
  const urlParams = new URLSearchParams(window.location.search);
  const genreParam = urlParams.get('genre');
  if (genreParam && isValidGenre(genreParam)) {
    return genreParam;
  }

  // Check localStorage override
  const stored = localStorage.getItem('xclues-dev-genre');
  if (stored && isValidGenre(stored)) {
    return stored;
  }

  // Default
  return DEFAULT_GENRE;
}

/**
 * Detect genre from the current domain hostname
 * Falls back to dev genre for localhost/unknown domains
 */
export function detectGenreFromDomain(): Genre {
  const hostname = window.location.hostname;

  // Check direct domain match
  if (DOMAIN_TO_GENRE[hostname]) {
    return DOMAIN_TO_GENRE[hostname];
  }

  // For localhost or unknown domains, use dev genre
  return getDevGenre();
}
