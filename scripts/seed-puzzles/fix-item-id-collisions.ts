/**
 * Migration: fix duplicate item IDs within published puzzle snapshots.
 *
 * Item ids must be unique within a puzzle (used as React key + tile-selection
 * identity). Some snapshots combined groups numbered locally (0..3), colliding
 * across the puzzle so one click selected two tiles. This reindexes only the
 * colliding ids to fresh unused ids, preserving already-unique ids.
 *
 * Usage: bun scripts/seed-puzzles/fix-item-id-collisions.ts [--apply]
 *   (dry-run by default; pass --apply to write)
 */
import { supabase } from './supabase-client';

const apply = process.argv.includes('--apply');

interface SnapItem { id: number; [k: string]: unknown }
interface SnapGroup { id: string; items: SnapItem[]; [k: string]: unknown }

function reindex(groups: SnapGroup[]): { groups: SnapGroup[]; changed: boolean } {
  const seen = new Set<number>();
  let nextId = groups.flatMap(g => g.items).reduce((max, it) => Math.max(max, it.id), -1) + 1;
  let changed = false;

  const fixed = groups.map(g => ({
    ...g,
    items: g.items.map(it => {
      let id = it.id;
      if (seen.has(id)) { id = nextId++; changed = true; }
      seen.add(id);
      return { ...it, id };
    }),
  }));

  return { groups: fixed, changed };
}

async function run() {
  const { data, error } = await supabase
    .from('puzzles')
    .select('id, genre, puzzle_date, groups')
    .eq('status', 'published')
    .not('groups', 'is', null);

  if (error) { console.error(error.message); process.exit(1); }

  let fixedCount = 0;
  for (const p of data ?? []) {
    const groups = p.groups as SnapGroup[];
    if (!Array.isArray(groups)) continue;

    const { groups: newGroups, changed } = reindex(groups);
    if (!changed) continue;

    const before = groups.flatMap(g => g.items.map(i => i.id));
    const after = newGroups.flatMap(g => g.items.map(i => i.id));
    console.log(`${apply ? 'FIX ' : 'DRY '} ${p.puzzle_date} ${p.genre} ${p.id}`);
    console.log(`  before ids: [${before.join(', ')}]`);
    console.log(`  after  ids: [${after.join(', ')}]`);

    if (apply) {
      const { error: upErr } = await supabase
        .from('puzzles')
        .update({ groups: newGroups as unknown })
        .eq('id', p.id);
      if (upErr) { console.log(`  ✗ ${upErr.message}`); continue; }
      console.log('  ✓ written');
      await new Promise(r => setTimeout(r, 120));
    }
    fixedCount++;
  }

  console.log(`\n${apply ? 'Fixed' : 'Would fix'} ${fixedCount} puzzles.${apply ? '' : ' Re-run with --apply to write.'}`);
}

run().catch(e => { console.error(e); process.exit(1); });
