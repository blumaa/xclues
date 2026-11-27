import { describe, it, expect } from 'vitest';
import { buildArchiveContext, buildDayBoards, parseCandidate, formatFindings } from '../puzzle-audit';
import type { Finding } from '../puzzle-rubric';

const rows = [
  {
    genre: 'films',
    puzzle_date: '2026-07-21',
    groups: [
      {
        id: 'a',
        color: 'purple',
        difficulty: 'hardest',
        connection: 'Emma Stone films',
        items: [{ id: 1, title: 'La La Land' }, { id: 2, title: 'Easy A' }],
      },
    ],
  },
  {
    genre: 'films',
    puzzle_date: '2026-08-01',
    groups: [
      {
        id: 'b',
        color: 'yellow',
        difficulty: 'easy',
        connection: 'Films with "Stone" in the title',
        items: [{ id: 3, title: 'Stone Cold' }, { id: 4, title: 'La La Land' }],
      },
    ],
  },
  {
    genre: 'books',
    puzzle_date: '2026-07-21',
    groups: [
      {
        id: 'c',
        color: 'green',
        difficulty: 'medium',
        connection: 'Irish authors',
        items: [{ id: 5, title: 'James Joyce' }],
      },
    ],
  },
];

describe('buildArchiveContext', () => {
  it('keeps only the requested genre', () => {
    const ctx = buildArchiveContext(rows, 'films', '2026-08-04');
    expect(ctx.priorGroups.map((g) => g.connection)).toEqual([
      'Emma Stone films',
      'Films with "Stone" in the title',
    ]);
  });

  it('excludes the board being audited so it does not duplicate itself', () => {
    const ctx = buildArchiveContext(rows, 'films', '2026-08-01');
    expect(ctx.priorGroups.map((g) => g.date)).toEqual(['2026-07-21']);
  });

  it('keeps every other board, all genres and both directions in time, for motif spacing', () => {
    const ctx = buildArchiveContext(rows, 'films', '2026-07-21');
    expect(ctx.allGenreGroups).toEqual([
      { date: '2026-08-01', genre: 'films', connection: 'Films with "Stone" in the title' },
      { date: '2026-07-21', genre: 'books', connection: 'Irish authors' },
    ]);
  });

  it('counts item frequency across the whole archive, all genres', () => {
    const ctx = buildArchiveContext(rows, 'films', '2026-08-04');
    expect(ctx.itemFrequency.get('la la land')).toBe(2);
    expect(ctx.itemFrequency.get('james joyce')).toBe(1);
  });
});

describe('parseCandidate', () => {
  const candidate = {
    genre: 'films',
    date: '2026-08-06',
    groups: [
      {
        connection: 'Films directed by Agnès Varda',
        difficulty: 'easy',
        items: [{ title: 'Cléo from 5 to 7' }, { title: 'Vagabond' }],
      },
    ],
  };

  it('reads a candidate board written by hand or by a model', () => {
    const parsed = parseCandidate(JSON.stringify(candidate));
    expect(parsed.genre).toBe('films');
    expect(parsed.date).toBe('2026-08-06');
    expect(parsed.groups[0].connection).toBe('Films directed by Agnès Varda');
  });

  it('derives color from difficulty so an author never sets it', () => {
    const parsed = parseCandidate(JSON.stringify(candidate));
    expect(parsed.groups[0].color).toBe('yellow');
  });

  it('keeps a hidden-word answer so the rubric can check the tile', () => {
    const withHidden = {
      ...candidate,
      groups: [{ ...candidate.groups[0], items: [{ title: 'Antitrust', hidden: 'tit' }] }],
    };
    expect(parseCandidate(JSON.stringify(withHidden)).groups[0].items[0].hidden).toBe('tit');
  });

  it('rejects a candidate missing a genre', () => {
    expect(() => parseCandidate(JSON.stringify({ ...candidate, genre: undefined }))).toThrow(
      /genre/i,
    );
  });
});

describe('formatFindings', () => {
  const findings: Finding[] = [
    { rule: 'giveaway', severity: 'fail', group: 1, message: 'All four items contain "games".' },
    { rule: 'axis-variety', severity: 'flag', message: 'Only 2 axes on this board.' },
  ];

  it('separates failures from judgement flags', () => {
    const text = formatFindings(findings);
    expect(text).toMatch(/FAIL.*giveaway/s);
    expect(text).toMatch(/FLAG.*axis-variety/s);
  });

  it('reports a clean board plainly', () => {
    expect(formatFindings([])).toMatch(/clean/i);
  });
});

describe('buildDayBoards', () => {
  const books = parseCandidate(
    JSON.stringify({
      genre: 'books',
      date: '2026-07-21',
      groups: [{ connection: 'Titles hiding a bird', difficulty: 'hardest', items: [{ title: 'X' }] }],
    }),
  );

  it('lets a candidate stand in for the archived board of its genre and date', () => {
    const day = buildDayBoards([books], rows, '2026-07-21');
    expect(day.map((b) => b.genre).sort()).toEqual(['books', 'films']);
    expect(day.find((b) => b.genre === 'books')!.groups[0].connection).toBe('Titles hiding a bird');
  });

  it('only holds boards for the requested date', () => {
    expect(buildDayBoards([books], rows, '2026-08-01').map((b) => b.genre)).toEqual(['films']);
  });
});
