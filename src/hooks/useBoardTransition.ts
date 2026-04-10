import { useRef } from "react";

// DISABLED — pending animation system redesign
// This hook previously provided a two-phase GSAP crossfade transition.
// Phase 1 (fade out): triggered when transitionKey changed.
// Phase 2 (fade in): triggered when isReady became true after key change.

export function useBoardTransition(_transitionKey: string, _isReady = true) {
  return useRef<HTMLDivElement>(null);
}

/* Original implementation:
import { useEffect, useRef } from "react";

type GSAP = typeof import("gsap").default;

export function useBoardTransition(transitionKey: string, isReady = true) {
  const ref = useRef<HTMLDivElement>(null);
  const prevKeyRef = useRef(transitionKey);
  const tweenRef = useRef<{ kill: () => void } | null>(null);
  const fadedOutRef = useRef(false);
  const gsapRef = useRef<GSAP | null>(null);
  const isReadyRef = useRef(isReady);
  isReadyRef.current = isReady;

  useEffect(() => {
    if (prevKeyRef.current === transitionKey) return;
    prevKeyRef.current = transitionKey;
    fadedOutRef.current = false;

    const el = ref.current;
    if (!el) return;

    tweenRef.current?.kill();

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    import("gsap").then(({ default: gsap }) => {
      gsapRef.current = gsap;

      const tween = gsap.to(el, {
        opacity: 0,
        y: -8,
        duration: 0.18,
        ease: "power2.in",
        onComplete() {
          fadedOutRef.current = true;
          if (isReadyRef.current) {
            tweenRef.current = gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              ease: "power2.out",
            });
          }
        },
      });
      tweenRef.current = tween;
    });
  }, [transitionKey]);

  useEffect(() => {
    if (!isReady || !fadedOutRef.current) return;
    const el = ref.current;
    const gsap = gsapRef.current;
    if (!el || !gsap) return;

    fadedOutRef.current = false;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [isReady]);

  return ref;
}
*/
