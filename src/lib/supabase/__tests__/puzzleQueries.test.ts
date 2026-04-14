import { describe, it, expect, vi, beforeEach } from "vitest";
import { parsePuzzleRow, fetchPuzzleByDate, fetchAllPublishedDates, clearPuzzleCache } from "../puzzleQueries";

vi.mock("../server", () => ({
  createServerSupabaseClient: vi.fn(),
}));

import { createServerSupabaseClient } from "../server";

const mockMaybeSingle = vi.fn();
const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockNot = vi.fn();
const mockOrder = vi.fn();

function setupMockChain() {
  mockSelect.mockReturnValue({ eq: mockEq });
  mockEq.mockReturnValue({ eq: mockEq, maybeSingle: mockMaybeSingle, not: mockNot, order: mockOrder });
  mockNot.mockReturnValue({ order: mockOrder });
  mockOrder.mockResolvedValue({ data: [], error: null });

  const mockSupabase = { from: vi.fn().mockReturnValue({ select: mockSelect }) } as unknown as NonNullable<ReturnType<typeof createServerSupabaseClient>>;
  vi.mocked(createServerSupabaseClient).mockReturnValue(mockSupabase);
  return mockSupabase;
}

const rawPuzzleRow = {
  id: "puzzle-1",
  groups: [
    {
      id: "g1",
      items: [{ id: 1, title: "Pulp Fiction" }, { id: 2, title: "Kill Bill" }],
      connection: "Tarantino films",
      difficulty: "easy",
      color: "yellow",
    },
    {
      id: "g2",
      items: [{ id: 3, title: "The Godfather" }, { id: 4, title: "Goodfellas" }],
      connection: "Mob films",
      difficulty: "medium",
      color: "green",
    },
  ],
  created_at: "2026-04-14T00:00:00Z",
  metadata: { theme: "crime" },
};

describe("parsePuzzleRow", () => {
  it("converts raw DB row to SavedPuzzle", () => {
    const result = parsePuzzleRow(rawPuzzleRow);

    expect(result.id).toBe("puzzle-1");
    expect(result.groups).toHaveLength(2);
    expect(result.groups[0].connection).toBe("Tarantino films");
    expect(result.groups[0].color).toBe("yellow");
    expect(result.groups[1].connection).toBe("Mob films");
  });

  it("flattens items from all groups", () => {
    const result = parsePuzzleRow(rawPuzzleRow);

    expect(result.items).toHaveLength(4);
    expect(result.items[0].title).toBe("Pulp Fiction");
    expect(result.items[3].title).toBe("Goodfellas");
  });

  it("converts created_at to timestamp", () => {
    const result = parsePuzzleRow(rawPuzzleRow);

    expect(result.createdAt).toBe(new Date("2026-04-14T00:00:00Z").getTime());
  });

  it("includes metadata", () => {
    const result = parsePuzzleRow(rawPuzzleRow);

    expect(result.metadata).toEqual({ theme: "crime" });
  });
});

describe("fetchPuzzleByDate", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearPuzzleCache();
  });

  it("queries supabase with correct filters", async () => {
    const mockSupabase = setupMockChain();
    mockMaybeSingle.mockResolvedValue({ data: rawPuzzleRow, error: null });

    await fetchPuzzleByDate("films", "2026-04-14");

    expect(mockSupabase.from).toHaveBeenCalledWith("puzzles");
    expect(mockSelect).toHaveBeenCalledWith("id, groups, puzzle_date, created_at, metadata");
    expect(mockEq).toHaveBeenCalledWith("puzzle_date", "2026-04-14");
    expect(mockEq).toHaveBeenCalledWith("genre", "films");
    expect(mockEq).toHaveBeenCalledWith("status", "published");
  });

  it("returns parsed SavedPuzzle on success", async () => {
    setupMockChain();
    mockMaybeSingle.mockResolvedValue({ data: rawPuzzleRow, error: null });

    const result = await fetchPuzzleByDate("films", "2026-04-14");

    expect(result).not.toBeNull();
    expect(result!.id).toBe("puzzle-1");
    expect(result!.groups).toHaveLength(2);
  });

  it("returns null when supabase returns no data", async () => {
    setupMockChain();
    mockMaybeSingle.mockResolvedValue({ data: null, error: null });

    const result = await fetchPuzzleByDate("films", "2026-04-14");

    expect(result).toBeNull();
  });

  it("returns null when supabase returns error", async () => {
    setupMockChain();
    mockMaybeSingle.mockResolvedValue({ data: null, error: new Error("db error") });

    const result = await fetchPuzzleByDate("films", "2026-04-14");

    expect(result).toBeNull();
  });

  it("returns null when supabase client is null", async () => {
    vi.mocked(createServerSupabaseClient).mockReturnValue(null);

    const result = await fetchPuzzleByDate("films", "2026-04-14");

    expect(result).toBeNull();
  });
});

describe("fetchAllPublishedDates", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns array of genre and date objects", async () => {
    setupMockChain();
    mockOrder.mockResolvedValue({
      data: [
        { genre: "films", puzzle_date: "2026-04-14" },
        { genre: "films", puzzle_date: "2026-04-13" },
      ],
      error: null,
    });

    const result = await fetchAllPublishedDates();

    expect(result).toEqual([
      { genre: "films", puzzle_date: "2026-04-14" },
      { genre: "films", puzzle_date: "2026-04-13" },
    ]);
  });

  it("returns empty array when supabase client is null", async () => {
    vi.mocked(createServerSupabaseClient).mockReturnValue(null);

    const result = await fetchAllPublishedDates();

    expect(result).toEqual([]);
  });

  it("returns empty array on error", async () => {
    setupMockChain();
    mockOrder.mockResolvedValue({ data: null, error: new Error("db error") });

    const result = await fetchAllPublishedDates();

    expect(result).toEqual([]);
  });
});
