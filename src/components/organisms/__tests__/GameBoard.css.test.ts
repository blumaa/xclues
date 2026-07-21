import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(
  resolve(__dirname, '../GameBoard.css'),
  'utf-8'
);

// Extract the base (non-media-query) block for a selector
function baseBlock(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{[^}]*\\}`));
  if (!match) throw new Error(`No base block found for ${selector}`);
  return match[0];
}

describe('GameBoard CSS - square tiles on mobile (NYT-style)', () => {
  it('derives mobile row height from viewport width (square tiles, SSOT with tile width)', () => {
    // 2 x side padding + 3 x gap = 5 x spacing-2
    expect(css).toContain(
      '--grid-row-height: calc((100vw - 5 * var(--xclues-spacing-2)) / 4)'
    );
  });

  it('uses the computed row height for grid rows', () => {
    expect(css).toContain('grid-template-rows: repeat(4, var(--grid-row-height))');
  });

  it('does not stretch rows to fill leftover screen height', () => {
    expect(css).not.toContain('minmax(0, 1fr)');
  });

  it('grid does not flex-grow to fill the board', () => {
    expect(baseBlock('.game-grid')).not.toMatch(/flex\s*:/);
  });

  it('board does not flex-grow on mobile (footer sits right under grid)', () => {
    expect(baseBlock('.game-board')).not.toMatch(/flex\s*:\s*1/);
  });
});

describe('GameBoard CSS - tablet/desktop board sizing', () => {
  it('computes row height from board width on tablet+ (SSOT)', () => {
    // Row height must derive from the same source as tile width: board width
    expect(css).toContain('--xclues-board-width');
  });

  it('board never flex-fills — uniform layout at every width (natural height, controls under grid)', () => {
    expect(css).not.toMatch(/\.game-board\s*\{[^}]*flex:\s*1/);
  });

  it('grid has a definite width so solving a group never narrows the board', () => {
    // On tablet+ the grid is centered with `margin: 0 auto`, which disables flex-stretch.
    // Without an explicit width the grid shrink-to-fits its content, so removing a solved
    // group's 4 tiles narrows the columns and the whole board. A definite width pins it.
    const gridBlock = css.match(/\.game-grid\s*\{[^}]*display:\s*grid[^}]*\}/)?.[0] ?? '';
    expect(gridBlock).toMatch(/(?<!-)width:\s*100%/);
  });
});

describe('GameBoard CSS - no flex-basis 0', () => {
  it('vertical fill uses flex-basis auto, never the flex: 1 shorthand (basis 0 clips the board on short windows)', () => {
    expect(css).not.toMatch(/flex:\s*1\s*;/);
  });
});

describe('GameBoard CSS - board height SSOT', () => {
  it('exposes the total grid height so siblings (results panel) can match it', () => {
    expect(css).toMatch(
      /--grid-total-height:\s*calc\(4 \* var\(--grid-row-height\) \+ 3 \* var\(--grid-gap\)\)/
    );
  });

  it('sizing vars are defined on the board too, not just the grid', () => {
    expect(css).toMatch(/\.game-board,\s*\.game-grid\s*\{/);
  });
});

describe('GameBoard CSS - shared grid rules', () => {
  it('does not use align-content: center (collapses rows to auto)', () => {
    expect(css).not.toContain('align-content: center');
  });

  it('group cards span all 4 columns', () => {
    expect(css).toContain('grid-column: 1 / -1');
  });

  it('group cards keep the exact row height (min-height: auto would let content stretch them)', () => {
    expect(baseBlock('.game-grid > .group-card')).toContain('min-height: 0');
  });
});
