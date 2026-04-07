import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
const CYCLES = 3;

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
  const targetIdx = SEQUENCE.indexOf(target);
  const finalPos = CYCLES * SEQUENCE.length + targetIdx;

  const reelRef = useRef<HTMLSpanElement>(null);
  const [animActive, setAnimActive] = useState<SlotItem>("x");
  const [prevTarget, setPrevTarget] = useState(target);

  // Reset animation state when target changes (render-time adjustment per React docs)
  if (target !== prevTarget) {
    setPrevTarget(target);
    if (!skipAnimation) setAnimActive("x");
  }

  // When static, active is always target; otherwise use animation state
  const active = skipAnimation ? target : animActive;

  // Build reel: enough copies of SEQUENCE to cover max position
  const copies = Math.ceil((finalPos + 1) / SEQUENCE.length);
  const reelItems: SlotItem[] = [];
  for (let c = 0; c < copies; c++) {
    reelItems.push(...SEQUENCE);
  }

  useEffect(() => {
    if (skipAnimation) {
      // Snap reel to final position (DOM side-effect only)
      if (reelRef.current) {
        const h = reelRef.current.children[0]?.getBoundingClientRect().height || 0;
        if (h > 0) gsap.set(reelRef.current, { y: -targetIdx * h });
      }
      return;
    }

    // Measure one reel item's height (0 in jsdom / test env)
    const itemH = reelRef.current?.children[0]?.getBoundingClientRect().height || 0;

    // Reset reel position
    if (reelRef.current && itemH > 0) {
      gsap.set(reelRef.current, { y: 0 });
    }

    // Animate a proxy value from 0 → finalPos.
    // On each tick, derive the active slot item and slide the reel.
    const proxy = { pos: 0 };
    let lastItem: SlotItem = "x";

    const tween = gsap.to(proxy, {
      pos: finalPos,
      duration: 1.8,
      ease: "power4.out",
      onUpdate() {
        const p = Math.round(proxy.pos);
        const item = SEQUENCE[p % SEQUENCE.length];
        if (item !== lastItem) {
          lastItem = item;
          setAnimActive(item);
        }
        if (reelRef.current && itemH > 0) {
          gsap.set(reelRef.current, { y: -proxy.pos * itemH });
        }
      },
      onComplete() {
        setAnimActive(target);
        if (reelRef.current && itemH > 0) {
          gsap.set(reelRef.current, { y: -finalPos * itemH });
        }
      },
    });

    return () => { tween.kill(); };
  }, [skipAnimation, target, targetIdx, finalPos]);

  return (
    <span className="logo" role="img" aria-label="xClues" data-slot={active}>
      <span className="logo-word">
        <span className="logo-slot">
          {/* Hidden x always in flow — defines slot width */}
          <span className="logo-x" aria-hidden="true">x</span>
          {/* Vertical reel — GSAP controls y transform */}
          <span className="logo-reel" ref={reelRef}>
            {reelItems.map((item, i) => (
              <span key={i} className="logo-reel-item">
                {item === "x" ? (
                  <span className="logo-reel-x">x</span>
                ) : (
                  (() => { const Icon = ICONS[item]; return <Icon />; })()
                )}
              </span>
            ))}
          </span>
        </span>
        Clues
      </span>
    </span>
  );
}
