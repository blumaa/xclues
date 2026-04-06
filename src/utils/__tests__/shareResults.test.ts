import { describe, it, expect } from 'vitest';
import { generateShareText } from '../shareResults';
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
});
