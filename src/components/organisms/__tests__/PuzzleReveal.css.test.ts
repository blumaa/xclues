import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(__dirname, '../PuzzleReveal.css'), 'utf-8');

// The archive board must fit the viewport height on tablet/desktop: row height
// is width-derived (square) but capped by the remaining viewport height.
describe('PuzzleReveal CSS - board fits viewport height on tablet/desktop', () => {
  it('tablet rows are height-capped', () => {
    const tablet = css.slice(
      css.indexOf('@media (min-width: 640px)'),
      css.indexOf('@media (min-width: 1025px)')
    );
    expect(tablet).toMatch(/--grid-row-height:[^;]*100dvh/);
  });

  it('desktop rows are height-capped', () => {
    const desktop = css.slice(css.indexOf('@media (min-width: 1025px)'));
    expect(desktop).toMatch(/--grid-row-height:[^;]*100dvh/);
  });
});
