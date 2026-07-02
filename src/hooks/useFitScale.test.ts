import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useFitScale } from './useFitScale';

// jsdom has no layout, so drive scrollHeight/clientHeight by hand.
function makeElement(scrollHeights: number[], clientHeight: number) {
  const el = document.createElement('div');
  let call = 0;
  Object.defineProperty(el, 'clientHeight', { get: () => clientHeight });
  Object.defineProperty(el, 'scrollHeight', {
    get: () => scrollHeights[Math.min(call++, scrollHeights.length - 1)],
  });
  return el;
}

function renderFitScale(el: HTMLElement) {
  return renderHook(() => {
    const ref = useRef<HTMLElement>(el);
    useFitScale(ref, [el]);
  });
}

describe('useFitScale', () => {
  it('keeps scale at 1 when content already fits', () => {
    const el = makeElement([80], 88);
    renderFitScale(el);
    expect(el.style.getPropertyValue('--gc-scale')).toBe('1');
  });

  it('steps the scale down until content fits', () => {
    // overflows twice, then fits
    const el = makeElement([100, 96, 90, 80], 88);
    renderFitScale(el);
    const scale = Number(el.style.getPropertyValue('--gc-scale'));
    expect(scale).toBeLessThan(1);
    expect(scale).toBeGreaterThanOrEqual(0.6);
  });

  it('never scales below the 0.6 floor', () => {
    // never fits
    const el = makeElement([500], 88);
    renderFitScale(el);
    expect(Number(el.style.getPropertyValue('--gc-scale'))).toBeCloseTo(0.6, 5);
  });

  it('re-measures from scale 1 on each run (content can shrink)', () => {
    const el = makeElement([80], 88);
    const { rerender } = renderFitScale(el);
    rerender();
    expect(el.style.getPropertyValue('--gc-scale')).toBe('1');
  });
});
