/**
 * TanStack Query Hooks for Puzzle Storage
 *
 * Provides React hooks for puzzle operations with caching.
 */

import {
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { SavedPuzzle } from '../../../types';
import type { IPuzzleStorage } from './IPuzzleStorage';

/**
 * Query keys for puzzle operations.
 */
export const puzzleKeys = {
  all: ['puzzles'] as const,
  daily: (date: string, genre?: string) => [...puzzleKeys.all, 'daily', date, genre] as const,
};

/**
 * Hook for loading today's daily puzzle.
 */
export function useDailyPuzzle(
  date: string,
  genre: string = 'films',
  storage: IPuzzleStorage,
  options?: Omit<UseQueryOptions<SavedPuzzle | null>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: puzzleKeys.daily(date, genre),
    queryFn: () => storage.getDailyPuzzle(date, genre),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...options,
  });
}
