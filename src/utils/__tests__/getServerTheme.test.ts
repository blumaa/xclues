import { describe, it, expect } from 'vitest';
import { getServerTheme } from '../getServerTheme';

describe('getServerTheme', () => {
  it('returns "light" when cookie value is undefined', () => {
    expect(getServerTheme(undefined)).toBe('light');
  });

  it('returns "light" when cookie value is "light"', () => {
    expect(getServerTheme('light')).toBe('light');
  });

  it('returns "dark" when cookie value is "dark"', () => {
    expect(getServerTheme('dark')).toBe('dark');
  });

  it('returns "light" for invalid cookie values', () => {
    expect(getServerTheme('invalid')).toBe('light');
    expect(getServerTheme('')).toBe('light');
  });
});
