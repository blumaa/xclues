import type { PuzzleDef } from './types';

/**
 * Find duplicate song titles within a single puzzle.
 * Returns an array of titles that appear more than once (case-insensitive).
 */
export function findDuplicateSongsInPuzzle(puzzle: PuzzleDef): string[] {
  const seen = new Map<string, string>(); // lowercase -> original title
  const duplicates = new Set<string>();

  for (const group of puzzle.groups) {
    for (const item of group.items) {
      const key = item.title.toLowerCase();
      if (seen.has(key)) {
        duplicates.add(seen.get(key)!);
      } else {
        seen.set(key, item.title);
      }
    }
  }

  return [...duplicates];
}

/**
 * Validate an array of puzzles, returning any that contain duplicate songs.
 */
export function validateNoDuplicateSongs(
  puzzles: PuzzleDef[]
): Array<{ puzzleIndex: number; duplicates: string[] }> {
  const results: Array<{ puzzleIndex: number; duplicates: string[] }> = [];

  for (let i = 0; i < puzzles.length; i++) {
    const duplicates = findDuplicateSongsInPuzzle(puzzles[i]);
    if (duplicates.length > 0) {
      results.push({ puzzleIndex: i, duplicates });
    }
  }

  return results;
}
