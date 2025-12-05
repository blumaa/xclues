/**
 * Share Results Utility
 *
 * Functions for generating shareable text from game results.
 */

import type { GuessColor } from "../types/stats";

const EMOJI_MAP: Record<GuessColor, string> = {
  yellow: "🟨",
  green: "🟩",
  blue: "🟦",
  purple: "🟪",
};

/**
 * Convert guess history to emoji grid string.
 */
function guessHistoryToEmojis(guessHistory: GuessColor[][]): string {
  return guessHistory
    .map((row) => row.map((color) => EMOJI_MAP[color]).join(""))
    .join("\n");
}

/**
 * Format a date for display (e.g., "December 4, 2025").
 */
function formatDateForShare(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00"); // Add time to avoid timezone issues
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface ShareOptions {
  siteName: string;
  puzzleDate: string;
  guessHistory: GuessColor[][];
  domain: string;
}

/**
 * Generate shareable text for game results.
 *
 * @example
 * ```
 * Filmclues - December 4, 2025
 * 🟨🟩🟦🟪
 * 🟨🟨🟨🟨
 * 🟩🟩🟩🟩
 * 🟦🟦🟦🟦
 * 🟪🟪🟪🟪
 * https://filmclues.space
 * ```
 */
export function generateShareText({
  siteName,
  puzzleDate,
  guessHistory,
  domain,
}: ShareOptions): string {
  const formattedDate = formatDateForShare(puzzleDate);
  const emojiGrid = guessHistoryToEmojis(guessHistory);
  const url = `https://${domain}`;

  return `${siteName} - ${formattedDate}\n${emojiGrid}\nPlay: ${url}`;
}

/**
 * Copy text to clipboard and return success status.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
