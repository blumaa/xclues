-- Returning-player signal on game_events, sent with 'started' only.
--   prior_games:     games this browser finished before on this site (0 = new)
--   days_since_last: UTC days since the latest of those (null when none)
-- Counts only, no identifier: separates new from returning players while
-- keeping the privacy page's "no tracking identifiers" promise. Null on
-- won/lost rows and on rows from before this column existed.
-- The table-level `grant insert ... to anon` covers new columns.

alter table public.game_events
  add column if not exists prior_games integer check (prior_games >= 0),
  add column if not exists days_since_last integer check (days_since_last >= 0);
