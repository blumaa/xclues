import { describe, it, expect, vi, afterEach } from "vitest";
import { isValidDateFormat, isNotFutureDate, formatDateForDisplay } from "../dateValidation";

describe("isValidDateFormat", () => {
  it("returns true for valid YYYY-MM-DD", () => {
    expect(isValidDateFormat("2026-04-14")).toBe(true);
    expect(isValidDateFormat("2025-01-01")).toBe(true);
    expect(isValidDateFormat("2026-12-31")).toBe(true);
  });

  it("returns false for wrong format", () => {
    expect(isValidDateFormat("04-14-2026")).toBe(false);
    expect(isValidDateFormat("2026/04/14")).toBe(false);
    expect(isValidDateFormat("not-a-date")).toBe(false);
    expect(isValidDateFormat("")).toBe(false);
    expect(isValidDateFormat("20260414")).toBe(false);
  });

  it("returns false for invalid month/day values", () => {
    expect(isValidDateFormat("2026-13-01")).toBe(false);
    expect(isValidDateFormat("2026-00-01")).toBe(false);
    expect(isValidDateFormat("2026-04-32")).toBe(false);
    expect(isValidDateFormat("2026-04-00")).toBe(false);
  });
});

describe("isNotFutureDate", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns true for today", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-14T12:00:00Z"));

    expect(isNotFutureDate("2026-04-14")).toBe(true);
  });

  it("returns true for past dates", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-14T12:00:00Z"));

    expect(isNotFutureDate("2026-04-13")).toBe(true);
    expect(isNotFutureDate("2025-01-01")).toBe(true);
  });

  it("returns false for future dates", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-14T12:00:00Z"));

    expect(isNotFutureDate("2026-04-15")).toBe(false);
    expect(isNotFutureDate("2027-01-01")).toBe(false);
  });
});

describe("formatDateForDisplay", () => {
  it("formats YYYY-MM-DD to human-readable", () => {
    expect(formatDateForDisplay("2026-04-14")).toBe("April 14, 2026");
    expect(formatDateForDisplay("2026-01-01")).toBe("January 1, 2026");
    expect(formatDateForDisplay("2025-12-25")).toBe("December 25, 2025");
  });
});
