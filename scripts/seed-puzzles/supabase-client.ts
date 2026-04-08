import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Bun.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = Bun.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = Bun.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const key = supabaseServiceKey || supabaseAnonKey;

if (!supabaseUrl || !key) {
  throw new Error(
    'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  );
}

if (supabaseServiceKey) {
  console.log('Using service role key (bypasses RLS)');
} else {
  console.log('Using anon key (subject to RLS policies)');
}

export const supabase = createClient(supabaseUrl, key);
