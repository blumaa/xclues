import { describe, it, expect, vi, beforeEach } from 'vitest';

const { insertMock } = vi.hoisted(() => ({ insertMock: vi.fn() }));

vi.mock('../../../lib/supabase/restInsert', () => ({
  restInsert: insertMock,
}));

import {
  isValidRating,
  submitPuzzleFeedback,
  type PuzzleFeedback,
} from '../puzzleFeedback';

const feedback: PuzzleFeedback = {
  genre: 'films',
  puzzleDate: '2026-10-15',
  rating: 4,
  comment: '  purple was brutal  ',
};

describe('isValidRating', () => {
  it.each([1, 2, 3, 4, 5])('accepts %i', (n) => {
    expect(isValidRating(n)).toBe(true);
  });

  it.each([0, 6, 2.5, NaN])('rejects %s', (n) => {
    expect(isValidRating(n)).toBe(false);
  });
});

describe('submitPuzzleFeedback', () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue(true);
  });

  it('inserts genre, puzzle date, rating and trimmed comment', async () => {
    await submitPuzzleFeedback(feedback);

    expect(insertMock).toHaveBeenCalledWith(
      'puzzle_feedback',{
      genre: 'films',
      puzzle_date: '2026-10-15',
      rating: 4,
      comment: 'purple was brutal',
    });
  });

  it('stores a blank comment as null', async () => {
    await submitPuzzleFeedback({ ...feedback, comment: '   ' });

    expect(insertMock).toHaveBeenCalledWith(
      'puzzle_feedback',
      expect.objectContaining({ comment: null }),
    );
  });

  it('returns true when the insert succeeds', async () => {
    await expect(submitPuzzleFeedback(feedback)).resolves.toBe(true);
  });

  it('returns false when the insert is refused', async () => {
    insertMock.mockResolvedValue(false);
    await expect(submitPuzzleFeedback(feedback)).resolves.toBe(false);
  });


  it('refuses an out-of-range rating without writing', async () => {
    await expect(submitPuzzleFeedback({ ...feedback, rating: 0 })).resolves.toBe(false);
    expect(insertMock).not.toHaveBeenCalled();
  });
});
