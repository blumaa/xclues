/**
 * Auth Provider
 *
 * Provides authentication state and actions throughout the app.
 * Subscribes to Supabase auth state changes for reactivity.
 */

import { ReactNode, useEffect, useState, useCallback, useMemo } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase/client';
import { AuthContext } from './useAuthContext';
import { trackEvent, EVENTS } from '../services/analytics';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hydrate initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) trackEvent(EVENTS.AUTH_SIGNUP, { method: 'email' });
    return { error };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) trackEvent(EVENTS.AUTH_LOGIN, { method: 'email' });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    trackEvent(EVENTS.AUTH_LOGOUT, {});
  }, []);

  const updateEmail = useCallback(async (email: string) => {
    const { error } = await supabase.auth.updateUser({ email });
    if (!error) trackEvent(EVENTS.AUTH_EMAIL_UPDATED, {});
    return { error };
  }, []);

  const updatePassword = useCallback(async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (!error) trackEvent(EVENTS.AUTH_PASSWORD_UPDATED, {});
    return { error };
  }, []);

  const deleteAccount = useCallback(async () => {
    const { error } = await supabase.functions.invoke('delete-account');
    if (!error) {
      trackEvent(EVENTS.AUTH_ACCOUNT_DELETED, {});
      await supabase.auth.signOut();
    }
    return { error };
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateEmail,
    updatePassword,
    deleteAccount,
  }), [user, session, isLoading, signUp, signIn, signOut, updateEmail, updatePassword, deleteAccount]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
