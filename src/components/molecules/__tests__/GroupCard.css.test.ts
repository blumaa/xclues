import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(__dirname, '../GroupCard.css'), 'utf-8');

// All group card content must stay visible inside a square grid row on mobile.
// Static sizes are tuned for typical content; --gc-scale (set by useFitScale)
// shrinks the text further only when a given day's content overflows.
describe('GroupCard CSS - mobile content fits the square grid row', () => {
  const mobileStart = css.indexOf('@media (max-width: 639px)');
  const mobileSection = css.slice(mobileStart);

  it('has a mobile block', () => {
    expect(mobileStart).toBeGreaterThan(-1);
  });

  it('mobile block comes after the base text rules (same specificity, source order decides)', () => {
    expect(mobileStart).toBeGreaterThan(css.indexOf('.group-card .group-card-connection'));
  });

  it('has no difficulty label styles (label removed to maximize card space)', () => {
    expect(css).not.toContain('group-card-difficulty');
  });

  it('connection title scales with the fit factor on mobile', () => {
    expect(mobileSection).toMatch(
      /\.group-card-connection\s*\{[^}]*font-size:\s*calc\(0\.9375rem \* var\(--gc-scale, 1\)\)/
    );
  });

  it('item list scales with the fit factor on mobile', () => {
    expect(mobileSection).toMatch(
      /\.group-card-items\s+\.xtext\s*\{[^}]*font-size:\s*calc\(0\.75rem \* var\(--gc-scale, 1\)\)/
    );
  });
});
