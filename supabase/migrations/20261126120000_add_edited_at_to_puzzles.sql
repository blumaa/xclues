-- Last time a puzzle's groups changed. Players who finished a puzzle before
-- this time get a fresh board (the browser drops the stale result).
-- Backfilled from created_at so no existing result goes stale.
-- Trigger bumps it only when groups change, not on status/metadata edits.

alter table public.puzzles
  add column if not exists edited_at timestamptz;

update public.puzzles set edited_at = created_at where edited_at is null;

create or replace function public.puzzles_touch_edited_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.groups is distinct from old.groups then
    new.edited_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists puzzles_touch_edited_at on public.puzzles;
create trigger puzzles_touch_edited_at
  before update on public.puzzles
  for each row execute function public.puzzles_touch_edited_at();
