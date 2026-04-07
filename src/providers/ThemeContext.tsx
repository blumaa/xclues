import { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ThemeContext } from './useThemeContext';
import { useSite } from './useSite';

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const context = useSite();
  const storagePrefix = context?.storagePrefix || "xclues";
  const themeValue = useTheme(storagePrefix);

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}
