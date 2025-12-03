/**
 * Site Hook
 *
 * Hook for accessing site configuration from context.
 * Provides genre, siteName, and other configuration.
 */

import { useContext } from 'react';
import { SiteContext } from './useSiteContext';
import type { SiteConfig } from '../config';

/**
 * Hook to access site configuration.
 * Must be used within a SiteProvider.
 */
export function useSite(): SiteConfig {
  return useContext(SiteContext);
}
