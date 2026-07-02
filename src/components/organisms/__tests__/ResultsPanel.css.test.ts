import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(__dirname, '../ResultsPanel.css'), 'utf-8');

describe('ResultsPanel CSS - same height as the game grid', () => {
  it('panel is at least the exact grid height (no layout jump when toggling)', () => {
    const panel = css.match(/\.results-panel\s*\{[^}]*\}/)?.[0] ?? '';
    expect(panel).toContain('min-height: var(--grid-total-height)');
  });
});
