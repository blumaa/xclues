import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore } from '../../src/store/appStore';
import { resetStatsStore } from '../../src/store/statsStore';
import { resetAllStores } from '../../src/store/gameStore';
import { FEEDBACK_STORAGE_KEY } from '../../src/services/feedback/survey';

vi.mock('../../src/components/organisms/FeedbackModal', () => ({
  FeedbackModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="feedback-modal">survey</div> : null,
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

/**
 * The survey nudge is paused for the difficulty-skew trial, so the only thing
 * this page can assert is that nothing is put in front of the player. The
 * eligibility rules the nudge will use when it returns are covered by
 * shouldShowSurvey in services/feedback/__tests__/survey.test.ts.
 */
describe('GamePage feedback survey (paused)', () => {
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

  it('does not survey a player who would otherwise be eligible', async () => {
    seedGamesPlayed(1);
    renderGamePage();

    await waitFor(() => expect(screen.getAllByTestId('game-board').length).toBeGreaterThan(0));
    expect(screen.queryByTestId('feedback-modal')).toBeNull();
  });

  it('leaves the one-time flag unburned, so a paused player is still asked later', async () => {
    seedGamesPlayed(5);
    renderGamePage();

    await waitFor(() => expect(screen.getAllByTestId('game-board').length).toBeGreaterThan(0));
    expect(localStorage.getItem(FEEDBACK_STORAGE_KEY)).toBeNull();
  });

  it('does not survey someone who already answered before the pause', async () => {
    seedGamesPlayed(5);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify('1'));
    renderGamePage();

    await waitFor(() => expect(screen.getAllByTestId('game-board').length).toBeGreaterThan(0));
    expect(screen.queryByTestId('feedback-modal')).toBeNull();
  });
});
