/**
 * Auth Context
 *
 * Context for Supabase authentication state and actions.
 * Separated from provider for React Fast Refresh compliance.
 */

import { createContext, useContext } from 'react';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateEmail: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
  deleteAccount: () => Promise<{ error: Error | null }>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
