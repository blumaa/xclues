import { describe, it, expect } from 'vitest';
import { getGenreFromHost } from '../domainDetector';

describe('getGenreFromHost', () => {
  it('returns films for filmclues.com', () => {
    expect(getGenreFromHost('filmclues.com')).toBe('films');
  });

  it('returns films for filmclues.space', () => {
    expect(getGenreFromHost('filmclues.space')).toBe('films');
  });

  it('returns music for musiclues.space', () => {
    expect(getGenreFromHost('musiclues.space')).toBe('music');
  });

  it('returns books for litclues.space', () => {
    expect(getGenreFromHost('litclues.space')).toBe('books');
  });

  it('returns films for unknown domains', () => {
    expect(getGenreFromHost('localhost:3000')).toBe('films');
  });

  it('returns films for undefined', () => {
    expect(getGenreFromHost(undefined)).toBe('films');
  });
});
