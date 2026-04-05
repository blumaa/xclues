import type { PuzzleDef } from './types';

interface SnapshotItem {
  id: number;
  title: string;
  artist?: string;
  year?: number;
  album?: string;
  [key: string]: unknown;
}

interface SnapshotGroup {
  id: string;
  connection: string;
  difficulty: string;
  color: string;
  items: SnapshotItem[];
}

/**
 * Find duplicate titles within a puzzle's groups snapshot (from DB).
 */
export function findDuplicatesInSnapshot(groups: SnapshotGroup[]): string[] {
  const seen = new Map<string, string>();
  const duplicates = new Set<string>();

  for (const group of groups) {
    for (const item of group.items) {
      const key = item.title.toLowerCase();
      if (seen.has(key)) {
        duplicates.add(seen.get(key)!);
      } else {
        seen.set(key, item.title);
      }
    }
  }

  return [...duplicates];
}

/**
 * Match a DB snapshot to a seed puzzle by comparing connection strings.
 * Returns the matching seed puzzle or undefined.
 */
function findMatchingSeedPuzzle(
  snapshotConnections: Set<string>,
  seedPuzzles: PuzzleDef[]
): PuzzleDef | undefined {
  return seedPuzzles.find(puzzle => {
    const seedConnections = new Set(puzzle.groups.map(g => g.connection));
    if (seedConnections.size !== snapshotConnections.size) return false;
    for (const conn of snapshotConnections) {
      if (!seedConnections.has(conn)) return false;
    }
    return true;
  });
}

/**
 * Build a patched groups snapshot using corrected seed data.
 * Preserves group IDs and item IDs from the original snapshot.
 * Returns null if no duplicates found or no matching seed puzzle.
 */
export function buildPatchesFromSnapshot(
  snapshot: SnapshotGroup[],
  seedPuzzles: PuzzleDef[]
): SnapshotGroup[] | null {
  const duplicates = findDuplicatesInSnapshot(snapshot);
  if (duplicates.length === 0) return null;

  const snapshotConnections = new Set(snapshot.map(g => g.connection));
  const seedPuzzle = findMatchingSeedPuzzle(snapshotConnections, seedPuzzles);
  if (!seedPuzzle) return null;

  // Build a map from connection -> seed group for quick lookup
  const seedGroupMap = new Map(seedPuzzle.groups.map(g => [g.connection, g]));

  // Patch each group: use seed data for titles/artist/year, preserve DB IDs
  return snapshot.map(dbGroup => {
    const seedGroup = seedGroupMap.get(dbGroup.connection);
    if (!seedGroup) return dbGroup;

    return {
      ...dbGroup,
      connection: seedGroup.connection,
      difficulty: seedGroup.difficulty,
      color: seedGroup.color,
      items: seedGroup.items.map((seedItem, i) => ({
        // Preserve the original item ID from DB
        id: dbGroup.items[i]?.id ?? i,
        title: seedItem.title,
        ...(seedItem.artist !== undefined && { artist: seedItem.artist }),
        ...(seedItem.year !== undefined && { year: seedItem.year }),
        ...(seedItem.album !== undefined && { album: seedItem.album }),
      })),
    };
  });
}
