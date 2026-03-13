import { Capacitor } from "@capacitor/core";
import { useSite } from "../providers/useSite";
import type { Genre } from "../config/seoConfig";
import "./GenreSwitch.css";

const GENRE_OPTIONS: { genre: Genre; label: string; domain: string }[] = [
  { genre: "films", label: "Films", domain: "filmclues.space" },
  { genre: "books", label: "Lit", domain: "litclues.space" },
  { genre: "music", label: "Music", domain: "musiclues.space" },
];

function isDevOrCapacitor(): boolean {
  return (
    window.location.hostname === "localhost" ||
    Capacitor.isNativePlatform()
  );
}

export function GenreSwitch() {
  const { genre: activeGenre, setGenre } = useSite();

  const handleClick = (genre: Genre, domain: string) => {
    if (genre === activeGenre) return;

    if (isDevOrCapacitor()) {
      // Persist for next cold start
      localStorage.setItem("xclues-dev-genre", genre);
      // Reactive switch — no reload
      setGenre(genre);
    } else {
      // Production web: cross-domain navigation
      window.location.assign(`https://${domain}`);
    }
  };

  return (
    <div className="genre-switch">
      {GENRE_OPTIONS.map(({ genre, label, domain }) => (
        <button
          key={genre}
          className={`genre-switch__button${genre === activeGenre ? " genre-switch__button--active" : ""}`}
          onClick={() => handleClick(genre, domain)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
