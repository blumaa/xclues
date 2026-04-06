import { useState } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./IconButton";
import { Dot } from "./Dot";
import { XText, XButton, XHeading } from "./ui";
import "./HowToPlayModal.css";

const STORAGE_KEY = "xclues-how-to-play-seen";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="how-to-play-overlay" onClick={handleClose}>
      <div
        className="how-to-play-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="How to play"
        onClick={(e) => e.stopPropagation()}
      >
        <XHeading level={2} align="center" responsive>
          How to Play
        </XHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--xclues-spacing-sm, 0.5rem)', paddingTop: 'var(--xclues-spacing-4, 1rem)' }}>
          <XText responsive>
            Find the four groups of four items that share a hidden connection.
          </XText>
          <XText responsive>
            Select four items and tap <strong>Submit</strong> to check your guess.
          </XText>
          <XText responsive>
            You can make <strong>4 mistakes</strong> before the game ends.
          </XText>
          <XText responsive>
            A new puzzle is available every day for each genre.
          </XText>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--xclues-spacing-sm, 0.5rem)', paddingTop: 'var(--xclues-spacing-4, 1rem)' }}>
          <div className="how-to-play-colors">
            <Dot size="sm" variant="color" color="yellow" /> Easy
            <Dot size="sm" variant="color" color="green" /> Medium
            <Dot size="sm" variant="color" color="blue" /> Hard
            <Dot size="sm" variant="color" color="purple" /> Expert
          </div>
        </div>
        <div style={{ paddingTop: 'var(--xclues-spacing-4, 1rem)', display: 'flex', justifyContent: 'center' }}>
          <XButton onClick={handleClose} variant="primary" size="md">
            Got it!
          </XButton>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function HowToPlayButton() {
  const [isOpen, setIsOpen] = useState(
    () => !localStorage.getItem(STORAGE_KEY)
  );

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label="How to play"
      >
        <span aria-hidden="true">?</span>
      </IconButton>
      <HowToPlayModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
