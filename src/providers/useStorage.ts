/**
 * useStorage Hook
 *
 * Hook to access puzzle storage from context.
 */

import { useContext } from 'react';
import { StorageContext } from './useStorageContext';
import type { IPuzzleStorage } from '../lib/supabase/storage';

export function useStorage(): IPuzzleStorage {
  const storage = useContext(StorageContext);
  if (!storage) {
    throw new Error('useStorage must be used within StorageProvider');
  }
  return storage;
}
