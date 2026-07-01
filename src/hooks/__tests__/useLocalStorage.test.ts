import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { z } from 'zod';
import { useLocalStorage } from '../useLocalStorage';

const schema = z.object({ a: z.number() });

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('hydrates an object value from localStorage without an infinite render loop', async () => {
    window.localStorage.setItem('obj-key', JSON.stringify({ a: 1 }));

    let renders = 0;
    const { result } = renderHook(() => {
      renders += 1;
      return useLocalStorage<{ a: number }>('obj-key', { a: 0 });
    });

    await waitFor(() => expect(result.current[0]).toEqual({ a: 1 }));

    const rendersAfterHydration = renders;
    // Let any (incorrectly) re-scheduled effect run.
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(renders - rendersAfterHydration).toBeLessThanOrEqual(1);
  });

  it('hydrates a primitive value from localStorage', async () => {
    window.localStorage.setItem('num-key', JSON.stringify(7));
    const { result } = renderHook(() => useLocalStorage<number>('num-key', 0));
    await waitFor(() => expect(result.current[0]).toBe(7));
  });

  it('hydrates when stored data passes the schema', async () => {
    window.localStorage.setItem('good', JSON.stringify({ a: 5 }));
    const { result } = renderHook(() =>
      useLocalStorage<{ a: number }>('good', { a: 0 }, schema),
    );
    await waitFor(() => expect(result.current[0]).toEqual({ a: 5 }));
  });

  it('falls back to initialValue when stored data fails the schema', async () => {
    window.localStorage.setItem('bad', JSON.stringify({ a: 'not-a-number' }));
    const { result } = renderHook(() =>
      useLocalStorage<{ a: number }>('bad', { a: 0 }, schema),
    );
    // Allow the rAF hydration effect to run; invalid data must be ignored.
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(result.current[0]).toEqual({ a: 0 });
  });

  it('persists updates back to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<number>('w-key', 0));
    result.current[1](5);
    expect(JSON.parse(window.localStorage.getItem('w-key')!)).toBe(5);
  });
});
