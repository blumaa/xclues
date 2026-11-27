import type { SupabaseClient } from "@supabase/supabase-js";
import { fetchAllPages } from "../../lib/supabase/fetchAllPages";
import type { GameEventRow } from "./aggregateEvents";

/** Every game event since `since`, paged in a stable id order. */
export function fetchAllEvents(
  supabase: SupabaseClient,
  since: string,
  pageSize?: number,
): Promise<GameEventRow[]> {
  return fetchAllPages<GameEventRow>(
    (from, to) =>
      supabase
        .from("game_events")
        .select("event_type, created_at, genre, source, game_id, mode")
        .gte("created_at", since)
        .order("id", { ascending: true })
        .range(from, to),
    pageSize,
  );
}
