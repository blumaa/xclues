import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameBoard } from '../GameBoard';

const defaultStoreState: Record<string, unknown> = {
  items: [],
  foundGroups: [],
  selectedItemIds: [],
  gameStatus: 'playing',
  isShaking: false,
  jumpingItemIds: [],
  rejectedItemId: null,
  selectItem: vi.fn(),
  mistakes: 0,
};

vi.mock('../../../store/gameStore', () => ({
  useGameStore: (_genre: string, selector: (s: Record<string, unknown>) => unknown) =>
    selector(defaultStoreState),
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
