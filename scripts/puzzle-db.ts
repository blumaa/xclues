/**
 * Shared Supabase access for the daily puzzle-review tooling
 * (review / edit / set-group). Service-role or anon key from .env.local.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Genre, PuzzleGroup } from './post-daily-bluesky';

export function getPuzzleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL + a key).');
  return createClient(url, key);
}

export async function fetchPuzzleRow(
  client: SupabaseClient,
  genre: Genre,
  date: string,
): Promise<{ id: string; groups: PuzzleGroup[] }> {
  const { data, error } = await client
    .from('puzzles')
    .select('id, groups')
    .eq('puzzle_date', date)
    .eq('genre', genre)
    .eq('status', 'published')
    .maybeSingle();

  if (error) throw new Error(`Fetch failed: ${error.message}`);
  if (!data) throw new Error(`No published puzzle for ${genre} on ${date}.`);
  return { id: data.id as string, groups: data.groups as PuzzleGroup[] };
}

export async function writeGroups(
  client: SupabaseClient,
  id: string,
  groups: PuzzleGroup[],
): Promise<void> {
  const { error } = await client.from('puzzles').update({ groups }).eq('id', id);
  if (error) throw new Error(`Update failed: ${error.message}`);
}
