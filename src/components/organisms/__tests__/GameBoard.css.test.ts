import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(
  resolve(__dirname, '../GameBoard.css'),
  'utf-8'
);

describe('GameBoard CSS - grid row equality', () => {
  it('uses repeat(4, 1fr) for mobile grid rows', () => {
    expect(css).toContain('grid-template-rows: repeat(4, 1fr)');
  });

  it('computes row height from board width on tablet+ (SSOT)', () => {
    // Row height must derive from the same source as tile width: board width
    expect(css).toContain('--grid-row-height');
    expect(css).toContain('--xclues-board-width');
  });

  it('uses the computed row height for grid rows on tablet+', () => {
    expect(css).toContain('grid-template-rows: repeat(4, var(--grid-row-height))');
  });

  it('does not use align-content: center (collapses 1fr rows to auto)', () => {
    expect(css).not.toContain('align-content: center');
  });

  it('group cards span all 4 columns', () => {
    expect(css).toContain('grid-column: 1 / -1');
  });
});
