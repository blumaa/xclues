import { supabase } from '../../lib/supabase/client';

interface FeedbackPayload {
  rating: number;
  comment: string | null;
  userId?: string | null;
}

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  try {
    await supabase.from('feedback').insert({
      rating: payload.rating,
      comment: payload.comment,
      user_id: payload.userId ?? null,
    } as never);
  } catch {
    // Fire-and-forget: never block UI on feedback failure.
  }
}
