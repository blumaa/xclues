import { restInsert } from '../../lib/supabase/restInsert';
import type { Genre } from '../../config/seoConfig';

/** Rating bounds; match the `puzzle_feedback.rating` CHECK constraint. */
export const RATING_MIN = 1;
export const RATING_MAX = 5;

export interface PuzzleFeedback {
  genre: Genre;
  puzzleDate: string;
  rating: number;
  comment: string;
}

/** A `puzzle_feedback` row as the dashboard reads it. */
export interface PuzzleFeedbackRow {
  id: number;
  created_at: string;
  genre: string;
  puzzle_date: string;
  rating: number;
  comment: string | null;
}

export function isValidRating(rating: number): boolean {
  return Number.isInteger(rating) && rating >= RATING_MIN && rating <= RATING_MAX;
}

/** Writes one response. Returns whether the row landed. */
export async function submitPuzzleFeedback(feedback: PuzzleFeedback): Promise<boolean> {
  if (!isValidRating(feedback.rating)) return false;

  const comment = feedback.comment.trim();

  return restInsert('puzzle_feedback', {
    genre: feedback.genre,
    puzzle_date: feedback.puzzleDate,
    rating: feedback.rating,
    comment: comment.length > 0 ? comment : null,
  });
}
