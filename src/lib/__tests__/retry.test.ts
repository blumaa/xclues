import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { withRetry, isTransientDbError } from "../retry";
import { AppError } from "../errors";

describe("withRetry", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns immediately on first success", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    await expect(withRetry(fn)).resolves.toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries a transient failure then succeeds", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("ok");
    const p = withRetry(fn, { retries: 2, baseDelayMs: 10 });
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("throws an AppError after exhausting retries", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("always"));
    const p = withRetry(fn, { retries: 1, baseDelayMs: 10 });
    const assertion = expect(p).rejects.toBeInstanceOf(AppError);
    await vi.runAllTimersAsync();
    await assertion;
    expect(fn).toHaveBeenCalledTimes(2); // initial + 1 retry
  });

  it("does not retry when shouldRetry returns false", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("permanent"));
    await expect(
      withRetry(fn, { shouldRetry: () => false }),
    ).rejects.toBeInstanceOf(AppError);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("isTransientDbError", () => {
  it("treats network/timeout errors as transient", () => {
    expect(isTransientDbError(new Error("fetch failed"))).toBe(true);
    expect(isTransientDbError(new Error("Connection timeout"))).toBe(true);
    expect(isTransientDbError(new Error("503 Service Unavailable"))).toBe(true);
  });

  it("treats query/logic errors as permanent", () => {
    expect(isTransientDbError(new Error("invalid input syntax"))).toBe(false);
    expect(isTransientDbError(new Error("db error"))).toBe(false);
  });
});
