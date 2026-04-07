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

// Allow missing variables during testing
const isTest = process.env.NODE_ENV === 'test';

if (!supabaseUrl || !supabaseAnonKey) {
  if (!isTest) {
    throw new Error(
      'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
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
