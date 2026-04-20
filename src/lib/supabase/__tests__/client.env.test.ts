import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('supabase client env validation', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('throws in production when env vars are missing (loud build failure)', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    await expect(import('../client')).rejects.toThrow(/Supabase/);
  });

  it('throws in development when env vars are missing', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    await expect(import('../client')).rejects.toThrow(/Supabase/);
  });

  it('does not throw in the test env (allows unit tests to mock the client)', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    await expect(import('../client')).resolves.toBeDefined();
  });
});
