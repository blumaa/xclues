import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('supabase client env validation', () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    if (originalWindow === undefined) {
      // @ts-expect-error — restoring deleted global
      delete globalThis.window;
    } else {
      globalThis.window = originalWindow;
    }
  });

  function simulateServer() {
    // @ts-expect-error — simulating Node/SSR where `window` is absent
    delete globalThis.window;
  }

  it('never throws at import — the client is created lazily', async () => {
    simulateServer();
    vi.stubEnv('NODE_ENV', 'production');
    // Importing must be side-effect-free so `next build` can prerender pages
    // that never touch Supabase without env vars present.
    await expect(import('../client')).resolves.toBeDefined();
  });

  it('throws on first use on the server in production when env vars are missing', async () => {
    simulateServer();
    vi.stubEnv('NODE_ENV', 'production');
    const { supabase } = await import('../client');
    expect(() => supabase.auth).toThrow(/Supabase/);
  });

  it('throws on first use on the server in development when env vars are missing', async () => {
    simulateServer();
    vi.stubEnv('NODE_ENV', 'development');
    const { supabase } = await import('../client');
    expect(() => supabase.auth).toThrow(/Supabase/);
  });

  it('does not throw in the browser (window defined) even in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    // jsdom setup leaves `window` defined; just assert it's truthy.
    expect(typeof window).toBe('object');
    const { supabase } = await import('../client');
    expect(() => supabase.auth).not.toThrow();
  });

  it('does not throw in the test env on the server (unit tests mock the client)', async () => {
    simulateServer();
    vi.stubEnv('NODE_ENV', 'test');
    const { supabase } = await import('../client');
    expect(() => supabase.auth).not.toThrow();
  });
});
