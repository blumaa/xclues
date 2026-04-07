/**
 * Site Hook
 *
 * Hook for accessing site configuration from context.
 * Provides genre, siteName, setGenre, and other configuration.
 */

import { useContext } from 'react';
import { SiteContext, type SiteContextValue } from './useSiteContext';
import { getSiteConfig } from '../config';

/**
 * Hook to access site configuration.
 * Returns default config if used outside a SiteProvider.
 */
export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) {
    return getSiteConfig('films');
  }
  return context;
}
