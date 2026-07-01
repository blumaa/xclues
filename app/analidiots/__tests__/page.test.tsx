import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { notFound } = vi.hoisted(() => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

vi.mock('next/navigation', () => ({ notFound }));
vi.mock('../../../src/lib/supabase/server', () => ({
  createServiceRoleClient: () => null,
}));

import AnalidiotsPage from '../page';

describe('AnalidiotsPage auth guard', () => {
  const OLD = process.env.ANALIDIOTS_SECRET;

  beforeEach(() => {
    notFound.mockClear();
  });
  afterEach(() => {
    if (OLD === undefined) delete process.env.ANALIDIOTS_SECRET;
    else process.env.ANALIDIOTS_SECRET = OLD;
  });

  it('404s when no key is provided', async () => {
    process.env.ANALIDIOTS_SECRET = 's3cr3t';
    await expect(
      AnalidiotsPage({ searchParams: Promise.resolve({}) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('404s when the key is wrong', async () => {
    process.env.ANALIDIOTS_SECRET = 's3cr3t';
    await expect(
      AnalidiotsPage({ searchParams: Promise.resolve({ key: 'nope' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });

  it('404s when no secret is configured (closed by default)', async () => {
    delete process.env.ANALIDIOTS_SECRET;
    await expect(
      AnalidiotsPage({ searchParams: Promise.resolve({ key: 'anything' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });

  it('renders when the key matches the configured secret', async () => {
    process.env.ANALIDIOTS_SECRET = 's3cr3t';
    const el = await AnalidiotsPage({
      searchParams: Promise.resolve({ key: 's3cr3t' }),
    });
    expect(notFound).not.toHaveBeenCalled();
    expect(el).toBeTruthy();
  });
});
