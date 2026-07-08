import { describe, it, expect } from 'vitest';
import { applyPuzzleEdit, type PuzzleEdit } from '../edit-puzzle';
import type { PuzzleGroup } from '../post-daily-bluesky';

const groups: PuzzleGroup[] = [
  {
    id: 'g1',
    color: 'yellow',
    difficulty: 'easy',
    connection: 'Spielberg films',
    items: [
      { id: 1, title: 'Jaws' },
      { id: 2, title: 'E.T.' },
      { id: 3, title: 'Hook' },
      { id: 4, title: '1941' },
    ],
  },
  {
    id: 'g2',
    color: 'green',
    difficulty: 'medium',
    connection: 'One-word titles',
    items: [
      { id: 5, title: 'Alien' },
      { id: 6, title: 'Jaws' },
      { id: 7, title: 'Up' },
      { id: 8, title: 'Rocky' },
    ],
  },
];

describe('applyPuzzleEdit', () => {
  it('replaces an item title (1-indexed group and item)', () => {
    const edit: PuzzleEdit = { group: 1, item: 3, title: 'Munich' };
    const out = applyPuzzleEdit(groups, edit);
    expect(out[0].items[2].title).toBe('Munich');
  });

  it('sets an item artist', () => {
    const edit: PuzzleEdit = { group: 2, item: 1, artist: 'Ridley Scott' };
    const out = applyPuzzleEdit(groups, edit);
    expect(out[1].items[0].artist).toBe('Ridley Scott');
  });

  it('replaces a group connection', () => {
    const edit: PuzzleEdit = { group: 2, connection: 'Contains water' };
    const out = applyPuzzleEdit(groups, edit);
    expect(out[1].connection).toBe('Contains water');
  });

  it('replaces a group difficulty and syncs the color', () => {
    const edit: PuzzleEdit = { group: 1, difficulty: 'hardest' };
    const out = applyPuzzleEdit(groups, edit);
    expect(out[0].difficulty).toBe('hardest');
    // Color must follow difficulty — the game paints tiles by color.
    expect(out[0].color).toBe('purple');
  });

  it('throws on an unknown difficulty', () => {
    expect(() => applyPuzzleEdit(groups, { group: 1, difficulty: 'trivial' })).toThrow();
  });

  it('does not mutate the input', () => {
    applyPuzzleEdit(groups, { group: 1, item: 1, title: 'CHANGED' });
    expect(groups[0].items[0].title).toBe('Jaws');
  });

  it('throws on an out-of-range group', () => {
    expect(() => applyPuzzleEdit(groups, { group: 5, connection: 'x' })).toThrow();
  });

  it('throws on an out-of-range item', () => {
    expect(() => applyPuzzleEdit(groups, { group: 1, item: 9, title: 'x' })).toThrow();
  });

  it('throws when the edit specifies nothing to change', () => {
    expect(() => applyPuzzleEdit(groups, { group: 1 })).toThrow();
  });

  it('throws when item fields are given without an item index', () => {
    expect(() => applyPuzzleEdit(groups, { group: 1, title: 'x' })).toThrow();
  });
});
