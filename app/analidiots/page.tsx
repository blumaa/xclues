import type { Metadata } from "next";
import { createServerSupabaseClient } from "../../src/lib/supabase/server";
import {
  aggregateEvents,
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

function sinceIso(): string {
  return new Date(Date.now() - NINETY_DAYS_MS).toISOString();
}

export default async function AnalidiotsPage() {
  const supabase = createServerSupabaseClient();
  const since = sinceIso();

  let events: GameEventRow[] = [];
  let feedback: FeedbackRow[] = [];

  if (supabase) {
    const [eventsResult, feedbackResult] = await Promise.all([
      supabase
        .from("game_events")
        .select("event_type, created_at")
        .gte("created_at", since),
      supabase
        .from("feedback")
        .select("id, rating, comment, created_at")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    if (eventsResult.data) {
      events = eventsResult.data as GameEventRow[];
    }
    if (feedbackResult.data) {
      feedback = feedbackResult.data as FeedbackRow[];
    }
  }

  const data = aggregateEvents(events);

  return <AnalidiotsView data={data} feedback={feedback} />;
}
