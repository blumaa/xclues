-- Play mode on game_events: 'daily' = today's live puzzle, 'archive' = a past
-- date replayed from the archive.
--
-- The dashboard's daily funnel counts by created_at, so archive replays would
-- otherwise inflate "today" numbers. Existing rows are all daily plays, hence
-- the default. The table-level `grant insert ... to anon` covers new columns.

alter table public.game_events
  add column if not exists mode text not null default 'daily'
  check (mode in ('daily', 'archive'));
