import { useLayoutEffect, type RefObject } from 'react';

const MIN_SCALE = 0.6;
const STEP = 0.05;

/**
 * Shrinks text inside an element until its content fits the element's
 * fixed height, via the --gc-scale CSS variable (consumed with calc()).
 * Content length varies per puzzle, so static sizes alone can't guarantee
 * a fit — this measures the real overflow and only scales when needed.
 */
export function useFitScale(
  ref: RefObject<HTMLElement | null>,
  deps: unknown[]
): void {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      let scale = 1;
      el.style.setProperty('--gc-scale', String(scale));
      while (el.scrollHeight > el.clientHeight && scale > MIN_SCALE) {
        scale = Math.max(MIN_SCALE, Number((scale - STEP).toFixed(2)));
        el.style.setProperty('--gc-scale', String(scale));
      }
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
