import { describe, it, expect } from 'vitest';
import type { PuzzleDef } from '../types';
import { buildPatchesFromSnapshot, findDuplicatesInSnapshot } from '../fix-duplicates-migration';

// Simulates the groups JSON snapshot stored in the DB puzzles table
function makeSnapshot(groups: Array<{ connection: string; titles: string[] }>) {
  return groups.map((g, i) => ({
    id: `group-${i}`,
    connection: g.connection,
    difficulty: 'medium',
    color: ['yellow', 'green', 'blue', 'purple'][i],
    items: g.titles.map((title, j) => ({
      id: i * 4 + j,
      title,
      artist: 'Some Artist',
      year: 2000,
    })),
  }));
}

function makeSeedPuzzle(groups: Array<{ connection: string; titles: string[] }>): PuzzleDef {
  return {
    groups: groups.map((g, i) => ({
      connection: g.connection,
      connection_type: 'theme',
      color: (['yellow', 'green', 'blue', 'purple'] as const)[i],
      difficulty: (['easy', 'medium', 'hard', 'hardest'] as const)[i],
      difficulty_score: (i + 1) * 2,
      items: g.titles.map(title => ({ title, artist: 'Some Artist', year: 2000 })) as [any, any, any, any],
    })) as [any, any, any, any],
  };
}

describe('findDuplicatesInSnapshot', () => {
  it('returns empty array when no duplicates', () => {
    const snapshot = makeSnapshot([
      { connection: 'G1', titles: ['A', 'B', 'C', 'D'] },
      { connection: 'G2', titles: ['E', 'F', 'G', 'H'] },
      { connection: 'G3', titles: ['I', 'J', 'K', 'L'] },
      { connection: 'G4', titles: ['M', 'N', 'O', 'P'] },
    ]);
    expect(findDuplicatesInSnapshot(snapshot)).toEqual([]);
  });

  it('detects duplicate titles across groups', () => {
    const snapshot = makeSnapshot([
      { connection: 'G1', titles: ['Believe', 'B', 'C', 'D'] },
      { connection: 'G2', titles: ['E', 'Believe', 'G', 'H'] },
      { connection: 'G3', titles: ['I', 'J', 'K', 'L'] },
      { connection: 'G4', titles: ['M', 'N', 'O', 'P'] },
    ]);
    expect(findDuplicatesInSnapshot(snapshot)).toEqual(['Believe']);
  });
});

describe('buildPatchesFromSnapshot', () => {
  it('returns null when snapshot has no duplicates', () => {
    const snapshot = makeSnapshot([
      { connection: 'G1', titles: ['A', 'B', 'C', 'D'] },
      { connection: 'G2', titles: ['E', 'F', 'G', 'H'] },
      { connection: 'G3', titles: ['I', 'J', 'K', 'L'] },
      { connection: 'G4', titles: ['M', 'N', 'O', 'P'] },
    ]);
    expect(buildPatchesFromSnapshot(snapshot, [])).toBeNull();
  });

  it('returns patched snapshot when seed data has the fix', () => {
    // DB snapshot has "Shout" in two groups
    const snapshot = makeSnapshot([
      { connection: 'Songs by Taylor Swift', titles: ['Shake It Off', 'Love Story', 'Blank Space', 'Anti-Hero'] },
      { connection: 'Disco classics', titles: ['Stayin Alive', 'I Will Survive', 'Le Freak', 'Funkytown'] },
      { connection: 'Breakfast Club', titles: ['Dont You', 'Everybody', 'Take On Me', 'Shout'] },
      { connection: 'Command songs', titles: ['Jump', 'Relax', 'Shout', 'Run'] },
    ]);

    // Seed data has "Stay" replacing "Shout" in the command group
    const seedPuzzles: PuzzleDef[] = [
      makeSeedPuzzle([
        { connection: 'Songs by Taylor Swift', titles: ['Shake It Off', 'Love Story', 'Blank Space', 'Anti-Hero'] },
        { connection: 'Disco classics', titles: ['Stayin Alive', 'I Will Survive', 'Le Freak', 'Funkytown'] },
        { connection: 'Breakfast Club', titles: ['Dont You', 'Everybody', 'Take On Me', 'Shout'] },
        { connection: 'Command songs', titles: ['Jump', 'Relax', 'Stay', 'Run'] },
      ]),
    ];

    const patched = buildPatchesFromSnapshot(snapshot, seedPuzzles);
    expect(patched).not.toBeNull();

    // The command group should now have "Stay" instead of "Shout"
    const commandGroup = patched!.find((g: any) => g.connection === 'Command songs');
    const titles = commandGroup!.items.map((i: any) => i.title);
    expect(titles).toContain('Stay');
    expect(titles).not.toContain('Shout');
  });

  it('matches seed puzzle by connection strings', () => {
    const snapshot = makeSnapshot([
      { connection: 'Alpha', titles: ['A', 'B', 'C', 'D'] },
      { connection: 'Beta', titles: ['E', 'A', 'G', 'H'] },
      { connection: 'Gamma', titles: ['I', 'J', 'K', 'L'] },
      { connection: 'Delta', titles: ['M', 'N', 'O', 'P'] },
    ]);

    // No matching seed puzzle — connections don't match
    const seedPuzzles: PuzzleDef[] = [
      makeSeedPuzzle([
        { connection: 'Unrelated1', titles: ['X', 'Y', 'Z', 'W'] },
        { connection: 'Unrelated2', titles: ['Q', 'R', 'S', 'T'] },
        { connection: 'Unrelated3', titles: ['U', 'V', 'W', 'X'] },
        { connection: 'Unrelated4', titles: ['A', 'B', 'C', 'D'] },
      ]),
    ];

    // No match found, so can't patch
    expect(buildPatchesFromSnapshot(snapshot, seedPuzzles)).toBeNull();
  });

  it('preserves item IDs and group IDs from original snapshot', () => {
    const snapshot = makeSnapshot([
      { connection: 'G1', titles: ['A', 'B', 'C', 'D'] },
      { connection: 'G2', titles: ['E', 'A', 'G', 'H'] },
      { connection: 'G3', titles: ['I', 'J', 'K', 'L'] },
      { connection: 'G4', titles: ['M', 'N', 'O', 'P'] },
    ]);

    const seedPuzzles: PuzzleDef[] = [
      makeSeedPuzzle([
        { connection: 'G1', titles: ['A', 'B', 'C', 'D'] },
        { connection: 'G2', titles: ['E', 'Z', 'G', 'H'] },
        { connection: 'G3', titles: ['I', 'J', 'K', 'L'] },
        { connection: 'G4', titles: ['M', 'N', 'O', 'P'] },
      ]),
    ];

    const patched = buildPatchesFromSnapshot(snapshot, seedPuzzles);
    expect(patched).not.toBeNull();

    // Group IDs should be preserved from the DB snapshot
    expect(patched![0].id).toBe('group-0');
    expect(patched![1].id).toBe('group-1');

    // Item IDs should be preserved (same positions)
    expect(patched![1].items[0].id).toBe(snapshot[1].items[0].id);
  });
});
