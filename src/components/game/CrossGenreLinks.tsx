import { SEO_CONFIGS } from "../../config/seoConfig";

interface CrossGenreLinksProps {
  currentGenre: string;
}

export function CrossGenreLinks({ currentGenre }: CrossGenreLinksProps) {
  const links = Object.values(SEO_CONFIGS)
    .filter((cfg) => cfg.genre !== currentGenre && cfg.genre !== "sports")
    .slice(0, 2);

  if (links.length === 0) return null;

  return (
    <div className="results-cross-genre">
      {links.map((cfg) => (
        <a
          key={cfg.genre}
          href={`https://${cfg.domain}`}
          className="results-cross-genre-link"
        >
          Try {cfg.siteName}
        </a>
      ))}
    </div>
  );
}
