import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Keeps dead weight out of the browser bundle (see scripts/bundle-budget.ts).
const ROOT = resolve(__dirname, "../..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "node_modules" ? [] : sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

const files = [...sourceFiles(join(ROOT, "src")), ...sourceFiles(join(ROOT, "app"))];
const rel = (path: string) => relative(ROOT, path);
const importing = (pattern: RegExp) =>
  files.filter((f) => pattern.test(readFileSync(f, "utf8"))).map(rel);

describe("client bundle guards", () => {
  it("imports supabase-js only from server-side code", () => {
    // Browser inserts go through restInsert (plain fetch).
    const runtime = /^import (?!type)[^;]*from ["']@supabase\/supabase-js["']/m;
    expect(importing(runtime)).toEqual(["src/lib/supabase/server.ts"]);
  });

  it("ships no Capacitor (iOS app retired)", () => {
    expect(importing(/@capacitor\//)).toEqual([]);
    expect(existsSync(join(ROOT, "capacitor.config.ts"))).toBe(false);
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
    const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    expect(deps.filter((d) => d.startsWith("@capacitor/"))).toEqual([]);
  });

  it("wraps the app in no auth or storage provider (no sign-in exists)", () => {
    const providers = readFileSync(join(ROOT, "app/providers.tsx"), "utf8");
    expect(providers).not.toMatch(/AuthProvider|StorageProvider/);
  });
});
