import { BRAND_THEMES } from '../themes';
import { TOKEN_TO_CSS, type ThemeTokens } from '../themes/types';

/**
 * Generates an inline CSS string with brand-specific custom properties.
 * Returns empty string for 'claude' (the CSS default) or unknown brands.
 */
export function getBrandStyleTag(
  brandCookie: string | undefined,
  theme: 'light' | 'dark'
): string {
  if (!brandCookie || brandCookie === 'claude') return '';

  const brandDef = BRAND_THEMES[brandCookie];
  if (!brandDef) return '';

  const tokens = theme === 'dark' ? brandDef.dark : brandDef.light;
  const declarations = Object.entries(TOKEN_TO_CSS)
    .map(([key, cssVar]) => `${cssVar}:${tokens[key as keyof ThemeTokens]}`)
    .join(';');

  return `:root{${declarations}}`;
}
