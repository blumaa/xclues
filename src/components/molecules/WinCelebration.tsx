import './WinCelebration.css';

export function WinCelebration() {
  return (
    <div className="win-celebration" aria-hidden="true">
      {['🎉', '⭐', '✨', '🎊', '💫', '🌟', '🎉', '⭐', '✨', '🎊', '💫', '🌟'].map((emoji, i) => (
        <span key={i} className={`win-particle win-particle--${i}`}>{emoji}</span>
      ))}
    </div>
  );
}
