import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameBoard } from '../GameBoard';

vi.mock('../../../providers/useToast', () => ({
  useToast: () => ({ showInfo: vi.fn() }),
}));

vi.mock('../../../store/gameStore', () => ({
  useGameStore: () => () => undefined,
}));

vi.mock('../../../providers/useStats', () => ({
  useStats: () => ({
    getStats: vi.fn().mockResolvedValue({ gameHistory: [] }),
  }),
}));

vi.mock('../../../providers/useSite', () => ({
  useSite: () => ({ siteName: 'xClues', domain: 'xclues.space' }),
}));

describe('GameBoard', () => {
  it('renders skeleton when isLoading is true', () => {
    render(<GameBoard genre="films" isLoading />);
    expect(screen.getByRole('status', { name: 'Loading puzzle' })).toBeInTheDocument();
  });

  it('does not render skeleton when isLoading is false', () => {
    render(<GameBoard genre="films" isLoading={false} />);
    expect(screen.queryByRole('status', { name: 'Loading puzzle' })).not.toBeInTheDocument();
  });

  it('shows no puzzle message when hasNoPuzzle is true', () => {
    render(<GameBoard genre="films" hasNoPuzzle />);
    expect(screen.getByText('No puzzle available for today')).toBeInTheDocument();
  });
});
