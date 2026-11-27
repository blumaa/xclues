import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServiceRoleClient } from "../../src/lib/supabase/server";
import {
  aggregateBySource,
  aggregateEventsByGenre,
  type GameEventRow,
} from "../../src/services/analytics/aggregateEvents";
import { fetchAllEvents } from "../../src/services/analytics/fetchAllEvents";
import { AnalidiotsView } from "../../src/views/AnalidiotsView";
import type { SurveyResponseRow } from "../../src/services/feedback/aggregateSurvey";
import { SURVEY_VERSION } from "../../src/services/feedback/survey";
import type { PuzzleFeedbackRow } from "../../src/services/feedback/puzzleFeedback";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

function sinceIso(): string {
  return new Date(Date.now() - NINETY_DAYS_MS).toISOString();
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
  let feedback: SurveyResponseRow[] = [];
  let puzzleFeedback: PuzzleFeedbackRow[] = [];

  if (supabase) {
    const [fetchedEvents, feedbackResult, puzzleFeedbackResult] = await Promise.all([
      fetchAllEvents(supabase, since),
      supabase
        .from("feedback")
        .select(
          "id, created_at, frequency, difficulty, favorite_genre, pmf, improvement",
        )
        .eq("survey_version", SURVEY_VERSION)
        .order("created_at", { ascending: false })
        .limit(500),
      supabase
        .from("puzzle_feedback")
        .select("id, created_at, genre, puzzle_date, rating, comment")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    events = fetchedEvents;
    if (feedbackResult.data) {
      feedback = feedbackResult.data as SurveyResponseRow[];
    }
    if (puzzleFeedbackResult.data) {
      puzzleFeedback = puzzleFeedbackResult.data;
    }
  }

  const data = aggregateEventsByGenre(events);
  const archive = aggregateEventsByGenre(events, new Date(), "archive");
  const bySource = aggregateBySource(events);

  return <AnalidiotsView data={data} archive={archive} bySource={bySource} feedback={feedback} puzzleFeedback={puzzleFeedback} />;
}
