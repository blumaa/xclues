import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { XModal } from '../XModal';

describe('XModal', () => {
  it('renders children when open', () => {
    render(
      <XModal isOpen onClose={vi.fn()} title="Test">
        <p>hello</p>
      </XModal>,
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('closes on Escape by default', () => {
    const onClose = vi.fn();
    render(
      <XModal isOpen onClose={onClose} title="Test">
        <p>hello</p>
      </XModal>,
    );

    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close on Escape when dismissable is false', () => {
    const onClose = vi.fn();
    render(
      <XModal isOpen onClose={onClose} title="Test" dismissable={false}>
        <p>hello</p>
      </XModal>,
    );

    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('does not close on outside pointer down when dismissable is false', () => {
    const onClose = vi.fn();
    render(
      <XModal isOpen onClose={onClose} title="Test" dismissable={false}>
        <p>hello</p>
      </XModal>,
    );

    fireEvent.pointerDown(document.body);
    expect(onClose).not.toHaveBeenCalled();
  });
});
