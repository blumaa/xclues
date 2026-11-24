import type { EventType } from './aggregateEvents';
import { getAttributionSource } from './attribution';
import type { PlayMode } from '../../types/stats';
import type { ReturnSignal } from './returnSignal';
import { restInsert } from '../../lib/supabase/restInsert';


interface GameEventMeta {
  genre: string;
  puzzleDate: string;
  userId?: string | null;
  /** Overrides the session-captured attribution source; defaults to it. */
  source?: string | null;
  /** Per-game id (see gameId.ts); null for games started before it existed. */
  gameId?: string | null;
  /** Daily (today's puzzle) or archive (past date replayed). Defaults to daily. */
  mode?: PlayMode;
  /** Returning-player counts (see returnSignal.ts); sent with `started` only. */
  returning?: ReturnSignal;
}

export async function trackGameEvent(type: EventType, meta: GameEventMeta): Promise<void> {
  // Local dev (`next dev`) must not pollute production analytics.
  if (process.env.NODE_ENV === 'development') return;

  await restInsert(
    'game_events',
    {
      event_type: type,
      genre: meta.genre,
      puzzle_date: meta.puzzleDate,
      user_id: meta.userId ?? null,
      source: meta.source ?? getAttributionSource(),
      game_id: meta.gameId ?? null,
      mode: meta.mode ?? 'daily',
      prior_games: meta.returning?.priorGames ?? null,
      days_since_last: meta.returning?.daysSinceLast ?? null,
    },
    { keepalive: true, label: `trackGameEvent(${type})` },
  );
}
