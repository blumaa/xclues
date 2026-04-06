import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { WinCelebration } from '../WinCelebration';

describe('WinCelebration', () => {
  it('renders 12 particle spans', () => {
    const { container } = render(<WinCelebration />);
    const spans = container.querySelectorAll('span.win-particle');
    expect(spans).toHaveLength(12);
  });

  it('has aria-hidden="true"', () => {
    const { container } = render(<WinCelebration />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('aria-hidden', 'true');
  });
});
