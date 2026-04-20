import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';

function loadEnvLocal(): Record<string, string> {
  try {
    const raw = readFileSync(join(process.cwd(), '.env.local'), 'utf-8');
    const out: Record<string, string> = {};
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
    return out;
  } catch {
    return {};
  }
}

const env = loadEnvLocal();
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? env.SUPABASE_SERVICE_ROLE_KEY;

const hasCreds = Boolean(url && anonKey && serviceKey);
const TEST_GENRE = '__rls_integration_test__';
const describeIf = hasCreds ? describe : describe.skip;

async function cleanup(table: 'game_events' | 'feedback', column: string, value: string) {
  if (!hasCreds) return;
  await fetch(`${url}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}`, {
    method: 'DELETE',
    headers: {
      apikey: serviceKey!,
      Authorization: `Bearer ${serviceKey!}`,
    },
  });
}

describeIf('Supabase anon INSERT grants (integration)', () => {
  afterAll(async () => {
    await cleanup('game_events', 'genre', TEST_GENRE);
    await cleanup('feedback', 'comment', TEST_GENRE);
  });

  it('anon role can insert into game_events', async () => {
    const res = await fetch(`${url}/rest/v1/game_events`, {
      method: 'POST',
      headers: {
        apikey: anonKey!,
        Authorization: `Bearer ${anonKey!}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        event_type: 'started',
        genre: TEST_GENRE,
        puzzle_date: '2026-04-20',
        user_id: null,
      }),
    });
    const body = await res.text();
    expect(res.status, `insert failed: ${body}`).toBe(201);
  });

  it('anon role can insert into feedback', async () => {
    const res = await fetch(`${url}/rest/v1/feedback`, {
      method: 'POST',
      headers: {
        apikey: anonKey!,
        Authorization: `Bearer ${anonKey!}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        rating: 5,
        comment: TEST_GENRE,
        user_id: null,
      }),
    });
    const body = await res.text();
    expect(res.status, `insert failed: ${body}`).toBe(201);
  });
});
