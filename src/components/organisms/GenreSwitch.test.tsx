import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { GenreSwitch } from './GenreSwitch';
import { getAppStore, resetAppStore } from '../../store/appStore';

const pushMock = vi.fn();
let pathname = '/films';

vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push: pushMock }),
}));

describe('GenreSwitch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pathname = '/films';
    resetAppStore();
    // Default to films
    getAppStore().getState().initialize('films', '2026-04-10');
  });

  it('renders 3 buttons with correct labels', () => {
    render(<GenreSwitch />);
    expect(screen.getByRole('tab', { name: 'Films' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Lit' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Music' })).toBeInTheDocument();
  });

  it('highlights the active genre from appStore', () => {
    getAppStore().getState().setActiveGenre('books');
    render(<GenreSwitch />);
    expect(screen.getByRole('tab', { name: 'Lit' })).toHaveClass('genre-switch__button--active');
    expect(screen.getByRole('tab', { name: 'Films' })).not.toHaveClass('genre-switch__button--active');
  });

  it('updates appStore when a genre is clicked', async () => {
    const user = userEvent.setup();
    render(<GenreSwitch />);

    await user.click(screen.getByRole('tab', { name: 'Music' }));
    expect(getAppStore().getState().activeGenre).toBe('music');
  });

  it('does NOT call router.push on genre click', async () => {
    const user = userEvent.setup();
    render(<GenreSwitch />);

    // history.replaceState should be called, not router.push
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
    await user.click(screen.getByRole('tab', { name: 'Lit' }));
    expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/books');
    replaceStateSpy.mockRestore();
  });

  it('renders a sliding pill indicator', () => {
    const { container } = render(<GenreSwitch />);
    const pill = container.querySelector('.genre-switch__pill');
    expect(pill).toBeInTheDocument();
  });

  it('pill is a presentational element with aria-hidden', () => {
    const { container } = render(<GenreSwitch />);
    const pill = container.querySelector('.genre-switch__pill');
    expect(pill?.getAttribute('aria-hidden')).toBe('true');
  });

  it('exposes tablist semantics with roving tabindex', () => {
    getAppStore().getState().setActiveGenre('films');
    render(<GenreSwitch />);
    expect(
      screen.getByRole('tablist', { name: 'Puzzle genre' }),
    ).toBeInTheDocument();
    const films = screen.getByRole('tab', { name: 'Films' });
    const lit = screen.getByRole('tab', { name: 'Lit' });
    expect(films).toHaveAttribute('aria-selected', 'true');
    expect(films).toHaveAttribute('tabindex', '0');
    expect(lit).toHaveAttribute('aria-selected', 'false');
    expect(lit).toHaveAttribute('tabindex', '-1');
  });

  it('moves between tabs with arrow keys (roving tabindex)', async () => {
    const user = userEvent.setup();
    getAppStore().getState().setActiveGenre('films');
    render(<GenreSwitch />);
    screen.getByRole('tab', { name: 'Films' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(getAppStore().getState().activeGenre).toBe('books');
  });

  describe('off the game home (e.g. an archive page)', () => {
    beforeEach(() => {
      pathname = '/books/archive/2026-10-01';
    });

    it('navigates to that genre\'s game', async () => {
      const user = userEvent.setup();
      render(<GenreSwitch />);
      await user.click(screen.getByRole('tab', { name: 'Music' }));
      expect(pushMock).toHaveBeenCalledWith('/music');
    });

    it('makes the tapped genre active so the game opens on it', async () => {
      const user = userEvent.setup();
      render(<GenreSwitch />);
      await user.click(screen.getByRole('tab', { name: 'Music' }));
      expect(getAppStore().getState().activeGenre).toBe('music');
    });

    it('navigates even when the tapped genre is already active', async () => {
      getAppStore().getState().setActiveGenre('books');
      const user = userEvent.setup();
      render(<GenreSwitch />);
      await user.click(screen.getByRole('tab', { name: 'Lit' }));
      expect(pushMock).toHaveBeenCalledWith('/books');
    });
  });

  it('swaps in place on the root home page', async () => {
    pathname = '/';
    const user = userEvent.setup();
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
    render(<GenreSwitch />);
    await user.click(screen.getByRole('tab', { name: 'Music' }));
    expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/music');
    expect(pushMock).not.toHaveBeenCalled();
    replaceStateSpy.mockRestore();
  });
});
