import { useState, useEffect } from 'react';
import type { ZodType } from 'zod';

/**
 * SSR-safe hook for accessing localStorage.
 * Initial state is the provided initialValue, then it hydrates from localStorage on mount.
 *
 * Returns `[value, setValue, hydrated]`. `hydrated` is false until localStorage
 * has actually been read: the value is `initialValue` on the first render
 * whether or not anything is stored, so any one-time UI gated on the stored
 * value must wait for this flag or it flashes to people who already saw it.
 *
 * Pass an optional Zod `schema` to validate persisted data at this boundary:
 * localStorage is external, untyped input (it may be stale, tampered, or from an
 * older app version). When validation fails the stored value is ignored and the
 * hook keeps `initialValue` rather than feeding malformed data into the app.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  schema?: ZodType<T>,
) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  // Which key has been read, not a boolean: a key change re-arms hydration
  // by comparison alone, so the effect body never has to reset state.
  const [hydratedKey, setHydratedKey] = useState<string | null>(null);
  const hydrated = hydratedKey === key;

  // Hydrate from localStorage when the key changes. We intentionally do NOT
  // depend on storedValue: object/array values fail reference equality on every
  // parse, so keeping storedValue in the deps caused an infinite render loop.
  // The functional update preserves the previous reference when the serialized
  // value is unchanged, avoiding needless downstream re-renders.
  useEffect(() => {
    let rafId: number | undefined;
    // Deferred to the same rAF as the value so callers never observe
    // hydrated=true alongside a value that has not landed yet.
    const finish = (next?: T) => {
      rafId = requestAnimationFrame(() => {
        if (next !== undefined) {
          setStoredValue((prev) =>
            JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
          );
        }
        setHydratedKey(key);
      });
    };

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        finish();
        return () => {
          if (rafId !== undefined) window.cancelAnimationFrame(rafId);
        };
      }

      const raw = JSON.parse(item) as unknown;
      let value: T | undefined;
      if (schema) {
        const result = schema.safeParse(raw);
        if (result.success) {
          value = result.data;
        } else {
          console.error(
            `Invalid localStorage value for key "${key}", ignoring:`,
            result.error,
          );
        }
      } else {
        value = raw as T;
      }
      finish(value);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      finish();
    }
    return () => {
      if (rafId !== undefined) window.cancelAnimationFrame(rafId);
    };
  }, [key, schema]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, hydrated] as const;
}
