#!/usr/bin/env bun
/**
 * Dependency-audit gate.
 *
 * `bun audit` exits non-zero on ANY advisory and its --audit-level flag only
 * filters printed output, not the exit code. This wrapper parses the JSON and
 * fails only when an advisory at or above a chosen severity is present, so CI
 * can gate on real risk without being blocked by unfixable transitive dev-tool
 * advisories.
 *
 * Usage: bun run scripts/audit-gate.ts [low|moderate|high|critical]
 * Default threshold: critical. Tighten to "high" once @capacitor/* moves to
 * devDependencies (Phase 2) and the Next.js bump lands via dependabot.
 */
import { execSync } from "node:child_process";

const ORDER = ["low", "moderate", "high", "critical"] as const;
type Severity = (typeof ORDER)[number];

const threshold = (process.argv[2] ?? "critical").toLowerCase() as Severity;
const minIdx = ORDER.indexOf(threshold);
if (minIdx === -1) {
  console.error(`Invalid severity "${threshold}". Use: ${ORDER.join(", ")}`);
  process.exit(2);
}

let raw = "";
try {
  raw = execSync("bun audit --json", { encoding: "utf8" }).trim();
} catch (error) {
  // `bun audit` exits non-zero whenever advisories exist; the JSON is still
  // written to stdout, so recover it from the thrown error.
  raw = ((error as { stdout?: string }).stdout ?? "").trim();
}

interface Advisory {
  severity: Severity;
  title: string;
  url: string;
}

let data: Record<string, Advisory[]> = {};
try {
  data = raw ? (JSON.parse(raw) as Record<string, Advisory[]>) : {};
} catch {
  console.error("Failed to parse `bun audit --json` output:");
  console.error(raw);
  process.exit(2);
}

const counts: Record<string, number> = {};
const flagged: Array<Advisory & { pkg: string }> = [];
for (const [pkg, advisories] of Object.entries(data)) {
  for (const advisory of advisories) {
    counts[advisory.severity] = (counts[advisory.severity] ?? 0) + 1;
    if (ORDER.indexOf(advisory.severity) >= minIdx) {
      flagged.push({ pkg, ...advisory });
    }
  }
}

console.log(`Dependency audit (threshold: ${threshold})`);
console.log(`  by severity: ${JSON.stringify(counts)}`);

if (flagged.length > 0) {
  console.error(
    `\n✖ ${flagged.length} advisory(ies) at or above "${threshold}":`,
  );
  for (const f of flagged) {
    console.error(`  [${f.severity}] ${f.pkg}: ${f.title}`);
    console.error(`    ${f.url}`);
  }
  process.exit(1);
}

console.log(`✓ No advisories at or above "${threshold}".`);
