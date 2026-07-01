/**
 * Client JS bundle-size budget gate.
 *
 * Next 16 no longer emits a per-route app-build-manifest, so instead of fragile
 * per-route parsing we measure the gzipped size of every emitted client chunk
 * in .next/static/chunks. Fails CI if the total or any single chunk exceeds its
 * budget — a robust regression guard. Budgets are intentionally generous now
 * (current total ~309 KB) and should tighten as the Phase 2 perf work lands
 * (capacitor → devDeps, drop unused react-query, server components).
 *
 * Run after `next build`: bun run scripts/bundle-budget.ts
 */
import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const CHUNKS_DIR = ".next/static/chunks";
const TOTAL_BUDGET_KB = Number(process.env.BUNDLE_TOTAL_BUDGET_KB ?? 400);
const PER_CHUNK_BUDGET_KB = Number(process.env.BUNDLE_CHUNK_BUDGET_KB ?? 120);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".js")) out.push(full);
  }
  return out;
}

let files: string[];
try {
  files = walk(CHUNKS_DIR);
} catch {
  console.error(
    `✖ ${CHUNKS_DIR} not found — run \`bun run build\` before the budget check.`,
  );
  process.exit(2);
}

let totalGzip = 0;
const oversized: Array<{ file: string; kb: number }> = [];
for (const file of files) {
  const gzip = gzipSync(readFileSync(file) as Uint8Array).length;
  totalGzip += gzip;
  const kb = gzip / 1024;
  if (kb > PER_CHUNK_BUDGET_KB) oversized.push({ file, kb });
}

const totalKb = totalGzip / 1024;
console.log(
  `Client JS (gzip): ${totalKb.toFixed(1)} KB across ${files.length} chunks ` +
    `(budget ${TOTAL_BUDGET_KB} KB total, ${PER_CHUNK_BUDGET_KB} KB/chunk)`,
);

let failed = false;
if (totalKb > TOTAL_BUDGET_KB) {
  console.error(
    `✖ Total gzipped JS ${totalKb.toFixed(1)} KB exceeds ${TOTAL_BUDGET_KB} KB.`,
  );
  failed = true;
}
for (const { file, kb } of oversized) {
  console.error(`✖ ${file}: ${kb.toFixed(1)} KB exceeds ${PER_CHUNK_BUDGET_KB} KB/chunk.`);
  failed = true;
}

if (failed) process.exit(1);
console.log("✓ Within bundle budget.");
