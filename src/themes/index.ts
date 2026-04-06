export type { ThemeTokens, BrandThemeDefinition } from './types';
export { applyThemeTokens } from './types';
export { xcluesTheme } from './xclues';
export { superhumanTheme } from './superhuman';
export { stripeTheme } from './stripe';
export { spotifyTheme } from './spotify';
export { linearTheme } from './linear';
export { notionTheme } from './notion';
export { vercelTheme } from './vercel';
export { supabaseTheme } from './supabase';
export { claudeTheme } from './claude';
export { raycastTheme } from './raycast';
export { framerTheme } from './framer';
export { pinterestTheme } from './pinterest';

import type { BrandThemeDefinition } from './types';
import { xcluesTheme } from './xclues';
import { superhumanTheme } from './superhuman';
import { stripeTheme } from './stripe';
import { spotifyTheme } from './spotify';
import { linearTheme } from './linear';
import { notionTheme } from './notion';
import { vercelTheme } from './vercel';
import { supabaseTheme } from './supabase';
import { claudeTheme } from './claude';
import { raycastTheme } from './raycast';
import { framerTheme } from './framer';
import { pinterestTheme } from './pinterest';

export const BRAND_THEMES: Record<string, BrandThemeDefinition> = {
  xclues: xcluesTheme,
  superhuman: superhumanTheme,
  stripe: stripeTheme,
  spotify: spotifyTheme,
  linear: linearTheme,
  notion: notionTheme,
  vercel: vercelTheme,
  supabase: supabaseTheme,
  claude: claudeTheme,
  raycast: raycastTheme,
  framer: framerTheme,
  pinterest: pinterestTheme,
};
