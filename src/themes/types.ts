/**
 * xClues Theme Token Interface
 *
 * Every brand theme must provide ALL of these tokens for both light and dark modes.
 * TypeScript will catch missing tokens at compile time.
 *
 * Static tokens (spacing, font sizes, layout, z-index, animation) are NOT included
 * here because they don't change between themes.
 */

export interface ThemeTokens {
  // Typography
  fontFamily: string;
  headingWeight: string;
  bodyWeight: string;
  headingLetterSpacing: string;
  bodyLetterSpacing: string;
  headingLineHeight: string;
  bodyLineHeight: string;
  buttonTextTransform: string;
  buttonLetterSpacing: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  // Brand colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;

  // Surfaces
  pageBg: string;
  cardBg: string;
  cardBgHover: string;
  cardSelected: string;
  cardSelectedText: string;
  cardShadow: string;
  cardShadowHover: string;
  cardShadowSelected: string;

  // Header
  headerBg: string;
  headerBorder: string;
  headerBlur: string;

  // Footer
  footerBg: string;
  footerBorder: string;

  // Buttons
  btnPrimaryBg: string;
  btnPrimaryHover: string;
  btnPrimaryShadow: string;
  btnPrimaryText: string;

  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowPrimarySm: string;
  shadowPrimaryGlow: string;

  // Group card shadows
  shadowYellowGroup: string;
  shadowGreenGroup: string;
  shadowBlueGroup: string;
  shadowPurpleGroup: string;

  // Primary opacity variants
  primary6: string;
  primary8: string;
  primary10: string;
  primary15: string;
  primary20: string;

  // Overlay
  overlayBg: string;

  // Interactive states
  hoverTransform: string;
  hoverOpacity: string;
  focusRingColor: string;
  focusRingStyle: string;
  disabledOpacity: string;
  radiusPill: string;

  // Misc
  glow: string;
  borderRadius: string;
  borderRadiusSm: string;
  borderRadiusXs: string;
  groupText: string;

  // Dot indicators
  dotFilled: string;
  dotEmpty: string;
  dotGlow: string;

  // Game group colors
  yellow: string;
  yellowBg: string;
  green: string;
  greenBg: string;
  blue: string;
  blueBg: string;
  purple: string;
  purpleBg: string;
}

export interface BrandThemeDefinition {
  name: string;
  light: ThemeTokens;
  dark: ThemeTokens;
}

/**
 * Maps a ThemeTokens object to CSS custom property declarations.
 */
const TOKEN_TO_CSS: Record<keyof ThemeTokens, string> = {
  // Typography
  fontFamily: '--xclues-font-family',
  headingWeight: '--xclues-heading-weight',
  bodyWeight: '--xclues-body-weight',
  headingLetterSpacing: '--xclues-heading-letter-spacing',
  bodyLetterSpacing: '--xclues-body-letter-spacing',
  headingLineHeight: '--xclues-heading-line-height',
  bodyLineHeight: '--xclues-body-line-height',
  buttonTextTransform: '--xclues-button-text-transform',
  buttonLetterSpacing: '--xclues-button-letter-spacing',
  // Text
  textPrimary: '--xclues-text-primary',
  textSecondary: '--xclues-text-secondary',
  textTertiary: '--xclues-text-tertiary',
  primary: '--xclues-primary',
  primaryLight: '--xclues-primary-light',
  primaryDark: '--xclues-primary-dark',
  accent: '--xclues-accent',
  accentLight: '--xclues-accent-light',
  accentDark: '--xclues-accent-dark',
  pageBg: '--xclues-page-bg',
  cardBg: '--xclues-card-bg',
  cardBgHover: '--xclues-card-bg-hover',
  cardSelected: '--xclues-card-selected',
  cardSelectedText: '--xclues-card-selected-text',
  cardShadow: '--xclues-card-shadow',
  cardShadowHover: '--xclues-card-shadow-hover',
  cardShadowSelected: '--xclues-card-shadow-selected',
  headerBg: '--xclues-header-bg',
  headerBorder: '--xclues-header-border',
  headerBlur: '--xclues-header-blur',
  footerBg: '--xclues-footer-bg',
  footerBorder: '--xclues-footer-border',
  btnPrimaryBg: '--xclues-btn-primary-bg',
  btnPrimaryHover: '--xclues-btn-primary-hover',
  btnPrimaryShadow: '--xclues-btn-primary-shadow',
  btnPrimaryText: '--xclues-btn-primary-text',
  shadowSm: '--xclues-shadow-sm',
  shadowMd: '--xclues-shadow-md',
  shadowLg: '--xclues-shadow-lg',
  shadowPrimarySm: '--xclues-shadow-primary-sm',
  shadowPrimaryGlow: '--xclues-shadow-primary-glow',
  shadowYellowGroup: '--xclues-shadow-yellow-group',
  shadowGreenGroup: '--xclues-shadow-green-group',
  shadowBlueGroup: '--xclues-shadow-blue-group',
  shadowPurpleGroup: '--xclues-shadow-purple-group',
  primary6: '--xclues-primary-6',
  primary8: '--xclues-primary-8',
  primary10: '--xclues-primary-10',
  primary15: '--xclues-primary-15',
  primary20: '--xclues-primary-20',
  hoverTransform: '--xclues-hover-transform',
  hoverOpacity: '--xclues-hover-opacity',
  focusRingColor: '--xclues-focus-ring-color',
  focusRingStyle: '--xclues-focus-ring-style',
  disabledOpacity: '--xclues-disabled-opacity',
  radiusPill: '--xclues-radius-pill',
  overlayBg: '--xclues-overlay-bg',
  glow: '--xclues-glow',
  borderRadius: '--xclues-border-radius',
  borderRadiusSm: '--xclues-border-radius-sm',
  borderRadiusXs: '--xclues-border-radius-xs',
  groupText: '--xclues-group-text',
  dotFilled: '--xclues-dot-filled',
  dotEmpty: '--xclues-dot-empty',
  dotGlow: '--xclues-dot-glow',
  yellow: '--xclues-yellow',
  yellowBg: '--xclues-yellow-bg',
  green: '--xclues-green',
  greenBg: '--xclues-green-bg',
  blue: '--xclues-blue',
  blueBg: '--xclues-blue-bg',
  purple: '--xclues-purple',
  purpleBg: '--xclues-purple-bg',
};

/**
 * Apply a theme's tokens to the document root as CSS custom properties.
 */
export function applyThemeTokens(tokens: ThemeTokens): void {
  const root = document.documentElement;
  for (const [key, cssVar] of Object.entries(TOKEN_TO_CSS)) {
    root.style.setProperty(cssVar, tokens[key as keyof ThemeTokens]);
  }
}
