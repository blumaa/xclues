import { AppError } from "./errors";

export interface RetryOptions {
  /** Maximum number of additional attempts after the first. Default 2. */
  retries?: number;
  /** Base delay in ms; doubles each attempt (exponential backoff). Default 100. */
  baseDelayMs?: number;
  /** Decide whether a given error is worth retrying. Default: always retry. */
  shouldRetry?: (error: unknown) => boolean;
  /** Called before each retry (e.g. for logging). */
  onRetry?: (error: unknown, attempt: number) => void;
}

/**
 * Run an async operation with bounded exponential-backoff retries. Throws an
 * AppError (code RETRY_EXHAUSTED) carrying the last error as its cause once all
 * attempts are used or shouldRetry rejects the error.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const retries = options.retries ?? 2;
  const baseDelayMs = options.baseDelayMs ?? 100;
  const shouldRetry = options.shouldRetry ?? (() => true);

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === retries || !shouldRetry(error)) break;
      options.onRetry?.(error, attempt + 1);
      const delay = baseDelayMs * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new AppError("Operation failed after retries", {
    code: "RETRY_EXHAUSTED",
    statusCode: 503,
    cause: lastError,
  });
}

/**
 * Heuristic: is this DB error transient (worth retrying) rather than a
 * permanent query/logic/permission error?
 */
export function isTransientDbError(error: unknown): boolean {
  const message = (
    error instanceof Error ? error.message : String(error)
  ).toLowerCase();
  return /network|timeout|timed out|fetch failed|econnreset|econnrefused|connection|temporarily|unavailable|rate limit|too many|\b429\b|\b503\b|\b504\b/.test(
    message,
  );
}
