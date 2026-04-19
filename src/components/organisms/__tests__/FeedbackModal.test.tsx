import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const { submitFeedbackMock } = vi.hoisted(() => ({ submitFeedbackMock: vi.fn() }));

vi.mock('../../../services/analytics/submitFeedback', () => ({
  submitFeedback: submitFeedbackMock,
}));

import { FeedbackModal, FEEDBACK_STORAGE_KEY } from '../FeedbackModal';

describe('FeedbackModal', () => {
  beforeEach(() => {
    localStorage.clear();
    submitFeedbackMock.mockReset();
    submitFeedbackMock.mockResolvedValue(undefined);
  });

  it('renders five star buttons and a comment textarea when open', () => {
    render(<FeedbackModal isOpen onClose={vi.fn()} />);
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    render(<FeedbackModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('submitting calls submitFeedback with rating + comment and sets the flag', () => {
    const onClose = vi.fn();
    render(<FeedbackModal isOpen onClose={onClose} />);

    const stars = screen.getAllByRole('radio');
    fireEvent.click(stars[3]); // 4 stars (index 3 = 4th)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'nice puzzle' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(submitFeedbackMock).toHaveBeenCalledWith({ rating: 4, comment: 'nice puzzle' });
    expect(localStorage.getItem(FEEDBACK_STORAGE_KEY)).toBe('1');
    expect(onClose).toHaveBeenCalled();
  });

  it('skip sets the flag without submitting feedback', () => {
    const onClose = vi.fn();
    render(<FeedbackModal isOpen onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /skip|no thanks/i }));

    expect(submitFeedbackMock).not.toHaveBeenCalled();
    expect(localStorage.getItem(FEEDBACK_STORAGE_KEY)).toBe('1');
    expect(onClose).toHaveBeenCalled();
  });

  it('disables submit when no rating is selected', () => {
    render(<FeedbackModal isOpen onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('omits the comment field from submission when empty', () => {
    render(<FeedbackModal isOpen onClose={vi.fn()} />);

    fireEvent.click(screen.getAllByRole('radio')[4]); // 5 stars
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(submitFeedbackMock).toHaveBeenCalledWith({ rating: 5, comment: null });
  });
});
