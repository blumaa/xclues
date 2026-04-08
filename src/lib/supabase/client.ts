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

// Allow missing variables during testing and build (SSG prerendering)
const isTestOrBuild = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production';

if (!supabaseUrl || !supabaseAnonKey) {
  if (!isTestOrBuild) {
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
