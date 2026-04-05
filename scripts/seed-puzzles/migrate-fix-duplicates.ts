/**
 * Migration script: fix duplicate items in published puzzles.
 *
 * Reads all published puzzles from the DB, checks each for duplicate
 * item titles, and patches them using the corrected seed data.
 *
 * Usage: bun scripts/seed-puzzles/migrate-fix-duplicates.ts [--dry-run]
 */
import { supabase } from './supabase-client';
import { musicPuzzles } from './music-puzzles';
import { musicGapPuzzles } from './music-gaps';
import { bookPuzzles } from './book-puzzles';
import { bookGapPuzzles } from './book-gaps';
import { findDuplicatesInSnapshot, buildPatchesFromSnapshot } from './fix-duplicates-migration';
import type { PuzzleDef } from './types';

const dryRun = process.argv.includes('--dry-run');

// All corrected seed puzzles in one array
const allSeedPuzzles: PuzzleDef[] = [
  ...musicPuzzles,
  ...musicGapPuzzles,
  ...bookPuzzles,
  ...bookGapPuzzles,
];

async function migrate() {
  console.log(`${dryRun ? '[DRY RUN] ' : ''}Fetching published puzzles...`);

  const { data: puzzles, error } = await supabase
    .from('puzzles')
    .select('id, puzzle_date, genre, groups')
    .eq('status', 'published')
    .not('groups', 'is', null);

  if (error) {
    console.error('Failed to fetch puzzles:', error.message);
    process.exit(1);
  }

  if (!puzzles || puzzles.length === 0) {
    console.log('No published puzzles found.');
    return;
  }

  console.log(`Found ${puzzles.length} published puzzles. Checking for duplicates...`);

  let duplicateCount = 0;
  let patchedCount = 0;
  let unmatchedCount = 0;

  for (const puzzle of puzzles) {
    const snapshot = puzzle.groups as any[];
    if (!Array.isArray(snapshot) || snapshot.length === 0) continue;

    const duplicates = findDuplicatesInSnapshot(snapshot);
    if (duplicates.length === 0) continue;

    duplicateCount++;
    console.log(`\n[${puzzle.puzzle_date}] ${puzzle.genre} — duplicates: ${duplicates.join(', ')}`);

    const patched = buildPatchesFromSnapshot(snapshot, allSeedPuzzles);
    if (!patched) {
      console.log('  ⚠ No matching seed puzzle found — cannot auto-fix');
      unmatchedCount++;
      continue;
    }

    // Verify the patch actually removes all duplicates
    const remainingDupes = findDuplicatesInSnapshot(patched as any);
    if (remainingDupes.length > 0) {
      console.log(`  ⚠ Patch still has duplicates: ${remainingDupes.join(', ')} — skipping`);
      unmatchedCount++;
      continue;
    }

    if (dryRun) {
      console.log('  ✓ Would patch (dry run)');
      for (let i = 0; i < snapshot.length; i++) {
        const oldTitles = snapshot[i].items.map((it: any) => it.title);
        const newTitles = patched[i].items.map((it: any) => it.title);
        const changed = oldTitles.some((t: string, j: number) => t !== newTitles[j]);
        if (changed) {
          console.log(`    [${snapshot[i].connection}]`);
          console.log(`      old: ${oldTitles.join(', ')}`);
          console.log(`      new: ${newTitles.join(', ')}`);
        }
      }
      patchedCount++;
      continue;
    }

    // Update the puzzle's groups snapshot
    const { error: updateError } = await supabase
      .from('puzzles')
      .update({ groups: patched as unknown })
      .eq('id', puzzle.id);

    if (updateError) {
      console.log(`  ✗ Failed to update puzzle: ${updateError.message}`);
      continue;
    }
    console.log('  ✓ Patched puzzle snapshot');

    // Also update the connection_groups table for changed groups
    for (let i = 0; i < patched.length; i++) {
      const oldTitles = snapshot[i].items.map((it: any) => it.title).sort().join(',');
      const newTitles = patched[i].items.map((it: any) => it.title).sort().join(',');
      if (oldTitles !== newTitles) {
        const { error: groupError } = await supabase
          .from('connection_groups')
          .update({ items: patched[i].items as unknown })
          .eq('id', patched[i].id);

        if (groupError) {
          console.log(`  ✗ Failed to update connection_group ${patched[i].id}: ${groupError.message}`);
        } else {
          console.log(`  ✓ Updated connection_group: ${patched[i].connection}`);
        }
      }
    }

    patchedCount++;
    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`\n--- Summary ---`);
  console.log(`Puzzles with duplicates: ${duplicateCount}`);
  console.log(`Patched: ${patchedCount}`);
  console.log(`Unmatched (need manual fix): ${unmatchedCount}`);
  if (dryRun) console.log('(dry run — no changes written)');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
