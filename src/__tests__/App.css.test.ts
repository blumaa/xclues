import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(__dirname, '../App.css'), 'utf-8');

// Extract the base (non-media-query) block for a selector
function baseBlock(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{[^}]*\\}`));
  if (!match) throw new Error(`No base block found for ${selector}`);
  return match[0];
}

describe('App CSS - layout height', () => {
  it('never fixes the layout to viewport height (buries the footer on pages taller than the viewport)', () => {
    // min-height: 100dvh is fine; a hard height is not
    expect(css).not.toMatch(/\.app-layout\s*\{[^}]*[^-]height:\s*100dvh/);
  });

  it('vertical fill uses flex-basis auto, never the flex: 1 shorthand (basis 0 hides content height and clips the board on short windows)', () => {
    expect(css).not.toMatch(/flex:\s*1\s*;/);
  });
});

describe('App CSS - mobile layout (footer follows grid, NYT-style)', () => {
  it('carousel viewport does not flex-grow on mobile', () => {
    expect(baseBlock('.carousel-viewport')).not.toMatch(/flex\s*:\s*1/);
  });

  it('carousel track does not flex-grow on mobile', () => {
    expect(baseBlock('.carousel-track')).not.toMatch(/flex\s*:\s*1/);
  });

  it('carousel never flex-fills — uniform layout at every width (board natural height, controls under grid)', () => {
    expect(css).not.toMatch(/\.carousel-viewport\s*\{[^}]*flex-grow/);
    expect(css).not.toMatch(/\.carousel-track\s*\{[^}]*flex-grow/);
    expect(css).not.toMatch(/\.carousel-viewport\s*\{[^}]*flex:/);
    expect(css).not.toMatch(/\.carousel-track\s*\{[^}]*flex:\s*1/);
  });

  it('game footer has no per-breakpoint overrides — one spacing rhythm everywhere', () => {
    // extract each @media block with brace matching (split would leak trailing base rules)
    let idx = css.indexOf('@media');
    while (idx !== -1) {
      const open = css.indexOf('{', idx);
      let depth = 1;
      let end = open + 1;
      while (depth > 0 && end < css.length) {
        if (css[end] === '{') depth++;
        if (css[end] === '}') depth--;
        end++;
      }
      expect(css.slice(idx, end)).not.toContain('.game-footer');
      idx = css.indexOf('@media', end);
    }
  });

  it('game footer has vertical breathing room between grid, dots, and buttons', () => {
    const footer = baseBlock('.game-footer');
    expect(footer).toMatch(/gap\s*:/);
    expect(footer).toMatch(/padding\s*:/);
  });
});

describe('App CSS - game footer fade (no jerk when switching genres)', () => {
  it('footer opacity is animated', () => {
    expect(baseBlock('.game-footer')).toMatch(/transition\s*:[^;]*opacity/);
  });

  it('hidden state fades out, drops interaction, and leaves the a11y tree', () => {
    const hidden = baseBlock('.game-footer--hidden');
    expect(hidden).toContain('opacity: 0');
    expect(hidden).toContain('visibility: hidden');
    expect(hidden).toContain('pointer-events: none');
  });
});
