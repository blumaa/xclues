import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import manifest from "../manifest";

const m = manifest();
const publicDir = resolve(__dirname, "../../public");

describe("PWA manifest - Android installability", () => {
  it("declares a 192px and a 512px PNG icon (Android install criteria)", () => {
    const png = m.icons?.filter((i) => i.type === "image/png") ?? [];
    const sizes = png.flatMap((i) => (i.sizes ?? "").split(" "));
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
  });

  it("includes a maskable 512px icon so Android can apply its icon mask", () => {
    const maskable = m.icons?.find((i) => i.purpose?.includes("maskable"));
    expect(maskable).toBeDefined();
    expect(maskable?.sizes).toContain("512x512");
  });

  it("every referenced icon file exists on disk", () => {
    for (const icon of m.icons ?? []) {
      const path = resolve(publicDir, icon.src.replace(/^\//, ""));
      expect(existsSync(path), `missing icon file: ${icon.src}`).toBe(true);
    }
  });

  it("keeps standalone display and a start_url (installable app, not a shortcut)", () => {
    expect(m.display).toBe("standalone");
    expect(m.start_url).toBe("/");
  });
});
