import { describe, it, expect } from 'vitest';
import { getBrandStyleTag } from '../getBrandStyleTag';

describe('getBrandStyleTag', () => {
  it('returns empty string when brand is undefined', () => {
    expect(getBrandStyleTag(undefined, 'light')).toBe('');
  });

  it('returns empty string when brand is claude (CSS default)', () => {
    expect(getBrandStyleTag('claude', 'light')).toBe('');
    expect(getBrandStyleTag('claude', 'dark')).toBe('');
  });

  it('returns CSS string for a valid non-default brand', () => {
    const css = getBrandStyleTag('spotify', 'light');
    expect(css).toContain(':root');
    expect(css).toContain('--xclues-primary');
    expect(css).toContain('--xclues-page-bg');
    expect(css).toContain('--xclues-font-family');
  });

  it('uses dark tokens when theme is dark', () => {
    const lightCss = getBrandStyleTag('spotify', 'light');
    const darkCss = getBrandStyleTag('spotify', 'dark');
    // Both should have CSS but with different values
    expect(lightCss).toContain(':root');
    expect(darkCss).toContain(':root');
    expect(lightCss).not.toBe(darkCss);
  });

  it('returns empty string for unknown brand', () => {
    expect(getBrandStyleTag('nonexistent-brand', 'light')).toBe('');
  });
});
