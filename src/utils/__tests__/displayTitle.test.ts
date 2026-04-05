import { describe, it, expect } from 'vitest';
import { getDisplayTitle } from '../displayTitle';

describe('getDisplayTitle', () => {
  it('returns title as-is when no artist field', () => {
    expect(getDisplayTitle({ title: 'Bohemian Rhapsody' })).toBe('Bohemian Rhapsody');
  });

  it('returns just the title when artist is provided separately', () => {
    expect(getDisplayTitle({ title: 'Believe', artist: 'Cher' })).toBe('Believe');
  });

  it('strips " - Artist" suffix from title when it matches the artist field', () => {
    expect(getDisplayTitle({ title: 'Believe - Cher', artist: 'Cher' })).toBe('Believe');
  });

  it('strips " - Artist" suffix even without artist field (for legacy data)', () => {
    expect(getDisplayTitle({ title: 'Believe - Cher' })).toBe('Believe');
  });

  it('preserves hyphens that are part of the actual song title', () => {
    expect(getDisplayTitle({ title: 'Un-Break My Heart', artist: 'Toni Braxton' })).toBe('Un-Break My Heart');
  });

  it('preserves title with " - " that is part of the song name (no artist match)', () => {
    expect(getDisplayTitle({ title: 'River Deep - Mountain High', artist: 'Ike & Tina Turner' })).toBe('River Deep - Mountain High');
  });

  it('handles title with artist suffix case-insensitively', () => {
    expect(getDisplayTitle({ title: 'Believe - CHER', artist: 'Cher' })).toBe('Believe');
  });

  it('handles empty title gracefully', () => {
    expect(getDisplayTitle({ title: '' })).toBe('');
  });

  it('strips artist suffix when title ends with " - ArtistName" and no artist field', () => {
    // Legacy data: title contains "Song - Artist" but no separate artist field
    // We can only strip if the format looks like "Title - SingleArtist"
    expect(getDisplayTitle({ title: 'Dreams - Fleetwood Mac' })).toBe('Dreams');
  });
});
