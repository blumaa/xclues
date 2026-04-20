/**
 * Supabase Client
 *
 * Singleton client for interacting with Supabase backend.
 * Handles authentication, database queries, and storage.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Fail loudly on the server (SSR + SSG prerender during `next build`) when
// env vars are missing so broken deploys surface in Vercel build/logs.
// In the browser, fall back silently to a mock URL — `NEXT_PUBLIC_*` vars are
// inlined at build time, so throwing here would take down every user's page
// instead of only failing the build.
const isTest = process.env.NODE_ENV === 'test';
const isServer = typeof window === 'undefined';

if (!supabaseUrl || !supabaseAnonKey) {
  if (isServer && !isTest) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in .env.local'
    );
  }
}

/**
 * Supabase client instance with type safety
 */
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl || 'https://mock.supabase.co',
  supabaseAnonKey || 'mock-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
