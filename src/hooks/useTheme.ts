import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

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

  // Set data-theme on document root and persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Set theme to a specific value
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return {
    theme,
    isDarkMode: theme === 'dark',
    setTheme,
    toggleTheme,
  };
}
