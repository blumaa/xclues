/**
 * Review tomorrow's puzzle for each genre.
 *
 * Prints the next-day puzzle (films / music / books) so the owner can eyeball
 * it and approve, or ask for adjustments (see scripts/edit-puzzle.ts).
 *
 * Tomorrow's puzzle is already `published` but invisible to players until its
 * UTC date arrives, so reviewing + editing it in place today is safe.
 *
 * Usage: bun run puzzle:review
 */
import {
  GENRE_ORDER,
  GENRE_CONFIGS,
  getTomorrowDate,
  fetchPuzzle,
  type GenreConfig,
  type Puzzle,
} from './puzzle-model';

export function formatPuzzleForReview(
  config: GenreConfig,
  date: string,
  puzzle: Puzzle | null,
): string {
  const header = `${config.emoji}  ${config.siteName} — ${date}`;
  if (!puzzle) {
    return `${header}\n  ⚠️  NO PUZZLE for this date — gap, run the pipeline to fill it.`;
  }

  const lines = [header];
  puzzle.groups.forEach((g, i) => {
    lines.push(`  ${i + 1}. ${g.connection}  [${g.color}/${g.difficulty}]`);
    const items = g.items
      .map((it) => (it.artist ? `${it.title} — ${it.artist}` : it.title))
      .join('  ·  ');
    lines.push(`     ${items}`);
  });
  return lines.join('\n');
}

async function main(): Promise<void> {
  const date = getTomorrowDate();
  console.log(`\n=== Review — tomorrow's puzzles (${date}, UTC) ===\n`);

  let missing = 0;
  for (const genre of GENRE_ORDER) {
    const puzzle = await fetchPuzzle(genre, date);
    if (!puzzle) missing++;
    console.log(formatPuzzleForReview(GENRE_CONFIGS[genre], date, puzzle));
    console.log('');
  }

  if (missing > 0) {
    console.error(
      `⚠️  ${missing} genre(s) have no puzzle for ${date}. ` +
        `Fill via the admin pipeline (puzzlecules: bun run pipeline:fill) before the date arrives.`,
    );
    process.exit(1);
  }
}

// Only auto-run when executed directly, NOT when imported for its formatter.
if ((import.meta as { main?: boolean }).main) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
