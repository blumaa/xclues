/**
 * Extract just the song title for display, stripping any artist suffix.
 *
 * Handles these cases:
 * - title: "Believe", artist: "Cher" → "Believe"
 * - title: "Believe - Cher" (legacy DB data) → "Believe"
 * - title: "River Deep - Mountain High", artist: "Ike & Tina Turner" → keeps as-is (not an artist suffix)
 */
export function getDisplayTitle(item: { title: string; artist?: string }): string {
  const { title, artist } = item;

  if (!title) return '';

  // Check if title contains " - " pattern
  const separatorIndex = title.lastIndexOf(' - ');
  if (separatorIndex === -1) return title;

  const beforeSeparator = title.substring(0, separatorIndex);
  const afterSeparator = title.substring(separatorIndex + 3);

  // If we have an artist field, check if the suffix matches it
  if (artist) {
    if (afterSeparator.toLowerCase() === artist.toLowerCase()) {
      return beforeSeparator;
    }
    // Suffix doesn't match artist — it's part of the song title
    return title;
  }

  // No artist field — strip the suffix (legacy "Title - Artist" format)
  return beforeSeparator;
}
