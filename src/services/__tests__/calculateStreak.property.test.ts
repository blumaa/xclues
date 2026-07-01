import { describe, it, expect, vi } from "vitest";
import fc from "fast-check";

vi.mock("../../utils/index", () => ({
  getTodayDate: () => "2026-06-15",
  getYesterdayDate: () => "2026-06-14",
}));

import { calculateStreak } from "../LocalStatsStorage";

const TODAY = "2026-06-15";
const YESTERDAY = "2026-06-14";

describe("calculateStreak (property)", () => {
  it("a loss always breaks the streak to 0", () => {
    fc.assert(
      fc.property(
        fc.option(fc.string(), { nil: null }),
        fc.nat(),
        (last, streak) => {
          expect(calculateStreak(last, streak, false)).toBe(0);
        },
      ),
    );
  });

  it("winning the day after the last play increments the streak", () => {
    fc.assert(
      fc.property(fc.nat(), (streak) => {
        expect(calculateStreak(YESTERDAY, streak, true)).toBe(streak + 1);
      }),
    );
  });

  it("winning again the same day leaves the streak unchanged", () => {
    fc.assert(
      fc.property(fc.nat(), (streak) => {
        expect(calculateStreak(TODAY, streak, true)).toBe(streak);
      }),
    );
  });

  it("winning after a gap (or as the first game) starts a streak of 1", () => {
    const gapDate = fc
      .string()
      .filter((d) => d !== TODAY && d !== YESTERDAY);
    fc.assert(
      fc.property(
        fc.option(gapDate, { nil: null }),
        fc.nat(),
        (last, streak) => {
          expect(calculateStreak(last, streak, true)).toBe(1);
        },
      ),
    );
  });
});
