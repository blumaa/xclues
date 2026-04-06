/**
 * Storage Context
 *
 * React context for accessing puzzle storage throughout the app.
 */

import { createContext } from 'react';
import type { IPuzzleStorage } from '../lib/supabase/storage';

export const StorageContext = createContext<IPuzzleStorage | null>(null);
