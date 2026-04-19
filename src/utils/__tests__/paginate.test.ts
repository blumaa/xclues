import { describe, it, expect } from 'vitest';
import { paginate } from '../paginate';

describe('paginate', () => {
  const tenItems = Array.from({ length: 10 }, (_, i) => i + 1);
  const thirtyItems = Array.from({ length: 30 }, (_, i) => i + 1);

  it('returns all items unchanged when count <= pageSize', () => {
    const result = paginate(tenItems, 1, 10);
    expect(result.items).toEqual(tenItems);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(1);
    expect(result.totalItems).toBe(10);
  });

  it('splits a 30-item list into 3 pages of 10', () => {
    const p1 = paginate(thirtyItems, 1, 10);
    const p2 = paginate(thirtyItems, 2, 10);
    const p3 = paginate(thirtyItems, 3, 10);

    expect(p1.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(p2.items).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(p3.items).toEqual([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
    expect(p1.totalPages).toBe(3);
  });

  it('clamps a page below 1 to page 1', () => {
    expect(paginate(thirtyItems, 0, 10).page).toBe(1);
    expect(paginate(thirtyItems, -5, 10).page).toBe(1);
  });

  it('clamps a page above totalPages to the last page', () => {
    const result = paginate(thirtyItems, 99, 10);
    expect(result.page).toBe(3);
    expect(result.items).toEqual([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
  });

  it('handles an empty list with totalPages 1 and empty items', () => {
    const result = paginate([], 1, 10);
    expect(result.items).toEqual([]);
    expect(result.totalPages).toBe(1);
    expect(result.page).toBe(1);
  });

  it('handles a partial last page', () => {
    const items = Array.from({ length: 13 }, (_, i) => i + 1);
    const result = paginate(items, 2, 10);
    expect(result.items).toEqual([11, 12, 13]);
    expect(result.totalPages).toBe(2);
  });
});
