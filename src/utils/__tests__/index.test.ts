import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getTodayDate,
  getTomorrowDate,
  getYesterdayDate,
  formatDate,
  getPuzzleNumber,
  formatPuzzleHeader,
  shuffleArray,
  getTextLengthProps,
} from '../index';

describe('getTodayDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns date in YYYY-MM-DD format (UTC)', () => {
    vi.setSystemTime(new Date('2025-06-15T10:30:00Z'));
    expect(getTodayDate()).toBe('2025-06-15');
  });

  it('uses UTC so late-night local time does not shift the date', () => {
    // 11 PM EST = next day in UTC
    vi.setSystemTime(new Date('2025-03-01T03:00:00Z'));
    expect(getTodayDate()).toBe('2025-03-01');
  });

  it('pads single-digit month and day', () => {
    vi.setSystemTime(new Date('2025-01-05T00:00:00Z'));
    expect(getTodayDate()).toBe('2025-01-05');
  });
});

describe('getTomorrowDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the next day in YYYY-MM-DD format', () => {
    vi.setSystemTime(new Date('2025-06-15T10:00:00Z'));
    expect(getTomorrowDate()).toBe('2025-06-16');
  });

  it('rolls over month boundary', () => {
    vi.setSystemTime(new Date('2025-01-31T12:00:00Z'));
    expect(getTomorrowDate()).toBe('2025-02-01');
  });

  it('rolls over year boundary', () => {
    vi.setSystemTime(new Date('2025-12-31T12:00:00Z'));
    expect(getTomorrowDate()).toBe('2026-01-01');
  });
});

describe('getYesterdayDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the previous day in YYYY-MM-DD format', () => {
    vi.setSystemTime(new Date('2025-06-15T10:00:00Z'));
    expect(getYesterdayDate()).toBe('2025-06-14');
  });

  it('rolls back across month boundary', () => {
    vi.setSystemTime(new Date('2025-03-01T12:00:00Z'));
    expect(getYesterdayDate()).toBe('2025-02-28');
  });
});

describe('formatDate', () => {
  it('formats YYYY-MM-DD to long English date', () => {
    expect(formatDate('2025-01-01')).toBe('January 1, 2025');
  });

  it('formats another date correctly', () => {
    expect(formatDate('2025-11-24')).toBe('November 24, 2025');
  });
});

describe('getPuzzleNumber', () => {
  it('returns 1 for Jan 1 2025', () => {
    expect(getPuzzleNumber('2025-01-01')).toBe(1);
  });

  it('returns 2 for Jan 2 2025', () => {
    expect(getPuzzleNumber('2025-01-02')).toBe(2);
  });

  it('returns 366 for Jan 1 2026 (365 days later + 1)', () => {
    expect(getPuzzleNumber('2026-01-01')).toBe(366);
  });
});

describe('formatPuzzleHeader', () => {
  it('combines site name, puzzle number, and formatted date', () => {
    expect(formatPuzzleHeader('2025-01-01', 'Xclues')).toBe(
      'Xclues #1 - January 1, 2025'
    );
  });

  it('works with a different site name and date', () => {
    expect(formatPuzzleHeader('2025-11-24', 'Filmclues')).toBe(
      'Filmclues #328 - November 24, 2025'
    );
  });
});

describe('shuffleArray', () => {
  it('returns a new array with the same elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);
    expect(shuffled).toHaveLength(original.length);
    expect(shuffled.sort()).toEqual(original.sort());
  });

  it('does not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    shuffleArray(original);
    expect(original).toEqual(copy);
  });

  it('returns empty array for empty input', () => {
    expect(shuffleArray([])).toEqual([]);
  });
});

describe('getTextLengthProps', () => {
  it('returns isLongText for text longer than 15 chars', () => {
    expect(getTextLengthProps('a'.repeat(16))).toEqual({ isLongText: true });
    expect(getTextLengthProps('The Shawshank Redemption')).toEqual({ isLongText: true });
  });

  it('returns empty object for text 15 chars or fewer', () => {
    expect(getTextLengthProps('a'.repeat(15))).toEqual({});
    expect(getTextLengthProps('Pulp Fiction')).toEqual({});
  });

  it('returns empty object for short titles', () => {
    expect(getTextLengthProps('Jaws')).toEqual({});
    expect(getTextLengthProps('Stay')).toEqual({});
  });

  it('returns empty object for empty string', () => {
    expect(getTextLengthProps('')).toEqual({});
  });
});
