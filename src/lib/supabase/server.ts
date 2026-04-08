/**
 * Server-side Supabase client
 *
 * Uses service role key when available for server components.
 * Falls back to anon key for public data access.
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  return createClient<Database>(supabaseUrl, supabaseKey);
}
