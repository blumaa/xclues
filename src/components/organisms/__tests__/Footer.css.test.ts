import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(__dirname, '../Footer.css'), 'utf-8');

// The footer sticks to the viewport bottom so it stays visible even on
// pages taller than the viewport (owner decision, 2026-07-02).
describe('Footer CSS - sticky footer', () => {
  const footerBlock = css.match(/\.footer\s*\{[^}]*\}/)?.[0] ?? '';

  it('sticks to the viewport bottom', () => {
    expect(footerBlock).toContain('position: sticky');
    expect(footerBlock).toContain('bottom: 0');
  });

  it('layers above page content it slides over', () => {
    expect(footerBlock).toMatch(/z-index:/);
  });
});
