import { describe, it, expect, vi, beforeEach } from 'vitest';

const { insertMock } = vi.hoisted(() => ({ insertMock: vi.fn() }));

vi.mock('../../../lib/supabase/restInsert', () => ({
  restInsert: insertMock,
}));

import { submitFeedback } from '../submitFeedback';
import { SURVEY_VERSION, type SurveyAnswers } from '../survey';

const answers: SurveyAnswers = {
  frequency: 'daily',
  difficulty: 'a_bit_hard',
  favorite_genre: 'music',
  pmf: 'very_disappointed',
  improvement: '  more music puzzles  ',
};

describe('submitFeedback', () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue(true);
  });

  it('inserts every answer plus the survey version', async () => {
    await submitFeedback(answers);

    expect(insertMock).toHaveBeenCalledWith(
      'feedback',
      {
      survey_version: SURVEY_VERSION,
      frequency: 'daily',
      difficulty: 'a_bit_hard',
      favorite_genre: 'music',
      pmf: 'very_disappointed',
      improvement: 'more music puzzles',
      user_id: null,
    });
  });

  it('trims the free text to null when it is blank', async () => {
    await submitFeedback({ ...answers, improvement: '   ' });

    expect(insertMock).toHaveBeenCalledWith(
      'feedback',
      expect.objectContaining({ improvement: null }),
    );
  });

  it('sends the user id when one is supplied', async () => {
    await submitFeedback(answers, 'user-123');

    expect(insertMock).toHaveBeenCalledWith(
      'feedback',
      expect.objectContaining({ user_id: 'user-123' }),
    );
  });

  it('returns true when the insert succeeds', async () => {
    await expect(submitFeedback(answers)).resolves.toBe(true);
  });

  it('returns false when the insert is refused', async () => {
    insertMock.mockResolvedValue(false);
    await expect(submitFeedback(answers)).resolves.toBe(false);
  });


  it('refuses to submit an incomplete survey', async () => {
    await expect(submitFeedback({ frequency: 'daily' })).resolves.toBe(false);
    expect(insertMock).not.toHaveBeenCalled();
  });
});
