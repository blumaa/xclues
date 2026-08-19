import { describe, it, expect } from 'vitest';
import {
  SURVEY_VERSION,
  SURVEY_QUESTIONS,
  IMPROVEMENT_PROMPT,
  isSurveyComplete,
  type SurveyAnswers,
} from '../survey';

describe('survey config', () => {
  it('is version 2 (v1 was the star rating)', () => {
    expect(SURVEY_VERSION).toBe(2);
  });

  it('asks the four required questions in segmentation-first order', () => {
    expect(SURVEY_QUESTIONS.map((q) => q.id)).toEqual([
      'frequency',
      'difficulty',
      'favorite_genre',
      'pmf',
    ]);
  });

  it('gives every question a prompt and at least three options', () => {
    for (const q of SURVEY_QUESTIONS) {
      expect(q.prompt.length).toBeGreaterThan(0);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('uses unique option values within each question', () => {
    for (const q of SURVEY_QUESTIONS) {
      const values = q.options.map((o) => o.value);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it('labels every option', () => {
    for (const q of SURVEY_QUESTIONS) {
      for (const o of q.options) {
        expect(o.label.length).toBeGreaterThan(0);
      }
    }
  });

  it('has a prompt for the optional free-text question', () => {
    expect(IMPROVEMENT_PROMPT.length).toBeGreaterThan(0);
  });

  it('matches the genre keys the game uses', () => {
    const genre = SURVEY_QUESTIONS.find((q) => q.id === 'favorite_genre');
    expect(genre?.options.map((o) => o.value)).toEqual([
      'films',
      'books',
      'music',
      'all',
    ]);
  });
});

describe('isSurveyComplete', () => {
  const full: SurveyAnswers = {
    frequency: 'daily',
    difficulty: 'just_right',
    favorite_genre: 'films',
    pmf: 'very_disappointed',
  };

  it('is true when all four questions are answered', () => {
    expect(isSurveyComplete(full)).toBe(true);
  });

  it('does not require the free-text answer', () => {
    expect(isSurveyComplete({ ...full, improvement: undefined })).toBe(true);
  });

  it.each(SURVEY_QUESTIONS.map((q) => q.id))('is false when %s is missing', (id) => {
    const partial = { ...full };
    delete partial[id as keyof SurveyAnswers];
    expect(isSurveyComplete(partial)).toBe(false);
  });
});
