/**
 * Stats Provider
 *
 * Provides stats storage instance throughout the app.
 * Makes stats storage available to all components via context.
 */

import { ReactNode, useMemo } from 'react';
import { StatsContext } from './useStatsContext';
import { LocalStatsStorage } from '../services/LocalStatsStorage';
import { useSite } from './useSite';

interface StatsProviderProps {
  children: ReactNode;
}

/**
 * Provides stats context to children.
 * Creates storage instance with genre-specific prefix.
 */
export function StatsProvider({ children }: StatsProviderProps) {
  const { storagePrefix } = useSite();

  // Create storage instance with genre-specific prefix
  // Memoized to avoid recreating on every render
  const statsStorage = useMemo(
    () => new LocalStatsStorage(storagePrefix),
    [storagePrefix]
  );

  return <StatsContext.Provider value={statsStorage}>{children}</StatsContext.Provider>;
}
