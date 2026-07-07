import { describe, it, expect } from 'vitest';
import { formatPuzzleForReview } from '../review-next-puzzle';
import { GENRE_CONFIGS, type Puzzle } from '../post-daily-bluesky';

const puzzle: Puzzle = {
  id: 'p1',
  groups: [
    {
      id: 'g1',
      color: 'yellow',
      difficulty: 'easy',
      connection: 'Spielberg films',
      items: [
        { id: 1, title: 'Jaws' },
        { id: 2, title: 'E.T.' },
        { id: 3, title: 'Hook' },
        { id: 4, title: '1941' },
      ],
    },
  ],
};

describe('formatPuzzleForReview', () => {
  it('renders header with site name and date', () => {
    const out = formatPuzzleForReview(GENRE_CONFIGS.films, '2026-07-07', puzzle);
    expect(out).toContain('Filmclues');
    expect(out).toContain('2026-07-07');
  });

  it('renders each group connection with color and difficulty', () => {
    const out = formatPuzzleForReview(GENRE_CONFIGS.films, '2026-07-07', puzzle);
    expect(out).toContain('Spielberg films');
    expect(out).toContain('yellow');
    expect(out).toContain('easy');
  });

  it('renders all four item titles', () => {
    const out = formatPuzzleForReview(GENRE_CONFIGS.films, '2026-07-07', puzzle);
    for (const title of ['Jaws', 'E.T.', 'Hook', '1941']) {
      expect(out).toContain(title);
    }
  });

  it('appends the artist when present (music)', () => {
    const music: Puzzle = {
      id: 'm1',
      groups: [
        {
          id: 'g1',
          color: 'green',
          difficulty: 'medium',
          connection: 'One-word titles',
          items: [{ id: 1, title: 'Thriller', artist: 'Michael Jackson' }],
        },
      ],
    };
    const out = formatPuzzleForReview(GENRE_CONFIGS.music, '2026-07-07', music);
    expect(out).toContain('Thriller');
    expect(out).toContain('Michael Jackson');
  });

  it('flags a missing puzzle as a gap', () => {
    const out = formatPuzzleForReview(GENRE_CONFIGS.books, '2026-07-07', null);
    expect(out).toContain('Litclues');
    expect(out.toUpperCase()).toContain('NO PUZZLE');
  });
});
