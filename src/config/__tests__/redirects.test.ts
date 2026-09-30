import { describe, it, expect } from "vitest";
import type { Redirect } from "next/dist/lib/load-custom-routes";
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import {
  matchHas,
  prepareDestination,
} from "next/dist/shared/lib/router/utils/prepare-destination";
import { buildRedirects } from "../redirects";

// Resolve a request against the redirect list with Next's own matchers
// (first match wins), so these tests exercise real routing semantics.
function resolve(host: string, path: string) {
  const url = new URL(`https://${host}${path}`);
  const query = Object.fromEntries(url.searchParams);
  const req = { headers: { host } } as unknown as Parameters<typeof matchHas>[0];

  for (const r of buildRedirects() as Redirect[]) {
    const params = getPathMatch(r.source, { removeUnnamedParams: true })(url.pathname);
    if (!params) continue;
    const hasParams = matchHas(req, query, r.has, r.missing);
    if (!hasParams) continue;
    const { newUrl, parsedDestination } = prepareDestination({
      appendParamsToQuery: false,
      destination: r.destination,
      params: { ...params, ...hasParams },
      query,
    });
    const search = new URLSearchParams(
      parsedDestination.query as Record<string, string>,
    ).toString();
    const location = parsedDestination.hostname
      ? `${parsedDestination.protocol}//${parsedDestination.hostname}${newUrl}`
      : newUrl;
    return {
      location: search ? `${location}?${search}` : location,
      status: r.statusCode ?? (r.permanent ? 308 : 307),
    };
  }
  return null;
}

describe("buildRedirects - alt brand domains", () => {
  it("301s alt domains to their canonical primary, keeping path and query", () => {
    expect(resolve("filmecules.space", "/films/archive?x=1")).toEqual({
      location: "https://filmclues.space/films/archive?x=1",
      status: 301,
    });
    expect(resolve("www.musicules.space", "/music")).toEqual({
      location: "https://musiclues.space/music",
      status: 301,
    });
  });

  it("matches hosts case-insensitively and ignores the port", () => {
    expect(resolve("FILMECULES.space:443", "/about")?.location).toBe(
      "https://filmclues.space/about",
    );
  });

  it("does not redirect other paths on canonical or unknown hosts", () => {
    for (const host of ["filmclues.space", "litclues.space", "localhost:3000", "filmclues.vercel.app"]) {
      expect(resolve(host, "/films")).toBeNull();
    }
  });

  it("escapes dots so a lookalike host does not match", () => {
    expect(resolve("filmeculesxspace", "/films")).toBeNull();
  });
});

describe("buildRedirects - home page to the host's genre", () => {
  it.each([
    ["filmclues.space", "/films"],
    ["www.musiclues.space", "/music"],
    ["litclues.space", "/books"],
    ["litclues.vercel.app", "/books"],
  ])("%s / → %s", (host, location) => {
    expect(resolve(host, "/")).toEqual({ location, status: 307 });
  });

  it("falls back to the default genre for unknown hosts", () => {
    expect(resolve("localhost:3000", "/")).toEqual({ location: "/films", status: 307 });
    expect(resolve("xclues-git-branch.vercel.app", "/")).toEqual({
      location: "/films",
      status: 307,
    });
  });
});
