import type { GenreStats } from "../../services/LocalStatsStorage";
import "./Stats.css";

interface StatsProps {
  stats: GenreStats;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="stats-container" role="group" aria-label="Game statistics">
      <div className="stat-item">
        <span className="stat-number">{stats.gamesPlayed}</span>
        <span className="stat-label">Played</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{stats.currentStreak}</span>
        <span className="stat-label">Current Streak</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{stats.maxStreak}</span>
        <span className="stat-label">Max Streak</span>
      </div>
    </div>
  );
}
