import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../AuthProvider';
import { useAuth } from '../useAuth';

const { getSession, onAuthStateChange } = vi.hoisted(() => ({
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(() => ({
    data: { subscription: { unsubscribe: vi.fn() } },
  })),
}));

vi.mock('../../lib/supabase/client', () => ({
  supabase: { auth: { getSession, onAuthStateChange } },
}));

function Consumer() {
  const { isLoading } = useAuth();
  return <div>{isLoading ? 'loading' : 'ready'}</div>;
}

describe('AuthProvider session hydration', () => {
  beforeEach(() => {
    getSession.mockReset();
    onAuthStateChange.mockClear();
  });

  it('stops loading when getSession rejects (no infinite spinner)', async () => {
    getSession.mockRejectedValue(new Error('network down'));
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );
    expect(await screen.findByText('ready')).toBeInTheDocument();
  });

  it('stops loading after a successful session hydrate', async () => {
    getSession.mockResolvedValue({ data: { session: null } });
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );
    expect(await screen.findByText('ready')).toBeInTheDocument();
  });
});
