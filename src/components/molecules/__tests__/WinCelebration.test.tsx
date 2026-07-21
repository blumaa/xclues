import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { WinCelebration } from '../WinCelebration';

describe('WinCelebration', () => {
  it('renders 12 particle spans', () => {
    const { baseElement } = render(<WinCelebration />);
    const spans = baseElement.querySelectorAll('span.win-particle');
    expect(spans).toHaveLength(12);
  });

  it('has aria-hidden="true"', () => {
    const { baseElement } = render(<WinCelebration />);
    const root = baseElement.querySelector('.win-celebration');
    expect(root).toHaveAttribute('aria-hidden', 'true');
  });

  it('portals to document.body so it escapes the transformed carousel track (fires for every genre, not just film)', () => {
    // The celebration is `position: fixed`, but it is mounted deep inside
    // `.carousel-track`, which has a `transform`. A transformed ancestor becomes the
    // containing block for fixed descendants, pinning the celebration to each genre's
    // off-screen panel. Portalling to <body> restores viewport-fixed positioning.
    render(<WinCelebration />);
    const root = document.body.querySelector('.win-celebration');
    expect(root?.parentElement).toBe(document.body);
  });
});
