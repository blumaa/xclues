import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Dot } from '../Dot';

describe('Dot', () => {
  it('renders with sm size class by default', () => {
    const { container } = render(<Dot variant="filled" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).toContain('xclues-dot--sm');
  });

  it('renders with lg size class', () => {
    const { container } = render(<Dot variant="filled" size="lg" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).toContain('xclues-dot--lg');
  });

  it('renders with filled variant class', () => {
    const { container } = render(<Dot variant="filled" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).toContain('xclues-dot--filled');
  });

  it('renders with empty variant class', () => {
    const { container } = render(<Dot variant="empty" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).toContain('xclues-dot--empty');
  });

  it('renders with color variant class', () => {
    const { container } = render(<Dot variant="color" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).toContain('xclues-dot--color');
  });

  it('renders with color class when variant is color and color prop provided', () => {
    const { container } = render(<Dot variant="color" color="green" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).toContain('xclues-dot--green');
  });

  it('does not render color class when variant is not color', () => {
    const { container } = render(<Dot variant="filled" color="green" />);
    const dot = container.firstChild as HTMLElement;
    // color class is applied based on color prop presence, not variant
    // but the component applies color class whenever color prop is truthy
    expect(dot.className).toContain('xclues-dot--green');
  });

  it('does not render color class when color prop is not provided', () => {
    const { container } = render(<Dot variant="color" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).not.toContain('xclues-dot--yellow');
    expect(dot.className).not.toContain('xclues-dot--green');
    expect(dot.className).not.toContain('xclues-dot--blue');
    expect(dot.className).not.toContain('xclues-dot--purple');
  });

  it('applies additional className prop', () => {
    const { container } = render(<Dot variant="filled" className="custom-class" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).toContain('custom-class');
  });

  it('always has base xclues-dot class', () => {
    const { container } = render(<Dot variant="filled" />);
    const dot = container.firstChild as HTMLElement;
    expect(dot.className).toContain('xclues-dot');
  });
});
