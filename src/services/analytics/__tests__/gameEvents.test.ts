import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackGameEvent } from '../gameEvents';

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockResolvedValue({ ok: true, status: 201 });
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('trackGameEvent', () => {
  it('POSTs a started event to the PostgREST endpoint with keepalive', async () => {
    await trackGameEvent('started', { genre: 'films', puzzleDate: '2026-04-19' });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/rest/v1/game_events'),
      expect.objectContaining({
        method: 'POST',
        keepalive: true,
        body: JSON.stringify({
          event_type: 'started',
          genre: 'films',
          puzzle_date: '2026-04-19',
          user_id: null,
        }),
      }),
    );
  });

  it('sends correct headers including apikey and authorization', async () => {
    await trackGameEvent('started', { genre: 'films', puzzleDate: '2026-04-19' });

    const callArgs = fetchMock.mock.calls[0][1];
    expect(callArgs.headers['Content-Type']).toBe('application/json');
    expect(callArgs.headers['Prefer']).toBe('return=minimal');
    expect(callArgs.headers).toHaveProperty('apikey');
    expect(callArgs.headers).toHaveProperty('Authorization');
  });

  it('sends a won event with optional userId', async () => {
    await trackGameEvent('won', {
      genre: 'music',
      puzzleDate: '2026-04-19',
      userId: 'user-123',
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toEqual({
      event_type: 'won',
      genre: 'music',
      puzzle_date: '2026-04-19',
      user_id: 'user-123',
    });
  });

  it('sends a lost event', async () => {
    await trackGameEvent('lost', { genre: 'books', puzzleDate: '2026-04-19' });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.event_type).toBe('lost');
  });

  it('logs non-ok responses to console.error', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockResolvedValue({
      ok: false,
      status: 403,
      text: () => Promise.resolve('permission denied'),
    });

    await trackGameEvent('won', { genre: 'films', puzzleDate: '2026-04-19' });

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('403'),
      expect.stringContaining('permission denied'),
    );
    spy.mockRestore();
  });

  it('does not throw on non-ok responses', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      text: () => Promise.resolve('internal error'),
    });

    await expect(
      trackGameEvent('won', { genre: 'films', puzzleDate: '2026-04-19' }),
    ).resolves.not.toThrow();
    vi.restoreAllMocks();
  });

  it('logs thrown errors to console.error', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockRejectedValue(new Error('network down'));

    await trackGameEvent('started', { genre: 'films', puzzleDate: '2026-04-19' });

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('trackGameEvent'),
      expect.any(Error),
    );
    spy.mockRestore();
  });
});
