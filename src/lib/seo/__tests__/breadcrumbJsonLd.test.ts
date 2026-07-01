import { describe, it, expect } from "vitest";
import { buildBreadcrumbJsonLd } from "../breadcrumbJsonLd";

describe("buildBreadcrumbJsonLd", () => {
  it("produces a BreadcrumbList with 1-based positions", () => {
    const jsonLd = buildBreadcrumbJsonLd([
      { name: "Filmclues", url: "https://filmclues.space" },
      { name: "Archive", url: "https://filmclues.space/films/archive" },
      { name: "June 30, 2026" },
    ]);

    expect(jsonLd["@type"]).toBe("BreadcrumbList");
    expect(jsonLd.itemListElement).toHaveLength(3);
    expect(jsonLd.itemListElement[0]).toMatchObject({
      "@type": "ListItem",
      position: 1,
      name: "Filmclues",
      item: "https://filmclues.space",
    });
    expect(jsonLd.itemListElement[2]).toMatchObject({
      position: 3,
      name: "June 30, 2026",
    });
  });

  it("omits `item` for the current-page crumb (no url)", () => {
    const jsonLd = buildBreadcrumbJsonLd([{ name: "Archive" }]);
    expect(jsonLd.itemListElement[0]).not.toHaveProperty("item");
  });
});
