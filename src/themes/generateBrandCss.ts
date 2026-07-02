import { BRAND_THEMES } from './index';
import { TOKEN_TO_CSS, type ThemeTokens } from './types';

function block(selector: string, tokens: ThemeTokens): string {
  const lines = (Object.entries(TOKEN_TO_CSS) as [keyof ThemeTokens, string][])
    .map(([key, cssVar]) => `  ${cssVar}: ${tokens[key]};`)
    .join('\n');
  return `${selector} {\n${lines}\n}`;
}

/**
 * Brand tokens as static CSS, one light + one dark block per brand, keyed by
 * the data-brand attribute the pre-paint init script sets. Same pattern as
 * data-theme, so brand switching needs no runtime style injection and the
 * first paint is already in the right brand.
 *
 * The dark block ([data-brand][data-theme='dark'], specificity 0,2,0) must set
 * every token the light block sets — it has to beat both the brand light block
 * and index.css's [data-theme='dark'] block.
 */
export function generateBrandCss(): string {
  const header = [
    '/* AUTO-GENERATED — do not edit by hand.',
    '   Source of truth: src/themes/*.ts. Regenerate: bun run gen:brands.',
    '   Kept in sync by src/themes/__tests__/brandsCss.test.ts. */',
  ].join('\n');

  const blocks: string[] = [header];
  for (const [name, def] of Object.entries(BRAND_THEMES)) {
    blocks.push(block(`[data-brand='${name}']`, def.light));
    blocks.push(block(`[data-brand='${name}'][data-theme='dark']`, def.dark));
  }
  return blocks.join('\n\n') + '\n';
}
