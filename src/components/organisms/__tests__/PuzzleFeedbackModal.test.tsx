import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

const { submitMock } = vi.hoisted(() => ({ submitMock: vi.fn() }));

vi.mock('../../../services/feedback/puzzleFeedback', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../../services/feedback/puzzleFeedback')>()),
  submitPuzzleFeedback: submitMock,
}));

import { PuzzleFeedbackModal } from '../PuzzleFeedbackModal';

function renderModal(onClose = vi.fn()) {
  render(
    <PuzzleFeedbackModal isOpen onClose={onClose} genre="music" puzzleDate="2026-10-15" />,
  );
  return { onClose };
}

const submitButton = () => screen.getByRole('button', { name: 'Send' });

describe('PuzzleFeedbackModal', () => {
  beforeEach(() => {
    submitMock.mockReset();
    submitMock.mockResolvedValue(true);
  });

  it('renders a 1-5 rating and a feedback box', () => {
    renderModal();
    const group = screen.getByRole('radiogroup', { name: "Rate this puzzle" });
    expect(within(group).getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByRole('textbox', { name: 'Your feedback' })).toBeInTheDocument();
  });

  it('keeps Send disabled until a rating is picked', () => {
    renderModal();
    expect(submitButton()).toBeDisabled();
    fireEvent.click(screen.getByRole('radio', { name: '3 stars' }));
    expect(submitButton()).toBeEnabled();
  });

  it('marks the picked rating as checked', () => {
    renderModal();
    const radio = screen.getByRole('radio', { name: '4 stars' });
    fireEvent.click(radio);
    expect(radio).toHaveAttribute('aria-checked', 'true');
  });

  it('submits genre, puzzle date, rating and comment', async () => {
    renderModal();
    fireEvent.click(screen.getByRole('radio', { name: '2 stars' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Your feedback' }), {
      target: { value: 'too obscure' },
    });
    fireEvent.click(submitButton());

    await waitFor(() =>
      expect(submitMock).toHaveBeenCalledWith({
        genre: 'music',
        puzzleDate: '2026-10-15',
        rating: 2,
        comment: 'too obscure',
      }),
    );
  });

  it('thanks the player after a successful send', async () => {
    renderModal();
    fireEvent.click(screen.getByRole('radio', { name: '5 stars' }));
    fireEvent.click(submitButton());
    expect(await screen.findByText('Thanks for the feedback!')).toBeInTheDocument();
  });

  it('shows an error and keeps the form when the send fails', async () => {
    submitMock.mockResolvedValue(false);
    renderModal();
    fireEvent.click(screen.getByRole('radio', { name: '5 stars' }));
    fireEvent.click(submitButton());
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(submitButton()).toBeInTheDocument();
  });

  it('closes on Cancel', () => {
    const { onClose } = renderModal();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalled();
  });
});
