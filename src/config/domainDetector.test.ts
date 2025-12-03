import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { detectGenreFromDomain, isValidGenre, getDevGenre } from './domainDetector';

describe('domainDetector', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        ...originalLocation,
        hostname: 'localhost',
        search: '',
      },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
    localStorage.clear();
  });

  describe('isValidGenre', () => {
    it('returns true for valid genres', () => {
      expect(isValidGenre('films')).toBe(true);
      expect(isValidGenre('music')).toBe(true);
      expect(isValidGenre('sports')).toBe(true);
      expect(isValidGenre('books')).toBe(true);
    });

    it('returns false for invalid genres', () => {
      expect(isValidGenre('invalid')).toBe(false);
      expect(isValidGenre('')).toBe(false);
      expect(isValidGenre(null as unknown as string)).toBe(false);
    });
  });

  describe('detectGenreFromDomain', () => {
    it('detects films from filmclues.space', () => {
      window.location.hostname = 'filmclues.space';
      expect(detectGenreFromDomain()).toBe('films');
    });

    it('detects films from www.filmclues.space', () => {
      window.location.hostname = 'www.filmclues.space';
      expect(detectGenreFromDomain()).toBe('films');
    });

    it('detects music from musiclues.space', () => {
      window.location.hostname = 'musiclues.space';
      expect(detectGenreFromDomain()).toBe('music');
    });

    it('detects music from www.musiclues.space', () => {
      window.location.hostname = 'www.musiclues.space';
      expect(detectGenreFromDomain()).toBe('music');
    });

    it('detects sports from sportsclues.space', () => {
      window.location.hostname = 'sportsclues.space';
      expect(detectGenreFromDomain()).toBe('sports');
    });

    it('detects books from litclues.space', () => {
      window.location.hostname = 'litclues.space';
      expect(detectGenreFromDomain()).toBe('books');
    });

    it('falls back to dev genre for localhost', () => {
      window.location.hostname = 'localhost';
      expect(detectGenreFromDomain()).toBe('films'); // default
    });

    it('falls back to dev genre for unknown domains', () => {
      window.location.hostname = 'example.com';
      expect(detectGenreFromDomain()).toBe('films'); // default
    });
  });

  describe('getDevGenre', () => {
    it('returns genre from URL param', () => {
      window.location.search = '?genre=music';
      expect(getDevGenre()).toBe('music');
    });

    it('returns genre from localStorage when no URL param', () => {
      localStorage.setItem('xclues-dev-genre', 'sports');
      expect(getDevGenre()).toBe('sports');
    });

    it('prioritizes URL param over localStorage', () => {
      window.location.search = '?genre=music';
      localStorage.setItem('xclues-dev-genre', 'sports');
      expect(getDevGenre()).toBe('music');
    });

    it('returns default films when no override', () => {
      expect(getDevGenre()).toBe('films');
    });

    it('ignores invalid genre in URL param', () => {
      window.location.search = '?genre=invalid';
      expect(getDevGenre()).toBe('films');
    });

    it('ignores invalid genre in localStorage', () => {
      localStorage.setItem('xclues-dev-genre', 'invalid');
      expect(getDevGenre()).toBe('films');
    });
  });
});
