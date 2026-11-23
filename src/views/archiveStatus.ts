import type { ArchiveResult } from "../utils/archiveResults";

export type Status = "solved" | "lost" | "unplayed";

export function statusOf(result: ArchiveResult | undefined): Status {
  if (!result) return "unplayed";
  return result.won ? "solved" : "lost";
}

// Text + symbol carry the status; color only reinforces it.
export const STATUS_TEXT: Record<
  Status,
  { symbol: string; label: string; statLabel: string }
> = {
  solved: { symbol: "✓", label: "Solved", statLabel: "Solved" },
  lost: { symbol: "✗", label: "Lost", statLabel: "Lost" },
  unplayed: { symbol: "→", label: "Play", statLabel: "Unplayed" },
};

export const STATUS_ORDER: Status[] = ["solved", "lost", "unplayed"];

export function spokenStatus(result: ArchiveResult | undefined): string {
  const status = statusOf(result);
  if (status === "unplayed") return "not played";
  if (status === "lost") return "lost";
  const n = result!.mistakes;
  return `solved, ${n} ${n === 1 ? "mistake" : "mistakes"}`;
}
