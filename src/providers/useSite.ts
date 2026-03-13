/**
 * Site Hook
 *
 * Hook for accessing site configuration from context.
 * Provides genre, siteName, setGenre, and other configuration.
 */

import { useContext } from 'react';
import { SiteContext, type SiteContextValue } from './useSiteContext';

/**
 * Hook to access site configuration.
 * Must be used within a SiteProvider.
 */
export function useSite(): SiteContextValue {
  return useContext(SiteContext);
}
