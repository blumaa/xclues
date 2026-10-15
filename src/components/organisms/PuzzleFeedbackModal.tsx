"use client";

import { useState } from "react";
import { XModal } from "../atoms/XModal";
import { XButton, XText, XHeading } from "../atoms";
import type { Genre } from "../../config/seoConfig";
import {
  RATING_MAX,
  RATING_MIN,
  isValidRating,
  submitPuzzleFeedback,
} from "../../services/feedback/puzzleFeedback";
import "./FeedbackModal.css";

interface PuzzleFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  genre: Genre;
  puzzleDate: string;
}

const RATING_PROMPT = "Rate this puzzle";
const COMMENT_PROMPT = "Your feedback";

const RATINGS = Array.from(
  { length: RATING_MAX - RATING_MIN + 1 },
  (_, i) => RATING_MIN + i,
);

export function PuzzleFeedbackModal({
  isOpen,
  onClose,
  genre,
  puzzleDate,
}: PuzzleFeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);

  const canSubmit = isValidRating(rating) && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setFailed(false);

    const saved = await submitPuzzleFeedback({ genre, puzzleDate, rating, comment });

    setSubmitting(false);
    if (saved) setSent(true);
    else setFailed(true);
  };

  return (
    <XModal isOpen={isOpen} onClose={onClose} title="Send feedback">
      <div className="feedback-modal">
        {sent ? (
          <>
            <XHeading level={2} responsive>
              Thanks for the feedback!
            </XHeading>
            <div className="feedback-modal__actions">
              <XButton variant="primary" size="sm" onClick={onClose}>
                Close
              </XButton>
            </div>
          </>
        ) : (
          <>
            <XHeading level={2} responsive>
              Send feedback
            </XHeading>

            <fieldset className="feedback-modal__question">
              <legend className="feedback-modal__prompt">{RATING_PROMPT}</legend>
              <div
                className="feedback-modal__options"
                role="radiogroup"
                aria-label={RATING_PROMPT}
              >
                {RATINGS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n === 1 ? "" : "s"}`}
                    className={
                      "feedback-modal__star" +
                      (n <= rating ? " feedback-modal__star--filled" : "")
                    }
                    onClick={() => setRating(n)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="feedback-modal__question">
              <legend className="feedback-modal__prompt">{COMMENT_PROMPT}</legend>
              <textarea
                className="feedback-modal__comment"
                placeholder="What worked? What didn't?"
                aria-label={COMMENT_PROMPT}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </fieldset>

            {failed && (
              <XText size="sm" role="alert">
                That did not save. Check your connection and try again.
              </XText>
            )}

            <div className="feedback-modal__actions">
              <XButton variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </XButton>
              <XButton
                variant="primary"
                size="sm"
                onClick={() => void handleSubmit()}
                disabled={!canSubmit}
              >
                {submitting ? "Sending…" : "Send"}
              </XButton>
            </div>
          </>
        )}
      </div>
    </XModal>
  );
}
