import type { Group } from "../../types";

/**
 * Item ids only need to be unique *within* a single puzzle — they are used as
 * React keys and as the identity for tile selection, never as a stable
 * cross-puzzle key. Some stored puzzle snapshots combine groups whose items
 * were numbered locally (e.g. 0..3 per group), so ids collide across the
 * puzzle and clicking one tile selects two.
 *
 * This reindexes any colliding id to a fresh unused id, preserving
 * already-unique ids (so existing saved game state stays valid) and the
 * order/contents of every group. It is the single enforcement point for the
 * "unique item ids within a puzzle" invariant; apply it at every read path
 * that assembles a puzzle from stored groups.
 */
export function ensureUniqueItemIds(groups: Group[]): Group[] {
  const seen = new Set<number>();
  let nextId = groups.flatMap((g) => g.items).reduce((max, item) => Math.max(max, item.id), -1) + 1;

  return groups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      let id = item.id;
      if (seen.has(id)) {
        id = nextId++;
      }
      seen.add(id);
      return { ...item, id };
    }),
  }));
}
