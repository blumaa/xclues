import { describe, it, expect } from 'vitest';
import { SEO_CONFIGS, VALID_GENRES, isValidGenre, getSeoConfig } from '../seoConfig';

describe('seoConfig', () => {
  it('each genre has its own .space domain', () => {
    expect(SEO_CONFIGS.films.domain).toBe('filmclues.space');
    expect(SEO_CONFIGS.music.domain).toBe('musiclues.space');
    expect(SEO_CONFIGS.books.domain).toBe('litclues.space');
  });

  it('no config has metaKeywords', () => {
    for (const genre of VALID_GENRES) {
      expect(SEO_CONFIGS[genre]).not.toHaveProperty('metaKeywords');
    }
  });

  it('sports is not a valid genre (not launched yet)', () => {
    expect(VALID_GENRES).not.toContain('sports');
  });

  it('isValidGenre validates correctly', () => {
    expect(isValidGenre('films')).toBe(true);
    expect(isValidGenre('books')).toBe(true);
    expect(isValidGenre('music')).toBe(true);
    expect(isValidGenre('invalid')).toBe(false);
    expect(isValidGenre(undefined)).toBe(false);
  });

  it('getSeoConfig returns correct config for each genre', () => {
    const films = getSeoConfig('films');
    expect(films.siteName).toBe('Filmclues');
    expect(films.metaTitle).toContain('Film');
    expect(films.metaDescription).toBeTruthy();
  });
});
