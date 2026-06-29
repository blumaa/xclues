/**
 * Share Results Utility
 *
 * Functions for generating shareable text from game results.
 */

import type { GuessColor } from "../types/stats";
import { type Genre, VALID_GENRES, getSeoConfig } from "../config/seoConfig";

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

/**
 * Build a spoiler-free cross-promo line for the sibling games.
 * Derived from SEO config (single source of truth) so it stays in sync.
 */
function buildCrossPromo(genre: Genre): string {
  const siblings = VALID_GENRES.filter((g) => g !== genre).map(getSeoConfig);
  if (siblings.length === 0) return "";
  const names = siblings.map((c) => c.siteName).join(" & ");
  const domains = siblings.map((c) => c.domain).join(" · ");
  return `More puzzles — ${names}: ${domains}`;
}

interface ShareOptions {
  siteName: string;
  puzzleDate: string;
  guessHistory: GuessColor[][];
  domain: string;
  /** When provided, appends a cross-promo line for the other games. */
  genre?: Genre;
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
 * Play: https://filmclues.space
 * More puzzles — Litclues & Musiclues: litclues.space · musiclues.space
 * ```
 */
export function generateShareText({
  siteName,
  puzzleDate,
  guessHistory,
  domain,
  genre,
}: ShareOptions): string {
  const formattedDate = formatDateForShare(puzzleDate);
  const emojiGrid = guessHistoryToEmojis(guessHistory);
  const url = `https://${domain}`;

  let text = `${siteName} - ${formattedDate}\n${emojiGrid}\nPlay: ${url}`;

  if (genre) {
    const promo = buildCrossPromo(genre);
    if (promo) text += `\n${promo}`;
  }

  return text;
}

/**
 * Share text via Web Share API (mobile native share sheet).
 * Passing `url` separately lets share targets render a rich link card.
 * Falls back to clipboard copy if unavailable.
 */
export async function shareResults(text: string, url?: string): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(url ? { text, url } : { text });
      return true;
    } catch {
      // User cancelled or API failed — fall through to clipboard
    }
  }
  return copyToClipboard(text);
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
