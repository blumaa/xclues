import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createServiceRoleClient } from "../../src/lib/supabase/server";
import {
  aggregateEventsByGenre,
  type GameEventRow,
} from "../../src/services/analytics/aggregateEvents";
import {
  AnalidiotsView,
  type FeedbackRow,
} from "../../src/views/AnalidiotsView";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
const PAGE_SIZE = 1000;

function sinceIso(): string {
  return new Date(Date.now() - NINETY_DAYS_MS).toISOString();
}

async function fetchAllEvents(supabase: SupabaseClient, since: string): Promise<GameEventRow[]> {
  const all: GameEventRow[] = [];
  let from = 0;

  while (true) {
    const { data } = await supabase
      .from("game_events")
      .select("event_type, created_at, genre")
      .gte("created_at", since)
      .range(from, from + PAGE_SIZE - 1);

    if (!data || data.length === 0) break;
    all.push(...(data as GameEventRow[]));
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return all;
}

export default async function AnalidiotsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  // Closed by default: the dashboard is hidden unless ANALIDIOTS_SECRET is
  // configured AND the matching ?key=… is supplied. Full session-based auth
  // is deferred to the Security phase; this stops the page being public.
  const secret = process.env.ANALIDIOTS_SECRET;
  const { key } = await searchParams;
  if (!secret || key !== secret) {
    notFound();
  }

  const supabase = createServiceRoleClient();
  const since = sinceIso();

  let events: GameEventRow[] = [];
  let feedback: FeedbackRow[] = [];

  if (supabase) {
    const [fetchedEvents, feedbackResult] = await Promise.all([
      fetchAllEvents(supabase, since),
      supabase
        .from("feedback")
        .select("id, rating, comment, created_at")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    events = fetchedEvents;
    if (feedbackResult.data) {
      feedback = feedbackResult.data as FeedbackRow[];
    }
  }

  const data = aggregateEventsByGenre(events);

  return <AnalidiotsView data={data} feedback={feedback} />;
}
