-- Check for duplicate item IDs in puzzles
-- Run these queries against your Supabase database

-- ============================================================================
-- 1. QUICK CHECK: Find ALL scheduled puzzles (any genre) with duplicate item IDs
-- ============================================================================
WITH puzzle_items AS (
  SELECT
    p.id as puzzle_id,
    p.puzzle_date,
    p.genre,
    item->>'id' as item_id,
    item->>'title' as item_title
  FROM puzzles p,
       jsonb_array_elements(p.groups::jsonb) AS grp,
       jsonb_array_elements(grp->'items') AS item
  WHERE p.puzzle_date >= CURRENT_DATE
)
SELECT
  puzzle_id,
  puzzle_date,
  genre,
  item_id,
  item_title,
  count(*) as occurrences
FROM puzzle_items
GROUP BY puzzle_id, puzzle_date, genre, item_id, item_title
HAVING count(*) > 1
ORDER BY puzzle_date, genre, item_id;

-- ============================================================================
-- 2. DETAILED VIEW: See all items from today's films puzzle to find duplicates
-- ============================================================================
SELECT
  p.id as puzzle_id,
  p.puzzle_date,
  grp->>'connection' as connection,
  grp->>'color' as color,
  item->>'id' as item_id,
  item->>'title' as item_title,
  count(*) OVER (PARTITION BY item->>'id') as id_occurrences
FROM puzzles p,
     jsonb_array_elements(p.groups::jsonb) AS grp,
     jsonb_array_elements(grp->'items') AS item
WHERE p.genre = 'films'
  AND p.puzzle_date = CURRENT_DATE
ORDER BY grp->>'color', item->>'title';

-- ============================================================================
-- 3. SUMMARY: Count of problematic puzzles by date and genre
-- ============================================================================
WITH puzzle_items AS (
  SELECT
    p.id as puzzle_id,
    p.puzzle_date,
    p.genre,
    item->>'id' as item_id
  FROM puzzles p,
       jsonb_array_elements(p.groups::jsonb) AS grp,
       jsonb_array_elements(grp->'items') AS item
  WHERE p.puzzle_date >= CURRENT_DATE
),
duplicates AS (
  SELECT puzzle_id, puzzle_date, genre, item_id, count(*) as cnt
  FROM puzzle_items
  GROUP BY puzzle_id, puzzle_date, genre, item_id
  HAVING count(*) > 1
)
SELECT
  puzzle_date,
  genre,
  count(DISTINCT item_id) as duplicate_items_count,
  count(DISTINCT puzzle_id) as affected_puzzles
FROM duplicates
GROUP BY puzzle_date, genre
ORDER BY puzzle_date, genre;

-- ============================================================================
-- 4. CHECK: Puzzles with duplicate group_ids in the array itself
-- ============================================================================
SELECT
  id,
  puzzle_date,
  genre,
  group_ids,
  array_length(group_ids, 1) as total_ids,
  (SELECT count(DISTINCT g) FROM unnest(group_ids) g) as unique_ids
FROM puzzles
WHERE puzzle_date >= CURRENT_DATE
  AND array_length(group_ids, 1) != (SELECT count(DISTINCT g) FROM unnest(group_ids) g);

-- ============================================================================
-- 5. LIST: All affected puzzle IDs for music genre (for fixing)
-- ============================================================================
WITH puzzle_items AS (
  SELECT
    p.id as puzzle_id,
    p.puzzle_date,
    item->>'id' as item_id
  FROM puzzles p,
       jsonb_array_elements(p.groups::jsonb) AS grp,
       jsonb_array_elements(grp->'items') AS item
  WHERE p.genre = 'music'
    AND p.puzzle_date >= CURRENT_DATE
)
SELECT DISTINCT
  puzzle_id,
  puzzle_date
FROM puzzle_items
WHERE item_id IN (
  SELECT item_id
  FROM puzzle_items pi2
  WHERE pi2.puzzle_id = puzzle_items.puzzle_id
  GROUP BY pi2.puzzle_id, pi2.item_id
  HAVING count(*) > 1
)
ORDER BY puzzle_date;
