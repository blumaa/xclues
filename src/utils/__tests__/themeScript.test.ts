import { describe, it, expect } from 'vitest';
import { getThemeInitScript } from '../themeScript';

describe('getThemeInitScript', () => {
  it('returns a string', () => {
    expect(typeof getThemeInitScript()).toBe('string');
  });

  it('reads the xclues-theme cookie', () => {
    const script = getThemeInitScript();
    expect(script).toContain('xclues-theme');
    expect(script).toContain('document.cookie');
  });

  it('checks prefers-color-scheme for system preference', () => {
    const script = getThemeInitScript();
    expect(script).toContain('prefers-color-scheme: dark');
    expect(script).toContain('matchMedia');
  });

  it('sets data-theme attribute on document element', () => {
    const script = getThemeInitScript();
    expect(script).toContain('setAttribute');
    expect(script).toContain('data-theme');
  });

  it('writes cookie for future server renders', () => {
    const script = getThemeInitScript();
    // Should write cookie with max-age
    expect(script).toContain('max-age=31536000');
    expect(script).toContain('SameSite=Lax');
  });

  it('checks localStorage as fallback', () => {
    const script = getThemeInitScript();
    expect(script).toContain('localStorage');
  });

  it('migrates brand from localStorage to cookie', () => {
    const script = getThemeInitScript();
    expect(script).toContain('xclues-brand-theme');
  });

  it('is wrapped in a try-catch for safety', () => {
    const script = getThemeInitScript();
    expect(script).toContain('try');
    expect(script).toContain('catch');
  });

  it('is an IIFE that executes immediately', () => {
    const script = getThemeInitScript();
    expect(script).toMatch(/^\(function\s*\(\)\s*\{/);
    expect(script).toMatch(/\}\)\(\)$/);
  });
});
