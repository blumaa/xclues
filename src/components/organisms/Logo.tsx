import { useEffect, useState } from "react";
import "./Logo.css";
import type { Genre } from "../../config/seoConfig";

function FilmIcon() {
  return (
    <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>
  );
}
function BookIcon() {
  return (
    <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
  );
}
function MusicIcon() {
  return (
    <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  );
}

type SlotItem = "x" | "films" | "books" | "music";
const ICONS: Record<Exclude<SlotItem, "x">, React.ComponentType> = { films: FilmIcon, books: BookIcon, music: MusicIcon };
const SEQUENCE: SlotItem[] = ["x", "films", "books", "music"];

function genreToSlot(genre?: Genre): SlotItem {
  if (genre === "films" || genre === "books" || genre === "music") return genre;
  return "x";
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface LogoProps {
  genre?: Genre;
  static?: boolean;
}

export function Logo({ genre, static: isStatic }: LogoProps) {
  const target = genreToSlot(genre);
  const skipAnimation = isStatic || prefersReducedMotion();
  const [active, setActive] = useState<SlotItem>(skipAnimation ? target : "x");

  useEffect(() => {
    if (skipAnimation) return;
    const seq = [...SEQUENCE];
    if (seq[seq.length - 1] !== target) seq.push(target);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < seq.length; i++) {
      timers.push(setTimeout(() => setActive(seq[i]), i * 500));
    }
    return () => timers.forEach(clearTimeout);
  }, [skipAnimation, target]);

  const showIcon = active !== "x";
  const IconComponent = showIcon ? ICONS[active] : null;

  return (
    <span className="logo" role="img" aria-label="xClues" data-slot={active}>
      <span className="logo-word">
        <span className="logo-slot">
          <span className={`logo-x ${showIcon ? "logo-x--hidden" : ""}`}>x</span>
          {IconComponent && (
            <span className="logo-icon-cell" data-slot={active}>
              <IconComponent />
            </span>
          )}
        </span>
        Clues
      </span>
    </span>
  );
}
