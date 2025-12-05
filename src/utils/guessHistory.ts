/**
 * Guess History Utilities
 *
 * Functions for converting game guesses to color patterns
 * for display and sharing.
 */

import type { Group } from '../types';
import type { GuessColor } from '../types/stats';

/**
 * Convert an array of item IDs to their corresponding group colors.
 *
 * @param itemIds - Array of 4 item IDs from a guess
 * @param groups - All groups in the puzzle
 * @returns Array of 4 colors corresponding to each item's group
 */
export function guessToColors(itemIds: number[], groups: Group[]): GuessColor[] {
  return itemIds.map((itemId) => {
    const group = groups.find((g) => g.items.some((item) => item.id === itemId));
    return (group?.color ?? 'yellow') as GuessColor;
  });
}

/**
 * Convert all guesses to a color history grid.
 *
 * @param previousGuesses - Array of guess arrays (each containing 4 item IDs)
 * @param groups - All groups in the puzzle
 * @returns 2D array of colors representing the guess history
 */
export function guessesToColorHistory(
  previousGuesses: number[][],
  groups: Group[]
): GuessColor[][] {
  return previousGuesses.map((guess) => guessToColors(guess, groups));
}
