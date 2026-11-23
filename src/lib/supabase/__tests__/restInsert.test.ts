import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { restInsert } from '../restInsert';

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockResolvedValue({ ok: true, status: 201 });
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const row = { genre: 'films', puzzle_date: '2026-10-15', rating: 4, comment: null };

describe('restInsert', () => {
  it('POSTs the row as JSON to the table PostgREST endpoint', async () => {
    await restInsert('puzzle_feedback', row);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/rest\/v1\/puzzle_feedback$/);
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual(row);
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(init.headers['Prefer']).toBe('return=minimal');
    expect(init.headers).toHaveProperty('apikey');
    expect(init.headers).toHaveProperty('Authorization');
  });

  it('passes keepalive through for page-exit events', async () => {
    await restInsert('puzzle_feedback', row, { keepalive: true });
    expect(fetchMock.mock.calls[0][1].keepalive).toBe(true);
  });

  it('returns true when the row lands', async () => {
    await expect(restInsert('puzzle_feedback', row)).resolves.toBe(true);
  });

  it('returns false and logs status + body when the insert is refused', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockResolvedValue({ ok: false, status: 403, text: () => Promise.resolve('denied') });

    await expect(restInsert('puzzle_feedback', row)).resolves.toBe(false);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('puzzle_feedback) failed: 403'),
      'denied',
    );
  });

  it('returns false and logs when the network throws', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockRejectedValue(new Error('offline'));

    await expect(restInsert('puzzle_feedback', row, { label: 'x' })).resolves.toBe(false);
    expect(spy).toHaveBeenCalledWith('x threw:', expect.any(Error));
  });
});
