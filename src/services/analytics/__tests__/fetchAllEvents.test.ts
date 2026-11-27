import { describe, it, expect } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import { fetchAllEvents } from '../fetchAllEvents';

interface Call {
  order?: { column: string; ascending?: boolean };
  range?: [number, number];
}

// Minimal stand-in for the query builder chain the fetcher uses. Serves
// `rows` in id order only when the query asks for that order, the way
// Postgres only promises a stable page split with ORDER BY on a unique key.
function fakeClient(rows: { id: number }[], opts: { failOnPage?: number } = {}) {
  const calls: Call[] = [];
  let page = 0;
  const client = {
    from: () => {
      const call: Call = {};
      calls.push(call);
      const builder = {
        select: () => builder,
        gte: () => builder,
        order: (column: string, o?: { ascending?: boolean }) => {
          call.order = { column, ascending: o?.ascending };
          return builder;
        },
        range: async (from: number, to: number) => {
          call.range = [from, to];
          if (opts.failOnPage === page++) {
            return { data: null, error: { message: 'boom' } };
          }
          return { data: rows.slice(from, to + 1), error: null };
        },
      };
      return builder;
    },
  };
  return { client: client as unknown as SupabaseClient, calls };
}

const rows = (n: number) => Array.from({ length: n }, (_, i) => ({ id: i + 1 }));

describe('fetchAllEvents', () => {
  it('orders every page by the unique id so pages never overlap or skip rows', async () => {
    const { client, calls } = fakeClient(rows(5));
    await fetchAllEvents(client, '2026-01-01', 2);

    expect(calls.length).toBe(3);
    for (const call of calls) {
      expect(call.order).toEqual({ column: 'id', ascending: true });
    }
  });

  it('walks consecutive pages until a short page', async () => {
    const { client, calls } = fakeClient(rows(5));
    const all = await fetchAllEvents(client, '2026-01-01', 2);

    expect(calls.map((c) => c.range)).toEqual([[0, 1], [2, 3], [4, 5]]);
    expect(all.map((r) => (r as unknown as { id: number }).id)).toEqual([1, 2, 3, 4, 5]);
  });

  it('throws when a page fails instead of returning a short count', async () => {
    const { client } = fakeClient(rows(5), { failOnPage: 1 });

    await expect(fetchAllEvents(client, '2026-01-01', 2)).rejects.toThrow('boom');
  });
});
