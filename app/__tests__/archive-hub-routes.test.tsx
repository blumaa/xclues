import type { ReactElement } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ArchiveIndexPage from "../[genre]/archive/page";
import ArchiveMonthPage from "../[genre]/archive/month/[month]/page";
import LegacyArchivePage from "../[genre]/archive/page/[n]/page";

// 40 days newest-first: 2026-07-10 back to 2026-06-01.
const DATES = Array.from({ length: 40 }, (_, i) =>
  new Date(Date.UTC(2026, 6, 10 - i)).toISOString().slice(0, 10),
);

vi.mock("../../src/lib/supabase/puzzleQueries", () => ({
  fetchPublishedDatesForGenre: vi.fn(async () => DATES),
}));

type AsyncComponent = (props: unknown) => Promise<ReactElement>;

/** Route pages return an async server component; run it like Next does. */
async function resolvePage(page: Promise<ReactElement>): Promise<ReactElement> {
  const element = await page;
  return (element.type as AsyncComponent)(element.props);
}

/** next/navigation redirects and 404s throw; the digest says which. */
async function digestOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    return String((error as { digest?: string }).digest);
  }
  throw new Error("expected the route to redirect or 404");
}

describe("archive hub routes", () => {
  it("bare hub shows the newest month", async () => {
    render(await resolvePage(ArchiveIndexPage({ params: Promise.resolve({ genre: "films" }) })));
    expect(screen.getByRole("table", { name: "July 2026" })).toBeInTheDocument();
  });

  it("emits no BreadcrumbList structured data (no visible trail to describe)", async () => {
    const { container } = render(
      await resolvePage(ArchiveIndexPage({ params: Promise.resolve({ genre: "films" }) })),
    );
    expect(container.innerHTML).not.toContain("BreadcrumbList");
  });

  it("month route shows that month", async () => {
    render(
      await resolvePage(
        ArchiveMonthPage({ params: Promise.resolve({ genre: "films", month: "2026-06" }) }),
      ),
    );
    expect(screen.getByRole("table", { name: "June 2026" })).toBeInTheDocument();
  });

  it("newest month's own URL redirects to the bare hub", async () => {
    const digest = await digestOf(
      resolvePage(
        ArchiveMonthPage({ params: Promise.resolve({ genre: "films", month: "2026-07" }) }),
      ),
    );
    expect(digest).toMatch(/^NEXT_REDIRECT;replace;\/films\/archive;308;/);
  });

  it.each(["2025-01", "2026-13", "june"])("month %s 404s", async (month) => {
    const digest = await digestOf(
      resolvePage(ArchiveMonthPage({ params: Promise.resolve({ genre: "films", month }) })),
    );
    expect(digest).toMatch(/NOT_FOUND|404/);
  });

  it("retired /page/N redirects to the month that page started on", async () => {
    // Page 2 began at index 30: 2026-06-10.
    const digest = await digestOf(
      LegacyArchivePage({ params: Promise.resolve({ genre: "films", n: "2" }) }),
    );
    expect(digest).toMatch(/^NEXT_REDIRECT;replace;\/films\/archive\/month\/2026-06;308;/);
  });

  it("retired /page/1 redirects to the bare hub", async () => {
    const digest = await digestOf(
      LegacyArchivePage({ params: Promise.resolve({ genre: "films", n: "1" }) }),
    );
    expect(digest).toMatch(/^NEXT_REDIRECT;replace;\/films\/archive;308;/);
  });

  it("retired page past the end 404s", async () => {
    const digest = await digestOf(
      LegacyArchivePage({ params: Promise.resolve({ genre: "films", n: "9" }) }),
    );
    expect(digest).toMatch(/NOT_FOUND|404/);
  });
});
