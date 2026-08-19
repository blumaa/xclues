import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore } from '../../src/store/appStore';
import { resetStatsStore } from '../../src/store/statsStore';
import { resetAllStores } from '../../src/store/gameStore';
import { FEEDBACK_STORAGE_KEY } from '../../src/services/feedback/survey';

const { submittedSpy } = vi.hoisted(() => ({ submittedSpy: vi.fn() }));

vi.mock('../../src/components/organisms/FeedbackModal', () => ({
  FeedbackModal: ({ isOpen, onSubmitted }: { isOpen: boolean; onSubmitted: () => void }) => {
    submittedSpy.mockImplementation(onSubmitted);
    return isOpen ? <div data-testid="feedback-modal">survey</div> : null;
  },
}));

vi.mock('../../src/components/organisms/GameBoard', () => ({
  GameBoard: () => <div data-testid="game-board">Game Board</div>,
}));

vi.mock('../../src/providers/useToast', () => ({
  useToast: () => ({ showInfo: vi.fn() }),
}));

const mockPuzzleData: import('../../src/types').SavedPuzzle = {
  id: 'test-puzzle',
  items: [{ id: 1, title: 'Item 1' }],
  groups: [
    {
      id: 'g1',
      items: [{ id: 1, title: 'Item 1' }],
      connection: 'Test connection',
      difficulty: 'easy' as const,
      color: 'yellow' as const,
    },
  ],
  createdAt: Date.now(),
};

const STATS_STORAGE_KEY = 'xclues-stats';

function seedGamesPlayed(count: number) {
  const gameHistory = Array.from({ length: count }, (_, i) => ({
    date: `2026-04-0${i + 1}`,
    genre: 'films',
    won: true,
    mistakes: 0,
  }));
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify({ gameHistory }));
}

function renderGamePage() {
  return render(
    <GamePage
      initialGenre="films"
      puzzleDate="2026-04-08"
      puzzles={{ films: mockPuzzleData, books: mockPuzzleData, music: mockPuzzleData }}
    />,
  );
}

describe('GamePage feedback survey', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    resetAppStore();
    resetStatsStore();
    resetAllStores();
  });

  it('does not survey a visitor who has never finished a puzzle', async () => {
    renderGamePage();

    await waitFor(() => expect(screen.getAllByTestId('game-board').length).toBeGreaterThan(0));
    expect(screen.queryByTestId('feedback-modal')).toBeNull();
  });

  it('surveys on arrival once a single puzzle has been completed', async () => {
    seedGamesPlayed(1);
    renderGamePage();

    await waitFor(() => expect(screen.getByTestId('feedback-modal')).toBeInTheDocument());
  });

  it('does not survey again once the response has been stored', async () => {
    seedGamesPlayed(5);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify('1'));
    renderGamePage();

    await waitFor(() => expect(screen.getAllByTestId('game-board').length).toBeGreaterThan(0));
    expect(screen.queryByTestId('feedback-modal')).toBeNull();
  });

  it('records the one-time flag only when the modal reports a successful submit', async () => {
    seedGamesPlayed(2);
    renderGamePage();

    await waitFor(() => expect(screen.getByTestId('feedback-modal')).toBeInTheDocument());
    expect(localStorage.getItem(FEEDBACK_STORAGE_KEY)).toBeNull();

    submittedSpy();

    await waitFor(() =>
      expect(localStorage.getItem(FEEDBACK_STORAGE_KEY)).toBe(JSON.stringify('1')),
    );
    expect(screen.queryByTestId('feedback-modal')).toBeNull();
  });

  it('ignores the retired v1 star-rating flag so past raters see the new survey', async () => {
    seedGamesPlayed(3);
    localStorage.setItem('xclues-feedback-shown', '1');
    renderGamePage();

    await waitFor(() => expect(screen.getByTestId('feedback-modal')).toBeInTheDocument());
  });
});
