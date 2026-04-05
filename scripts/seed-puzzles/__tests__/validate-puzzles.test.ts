import { describe, it, expect } from 'vitest';
import type { PuzzleDef } from '../types';
import { findDuplicateSongsInPuzzle, validateNoDuplicateSongs } from '../validate-puzzles';

const makePuzzle = (titles: string[][]): PuzzleDef => ({
  groups: titles.map((groupTitles, i) => ({
    connection: `Group ${i}`,
    connection_type: 'theme',
    color: (['yellow', 'green', 'blue', 'purple'] as const)[i],
    difficulty: (['easy', 'medium', 'hard', 'hardest'] as const)[i],
    difficulty_score: (i + 1) * 2,
    items: groupTitles.map(title => ({ title, artist: 'Artist', year: 2000 })) as [any, any, any, any],
  })) as [any, any, any, any],
});

describe('findDuplicateSongsInPuzzle', () => {
  it('returns empty array when no duplicates', () => {
    const puzzle = makePuzzle([
      ['A', 'B', 'C', 'D'],
      ['E', 'F', 'G', 'H'],
      ['I', 'J', 'K', 'L'],
      ['M', 'N', 'O', 'P'],
    ]);
    expect(findDuplicateSongsInPuzzle(puzzle)).toEqual([]);
  });

  it('detects duplicate title across different groups', () => {
    const puzzle = makePuzzle([
      ['Believe', 'B', 'C', 'D'],
      ['E', 'F', 'Believe', 'H'],
      ['I', 'J', 'K', 'L'],
      ['M', 'N', 'O', 'P'],
    ]);
    expect(findDuplicateSongsInPuzzle(puzzle)).toEqual(['Believe']);
  });

  it('detects duplicate title within the same group', () => {
    const puzzle = makePuzzle([
      ['Believe', 'Believe', 'C', 'D'],
      ['E', 'F', 'G', 'H'],
      ['I', 'J', 'K', 'L'],
      ['M', 'N', 'O', 'P'],
    ]);
    expect(findDuplicateSongsInPuzzle(puzzle)).toEqual(['Believe']);
  });

  it('detects multiple different duplicates', () => {
    const puzzle = makePuzzle([
      ['Believe', 'Stay', 'C', 'D'],
      ['E', 'Believe', 'G', 'H'],
      ['I', 'J', 'Stay', 'L'],
      ['M', 'N', 'O', 'P'],
    ]);
    const dupes = findDuplicateSongsInPuzzle(puzzle);
    expect(dupes).toContain('Believe');
    expect(dupes).toContain('Stay');
    expect(dupes).toHaveLength(2);
  });

  it('is case-insensitive when detecting duplicates', () => {
    const puzzle = makePuzzle([
      ['believe', 'B', 'C', 'D'],
      ['E', 'F', 'Believe', 'H'],
      ['I', 'J', 'K', 'L'],
      ['M', 'N', 'O', 'P'],
    ]);
    expect(findDuplicateSongsInPuzzle(puzzle)).toHaveLength(1);
  });
});

describe('validateNoDuplicateSongs', () => {
  it('returns empty array for valid puzzles', () => {
    const puzzles = [
      makePuzzle([
        ['A', 'B', 'C', 'D'],
        ['E', 'F', 'G', 'H'],
        ['I', 'J', 'K', 'L'],
        ['M', 'N', 'O', 'P'],
      ]),
    ];
    expect(validateNoDuplicateSongs(puzzles)).toEqual([]);
  });

  it('returns puzzle index and duplicate titles for invalid puzzles', () => {
    const puzzles = [
      makePuzzle([
        ['A', 'B', 'C', 'D'],
        ['E', 'F', 'G', 'H'],
        ['I', 'J', 'K', 'L'],
        ['M', 'N', 'O', 'P'],
      ]),
      makePuzzle([
        ['Believe', 'B', 'C', 'D'],
        ['E', 'F', 'Believe', 'H'],
        ['I', 'J', 'K', 'L'],
        ['M', 'N', 'O', 'P'],
      ]),
    ];
    const result = validateNoDuplicateSongs(puzzles);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ puzzleIndex: 1, duplicates: ['Believe'] });
  });
});
