/**
 * Server-side Supabase client factories.
 *
 * Least privilege: pick the narrowest client for the job.
 *  - createAnonServerClient    → anon key, RLS-enforced. Use for public reads.
 *  - createServiceRoleClient   → service-role key, bypasses RLS. Use only for
 *                                privileged server work (e.g. the analytics
 *                                dashboard reading protected tables).
 *  - createServerSupabaseClient → legacy "service-role or anon" fallback, kept
 *                                for back-compat. Public read paths can migrate
 *                                to createAnonServerClient once the RLS policy
 *                                for published puzzles is confirmed.
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function supabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
}

function anonKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY
  );
}

/** Anon client (RLS-enforced) for public data reads. */
export function createAnonServerClient() {
  const url = supabaseUrl();
  const key = anonKey();
  if (!url || !key) return null;
  return createClient<Database>(url, key);
}

/** Service-role client (bypasses RLS). Privileged server use only. */
export function createServiceRoleClient() {
  const url = supabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient<Database>(url, key);
}

/**
 * Legacy factory: service-role when available, else anon. Prefer the explicit
 * factories above in new code.
 */
export function createServerSupabaseClient() {
  const url = supabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || anonKey();
  if (!url || !key) return null;
  return createClient<Database>(url, key);
}
