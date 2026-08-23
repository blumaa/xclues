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

/**
 * Whether the survey is currently collecting.
 *
 * Paused for the difficulty-skew trial: the puzzles are being authored easier
 * for a month, so answers gathered mid-change would mix two curves and read as
 * neither. The modal, its submission path and this config all stay wired —
 * flipping this to true reinstates the nudge and starts a comparable round.
 *
 * The one-time storage flag is per user and is only burned on a real submit, so
 * pausing loses nobody: someone who never saw the survey is still asked when it
 * comes back.
 */
export const FEEDBACK_SURVEY_ACTIVE = false;

export interface SurveyEligibility {
  /** Whether localStorage has been read yet. */
  hydrated: boolean;
  gamesPlayed: number;
  alreadyAnswered: boolean;
}

/**
 * Whether to put the survey in front of this player.
 *
 * `active` is a parameter rather than a direct read of the constant so the
 * eligibility rules stay under test while collection is paused — they are the
 * behaviour we intend to restore, not dead code.
 */
export function shouldShowSurvey(
  { hydrated, gamesPlayed, alreadyAnswered }: SurveyEligibility,
  active: boolean = FEEDBACK_SURVEY_ACTIVE,
): boolean {
  if (!active) return false;
  // Gated on hydration: before localStorage is read the flag reads as unset,
  // which would flash the survey at everyone who already answered it.
  return hydrated && gamesPlayed >= FEEDBACK_MIN_GAMES && !alreadyAnswered;
}
