-- Analytics and feedback tables.
-- game_events: one row per game lifecycle event (started/won/lost).
-- feedback:    one row per feedback modal submission.

create table public.game_events (
  id bigint generated always as identity primary key,
  event_type text not null check (event_type in ('started', 'won', 'lost')),
  genre text not null,
  puzzle_date date not null,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index game_events_created_at_idx on public.game_events (created_at desc);
create index game_events_event_type_created_at_idx on public.game_events (event_type, created_at);

alter table public.game_events enable row level security;

create policy "anon insert" on public.game_events
  for insert
  to anon, authenticated
  with check (true);

create table public.feedback (
  id bigint generated always as identity primary key,
  rating smallint not null check (rating between 1 and 5),
  comment text,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

create policy "anon insert" on public.feedback
  for insert
  to anon, authenticated
  with check (true);
