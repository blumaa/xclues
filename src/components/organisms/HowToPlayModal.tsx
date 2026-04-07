import { useState, useEffect } from "react";
import { IconButton } from "../atoms/IconButton";
import { Dot } from "../atoms/Dot";
import { XText, XButton, XHeading } from "../atoms";
import { Portal } from "../atoms/Portal";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./HowToPlayModal.css";

const STORAGE_KEY = "xclues-how-to-play-seen";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="how-to-play-overlay" onClick={onClose}>
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
            <XButton onClick={onClose} variant="primary" size="md">
              Got it!
            </XButton>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export function HowToPlayButton() {
  const [seen, setSeen] = useLocalStorage(STORAGE_KEY, "0");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(seen === "0");
  }, [seen]);

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label="How to play"
      >
        <span aria-hidden="true">?</span>
      </IconButton>
      <HowToPlayModal 
        isOpen={isOpen} 
        onClose={() => {
          setSeen("1");
          setIsOpen(false);
        }} 
      />
    </>
  );
}
