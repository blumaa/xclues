import { describe, it, expect, vi, beforeEach } from 'vitest';

const insertMock = vi.fn();

vi.mock('../../../lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({ insert: insertMock })),
  },
}));

import { trackGameEvent } from '../gameEvents';
import { supabase } from '../../../lib/supabase/client';

describe('trackGameEvent', () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
    (supabase.from as ReturnType<typeof vi.fn>).mockClear();
  });

  it('inserts a started event with the given meta', async () => {
    await trackGameEvent('started', { genre: 'films', puzzleDate: '2026-04-19' });

    expect(supabase.from).toHaveBeenCalledWith('game_events');
    expect(insertMock).toHaveBeenCalledWith({
      event_type: 'started',
      genre: 'films',
      puzzle_date: '2026-04-19',
      user_id: null,
    });
  });

  it('inserts a won event with optional userId', async () => {
    await trackGameEvent('won', {
      genre: 'music',
      puzzleDate: '2026-04-19',
      userId: 'user-123',
    });

    expect(insertMock).toHaveBeenCalledWith({
      event_type: 'won',
      genre: 'music',
      puzzle_date: '2026-04-19',
      user_id: 'user-123',
    });
  });

  it('inserts a lost event', async () => {
    await trackGameEvent('lost', { genre: 'books', puzzleDate: '2026-04-19' });

    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({ event_type: 'lost' }),
    );
  });

  it('swallows insert errors and does not throw', async () => {
    insertMock.mockResolvedValue({ error: { message: 'boom' } });
    await expect(
      trackGameEvent('won', { genre: 'films', puzzleDate: '2026-04-19' }),
    ).resolves.not.toThrow();
  });

  it('swallows thrown errors and does not throw', async () => {
    insertMock.mockRejectedValue(new Error('network down'));
    await expect(
      trackGameEvent('started', { genre: 'films', puzzleDate: '2026-04-19' }),
    ).resolves.not.toThrow();
  });
});
