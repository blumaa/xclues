import '../organisms/ItemGrid.css';
import './GameSkeleton.css';

export function GameSkeleton() {
  return (
    <div className="game-skeleton" role="status" aria-label="Loading puzzle">
      <div className="item-grid">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="game-skeleton__tile" />
        ))}
      </div>
      <div className="game-skeleton__mistakes">
        <div className="game-skeleton__text-line" />
        <div className="game-skeleton__dots-line" />
      </div>
      <div className="game-skeleton__controls">
        <div className="game-skeleton__button" />
        <div className="game-skeleton__button" />
        <div className="game-skeleton__button" />
      </div>
    </div>
  );
}
