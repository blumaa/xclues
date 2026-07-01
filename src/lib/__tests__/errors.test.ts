import { describe, it, expect } from "vitest";
import { AppError, PuzzleNotFoundError, AuthError } from "../errors";

describe("error hierarchy", () => {
  it("AppError carries code + statusCode and is an Error", () => {
    const e = new AppError("boom", { code: "X_CODE", statusCode: 503 });
    expect(e).toBeInstanceOf(Error);
    expect(e.name).toBe("AppError");
    expect(e.code).toBe("X_CODE");
    expect(e.statusCode).toBe(503);
  });

  it("AppError has sensible defaults", () => {
    const e = new AppError("boom");
    expect(e.code).toBe("APP_ERROR");
    expect(e.statusCode).toBe(500);
  });

  it("PuzzleNotFoundError is an AppError with a 404 and a descriptive message", () => {
    const e = new PuzzleNotFoundError("films", "2026-04-14");
    expect(e).toBeInstanceOf(AppError);
    expect(e).toBeInstanceOf(PuzzleNotFoundError);
    expect(e.name).toBe("PuzzleNotFoundError");
    expect(e.code).toBe("PUZZLE_NOT_FOUND");
    expect(e.statusCode).toBe(404);
    expect(e.message).toContain("films");
    expect(e.message).toContain("2026-04-14");
  });

  it("AuthError is an AppError with a 401", () => {
    const e = new AuthError("not signed in");
    expect(e).toBeInstanceOf(AppError);
    expect(e).toBeInstanceOf(AuthError);
    expect(e.name).toBe("AuthError");
    expect(e.code).toBe("AUTH_ERROR");
    expect(e.statusCode).toBe(401);
  });

  it("preserves the underlying cause", () => {
    const cause = new Error("root cause");
    const e = new AppError("wrapper", { cause });
    expect(e.cause).toBe(cause);
  });
});
