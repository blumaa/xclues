import { describe, it, expect } from 'vitest';
import { guessToColors, guessesToColorHistory } from '../guessHistory';
import type { Group } from '../../types';
import type { GuessColor } from '../../types/stats';

function makeGroups(): Group[] {
  return [
    {
      id: 'g1',
      connection: 'Easy',
      difficulty: 'easy',
      color: 'yellow',
      items: [
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
        { id: 3, title: 'C' },
        { id: 4, title: 'D' },
      ],
    },
    {
      id: 'g2',
      connection: 'Medium',
      difficulty: 'medium',
      color: 'green',
      items: [
        { id: 5, title: 'E' },
        { id: 6, title: 'F' },
        { id: 7, title: 'G' },
        { id: 8, title: 'H' },
      ],
    },
    {
      id: 'g3',
      connection: 'Hard',
      difficulty: 'hard',
      color: 'blue',
      items: [
        { id: 9, title: 'I' },
        { id: 10, title: 'J' },
        { id: 11, title: 'K' },
        { id: 12, title: 'L' },
      ],
    },
    {
      id: 'g4',
      connection: 'Hardest',
      difficulty: 'hardest',
      color: 'purple',
      items: [
        { id: 13, title: 'M' },
        { id: 14, title: 'N' },
        { id: 15, title: 'O' },
        { id: 16, title: 'P' },
      ],
    },
  ];
}

describe('guessToColors', () => {
  it('maps item IDs to their group colors', () => {
    const groups = makeGroups();
    const result = guessToColors([1, 5, 9, 13], groups);
    expect(result).toEqual(['yellow', 'green', 'blue', 'purple'] as GuessColor[]);
  });

  it('returns all same color when items are from one group', () => {
    const groups = makeGroups();
    const result = guessToColors([1, 2, 3, 4], groups);
    expect(result).toEqual(['yellow', 'yellow', 'yellow', 'yellow']);
  });

  it('defaults to yellow when item is not found in any group', () => {
    const groups = makeGroups();
    const result = guessToColors([999], groups);
    expect(result).toEqual(['yellow']);
  });
});

describe('guessesToColorHistory', () => {
  it('maps multiple guesses to a 2D color array', () => {
    const groups = makeGroups();
    const guesses = [
      [1, 5, 9, 13],
      [1, 2, 3, 4],
    ];
    const result = guessesToColorHistory(guesses, groups);
    expect(result).toEqual([
      ['yellow', 'green', 'blue', 'purple'],
      ['yellow', 'yellow', 'yellow', 'yellow'],
    ]);
  });

  it('returns empty array for no guesses', () => {
    const groups = makeGroups();
    expect(guessesToColorHistory([], groups)).toEqual([]);
  });
});
