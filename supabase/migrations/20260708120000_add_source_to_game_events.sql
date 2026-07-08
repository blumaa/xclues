-- Add a traffic-attribution column to game_events.
--
-- `source` records the channel a player arrived from (e.g. 'reddit',
-- 'bluesky', 'mastodon'), captured client-side from a `?ref=` link param or
-- the HTTP referrer. Nullable: organic / dark-social traffic has no source.
-- The existing table-level `grant insert ... to anon` already covers this
-- new column, so no additional grant is needed.

alter table public.game_events add column if not exists source text;

create index if not exists game_events_source_created_at_idx
  on public.game_events (source, created_at);
