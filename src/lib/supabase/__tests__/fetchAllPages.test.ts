import { describe, it, expect } from 'vitest';
import { fetchAllPages } from '../fetchAllPages';

// Stand-in for a PostgREST range query: rows [from, to] of a table, capped like the server.
function fakeTable(total: number, serverCap = 1000) {
  const rows = Array.from({ length: total }, (_, i) => i);
  const calls: Array<[number, number]> = [];
  const page = async (from: number, to: number) => {
    calls.push([from, to]);
    return { data: rows.slice(from, Math.min(to + 1, from + serverCap)), error: null };
  };
  return { page, calls };
}

describe('fetchAllPages', () => {
  it('returns every row past the 1000-row server cap', async () => {
    const { page } = fakeTable(2500);
    const rows = await fetchAllPages(page, 1000);
    expect(rows).toHaveLength(2500);
    expect(rows[2499]).toBe(2499);
  });

  it('stops after a short page', async () => {
    const { page, calls } = fakeTable(1500);
    await fetchAllPages(page, 1000);
    expect(calls).toEqual([
      [0, 999],
      [1000, 1999],
    ]);
  });

  it('makes one extra request when the total is an exact multiple of the page size', async () => {
    const { page, calls } = fakeTable(2000);
    const rows = await fetchAllPages(page, 1000);
    expect(rows).toHaveLength(2000);
    expect(calls).toHaveLength(3);
  });

  it('throws on a query error', async () => {
    const page = async () => ({ data: null, error: { message: 'boom' } });
    await expect(fetchAllPages(page, 1000)).rejects.toThrow('boom');
  });
});
