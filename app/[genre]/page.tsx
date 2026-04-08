import { GamePage } from "../game-page";
import { createClient } from "@supabase/supabase-js";
import { type Genre } from "../../src/config/seoConfig";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { puzzleKeys } from "../../src/lib/supabase/storage/usePuzzleStorage";

function getTodayDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchDailyPuzzle(genre: string, date: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("puzzles")
    .select("id, groups, puzzle_date, created_at, metadata")
    .eq("puzzle_date", date)
    .eq("genre", genre)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;

  const groups = (data.groups as Array<{ id: string; items: Array<Record<string, unknown>>; connection: string; difficulty: string; color: string }>).map((g) => ({
    id: g.id,
    items: g.items,
    connection: g.connection,
    difficulty: g.difficulty,
    color: g.color,
  }));

  const items = groups.flatMap((g) => g.items);

  return {
    id: data.id,
    groups,
    items,
    createdAt: new Date(data.created_at).getTime(),
    metadata: data.metadata as Record<string, unknown> | undefined,
    puzzleDate: data.puzzle_date,
  };
}

export async function generateStaticParams() {
  return [
    { genre: 'films' },
    { genre: 'books' },
    { genre: 'music' },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  const today = getTodayDate();
  
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: puzzleKeys.daily(today, genre),
    queryFn: () => fetchDailyPuzzle(genre, today),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GamePage genre={genre as Genre} puzzleDate={today} />
    </HydrationBoundary>
  );
}
