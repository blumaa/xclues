import { useRouter, useParams } from "next/navigation";
import type { Genre } from "../../config/seoConfig";
import "./GenreSwitch.css";

const GENRE_OPTIONS: { genre: Genre; label: string }[] = [
  { genre: "films", label: "Films" },
  { genre: "books", label: "Lit" },
  { genre: "music", label: "Music" },
];

export function GenreSwitch() {
  const router = useRouter();
  const params = useParams();
  const activeGenre = (params.genre as Genre) || "films";

  const handleClick = (genre: Genre) => {
    if (genre === activeGenre) return;
    router.push(`/${genre}`);
  };

  return (
    <div className="genre-switch">
      {GENRE_OPTIONS.map(({ genre, label }) => (
        <button
          key={genre}
          className={`genre-switch__button${genre === activeGenre ? " genre-switch__button--active" : ""}`}
          aria-current={genre === activeGenre ? "true" : undefined}
          onClick={() => handleClick(genre)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
