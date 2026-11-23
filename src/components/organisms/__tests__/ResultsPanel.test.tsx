import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultsPanel } from '../ResultsPanel';
import type { GuessColor } from '../../../types/stats';

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
    puzzleDate: '2026-10-15',
  };

  it('renders the share button', () => {
    render(<ResultsPanel {...defaultProps} />);
    expect(screen.getByLabelText('Share your results')).toBeInTheDocument();
  });

  it('archive play: no countdown, links to today\'s puzzle instead', () => {
    render(<ResultsPanel {...defaultProps} mode="archive" />);
    expect(screen.queryByRole('timer')).toBeNull();
    expect(screen.getByRole('link', { name: /play today/i })).toHaveAttribute('href', '/films');
  });

  it('shares the played puzzle date, not today', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });

    render(<ResultsPanel {...defaultProps} mode="archive" puzzleDate="2026-10-01" />);
    fireEvent.click(screen.getByLabelText('Share your results'));

    await vi.waitFor(() => expect(writeText).toHaveBeenCalled());
    expect(writeText.mock.calls[0][0]).toMatch(/Oct\w* 1/);
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

  it('renders a Send Feedback button', () => {
    render(<ResultsPanel {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Send Feedback' })).toBeInTheDocument();
  });

  it('opens the feedback form for this puzzle on click', () => {
    render(<ResultsPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Send Feedback' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup', { name: "Rate this puzzle" })).toBeInTheDocument();
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
