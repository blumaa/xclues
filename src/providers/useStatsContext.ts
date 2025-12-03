/**
 * Stats Context
 *
 * Context for stats storage instance.
 * Separated from provider for React Fast Refresh compliance.
 */

import { createContext, useContext } from 'react';
import type { IStatsStorage } from '../types';

// Context for stats storage - no default value, must be provided
export const StatsContext = createContext<IStatsStorage | null>(null);

/**
 * Hook to access stats storage from context
 */
export function useStats(): IStatsStorage {
  const storage = useContext(StatsContext);
  if (!storage) {
    throw new Error('useStats must be used within StatsProvider');
  }
  return storage;
}
