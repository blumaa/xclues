import { describe, it, expect } from 'vitest';
import { replacePuzzleGroup, parseItemSpec } from '../set-group';
import type { PuzzleGroup } from '../post-daily-bluesky';

const groups: PuzzleGroup[] = [
  {
    id: 'g1',
    color: 'yellow',
    difficulty: 'easy',
    connection: 'Old connection',
    items: [
      { id: 101, title: 'A', year: 2001 },
      { id: 102, title: 'B', year: 2002 },
      { id: 103, title: 'C', year: 2003 },
      { id: 104, title: 'D', year: 2004 },
    ],
  },
  {
    id: 'g2',
    color: 'green',
    difficulty: 'medium',
    connection: 'Music group',
    items: [
      { id: 201, title: 'S1', year: 1991, artist: 'Old Artist' },
      { id: 202, title: 'S2', year: 1992, artist: 'Old Artist' },
      { id: 203, title: 'S3', year: 1993, artist: 'Old Artist' },
      { id: 204, title: 'S4', year: 1994, artist: 'Old Artist' },
    ],
  },
];

describe('replacePuzzleGroup', () => {
  it('replaces connection and all item titles/years (film/book)', () => {
    const out = replacePuzzleGroup(groups, 1, {
      connection: 'Pixar films',
      items: [
        { title: 'Up', year: 2009 },
        { title: 'Coco', year: 2017 },
        { title: 'Brave', year: 2012 },
        { title: 'Ratatouille', year: 2007 },
      ],
    });
    expect(out[0].connection).toBe('Pixar films');
    expect(out[0].items.map((i) => i.title)).toEqual(['Up', 'Coco', 'Brave', 'Ratatouille']);
    expect(out[0].items.map((i) => i.year)).toEqual([2009, 2017, 2012, 2007]);
  });

  it('reuses the existing item ids positionally', () => {
    const out = replacePuzzleGroup(groups, 1, {
      items: [
        { title: 'Up', year: 2009 },
        { title: 'Coco', year: 2017 },
        { title: 'Brave', year: 2012 },
        { title: 'Ratatouille', year: 2007 },
      ],
    });
    expect(out[0].items.map((i) => i.id)).toEqual([101, 102, 103, 104]);
  });

  it('sets artist for music items', () => {
    const out = replacePuzzleGroup(groups, 2, {
      items: [
        { title: 'Roxanne', artist: 'The Police', year: 1978 },
        { title: 'Jolene', artist: 'Dolly Parton', year: 1973 },
        { title: 'Creep', artist: 'Radiohead', year: 1992 },
        { title: 'Bad', artist: 'U2', year: 1984 },
      ],
    });
    expect(out[1].items.map((i) => i.artist)).toEqual([
      'The Police',
      'Dolly Parton',
      'Radiohead',
      'U2',
    ]);
  });

  it('drops stale fields not provided (no leftover old artist/year)', () => {
    const out = replacePuzzleGroup(groups, 2, {
      items: [
        { title: 'X1' },
        { title: 'X2' },
        { title: 'X3' },
        { title: 'X4' },
      ],
    });
    expect(out[1].items[0]).toEqual({ id: 201, title: 'X1' });
    expect(out[1].items[0].artist).toBeUndefined();
    expect(out[1].items[0].year).toBeUndefined();
  });

  it('optionally changes difficulty, preserves color', () => {
    const out = replacePuzzleGroup(groups, 1, {
      difficulty: 'hardest',
      items: [{ title: 'A' }, { title: 'B' }, { title: 'C' }, { title: 'D' }],
    });
    expect(out[0].difficulty).toBe('hardest');
    expect(out[0].color).toBe('yellow');
  });

  it('does not mutate the input', () => {
    replacePuzzleGroup(groups, 1, {
      connection: 'CHANGED',
      items: [{ title: 'Z' }, { title: 'Z' }, { title: 'Z' }, { title: 'Z' }],
    });
    expect(groups[0].connection).toBe('Old connection');
    expect(groups[0].items[0].title).toBe('A');
  });

  it('throws when the item count does not match the group size', () => {
    expect(() =>
      replacePuzzleGroup(groups, 1, { items: [{ title: 'A' }, { title: 'B' }] }),
    ).toThrow();
  });

  it('throws on an out-of-range group', () => {
    expect(() =>
      replacePuzzleGroup(groups, 9, {
        items: [{ title: 'A' }, { title: 'B' }, { title: 'C' }, { title: 'D' }],
      }),
    ).toThrow();
  });
});

describe('parseItemSpec', () => {
  it('parses film/book spec as title|year', () => {
    expect(parseItemSpec('films', 'Up|2009')).toEqual({ title: 'Up', year: 2009 });
    expect(parseItemSpec('books', "The Things They Carried|1990")).toEqual({
      title: 'The Things They Carried',
      year: 1990,
    });
  });

  it('parses a title with no meta', () => {
    expect(parseItemSpec('films', 'Up')).toEqual({ title: 'Up' });
  });

  it('parses music spec as title|artist and title|artist|year', () => {
    expect(parseItemSpec('music', 'Roxanne|The Police')).toEqual({
      title: 'Roxanne',
      artist: 'The Police',
    });
    expect(parseItemSpec('music', 'Roxanne|The Police|1978')).toEqual({
      title: 'Roxanne',
      artist: 'The Police',
      year: 1978,
    });
  });

  it('trims surrounding whitespace', () => {
    expect(parseItemSpec('films', ' Up | 2009 ')).toEqual({ title: 'Up', year: 2009 });
  });

  it('throws on an empty title', () => {
    expect(() => parseItemSpec('films', '|2009')).toThrow();
  });
});
