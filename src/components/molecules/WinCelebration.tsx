'use client';

import { createPortal } from 'react-dom';
import './WinCelebration.css';

export function WinCelebration() {
  // Portal to <body>: the celebration is `position: fixed`, but GameBoard is mounted
  // inside `.carousel-track`, which has a `transform`. A transformed ancestor becomes the
  // containing block for fixed descendants, pinning the celebration to each genre's panel
  // (so it only lined up with the viewport for films, index 0). Rendering into <body>
  // escapes the transform and restores true viewport-fixed positioning for every genre.
  // Only ever rendered on the client-triggered "won" state, so `document` is always
  // present here; the guard just keeps it SSR-safe.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="win-celebration" aria-hidden="true">
      {['🎉', '⭐', '✨', '🎊', '💫', '🌟', '🎉', '⭐', '✨', '🎊', '💫', '🌟'].map((emoji, i) => (
        <span key={i} className={`win-particle win-particle--${i}`}>{emoji}</span>
      ))}
    </div>,
    document.body,
  );
}
