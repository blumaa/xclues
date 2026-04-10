import { useEffect, useRef } from "react";

const TRANSITION_MS = 300;

/**
 * Carousel-style slide transition.
 *
 * When `key` changes, slides the element out via translateX(-100% or 100%)
 * based on `direction`. CSS transition handles the animation. After it
 * completes, snaps back to translateX(0) with transition disabled.
 *
 * direction > 0: slide left (navigating right, e.g. Films → Music)
 * direction < 0: slide right (navigating left, e.g. Music → Films)
 * direction = 0: no slide (e.g. results toggle)
 */
export function useSlideTransition(key: string, direction: number) {
  const ref = useRef<HTMLDivElement>(null);
  const prevKeyRef = useRef(key);
  const directionRef = useRef(direction);
  directionRef.current = direction;

  useEffect(() => {
    if (prevKeyRef.current === key) return;
    prevKeyRef.current = key;

    const el = ref.current;
    if (!el) return;

    const dir = directionRef.current;
    if (dir === 0) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Slide out
    el.style.transform = dir > 0 ? "translateX(-100%)" : "translateX(100%)";

    // After CSS transition finishes, snap back to center (no transition)
    const timer = setTimeout(() => {
      el.style.transition = "none";
      el.style.transform = "translateX(0px)";
      // Re-enable transition on next frame
      requestAnimationFrame(() => {
        el.style.transition = "";
      });
    }, TRANSITION_MS);

    return () => clearTimeout(timer);
  }, [key]);

  return ref;
}

export const useFadeTransition = (key: string) => useSlideTransition(key, 0);
