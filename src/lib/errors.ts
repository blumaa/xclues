/**
 * Typed application error hierarchy.
 *
 * Throwing/catching these instead of bare `Error` lets callers branch on
 * `instanceof`, surface the right HTTP status, and attach a stable `code` for
 * structured logging — without string-matching messages.
 */
export interface AppErrorOptions {
  code?: string;
  statusCode?: number;
  cause?: unknown;
}

export class AppError extends Error {
  readonly code: string;
  readonly statusCode: number;
  // Declared explicitly because the project targets ES2020, whose Error type
  // predates the standard `cause` property.
  readonly cause?: unknown;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message);
    this.name = "AppError";
    this.code = options.code ?? "APP_ERROR";
    this.statusCode = options.statusCode ?? 500;
    if (options.cause !== undefined) {
      this.cause = options.cause;
    }
  }
}

/** A published puzzle was requested but none exists for that genre/date. */
export class PuzzleNotFoundError extends AppError {
  constructor(genre: string, date: string, options: AppErrorOptions = {}) {
    super(`No published puzzle for genre "${genre}" on ${date}`, {
      code: "PUZZLE_NOT_FOUND",
      statusCode: 404,
      ...options,
    });
    this.name = "PuzzleNotFoundError";
  }
}

/** Authentication or session failure. */
export class AuthError extends AppError {
  constructor(message: string, options: AppErrorOptions = {}) {
    super(message, {
      code: "AUTH_ERROR",
      statusCode: 401,
      ...options,
    });
    this.name = "AuthError";
  }
}
