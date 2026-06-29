import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateShareText, shareResults } from '../shareResults';
import type { GuessColor } from '../../types/stats';

describe('generateShareText', () => {
  it('produces the correct format with emoji grid, site name, date, and URL', () => {
    const guessHistory: GuessColor[][] = [
      ['yellow', 'green', 'blue', 'purple'],
      ['yellow', 'yellow', 'yellow', 'yellow'],
      ['green', 'green', 'green', 'green'],
      ['blue', 'blue', 'blue', 'blue'],
      ['purple', 'purple', 'purple', 'purple'],
    ];

    const result = generateShareText({
      siteName: 'Filmclues',
      puzzleDate: '2025-12-04',
      guessHistory,
      domain: 'filmclues.space',
    });

    const lines = result.split('\n');
    expect(lines[0]).toBe('Filmclues - December 4, 2025');
    expect(lines[1]).toBe('🟨🟩🟦🟪');
    expect(lines[2]).toBe('🟨🟨🟨🟨');
    expect(lines[3]).toBe('🟩🟩🟩🟩');
    expect(lines[4]).toBe('🟦🟦🟦🟦');
    expect(lines[5]).toBe('🟪🟪🟪🟪');
    expect(lines[6]).toBe('Play: https://filmclues.space');
  });

  it('works with a single guess row', () => {
    const guessHistory: GuessColor[][] = [
      ['green', 'green', 'green', 'green'],
    ];

    const result = generateShareText({
      siteName: 'Xclues',
      puzzleDate: '2025-01-01',
      guessHistory,
      domain: 'xclues.app',
    });

    expect(result).toContain('Xclues - January 1, 2025');
    expect(result).toContain('🟩🟩🟩🟩');
    expect(result).toContain('Play: https://xclues.app');
  });

  it('omits the cross-promo line when no genre is provided', () => {
    const result = generateShareText({
      siteName: 'Filmclues',
      puzzleDate: '2025-12-04',
      guessHistory: [['green', 'green', 'green', 'green']],
      domain: 'filmclues.space',
    });

    expect(result).not.toContain('More puzzles');
  });

  it('appends a cross-promo line with the sibling games and domains', () => {
    const result = generateShareText({
      siteName: 'Filmclues',
      puzzleDate: '2025-12-04',
      guessHistory: [['green', 'green', 'green', 'green']],
      domain: 'filmclues.space',
      genre: 'films',
    });

    const lines = result.split('\n');
    const promo = lines[lines.length - 1];
    // Siblings of films are books (Litclues) and music (Musiclues)
    expect(promo).toContain('Litclues');
    expect(promo).toContain('Musiclues');
    expect(promo).toContain('litclues.space');
    expect(promo).toContain('musiclues.space');
    // Must not promote its own game
    expect(promo).not.toContain('Filmclues');
    expect(promo).not.toContain('filmclues.space');
  });
});

describe('shareResults', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('passes both text and url to the Web Share API', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { share });

    const ok = await shareResults('grid text', 'https://filmclues.space');

    expect(ok).toBe(true);
    expect(share).toHaveBeenCalledWith({
      text: 'grid text',
      url: 'https://filmclues.space',
    });
  });

  it('falls back to clipboard when Web Share API is unavailable', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    const ok = await shareResults('grid text', 'https://filmclues.space');

    expect(ok).toBe(true);
    expect(writeText).toHaveBeenCalledWith('grid text');
  });
});
