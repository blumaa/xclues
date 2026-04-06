import { useState, useEffect, useCallback } from 'react';
import { BRAND_THEMES, applyThemeTokens } from '../themes';

type Theme = 'light' | 'dark';
export type BrandTheme = keyof typeof BRAND_THEMES;

const BRAND_NAMES = Object.keys(BRAND_THEMES) as BrandTheme[];
const BRAND_STORAGE_KEY = 'xclues-brand-theme';

function isValidBrand(value: string): value is BrandTheme {
  return value in BRAND_THEMES;
}

function getInitialBrand(): BrandTheme {
  if (typeof window === 'undefined') return 'claude';
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
 * Gets the initial theme from localStorage or system preference
 */
function getInitialTheme(storageKey: string): Theme {
  if (typeof window === 'undefined') return 'light';

  // Check localStorage first
  const stored = localStorage.getItem(storageKey);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

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

/**
 * Hook for managing theme (light/dark mode)
 *
 * Features:
 * - Persists theme preference to localStorage
 * - Respects system preference (prefers-color-scheme)
 * - Provides toggle and setter functions
 *
 * Following SOLID principles:
 * - Single Responsibility: Only handles theme state
 * - Open/Closed: Can be extended without modification
 * - Dependency Inversion: Depends on abstractions (localStorage, window APIs)
 *
 * @param storagePrefix - Prefix for localStorage key (e.g., 'xclues' -> 'xclues-theme')
 */
export function useTheme(storagePrefix: string): UseThemeReturn {
  const storageKey = `${storagePrefix}-theme`;
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(storageKey));
  const [brandTheme, setBrandThemeState] = useState<BrandTheme>(() => getInitialBrand());

  // Apply theme + brand tokens atomically to avoid flash of wrong theme
  useEffect(() => {
    // 1. Set data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);

    // 2. Apply brand tokens for the current color scheme
    const brandDef = BRAND_THEMES[brandTheme];
    if (brandDef) {
      const tokens = theme === 'dark' ? brandDef.dark : brandDef.light;
      applyThemeTokens(tokens);
    }

    // 3. Persist brand choice
    localStorage.setItem(BRAND_STORAGE_KEY, brandTheme);
  }, [brandTheme, theme, storageKey]);

  // Set theme to a specific value
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Set brand theme
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
