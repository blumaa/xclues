import { useState, useEffect, useCallback } from 'react';
import { BRAND_THEMES, applyThemeTokens } from '../themes';

type Theme = 'light' | 'dark';
export type BrandTheme = keyof typeof BRAND_THEMES;

const BRAND_NAMES = Object.keys(BRAND_THEMES) as BrandTheme[];
const BRAND_STORAGE_KEY = 'xclues-brand-theme';
const THEME_STORAGE_KEY = 'xclues-theme';

function isValidBrand(value: string): value is BrandTheme {
  return value in BRAND_THEMES;
}

function getInitialBrand(): BrandTheme {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return 'claude';
  const stored = localStorage.getItem(BRAND_STORAGE_KEY);
  if (stored && isValidBrand(stored)) return stored;
  return 'claude';
}

export { BRAND_NAMES };

/**
 * Gets the user's system color scheme preference
 */
function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'dark' : 'light';
}

/**
 * Gets the initial theme from localStorage or cookie or system preference
 */
function getInitialTheme(storageKey: string): Theme {
  if (typeof window === 'undefined') return 'light';

  // Check cookie (SSR)
  const cookieMatch = document.cookie.match(new RegExp('(^| )' + THEME_STORAGE_KEY + '=([^;]+)'));
  if (cookieMatch) return cookieMatch[2] as Theme;

  // Check localStorage
  const stored = localStorage.getItem(storageKey);
  if (stored === 'light' || stored === 'dark') return stored;

  // Fall back to system preference
  return getSystemTheme();
}

export interface UseThemeReturn {
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  brandTheme: BrandTheme;
  setBrandTheme: (brand: BrandTheme) => void;
}

export function useTheme(storagePrefix: string): UseThemeReturn {
  const themeStorageKey = `${storagePrefix}-theme`;
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(themeStorageKey));
  const [brandTheme, setBrandThemeState] = useState<BrandTheme>(() => getInitialBrand());

  useEffect(() => {
    if (typeof window === 'undefined' || !document.documentElement) return;

    // Set data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(themeStorageKey, theme);
    // Sync cookie for SSR consistency
    document.cookie = `${THEME_STORAGE_KEY}=${theme}; path=/; max-age=31536000; SameSite=Lax`;

    // Apply brand tokens
    const brandDef = BRAND_THEMES[brandTheme];
    if (brandDef) {
      applyThemeTokens(theme === 'dark' ? brandDef.dark : brandDef.light);
    }

    localStorage.setItem(BRAND_STORAGE_KEY, brandTheme);
    document.cookie = `${BRAND_STORAGE_KEY}=${brandTheme}; path=/; max-age=31536000; SameSite=Lax`;
  }, [brandTheme, theme, themeStorageKey]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setBrandTheme = useCallback((brand: BrandTheme) => {
    setBrandThemeState(brand);
  }, []);

  return {
    theme,
    isDarkMode: theme === 'dark',
    setTheme,
    toggleTheme,
    brandTheme,
    setBrandTheme,
  };
}
