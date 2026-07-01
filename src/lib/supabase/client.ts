/**
 * Supabase Client
 *
 * Lazily-initialised singleton for the Supabase backend (auth, DB, storage).
 * The underlying client is created on first use, not at module load, so
 * importing this module has no side effects. That lets `next build` prerender
 * pages that never touch Supabase without env vars being present, while a real
 * request that needs the client still validates config at the point of use.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

let client: SupabaseClient<Database> | null = null;

/**
 * Create (once) and return the Supabase client, validating config on first use.
 */
function getClient(): SupabaseClient<Database> {
  if (client) return client;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    const isTest = process.env.NODE_ENV === 'test';
    const isServer = typeof window === 'undefined';
    // Fail loudly when the client is actually used on the server without config
    // — that's a broken deploy. In the browser, fall back to a mock so a
    // misconfigured build doesn't take down every page. Tests use the mock too.
    if (isServer && !isTest) {
      throw new Error(
        'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in .env.local'
      );
    }
  }

  client = createClient<Database>(
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
  return client;
}

/**
 * Supabase client instance with type safety.
 *
 * A lazy proxy: the underlying client (and its env-var validation) is created
 * on first property access, keeping module import side-effect-free.
 */
export const supabase: SupabaseClient<Database> = new Proxy(
  {} as SupabaseClient<Database>,
  {
    get(_target, prop) {
      const c = getClient();
      const value = Reflect.get(c, prop, c);
      return typeof value === 'function' ? value.bind(c) : value;
    },
  }
);
