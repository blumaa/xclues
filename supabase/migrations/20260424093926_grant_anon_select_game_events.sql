-- Allow the anon role to read game_events for the analytics dashboard.
--
-- RLS is enabled on game_events with only an INSERT policy. The analytics
-- page falls back to the anon key when SUPABASE_SERVICE_ROLE_KEY is not
-- set, so SELECT queries return zero rows. This adds a permissive SELECT
-- policy so the dashboard works without the service role key.

create policy "anon select" on public.game_events
  for select
  to anon, authenticated
  using (true);
