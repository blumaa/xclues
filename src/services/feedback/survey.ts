/**
 * Single source of truth for the in-game feedback survey.
 *
 * This config drives the modal UI, the submission payload, the `feedback`
 * table columns and the /analidiots panels. Question ids are the column
 * names; option values are the values allowed by the table's CHECK
 * constraints. Changing anything here means a migration and a version bump.
 */

/** v1 was the 1-5 star rating; v2 is this multi-question survey. */
export const SURVEY_VERSION = 2;

export interface SurveyOption {
  value: string;
  label: string;
}

export interface SurveyQuestion {
  id: SurveyQuestionId;
  prompt: string;
  options: readonly SurveyOption[];
}

export type SurveyQuestionId =
  | 'frequency'
  | 'difficulty'
  | 'favorite_genre'
  | 'pmf';

/**
 * Frequency comes first on purpose: it is the segmentation key. "Too hard"
 * from a daily player means recalibrate the curve; the same answer from a
 * first-timer means the onboarding is wrong.
 */
export const SURVEY_QUESTIONS: readonly SurveyQuestion[] = [
  {
    id: 'frequency',
    prompt: 'How often do you play xClues?',
    options: [
      { value: 'first_time', label: 'First time today' },
      { value: 'sometimes', label: 'Once in a while' },
      { value: 'weekly', label: 'A few times a week' },
      { value: 'daily', label: 'Every day' },
    ],
  },
  {
    id: 'difficulty',
    prompt: 'How hard are the puzzles for you?',
    options: [
      { value: 'way_too_easy', label: 'Way too easy' },
      { value: 'a_bit_easy', label: 'A bit easy' },
      { value: 'just_right', label: 'Just right' },
      { value: 'a_bit_hard', label: 'A bit hard' },
      { value: 'way_too_hard', label: 'Way too hard' },
    ],
  },
  {
    id: 'favorite_genre',
    prompt: 'Which do you play the most?',
    options: [
      { value: 'films', label: 'Films' },
      { value: 'books', label: 'Books' },
      { value: 'music', label: 'Music' },
      { value: 'all', label: 'All three' },
    ],
  },
  {
    // Sean Ellis product-market-fit test: 40%+ "very disappointed" is the
    // threshold where acquisition spend stops leaking out the bottom.
    id: 'pmf',
    prompt: 'How would you feel if xClues went away tomorrow?',
    options: [
      { value: 'very_disappointed', label: 'Very disappointed' },
      { value: 'somewhat_disappointed', label: 'Somewhat disappointed' },
      { value: 'not_disappointed', label: 'Not disappointed' },
    ],
  },
] as const;

/** "One thing" forces prioritisation, so answers stay short and codeable. */
export const IMPROVEMENT_PROMPT = 'What one thing would make xClues better?';

export type SurveyAnswers = Partial<Record<SurveyQuestionId, string>> & {
  improvement?: string;
};

/** The four choice questions are required; the free text never is. */
export function isSurveyComplete(answers: SurveyAnswers): boolean {
  return SURVEY_QUESTIONS.every((q) => Boolean(answers[q.id]));
}

/**
 * One-time flag marking that this user has answered the survey.
 *
 * Version-suffixed: the v1 key (`xclues-feedback-shown`) is deliberately
 * ignored so people who rated the old star survey still see this one.
 */
export const FEEDBACK_STORAGE_KEY = 'xclues-feedback-v2';

/**
 * Completed puzzles required before the survey appears. A brand-new visitor
 * cannot answer the difficulty or genre questions honestly, and the flag
 * burns permanently — so we spend the one shot on someone who has played.
 */
export const FEEDBACK_MIN_GAMES = 1;
