import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsPanel } from '../ResultsPanel';
import type { GuessColor } from '../../../types/stats';

// Mock providers that ResultsPanel depends on
vi.mock('../../../providers/useStats', () => ({
  useStats: () => ({
    getStats: vi.fn().mockResolvedValue({
      gamesPlayed: 5,
      gamesWon: 4,
      winRate: 80,
      currentStreak: 3,
      maxStreak: 5,
      lastPlayedDate: '2026-04-10',
      gameHistory: [],
    }),
  }),
}));

vi.mock('../../../providers/useSite', () => ({
  useSite: () => ({
    siteName: 'Filmclues',
    domain: 'filmclues.space',
    genre: 'films',
  }),
}));

describe('ResultsPanel', () => {
  const defaultProps = {
    gameStatus: 'won' as const,
    mistakes: 1,
    genre: 'films',
    guessHistory: [
      ['yellow', 'yellow', 'yellow', 'yellow'],
      ['green', 'green', 'blue', 'green'],
      ['green', 'green', 'green', 'green'],
    ] as GuessColor[][],
    onViewPuzzle: vi.fn(),
  };

  it('renders the share button', () => {
    render(<ResultsPanel {...defaultProps} />);
    expect(screen.getByLabelText('Share your results')).toBeInTheDocument();
  });

  it('renders the countdown timer', () => {
    render(<ResultsPanel {...defaultProps} />);
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });

  it('renders result heading for won state', () => {
    render(<ResultsPanel {...defaultProps} gameStatus="won" />);
    expect(screen.getByText('You Won!')).toBeInTheDocument();
  });

  it('renders result heading for lost state', () => {
    render(<ResultsPanel {...defaultProps} gameStatus="lost" />);
    expect(screen.getByText('Game Over')).toBeInTheDocument();
  });

  it('renders guess history when provided', () => {
    const { container } = render(<ResultsPanel {...defaultProps} />);
    expect(container.querySelector('.game-result-display')).toBeInTheDocument();
  });

  it('does not render guess history when null', () => {
    const { container } = render(<ResultsPanel {...defaultProps} guessHistory={null} />);
    expect(container.querySelector('.game-result-display')).not.toBeInTheDocument();
  });

  it('renders View Puzzle button', () => {
    render(<ResultsPanel {...defaultProps} />);
    expect(screen.getByText('View Puzzle')).toBeInTheDocument();
  });

  it('does NOT render any modal overlay', () => {
    const { container } = render(<ResultsPanel {...defaultProps} />);
    expect(container.querySelector('.xmodal__overlay')).toBeNull();
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it('shows all content on all viewports (no desktop-only sections)', () => {
    const { container } = render(<ResultsPanel {...defaultProps} />);
    expect(container.querySelector('.results-panel__desktop-only')).toBeNull();
  });
});
