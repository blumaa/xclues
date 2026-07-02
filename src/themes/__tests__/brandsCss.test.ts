import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { generateBrandCss } from '../generateBrandCss';
import { BRAND_THEMES } from '../index';

const cssPath = resolve(__dirname, '../../styles/brands.css');

describe('brands.css - generated brand token blocks', () => {
  it('is in sync with the theme definitions (regenerate: bun run gen:brands)', () => {
    const onDisk = readFileSync(cssPath, 'utf-8');
    expect(onDisk).toBe(generateBrandCss());
  });

  it('has a light and a dark block for every brand', () => {
    const css = generateBrandCss();
    for (const name of Object.keys(BRAND_THEMES)) {
      expect(css).toContain(`[data-brand='${name}'] {`);
      expect(css).toContain(`[data-brand='${name}'][data-theme='dark'] {`);
    }
  });

  it('dark blocks set every token the light blocks set (cascade correctness)', () => {
    // A brand's light block ties (0,1,0) with index.css's [data-theme='dark'];
    // the brand dark block (0,2,0) must therefore cover every token.
    const css = generateBrandCss();
    const countVars = (selector: string) => {
      const start = css.indexOf(selector);
      expect(start).toBeGreaterThan(-1);
      const block = css.slice(start, css.indexOf('}', start));
      return (block.match(/--xclues-/g) ?? []).length;
    };
    expect(countVars(`[data-brand='vercel'][data-theme='dark']`)).toBe(
      countVars(`[data-brand='vercel'] {`)
    );
  });
});
