-- Per-game id on game_events, for an exact drop-off count.
--
-- The client mints a random uuid the first time a game starts, keeps it in
-- localStorage for that genre + puzzle date, and sends it with both the
-- `started` and the finishing `won`/`lost` event. Drop-off = started ids with
-- no finish. The id is scoped to one game: it is not tied to a person and is
-- deleted from the browser once the game ends.
--
-- Nullable: rows from before this column carry no id; the dashboard falls
-- back to a bucket-level estimate for those. The table-level
-- `grant insert ... to anon` already covers new columns.

alter table public.game_events add column if not exists game_id uuid;

create index if not exists game_events_game_id_idx
  on public.game_events (game_id);
