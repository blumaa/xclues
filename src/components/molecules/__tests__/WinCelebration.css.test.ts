import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(__dirname, '../WinCelebration.css'), 'utf-8');

describe('WinCelebration.css', () => {
  it('particles originate from the bottom of the app, not the vertical middle', () => {
    // Bug: particles were anchored at `top: 50%`, so the celebration erupted from
    // the middle of the screen. They must start at the bottom edge and rise upward.
    expect(css).not.toMatch(/top:\s*50%/);
    expect(css).toMatch(/bottom:\s*0/);
  });
});
