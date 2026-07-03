import { describe, it, expect } from "vitest";
import { resolveRedirectHost } from "./domainRedirects";

describe("resolveRedirectHost - 301 alt domains to their primary", () => {
  it("redirects the films alt domain (and www) to filmclues.space", () => {
    expect(resolveRedirectHost("filmecules.space")).toBe("filmclues.space");
    expect(resolveRedirectHost("www.filmecules.space")).toBe("filmclues.space");
  });

  it("redirects the music alt domain (and www) to musiclues.space", () => {
    expect(resolveRedirectHost("musicules.space")).toBe("musiclues.space");
    expect(resolveRedirectHost("www.musicules.space")).toBe("musiclues.space");
  });

  it("is case-insensitive and tolerates a port", () => {
    expect(resolveRedirectHost("FILMECULES.space")).toBe("filmclues.space");
    expect(resolveRedirectHost("filmecules.space:443")).toBe("filmclues.space");
  });

  it("does not redirect the primary/canonical domains", () => {
    for (const host of [
      "filmclues.space",
      "www.filmclues.space",
      "musiclues.space",
      "litclues.space",
    ]) {
      expect(resolveRedirectHost(host)).toBeNull();
    }
  });

  it("does not redirect unknown hosts (localhost, vercel previews)", () => {
    expect(resolveRedirectHost("localhost:3000")).toBeNull();
    expect(resolveRedirectHost("filmclues.vercel.app")).toBeNull();
    expect(resolveRedirectHost("")).toBeNull();
  });
});
