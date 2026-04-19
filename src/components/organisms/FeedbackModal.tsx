"use client";

import { useState } from "react";
import { XModal } from "../atoms/XModal";
import { XButton, XText, XHeading } from "../atoms";
import { submitFeedback } from "../../services/analytics/submitFeedback";
import "./FeedbackModal.css";

export const FEEDBACK_STORAGE_KEY = "xclues-feedback-shown";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string | null;
}

function StarRow({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="feedback-modal__stars" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => {
        const selected = value >= n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className={
              "feedback-modal__star" +
              (selected ? " feedback-modal__star--selected" : "")
            }
            onClick={() => onChange(n)}
          >
            {selected ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
}

function setShownFlag() {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, "1");
  } catch {
    // localStorage unavailable — swallow.
  }
}

export function FeedbackModal({ isOpen, onClose, userId }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) return;
    const trimmed = comment.trim();
    void submitFeedback({
      rating,
      comment: trimmed.length > 0 ? trimmed : null,
      userId,
    });
    setShownFlag();
    onClose();
  };

  const handleSkip = () => {
    setShownFlag();
    onClose();
  };

  return (
    <XModal isOpen={isOpen} onClose={handleSkip}>
      <div className="feedback-modal">
        <XHeading level={2} responsive>
          How was it?
        </XHeading>
        <XText size="sm">
          Tap a star to rate, and leave a comment if you want.
        </XText>

        <StarRow value={rating} onChange={setRating} />

        <textarea
          className="feedback-modal__comment"
          placeholder="Optional comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />

        <div className="feedback-modal__actions">
          <XButton variant="ghost" size="sm" onClick={handleSkip}>
            Skip
          </XButton>
          <XButton
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            Submit
          </XButton>
        </div>
      </div>
    </XModal>
  );
}
