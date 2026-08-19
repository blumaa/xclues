-- Feedback survey v2.
--
-- v1 was a 1-5 star rating plus a free comment. A star rating is not
-- actionable: "4 stars" does not say what to change. v2 replaces it with four
-- required multiple-choice questions plus one optional free-text answer.
--
-- Existing v1 rows are kept as-is: rating/comment stay on the table and
-- survey_version backfills to 1, so the two shapes are distinguishable.

-- v2 rows carry no rating.
alter table public.feedback alter column rating drop not null;

-- Backfill existing rows as v1, then make v2 the default for new inserts.
alter table public.feedback
  add column survey_version smallint not null default 1;
alter table public.feedback alter column survey_version set default 2;

alter table public.feedback
  add column frequency text
    check (frequency in ('first_time', 'sometimes', 'weekly', 'daily')),
  add column difficulty text
    check (difficulty in ('way_too_easy', 'a_bit_easy', 'just_right', 'a_bit_hard', 'way_too_hard')),
  add column favorite_genre text
    check (favorite_genre in ('films', 'books', 'music', 'all')),
  add column pmf text
    check (pmf in ('very_disappointed', 'somewhat_disappointed', 'not_disappointed')),
  add column improvement text;

-- The four choice questions are required on v2; the free text never is.
-- Enforced here as well as in the client so a malformed insert cannot land.
alter table public.feedback
  add constraint feedback_v2_answers_required check (
    survey_version < 2
    or (
      frequency is not null
      and difficulty is not null
      and favorite_genre is not null
      and pmf is not null
    )
  );

create index feedback_created_at_idx on public.feedback (created_at desc);
