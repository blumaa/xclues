"use client";

import { useState } from "react";
import { XModal } from "../atoms/XModal";
import { XButton, XText, XHeading } from "../atoms";
import { submitFeedback } from "../../services/feedback/submitFeedback";
import {
  IMPROVEMENT_PROMPT,
  SURVEY_QUESTIONS,
  isSurveyComplete,
  type SurveyAnswers,
  type SurveyQuestion,
} from "../../services/feedback/survey";
import "./FeedbackModal.css";

interface FeedbackModalProps {
  isOpen: boolean;
  /** Called once the response has actually been written. */
  onSubmitted: () => void;
  userId?: string | null;
}

function ChoiceRow({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="feedback-modal__question">
      <legend className="feedback-modal__prompt">{question.prompt}</legend>
      <div
        className="feedback-modal__options"
        role="radiogroup"
        aria-label={question.prompt}
      >
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            className={
              "feedback-modal__option" +
              (value === option.value
                ? " feedback-modal__option--selected"
                : "")
            }
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function FeedbackModal({
  isOpen,
  onSubmitted,
  userId,
}: FeedbackModalProps) {
  const [answers, setAnswers] = useState<SurveyAnswers>({ improvement: "" });
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleSubmit = async () => {
    if (!isSurveyComplete(answers) || submitting) return;
    setSubmitting(true);
    setFailed(false);

    const saved = await submitFeedback(answers, userId);

    setSubmitting(false);
    // Only hand control back on a successful write: the caller burns a
    // one-time flag on this callback, so a silent failure would cost us the
    // response forever.
    if (saved) onSubmitted();
    else setFailed(true);
  };

  return (
    // Not dismissable by design — this survey is answered, not skipped.
    <XModal
      isOpen={isOpen}
      onClose={() => {}}
      dismissable={false}
      title="Quick questions about xClues"
    >
      <div className="feedback-modal">
        <XHeading level={2} responsive>
          Quick questions
        </XHeading>
        <XText size="sm">
          Four taps and you are back to the puzzle. It helps us more than you
          would think.
        </XText>

        {SURVEY_QUESTIONS.map((question) => (
          <ChoiceRow
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) =>
              setAnswers((prev) => ({ ...prev, [question.id]: value }))
            }
          />
        ))}

        <fieldset className="feedback-modal__question">
          <legend className="feedback-modal__prompt">
            {IMPROVEMENT_PROMPT}
          </legend>
          <textarea
            className="feedback-modal__comment"
            placeholder="Optional"
            aria-label={IMPROVEMENT_PROMPT}
            value={answers.improvement ?? ""}
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, improvement: e.target.value }))
            }
            rows={3}
          />
        </fieldset>

        {failed && (
          <XText size="sm" role="alert">
            That did not save. Check your connection and try again.
          </XText>
        )}

        <div className="feedback-modal__actions">
          <XButton
            variant="primary"
            size="sm"
            onClick={() => void handleSubmit()}
            disabled={!isSurveyComplete(answers) || submitting}
          >
            {submitting ? "Sending…" : "Submit"}
          </XButton>
        </div>
      </div>
    </XModal>
  );
}
