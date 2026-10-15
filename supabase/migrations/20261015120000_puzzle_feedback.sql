-- Per-puzzle feedback from the results panel.
--
-- One row per "Send Feedback" submission: which puzzle (genre + date), a 1-5
-- rating, and an optional free-text comment. Separate from `feedback`, which
-- holds the one-time product survey and is not tied to a puzzle.

create table public.puzzle_feedback (
  id bigint generated always as identity primary key,
  genre text not null check (genre in ('films', 'books', 'music')),
  puzzle_date date not null,
  rating smallint not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create index puzzle_feedback_created_at_idx
  on public.puzzle_feedback (created_at desc);

alter table public.puzzle_feedback enable row level security;

-- Players write; only the service-role dashboard reads.
create policy "anon insert" on public.puzzle_feedback
  for insert
  to anon, authenticated
  with check (true);

-- Postgres checks table privileges before RLS (see 20260420140757).
grant insert on public.puzzle_feedback to anon, authenticated;
