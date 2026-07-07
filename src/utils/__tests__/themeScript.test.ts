import { describe, it, expect } from 'vitest';
import { getThemeInitScript } from '../themeScript';
import { BRAND_THEMES, BRAND_STORAGE_KEY, DEFAULT_BRAND } from '../../themes';

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

  it('sets data-brand before paint (same pattern as data-theme)', () => {
    const script = getThemeInitScript();
    expect(script).toContain("setAttribute('data-brand'");
    expect(script).toContain('xclues-brand-theme');
  });

  it('falls back to the default brand for missing or unknown stored values', () => {
    const script = getThemeInitScript();
    expect(script).toContain(`'${DEFAULT_BRAND}'`);
    // valid brand whitelist is embedded so a stale value can't produce an unstyled brand
    expect(script).toContain(JSON.stringify(Object.keys(BRAND_THEMES)));
  });

  // Old sessions persisted a brand under the unversioned key; reading it back
  // pinned returning users to the old theme. The key must be versioned so a
  // bump invalidates every previously stored brand.
  it('uses a versioned brand storage key', () => {
    expect(BRAND_STORAGE_KEY).toMatch(/-v\d+$/);
    expect(getThemeInitScript()).toContain(BRAND_STORAGE_KEY);
  });

  it('never reads or writes the legacy unversioned brand key', () => {
    const script = getThemeInitScript();
    // a bare `xclues-brand-theme'` / `xclues-brand-theme=` (no -vN) would let a
    // stale brand from an old session win again.
    expect(script).not.toMatch(/xclues-brand-theme'/);
    expect(script).not.toMatch(/xclues-brand-theme=/);
  });
});
