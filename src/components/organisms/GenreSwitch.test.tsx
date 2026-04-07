import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { GenreSwitch } from './GenreSwitch';
import { useParams, useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('GenreSwitch', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as unknown as ReturnType<typeof useRouter>);
  });

  it('renders 3 buttons with correct labels', () => {
    vi.mocked(useParams).mockReturnValue({ genre: 'films' });
    render(<GenreSwitch />);
    expect(screen.getByRole('button', { name: 'Films' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Music' })).toBeInTheDocument();
  });

  it('highlights the active genre based on route params', () => {
    vi.mocked(useParams).mockReturnValue({ genre: 'books' });
    render(<GenreSwitch />);
    expect(screen.getByRole('button', { name: 'Lit' })).toHaveClass('genre-switch__button--active');
    expect(screen.getByRole('button', { name: 'Films' })).not.toHaveClass('genre-switch__button--active');
  });

  it('calls router.push with new genre when clicked', async () => {
    vi.mocked(useParams).mockReturnValue({ genre: 'films' });
    const user = userEvent.setup();
    render(<GenreSwitch />);
    
    await user.click(screen.getByRole('button', { name: 'Music' }));
    expect(mockPush).toHaveBeenCalledWith('/music');
  });
});
