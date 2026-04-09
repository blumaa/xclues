import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GameSkeleton } from '../GameSkeleton';

describe('GameSkeleton', () => {
  it('renders with role="status"', () => {
    const { getByRole } = render(<GameSkeleton />);
    expect(getByRole('status')).toBeTruthy();
  });

  it('renders 16 skeleton tiles in the game-grid layout', () => {
    const { container } = render(<GameSkeleton />);
    const grid = container.querySelector('.game-grid');
    expect(grid).toBeTruthy();
    const tiles = container.querySelectorAll('.game-skeleton__tile');
    expect(tiles).toHaveLength(16);
  });

  it('has aria-label', () => {
    const { getByRole } = render(<GameSkeleton />);
    expect(getByRole('status')).toHaveAttribute('aria-label', 'Loading puzzle');
  });
});
