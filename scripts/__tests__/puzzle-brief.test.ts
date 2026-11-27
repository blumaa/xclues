import { describe, it, expect } from 'vitest';
import {
  planBoard,
  ITEM_KINDS,
  buildBrief,
  trialCalibration,
  DIFFICULTY_TRIAL,
} from '../puzzle-brief';
import { classifyTileKind, type Axis } from '../puzzle-rubric';

const DIFFICULTIES = ['easy', 'medium', 'hard', 'hardest'];

describe('planBoard', () => {
  it('assigns each of the four axes exactly once', () => {
    const slots = planBoard('2026-08-06', 'films');
    expect(slots.map((s) => s.difficulty)).toEqual(DIFFICULTIES);
    expect([...new Set(slots.map((s) => s.axis))].sort()).toEqual([
      'canon',
      'content',
      'creator',
      'wordplay',
    ]);
  });

  /**
   * Owner correction, 2026-08-04: no axis belongs to a fixed slot. Wordplay a solver can
   * see on the tile is the easy way in; the planner must be able to put any axis anywhere,
   * and the writer decides the slot from how hidden the link is.
   */
  it('can put any axis in any slot across a month', () => {
    const seen: Record<number, Set<string>> = { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set() };
    for (let d = 1; d <= 28; d++) {
      const date = `2026-09-${String(d).padStart(2, '0')}`;
      for (const genre of ['films', 'music', 'books'] as const) {
        planBoard(date, genre).forEach((slot, i) => seen[i].add(slot.axis));
      }
    }
    for (const i of [0, 1, 2, 3]) {
      expect([...seen[i]].sort()).toEqual(['canon', 'content', 'creator', 'wordplay']);
    }
  });

  it('is deterministic for a given date and genre', () => {
    expect(planBoard('2026-08-06', 'music')).toEqual(planBoard('2026-08-06', 'music'));
  });

  it('moves the axes between slots on consecutive days', () => {
    const a = planBoard('2026-08-06', 'films').map((s) => s.axis);
    const b = planBoard('2026-08-07', 'films').map((s) => s.axis);
    expect(a).not.toEqual(b);
  });

  it('gives the three genres different plans on the same day', () => {
    const films = planBoard('2026-08-06', 'films').map((s) => s.axis);
    const music = planBoard('2026-08-06', 'music').map((s) => s.axis);
    expect(films).not.toEqual(music);
  });

  it('draws item kinds from the genre', () => {
    for (const genre of ['films', 'music', 'books'] as const) {
      const all = [...ITEM_KINDS[genre].work, ...ITEM_KINDS[genre].name];
      for (const slot of planBoard('2026-08-06', genre)) expect(all).toContain(slot.itemKind);
    }
  });

  it('files every kind under the tile kind the audit reads it as', () => {
    for (const genre of ['films', 'music', 'books'] as const) {
      for (const kind of ITEM_KINDS[genre].work) expect(classifyTileKind(kind), kind).toBe('work');
      for (const kind of ITEM_KINDS[genre].name) expect(classifyTileKind(kind), kind).toBe('name');
    }
  });

  /**
   * Owner, 2026-09-25: three title groups and one group of actors is too easy — the odd
   * group sorts itself by tile type. Four different kinds guaranteed exactly that shape.
   */
  it('plans two title groups and two name groups, never a lone kind', () => {
    for (let d = 1; d <= 31; d++) {
      const date = `2026-10-${String(d).padStart(2, '0')}`;
      for (const genre of ['films', 'music', 'books'] as const) {
        const kinds = planBoard(date, genre).map((s) => s.itemKind);
        const names = kinds.filter((k) => ITEM_KINDS[genre].name.includes(k));
        expect(names.length, `${genre} ${date}: ${kinds.join(', ')}`).toBe(2);
        expect(new Set(names).size, `${genre} ${date}: ${kinds.join(', ')}`).toBe(2);
      }
    }
  });

  it('moves the title groups between slots across a week', () => {
    const shapes = new Set<string>();
    for (let d = 1; d <= 7; d++) {
      const kinds = planBoard(`2026-10-0${d}`, 'films').map((s) => s.itemKind);
      shapes.add(kinds.map((k) => (ITEM_KINDS.films.work.includes(k) ? 'W' : 'N')).join(''));
    }
    expect(shapes.size).toBeGreaterThan(2);
  });

  it('keeps the easy and medium slots on the kinds a solver recognises on sight', () => {
    for (let d = 1; d <= 28; d++) {
      const date = `2026-09-${String(d).padStart(2, '0')}`;
      for (const genre of ['films', 'music', 'books'] as const) {
        const accessible = [...ITEM_KINDS[genre].work, ...ITEM_KINDS[genre].name.slice(0, 2)];
        const slots = planBoard(date, genre);
        expect(accessible).toContain(slots[0].itemKind);
        expect(accessible).toContain(slots[1].itemKind);
      }
    }
  });

  it('always anchors one slot in the genre title kind', () => {
    for (let d = 1; d <= 28; d++) {
      const date = `2026-09-${String(d).padStart(2, '0')}`;
      for (const genre of ['films', 'music', 'books'] as const) {
        const kinds = planBoard(date, genre).map((s) => s.itemKind);
        expect(kinds, `${genre} ${date}`).toContain(ITEM_KINDS[genre].work[0]);
      }
    }
  });

  it('carries guidance naming the shape each slot should take', () => {
    const slots = planBoard('2026-08-06', 'books');
    for (const slot of slots) {
      expect(slot.guidance.length).toBeGreaterThan(0);
    }
  });

  it('steers wordplay slots off the word-in-title motif', () => {
    const slots = planBoard('2026-08-06', 'films').filter((s) => s.axis === 'wordplay');
    expect(slots.length).toBeGreaterThan(0);
    for (const slot of slots) {
      expect(slot.guidance).toMatch(/14 days/);
      expect(slot.guidance).toMatch(/anagram/i);
    }
  });
});

