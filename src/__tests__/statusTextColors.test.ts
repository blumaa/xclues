import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Win/loss text colors must stay readable (WCAG AA, 4.5:1) on cards in both themes.
const css = readFileSync(resolve(__dirname, "../index.css"), "utf8");

function block(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  return css.slice(start, css.indexOf("\n}", start));
}

function token(body: string, name: string): string {
  const match = body.match(new RegExp(`--xclues-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`--xclues-${name} missing or not a #rrggbb hex`);
  return match[1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe.each([":root", '[data-theme="dark"]'])("status text colors in %s", (selector) => {
  const body = block(selector);
  const cardBg = token(body, "card-bg");

  it.each(["text-success", "text-error"])("--xclues-%s meets 4.5:1 on card-bg", (name) => {
    expect(contrast(token(body, name), cardBg)).toBeGreaterThanOrEqual(4.5);
  });
});
