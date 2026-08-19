import { supabase } from '../../lib/supabase/client';
import { SURVEY_VERSION, isSurveyComplete, type SurveyAnswers } from './survey';

/**
 * Writes one survey response.
 *
 * Returns whether the row actually landed. The caller uses that to decide
 * whether to burn the user's one-time localStorage flag: a swallowed failure
 * would mark the survey "done" while losing the response forever.
 */
export async function submitFeedback(
  answers: SurveyAnswers,
  userId?: string | null,
): Promise<boolean> {
  if (!isSurveyComplete(answers)) return false;

  const improvement = answers.improvement?.trim();

  // Columns are spelled out rather than looped over SURVEY_QUESTIONS so the
  // generated table types can check them. survey.ts stays the source of truth
  // for which questions exist and which values they accept.
  const row = {
    survey_version: SURVEY_VERSION,
    frequency: answers.frequency ?? null,
    difficulty: answers.difficulty ?? null,
    favorite_genre: answers.favorite_genre ?? null,
    pmf: answers.pmf ?? null,
    improvement: improvement && improvement.length > 0 ? improvement : null,
    user_id: userId ?? null,
  };

  try {
    const { error } = await supabase.from('feedback').insert(row);
    return !error;
  } catch {
    return false;
  }
}
