import { useEffect, useRef, useCallback } from "react";
import { useAppStore } from "../../store/appStore";
import type { Genre } from "../../config/seoConfig";
import "./GenreSwitch.css";

const GENRE_OPTIONS: { genre: Genre; label: string }[] = [
  { genre: "films", label: "Films" },
  { genre: "books", label: "Lit" },
  { genre: "music", label: "Music" },
];

export function GenreSwitch() {
  const activeGenre = useAppStore((s) => s.activeGenre);
  const setActiveGenre = useAppStore((s) => s.setActiveGenre);

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<Map<Genre, HTMLButtonElement>>(new Map());

  const handleClick = (genre: Genre) => {
    if (genre === activeGenre) return;
    setActiveGenre(genre);
    window.history.replaceState(null, "", `/${genre}`);
  };

  const setButtonRef = useCallback(
    (genre: Genre) => (el: HTMLButtonElement | null) => {
      if (el) buttonRefs.current.set(genre, el);
      else buttonRefs.current.delete(genre);
    },
    []
  );

  const positionPill = useCallback(() => {
    const pill = pillRef.current;
    const container = containerRef.current;
    const activeBtn = buttonRefs.current.get(activeGenre);
    if (!pill || !container || !activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    return { left: btnRect.left - containerRect.left, width: btnRect.width };
  }, [activeGenre]);

  useEffect(() => {
    const dims = positionPill();
    if (!dims) return;

    const pill = pillRef.current;
    if (!pill) return;

    const isInitial = !pill.style.width;

    if (
      isInitial ||
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    ) {
      pill.style.left = `${dims.left}px`;
      pill.style.width = `${dims.width}px`;
      return;
    }

    let tween: { kill: () => void } | null = null;
    import("gsap").then(({ default: gsap }) => {
      tween = gsap.to(pill, {
        left: dims.left,
        width: dims.width,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    return () => {
      tween?.kill();
    };
  }, [activeGenre, positionPill]);

  return (
    <div className="genre-switch" ref={containerRef}>
      <span className="genre-switch__pill" ref={pillRef} aria-hidden="true" />
      {GENRE_OPTIONS.map(({ genre, label }) => (
        <button
          key={genre}
          ref={setButtonRef(genre)}
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
