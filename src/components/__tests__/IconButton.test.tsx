import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { IconButton } from '../IconButton';

describe('IconButton', () => {
  it('renders children', () => {
    const { getByText } = render(
      <IconButton onClick={() => {}} aria-label="Test">
        Click me
      </IconButton>
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <IconButton onClick={handleClick} aria-label="Test">
        Click
      </IconButton>
    );
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-label', () => {
    const { getByRole } = render(
      <IconButton onClick={() => {}} aria-label="Close menu">
        X
      </IconButton>
    );
    expect(getByRole('button')).toHaveAttribute('aria-label', 'Close menu');
  });

  it('renders as a button element', () => {
    const { getByRole } = render(
      <IconButton onClick={() => {}} aria-label="Test">
        Click
      </IconButton>
    );
    expect(getByRole('button')).toBeTruthy();
  });
});
