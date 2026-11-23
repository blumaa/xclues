import type { Database } from './types';

type Tables = Database['public']['Tables'];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

interface RestInsertOptions {
  /** Let the request outlive the page (analytics fired on exit). */
  keepalive?: boolean;
  /** Log prefix; defaults to `restInsert(<table>)`. */
  label?: string;
}

/**
 * Inserts one row via PostgREST with the anon key. Plain fetch, so browser
 * code never ships supabase-js. Never throws: failures are logged and
 * reported as false so callers can decide what a lost row means.
 */
export async function restInsert<T extends keyof Tables>(
  table: T,
  row: Tables[T]['Insert'],
  { keepalive, label = `restInsert(${String(table)})` }: RestInsertOptions = {},
): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${String(table)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(row),
      ...(keepalive ? { keepalive } : {}),
    });
    if (!res.ok) {
      console.error(`${label} failed: ${res.status}`, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error(`${label} threw:`, err);
    return false;
  }
}
