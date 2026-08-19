import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

const { submitFeedbackMock } = vi.hoisted(() => ({ submitFeedbackMock: vi.fn() }));

vi.mock('../../../services/feedback/submitFeedback', () => ({
  submitFeedback: submitFeedbackMock,
}));

import { FeedbackModal } from '../FeedbackModal';
import { SURVEY_QUESTIONS, IMPROVEMENT_PROMPT } from '../../../services/feedback/survey';

function answerAll() {
  for (const q of SURVEY_QUESTIONS) {
    const group = screen.getByRole('radiogroup', { name: q.prompt });
    fireEvent.click(within(group).getByRole('radio', { name: q.options[0].label }));
  }
}

describe('FeedbackModal', () => {
  beforeEach(() => {
    submitFeedbackMock.mockReset();
    submitFeedbackMock.mockResolvedValue(true);
  });

  it('renders every survey question with all of its options', () => {
    render(<FeedbackModal isOpen onSubmitted={vi.fn()} />);

    for (const q of SURVEY_QUESTIONS) {
      const group = screen.getByRole('radiogroup', { name: q.prompt });
      expect(within(group).getAllByRole('radio')).toHaveLength(q.options.length);
    }
  });

  it('renders the optional free-text question', () => {
    render(<FeedbackModal isOpen onSubmitted={vi.fn()} />);
    expect(screen.getByRole('textbox', { name: IMPROVEMENT_PROMPT })).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    render(<FeedbackModal isOpen={false} onSubmitted={vi.fn()} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('offers no way to dismiss the survey', () => {
    render(<FeedbackModal isOpen onSubmitted={vi.fn()} />);
    expect(screen.queryByRole('button', { name: /skip|close|not now|no thanks/i })).toBeNull();
  });

  it('ignores Escape', () => {
    const onSubmitted = vi.fn();
    render(<FeedbackModal isOpen onSubmitted={onSubmitted} />);

    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });

    expect(onSubmitted).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox', { name: IMPROVEMENT_PROMPT })).toBeInTheDocument();
  });

  it('disables submit until every choice question is answered', () => {
    render(<FeedbackModal isOpen onSubmitted={vi.fn()} />);
    const submit = screen.getByRole('button', { name: /submit/i });
    expect(submit).toBeDisabled();

    for (const q of SURVEY_QUESTIONS.slice(0, -1)) {
      const group = screen.getByRole('radiogroup', { name: q.prompt });
      fireEvent.click(within(group).getByRole('radio', { name: q.options[0].label }));
    }
    expect(submit).toBeDisabled();

    const last = SURVEY_QUESTIONS[SURVEY_QUESTIONS.length - 1];
    const lastGroup = screen.getByRole('radiogroup', { name: last.prompt });
    fireEvent.click(within(lastGroup).getByRole('radio', { name: last.options[0].label }));
    expect(submit).toBeEnabled();
  });

  it('does not require the free text to submit', async () => {
    render(<FeedbackModal isOpen onSubmitted={vi.fn()} />);
    answerAll();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(submitFeedbackMock).toHaveBeenCalled());
    expect(submitFeedbackMock.mock.calls[0][0].improvement).toBe('');
  });

  it('submits every answer and the free text', async () => {
    render(<FeedbackModal isOpen onSubmitted={vi.fn()} />);
    answerAll();
    fireEvent.change(screen.getByRole('textbox', { name: IMPROVEMENT_PROMPT }), {
      target: { value: 'more music' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(submitFeedbackMock).toHaveBeenCalledWith(
        {
          frequency: SURVEY_QUESTIONS[0].options[0].value,
          difficulty: SURVEY_QUESTIONS[1].options[0].value,
          favorite_genre: SURVEY_QUESTIONS[2].options[0].value,
          pmf: SURVEY_QUESTIONS[3].options[0].value,
          improvement: 'more music',
        },
        undefined,
      ),
    );
  });

  it('passes the user id through when signed in', async () => {
    render(<FeedbackModal isOpen onSubmitted={vi.fn()} userId="user-1" />);
    answerAll();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(submitFeedbackMock).toHaveBeenCalledWith(expect.anything(), 'user-1'),
    );
  });

  it('reports submission only after the write succeeds', async () => {
    const onSubmitted = vi.fn();
    render(<FeedbackModal isOpen onSubmitted={onSubmitted} />);
    answerAll();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(onSubmitted).toHaveBeenCalled());
  });

  it('stays open and shows an error when the write fails', async () => {
    submitFeedbackMock.mockResolvedValue(false);
    const onSubmitted = vi.fn();
    render(<FeedbackModal isOpen onSubmitted={onSubmitted} />);
    answerAll();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(onSubmitted).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
  });
});
