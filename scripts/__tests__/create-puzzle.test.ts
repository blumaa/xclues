import { describe, it, expect } from 'vitest';
import { parseCandidate } from '../puzzle-audit';
import {
  buildGroupRows,
  buildPuzzleRow,
  buildPuzzleUpdate,
  splitExistingGroups,
} from '../create-puzzle';
import { scoreForDifficulty } from '../puzzle-db';

const CANDIDATE = JSON.stringify({
  genre: 'films',
  date: '2026-08-11',
  groups: [
    {
      difficulty: 'easy',
      connection: 'Film titles with a word deliberately misspelled',
      items: [
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'Pet Sematary', year: 1989 },
        { title: 'The Pursuit of Happyness', year: 2006 },
        { title: 'Boyz n the Hood', year: 1991 },
      ],
    },
    {
      difficulty: 'hardest',
      connection: 'Characters whose names are numbers',
      items: [
        { title: 'Zero Moustafa' },
        { title: 'Agent 47' },
        { title: 'Two-Face' },
        { title: 'Number Two' },
      ],
    },
  ],
});

describe('scoreForDifficulty', () => {
  it('rises with difficulty', () => {
    const scores = (['easy', 'medium', 'hard', 'hardest'] as const).map(scoreForDifficulty);
    expect(scores).toEqual([...scores].sort((a, b) => a - b));
    expect(new Set(scores).size).toBe(4);
  });

  it('refuses a difficulty it does not know', () => {
    expect(() => scoreForDifficulty('tricky')).toThrow(/tricky/);
  });
});

describe('buildGroupRows', () => {
  it('derives colour, score and genre from the candidate', () => {
    const rows = buildGroupRows(parseCandidate(CANDIDATE), 900000);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({
      connection: 'Film titles with a word deliberately misspelled',
      difficulty: 'easy',
      color: 'yellow',
      difficulty_score: scoreForDifficulty('easy'),
      genre: 'films',
      status: 'approved',
    });
    expect(rows[1]).toMatchObject({ difficulty: 'hardest', color: 'purple' });
  });

  /**
   * connection_type is not a second taxonomy to keep in sync by hand — it is the
   * rubric's axis under the column name the table already uses.
   */
  it('takes connection_type from the rubric axis', () => {
    const rows = buildGroupRows(parseCandidate(CANDIDATE), 900000);
    expect(rows[1].connection_type).toBe('wordplay');
  });

  /**
   * Item ids are unique across the whole board, not per group: the game flattens every
   * group into one list of tiles and two tiles sharing an id collide.
   */
  it('numbers items uniquely across the board', () => {
    const rows = buildGroupRows(parseCandidate(CANDIDATE), 900000);
    const ids = rows.flatMap((r) => r.items.map((i) => i.id));
    expect(ids).toHaveLength(8);
    expect(new Set(ids).size).toBe(8);
    expect(Math.min(...ids)).toBe(900000);
  });

  it('keeps optional item metadata and omits what was not given', () => {
    const rows = buildGroupRows(parseCandidate(CANDIDATE), 900000);
    expect(rows[0].items[0]).toMatchObject({ title: 'Inglourious Basterds', year: 2009 });
    expect(rows[1].items[0]).not.toHaveProperty('year');
  });
});

describe('buildPuzzleRow', () => {
  const ids = ['uuid-a', 'uuid-b'];

  it('publishes the board for its date and genre', () => {
    const row = buildPuzzleRow(parseCandidate(CANDIDATE), ids);
    expect(row).toMatchObject({
      puzzle_date: '2026-08-11',
      genre: 'films',
      status: 'published',
      group_ids: ids,
    });
  });

  /**
   * The snapshot is what the game actually reads; group_ids is only the fallback path.
   * Each snapshot group must carry the id of its connection_groups row, or the two
   * representations describe different boards.
   */
  it('snapshots the groups under their real group ids', () => {
    const row = buildPuzzleRow(parseCandidate(CANDIDATE), ids);
    expect(row.groups.map((g) => g.id)).toEqual(ids);
    expect(row.groups[0].connection).toBe('Film titles with a word deliberately misspelled');
    expect(row.groups[0].items).toHaveLength(4);
  });

  it('refuses to write a board whose ids do not match its groups', () => {
    expect(() => buildPuzzleRow(parseCandidate(CANDIDATE), ['uuid-a'])).toThrow(/2 groups/);
  });
});

/**
 * connection_groups is keyed by the connection text itself, so replacing a board cannot
 * blind-insert its four groups: the ones whose wording did not change are already there
 * from the previous write, and the insert dies on unique_connection. Rows already in the
 * table get updated in place under the id they already own.
 */
describe('splitExistingGroups', () => {
  const rows = buildGroupRows(parseCandidate(CANDIDATE), 900000);

  it('sends a connection the table has never seen to the insert', () => {
    const split = splitExistingGroups(rows, new Map());
    expect(split.inserts).toEqual(rows);
    expect(split.updates).toEqual([]);
  });

  it('updates a connection that already exists under its own id', () => {
    const split = splitExistingGroups(rows, new Map([[rows[0].connection, 'uuid-a']]));
    expect(split.inserts).toEqual([rows[1]]);
    expect(split.updates).toEqual([{ id: 'uuid-a', row: rows[0] }]);
  });

  /**
   * A connection can survive a rewrite while its items change underneath it. Reusing the
   * row without rewriting it would leave the old tiles attached to the new board.
   */
  it('carries the new items on the row it reuses', () => {
    const split = splitExistingGroups(rows, new Map([[rows[0].connection, 'uuid-a']]));
    expect(split.updates[0].row.items).toEqual(rows[0].items);
  });
});

describe('buildPuzzleUpdate', () => {
  const ids = ['uuid-a', 'uuid-b'];

  /**
   * Replacing a board must move `group_ids` too. Rewriting only the snapshot leaves the
   * fallback path pointing at the connection_groups rows of the board that used to be
   * there, so the two representations describe different puzzles.
   */
  it('moves the ids and the snapshot together', () => {
    const update = buildPuzzleUpdate(parseCandidate(CANDIDATE), ids);
    expect(update.group_ids).toEqual(ids);
    expect(update.groups.map((g) => g.id)).toEqual(ids);
  });

  /** The date and genre identify the row being updated — never part of the payload. */
  it('does not try to move the board to another date or genre', () => {
    const update = buildPuzzleUpdate(parseCandidate(CANDIDATE), ids);
    expect(update).not.toHaveProperty('puzzle_date');
    expect(update).not.toHaveProperty('genre');
  });

  it('refuses an id count that does not match its groups', () => {
    expect(() => buildPuzzleUpdate(parseCandidate(CANDIDATE), ['uuid-a'])).toThrow(/2 groups/);
  });

  /**
   * The snapshot and the connection_groups rows are two views of one board, so a tile
   * must carry the same id in both. They only agree if both are numbered from the same base.
   */
  it('numbers snapshot items from the same base as the group rows', () => {
    const candidate = parseCandidate(CANDIDATE);
    const update = buildPuzzleUpdate(candidate, ids, 900000);
    const rows = buildGroupRows(candidate, 900000);
    expect(update.groups.flatMap((g) => g.items.map((i) => i.id))).toEqual(
      rows.flatMap((r) => r.items.map((i) => i.id)),
    );
  });
});
