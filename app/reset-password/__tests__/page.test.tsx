import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetPasswordPage from '../page';

const updatePassword = vi.fn();

vi.mock('../../../src/providers/useAuth', () => ({
  useAuth: () => ({ updatePassword }),
}));

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    updatePassword.mockReset();
  });

  async function fillAndSubmit(pw = 'supersecret1') {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('New password'), pw);
    await user.type(screen.getByPlaceholderText('Confirm password'), pw);
    await user.click(screen.getByRole('button', { name: /update password/i }));
  }

  it('shows an error and NOT success when updatePassword returns an error', async () => {
    updatePassword.mockResolvedValue({ error: { message: 'Token expired' } });
    render(<ResetPasswordPage />);

    await fillAndSubmit();

    expect(screen.queryByText('Password Updated')).not.toBeInTheDocument();
    expect(
      screen.getByText(/failed to update password|token expired/i),
    ).toBeInTheDocument();
  });

  it('shows success when updatePassword succeeds', async () => {
    updatePassword.mockResolvedValue({ error: null });
    render(<ResetPasswordPage />);

    await fillAndSubmit();

    expect(screen.getByText('Password Updated')).toBeInTheDocument();
  });
});
