import { describe, it, expect } from 'vitest';
import { aggregateEvents, type GameEventRow } from '../aggregateEvents';

function row(event_type: 'started' | 'won' | 'lost', created_at: string): GameEventRow {
  return { event_type, created_at };
}

describe('aggregateEvents', () => {
  const now = new Date('2026-04-19T12:00:00Z'); // Sunday

  it('zero-fills 30 daily buckets and 12 weekly buckets when given no rows', () => {
    const result = aggregateEvents([], now);

    expect(result.daily).toHaveLength(30);
    expect(result.weekly).toHaveLength(12);

    for (const d of result.daily) {
      expect(d.started).toBe(0);
      expect(d.won).toBe(0);
      expect(d.lost).toBe(0);
    }
    for (const w of result.weekly) {
      expect(w.started).toBe(0);
      expect(w.won).toBe(0);
      expect(w.lost).toBe(0);
    }
  });

  it('returns daily buckets newest-first with ISO date keys', () => {
    const result = aggregateEvents([], now);
    expect(result.daily[0].date).toBe('2026-04-19');
    expect(result.daily[1].date).toBe('2026-04-18');
    expect(result.daily[29].date).toBe('2026-03-21');
  });

  it('returns weekly buckets newest-first with YYYY-Www keys', () => {
    const result = aggregateEvents([], now);
    // 2026-04-19 is Sunday. ISO week containing it = week starting Mon 2026-04-13 = W16.
    expect(result.weekly[0].isoWeek).toBe('2026-W16');
    expect(result.weekly[1].isoWeek).toBe('2026-W15');
    expect(result.weekly[11].isoWeek).toBe('2026-W05');
  });

  it('counts started/won/lost per UTC date', () => {
    const rows: GameEventRow[] = [
      row('started', '2026-04-19T00:00:01Z'),
      row('started', '2026-04-19T23:59:59Z'),
      row('won', '2026-04-19T10:00:00Z'),
      row('lost', '2026-04-18T10:00:00Z'),
    ];
    const result = aggregateEvents(rows, now);

    expect(result.daily[0]).toEqual({ date: '2026-04-19', started: 2, won: 1, lost: 0 });
    expect(result.daily[1]).toEqual({ date: '2026-04-18', started: 0, won: 0, lost: 1 });
  });

  it('rolls events into weekly buckets by ISO week', () => {
    const rows: GameEventRow[] = [
      row('started', '2026-04-13T00:00:00Z'), // Mon of W16
      row('won', '2026-04-19T23:00:00Z'),     // Sun of W16
      row('lost', '2026-04-12T12:00:00Z'),    // Sun of W15 (ISO: previous week)
    ];
    const result = aggregateEvents(rows, now);

    expect(result.weekly[0]).toMatchObject({ isoWeek: '2026-W16', started: 1, won: 1, lost: 0 });
    expect(result.weekly[1]).toMatchObject({ isoWeek: '2026-W15', started: 0, won: 0, lost: 1 });
  });

  it('ignores events outside the 30-day / 12-week windows', () => {
    const rows: GameEventRow[] = [
      row('won', '2025-01-01T00:00:00Z'), // well outside
    ];
    const result = aggregateEvents(rows, now);

    const totalWon = result.daily.reduce((s, d) => s + d.won, 0);
    const totalWeekly = result.weekly.reduce((s, w) => s + w.won, 0);
    expect(totalWon).toBe(0);
    expect(totalWeekly).toBe(0);
  });

  it('handles ISO week boundary: year crossover', () => {
    const newYear = new Date('2027-01-04T12:00:00Z'); // Monday of 2027-W01
    const rows: GameEventRow[] = [
      row('started', '2026-12-31T12:00:00Z'), // ISO week 2026-W53
      row('started', '2027-01-04T12:00:00Z'), // ISO week 2027-W01
    ];
    const result = aggregateEvents(rows, newYear);

    const w53 = result.weekly.find((w) => w.isoWeek === '2026-W53');
    const w01 = result.weekly.find((w) => w.isoWeek === '2027-W01');
    expect(w53?.started).toBe(1);
    expect(w01?.started).toBe(1);
  });
});
