/**
 * useStats Hook
 *
 * Hook to access stats storage from context.
 */

import { useContext } from 'react';
import { StatsContext } from './useStatsContext';
import type { IStatsStorage } from '../types';

export function useStats(): IStatsStorage {
  const storage = useContext(StatsContext);
  if (!storage) {
    throw new Error('useStats must be used within StatsProvider');
  }
  return storage;
}
