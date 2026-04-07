import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

const TEST_PREFIX = 'test';
const STORAGE_KEY = `${TEST_PREFIX}-theme`;

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage and cookies
    localStorage.clear();
    document.cookie.split(";").forEach(c => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Reset data-theme attribute and clear inline styles
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.cssText = '';

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('should initialize with light theme by default', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    expect(result.current.theme).toBe('light');
    expect(result.current.isDarkMode).toBe(false);
  });

  it('should toggle theme from light to dark', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(result.current.isDarkMode).toBe(true);
  });

  it('should toggle theme from dark to light', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(result.current.isDarkMode).toBe(false);
  });

  it('should set theme to specific value', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
    expect(result.current.isDarkMode).toBe(true);
  });

  it('should persist theme to localStorage', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    act(() => {
      result.current.setTheme('dark');
    });

    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  it('should set data-theme attribute on document root', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    act(() => {
      result.current.setTheme('dark');
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should load theme from localStorage on mount', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');

    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    expect(result.current.theme).toBe('dark');
    expect(result.current.isDarkMode).toBe(true);
  });

  it('should respect system preference when no stored preference', () => {
    // Mock matchMedia to return dark mode preference
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    expect(result.current.theme).toBe('dark');
    expect(result.current.isDarkMode).toBe(true);
  });

  it('should prefer stored theme over system preference', () => {
    localStorage.setItem(STORAGE_KEY, 'light');

    // Mock matchMedia to return dark mode preference
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    // Should use stored preference, not system preference
    expect(result.current.theme).toBe('light');
    expect(result.current.isDarkMode).toBe(false);
  });

  it('brandTheme defaults to claude', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));
    expect(result.current.brandTheme).toBe('claude');
  });

  it('setBrandTheme updates brandTheme', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    act(() => {
      result.current.setBrandTheme('superhuman');
    });

    expect(result.current.brandTheme).toBe('superhuman');
  });

  it('setBrandTheme persists to localStorage key xclues-brand-theme', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    act(() => {
      result.current.setBrandTheme('superhuman');
    });

    expect(localStorage.getItem('xclues-brand-theme')).toBe('superhuman');
  });

  it('setBrandTheme applies theme tokens to document root', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    act(() => {
      result.current.setBrandTheme('superhuman');
    });

    // Superhuman primary is #714cb6
    expect(document.documentElement.style.getPropertyValue('--xclues-primary')).toBe('#714cb6');
  });

  it('setBrandTheme switches back to xclues tokens', () => {
    const { result } = renderHook(() => useTheme(TEST_PREFIX));

    act(() => {
      result.current.setBrandTheme('superhuman');
    });

    expect(document.documentElement.style.getPropertyValue('--xclues-primary')).toBe('#714cb6');

    act(() => {
      result.current.setBrandTheme('xclues');
    });

    expect(document.documentElement.style.getPropertyValue('--xclues-primary')).toBe('#6c5ce7');
  });

  it('should use different storage keys for different prefixes', () => {
    const { result: filmsResult } = renderHook(() => useTheme('filmclues'));
    const { result: musicResult } = renderHook(() => useTheme('musiclues'));

    act(() => {
      filmsResult.current.setTheme('dark');
    });

    act(() => {
      musicResult.current.setTheme('light');
    });

    expect(localStorage.getItem('filmclues-theme')).toBe('dark');
    expect(localStorage.getItem('musiclues-theme')).toBe('light');
  });
});
