import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HowToPlayBanner } from '../HowToPlayBanner';

// Mock useLocalStorage
let mockStoredValue = '0';
vi.mock('../../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => [mockStoredValue, vi.fn((val: string) => { mockStoredValue = val; })],
}));

describe('HowToPlayBanner', () => {
  beforeEach(() => {
    mockStoredValue = '0';
  });

  it('renders banner text when not dismissed', () => {
    render(<HowToPlayBanner />);
    expect(screen.getByText(/Select 4 items/)).toBeInTheDocument();
  });

  it('renders nothing when already dismissed', () => {
    mockStoredValue = '1';
    const { container } = render(<HowToPlayBanner />);
    expect(container.innerHTML).toBe('');
  });

  it('does NOT render any overlay or modal elements', () => {
    const { container } = render(<HowToPlayBanner />);
    expect(container.querySelector('.xmodal__overlay')).toBeNull();
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it('has a dismiss button', () => {
    render(<HowToPlayBanner />);
    expect(screen.getByLabelText('Dismiss')).toBeInTheDocument();
  });
});
