import { describe, it, expect } from 'vitest';
import { aggregateSurvey, type SurveyResponseRow } from '../aggregateSurvey';

function row(overrides: Partial<SurveyResponseRow> = {}): SurveyResponseRow {
  return {
    id: 1,
    created_at: '2026-08-19T00:00:00Z',
    frequency: 'daily',
    difficulty: 'just_right',
    favorite_genre: 'films',
    pmf: 'very_disappointed',
    improvement: null,
    ...overrides,
  };
}

describe('aggregateSurvey', () => {
  it('returns one distribution per question, in survey order', () => {
    const result = aggregateSurvey([row()]);
    expect(result.questions.map((q) => q.id)).toEqual([
      'frequency',
      'difficulty',
      'favorite_genre',
      'pmf',
    ]);
  });

  it('counts every option, including ones nobody picked', () => {
    const result = aggregateSurvey([row(), row({ id: 2, frequency: 'weekly' })]);
    const frequency = result.questions[0];

    expect(frequency.buckets.map((b) => [b.value, b.count])).toEqual([
      ['first_time', 0],
      ['sometimes', 0],
      ['weekly', 1],
      ['daily', 1],
    ]);
  });

  it('reports each option as a percentage of responses to that question', () => {
    const result = aggregateSurvey([
      row(),
      row({ id: 2 }),
      row({ id: 3, frequency: 'weekly' }),
      row({ id: 4, frequency: 'weekly' }),
    ]);
    const frequency = result.questions[0];

    expect(frequency.buckets.find((b) => b.value === 'daily')?.pct).toBe(50);
    expect(frequency.buckets.find((b) => b.value === 'weekly')?.pct).toBe(50);
  });

  it('ignores rows missing an answer when computing that question total', () => {
    const result = aggregateSurvey([row(), row({ id: 2, difficulty: null })]);

    expect(result.questions[0].total).toBe(2);
    expect(result.questions[1].total).toBe(1);
  });

  it('scores product-market fit as the share who would be very disappointed', () => {
    const result = aggregateSurvey([
      row(),
      row({ id: 2 }),
      row({ id: 3, pmf: 'somewhat_disappointed' }),
      row({ id: 4, pmf: 'not_disappointed' }),
    ]);

    expect(result.pmfScore).toBe(50);
  });

  it('reports no pmf score when nobody has answered that question', () => {
    const result = aggregateSurvey([row({ pmf: null })]);
    expect(result.pmfScore).toBeNull();
  });

  it('collects only the responses that left free text, newest first', () => {
    const result = aggregateSurvey([
      row({ id: 1, created_at: '2026-08-01T00:00:00Z', improvement: 'older' }),
      row({ id: 2, improvement: null }),
      row({ id: 3, created_at: '2026-08-10T00:00:00Z', improvement: 'newer' }),
    ]);

    expect(result.improvements.map((i) => i.improvement)).toEqual(['newer', 'older']);
  });

  it('counts total responses', () => {
    expect(aggregateSurvey([row(), row({ id: 2 })]).total).toBe(2);
  });

  it('handles an empty response set', () => {
    const result = aggregateSurvey([]);
    expect(result.total).toBe(0);
    expect(result.pmfScore).toBeNull();
    expect(result.improvements).toEqual([]);
    expect(result.questions[0].buckets.every((b) => b.count === 0 && b.pct === 0)).toBe(true);
  });
});
