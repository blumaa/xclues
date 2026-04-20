-- Grant INSERT privilege on analytics/feedback tables to the anon role.
--
-- The prior migration (20260419085229_analytics_tables.sql) created RLS
-- policies that allow anon inserts, but Postgres checks base table
-- privileges *before* RLS. Without the base GRANT, anon inserts fail with
-- 401 / 42501 even though the policy's WITH CHECK would permit the row.
--
-- The trackGameEvent client swallows these errors silently, so in production
-- no started/won/lost events were being recorded from unauthenticated
-- sessions.

grant insert on public.game_events to anon;
grant insert on public.feedback to anon;
