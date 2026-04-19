import { supabase } from '../../lib/supabase/client';
import type { EventType } from './aggregateEvents';

interface GameEventMeta {
  genre: string;
  puzzleDate: string;
  userId?: string | null;
}

export async function trackGameEvent(type: EventType, meta: GameEventMeta): Promise<void> {
  try {
    await supabase.from('game_events').insert({
      event_type: type,
      genre: meta.genre,
      puzzle_date: meta.puzzleDate,
      user_id: meta.userId ?? null,
    } as never);
  } catch {
    // Fire-and-forget: never block UI on analytics failure.
  }
}
