import type { EventType } from './aggregateEvents';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

interface GameEventMeta {
  genre: string;
  puzzleDate: string;
  userId?: string | null;
}

export async function trackGameEvent(type: EventType, meta: GameEventMeta): Promise<void> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/game_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        event_type: type,
        genre: meta.genre,
        puzzle_date: meta.puzzleDate,
        user_id: meta.userId ?? null,
      }),
      keepalive: true,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`trackGameEvent(${type}) failed: ${res.status}`, text);
    }
  } catch (err) {
    console.error(`trackGameEvent(${type}) threw:`, err);
  }
}