describe('buildBrief', () => {
  const priorConnections = [
    'Sally Rooney novels',
    'Historical fiction novels',
    'Book titles containing an insect',
  ];

  it('bans connections the archive has already used', () => {
    const brief = buildBrief('2026-08-06', 'books', priorConnections);
    expect(brief.bans).toEqual(expect.arrayContaining(priorConnections));
  });

  it('states the required cross-group trap', () => {
    const brief = buildBrief('2026-08-06', 'books', []);
    expect(brief.bridge).toMatch(/trap|bridge|near-miss/i);
  });

  it('renders a brief a writer can fill in without seeing this code', () => {
    const text = buildBrief('2026-08-06', 'films', priorConnections).text;
    expect(text).toContain('2026-08-06');
    expect(text).toContain('Filmclues');
    for (const difficulty of DIFFICULTIES) {
      expect(text).toContain(difficulty);
    }
    expect(text).toContain('Sally Rooney novels');
  });

  it('names each axis in the rendered brief so the writer knows the four ways in', () => {
    const brief = buildBrief('2026-08-06', 'music', []);
    const axes: Axis[] = ['creator', 'canon', 'content', 'wordplay'];
    for (const axis of axes) {
      expect(brief.text).toContain(axis);
    }
  });
});

/**
 * Difficulty-skew trial: boards are authored a rung softer for a month, then the
 * feedback survey comes back on and the two rounds are compared.
 */
describe('difficulty trial', () => {
  const during = '2026-09-10';
  const after = '2026-10-01';

  it('runs from the start date to the end date inclusive', () => {
    expect(trialCalibration(DIFFICULTY_TRIAL.start, 'films')).not.toBeNull();
    expect(trialCalibration(DIFFICULTY_TRIAL.end, 'films')).not.toBeNull();
  });

  it('expires on its own, so a later date plans at the normal calibration', () => {
    expect(trialCalibration(after, 'films')).toBeNull();
    // Boards through 2026-09-02 were authored and scheduled at the old calibration.
    expect(trialCalibration('2026-09-02', 'films')).toBeNull();
  });

  it('carries the genre its own measured win rate', () => {
    expect(trialCalibration(during, 'books')?.measuredWinRate).toBe(44);
    expect(trialCalibration(during, 'films')?.measuredWinRate).toBe(57);
    expect(trialCalibration(during, 'music')?.measuredWinRate).toBe(60);
  });

  it('softens every rung of the ladder while it runs', () => {
    const trial = planBoard(during, 'films');
    const normal = planBoard(after, 'films');
    for (const i of [0, 1, 2, 3]) {
      expect(trial[i].guidance).not.toEqual(normal[i].guidance);
    }
  });

  it('leaves the four difficulty slots intact, so board colours still map', () => {
    expect(planBoard(during, 'films').map((s) => s.difficulty)).toEqual(DIFFICULTIES);
  });

  it('does not disturb axis or tile-kind planning', () => {
    const trial = planBoard(during, 'books');
    expect(trial.map((s) => s.axis).sort()).toEqual(['canon', 'content', 'creator', 'wordplay']);
    expect(trial.filter((s) => ITEM_KINDS.books.name.includes(s.itemKind))).toHaveLength(2);
  });

  it('states the trial and the genre baseline in the brief a writer reads', () => {
    const text = buildBrief(during, 'books', []).text;
    expect(text).toContain('DIFFICULTY TRIAL');
    expect(text).toContain('44%');
    expect(buildBrief(after, 'books', []).text).not.toContain('DIFFICULTY TRIAL');
  });
});

/**
 * The trial's guidance and its tile-kind planning have to agree: a brief that asks for
 * recognisable tiles while assigning "translators" to a slot is telling the writer two
 * different things.
 */
describe('difficulty trial tile kinds', () => {
  const GENRES = ['films', 'music', 'books'] as const;

  it('keeps every slot inside the recognisable end of the list while it runs', () => {
    for (let d = 3; d <= 11; d++) {
      const date = `2026-09-${String(d).padStart(2, '0')}`;
      for (const genre of GENRES) {
        const leastRecognisable = ITEM_KINDS[genre].name.at(-1);
        const kinds = planBoard(date, genre).map((s) => s.itemKind);
        expect(kinds).not.toContain(leastRecognisable);
      }
    }
  });

  it('uses the full list again once the trial is over', () => {
    const seen = new Set<string>();
    for (let d = 1; d <= 28; d++) {
      for (const genre of GENRES) {
        planBoard(`2026-10-${String(d).padStart(2, '0')}`, genre).forEach((s) => seen.add(s.itemKind));
      }
    }
    for (const genre of GENRES) {
      expect(seen).toContain(ITEM_KINDS[genre].name.at(-1));
    }
  });
});
