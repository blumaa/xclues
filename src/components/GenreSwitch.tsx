import { useRef } from "react";
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
  const prefetchedRef = useRef(new Set<string>());

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

  const handleHoverIntent = (genre: Genre, domain: string) => {
    if (genre === activeGenre || isDevOrCapacitor()) return;
    if (prefetchedRef.current.has(domain)) return;
    prefetchedRef.current.add(domain);

    const url = `https://${domain}/`;

    // Prefetch the HTML document
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    link.setAttribute("as", "document");
    document.head.appendChild(link);

    // Use Speculation Rules API for near-instant navigation in Chrome 109+
    const ScriptElement = globalThis.HTMLScriptElement;
    if (
      ScriptElement &&
      typeof ScriptElement.supports === "function" &&
      ScriptElement.supports("speculationrules")
    ) {
      const script = document.createElement("script");
      script.type = "speculationrules";
      script.textContent = JSON.stringify({
        prerender: [{ source: "list", urls: [url] }],
      });
      document.head.appendChild(script);
    }
  };

  return (
    <div className="genre-switch">
      {GENRE_OPTIONS.map(({ genre, label, domain }) => (
        <button
          key={genre}
          className={`genre-switch__button${genre === activeGenre ? " genre-switch__button--active" : ""}`}
          onClick={() => handleClick(genre, domain)}
          onMouseEnter={() => handleHoverIntent(genre, domain)}
          onTouchStart={() => handleHoverIntent(genre, domain)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
