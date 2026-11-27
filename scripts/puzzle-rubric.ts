/**
 * The construction rubric for a Connections board, as executable rules.
 *
 * Derived by reading the boards published 2026-07-21 → 2026-08-04 and asking what
 * separated the ones that played well from the ones that had to be rewritten. Six
 * principles came out of that read:
 *
 *   1. A board runs four different AXES — who made it (creator), what it belongs to
 *      (canon), what is inside it (content), what it is called (wordplay). Four
 *      groups on one axis is where boards collapse.
 *   2. The four connections PARTITION the sixteen items: every item satisfies exactly
 *      one connection. Near-misses are the point; double membership is the bug.
 *   3. Difficulty lives in the LINK, not in the items' obscurity. Famous items with a
 *      hidden link beat unknown items with an obvious link.
 *   4. The four items are the four BEST items. Reaching for a fourth means the
 *      connection is too thin to exist.
 *   5. The connection is written BEFORE its items. Piled-up qualifiers are the tell
 *      that a sentence was fitted to a bag of items — and that is where errors enter.
 *   6. Membership must be VERIFIABLE. Taste words and unbounded properties cannot be
 *      checked, so they cannot be solved.
 *
 * Rules 1–2 and the mechanical half of 5–6 are checkable here. Rules 3–4 are
 * judgment; this module can only raise a flag and hand it to a human reviewer.
 * Everything below is pure — the CLI in puzzle-audit.ts supplies the archive.
 */
import type { PuzzleGroup } from './puzzle-model';
import { colorForDifficulty } from './puzzle-db';

export type Axis = 'creator' | 'canon' | 'content' | 'wordplay';
/** What a tile looks like to a solver: the title of a work, or the name of a person or character. */
export type TileKind = 'work' | 'name';
export type Severity = 'fail' | 'flag';

export interface Finding {
  rule: string;
  severity: Severity;
  /** 1-based group index, when the finding belongs to a single group. */
  group?: number;
  message: string;
}

/** A group published on some earlier date, in the same genre. */
export interface PriorGroup {
  date: string;
  connection: string;
  items: string[];
}

/** Any other board's group, in any genre, earlier or later — for cross-site spacing. */
export interface SiteGroup {
  date: string;
  genre: string;
  connection: string;
}

export interface ArchiveContext {
  priorGroups: PriorGroup[];
  /** Every other board on every site, scheduled ones included. Absent means unknown. */
  allGenreGroups?: SiteGroup[];
  /** Normalized item title → how many times the whole archive has used it. */
  itemFrequency: Map<string, number>;
}

export interface AuditOptions {
  /** The board's own date, needed for the item-recency window. */
  date?: string;
  /** Days within which reusing an item is worth a flag. Items may repeat; soon is the problem. */
  recencyDays?: number;
  /**
   * Hidden-word tiles must carry their answer. True for candidates; false for archived
   * boards, which never stored one.
   */
  requireHiddenAnswers?: boolean;
}

/** One genre's board on a given day, for the cross-genre checks. */
export interface DayBoard {
  genre: string;
  groups: PuzzleGroup[];
}

export const DIFFICULTY_ORDER = ['easy', 'medium', 'hard', 'hardest'] as const;

/** Words that carry no signal when comparing connections or items. */
const STOPWORDS = new Set([
  'film', 'films', 'song', 'songs', 'book', 'books', 'novel', 'novels', 'album', 'albums',
  'title', 'titles', 'that', 'with', 'their', 'from', 'have', 'were', 'also', 'contain',
  'contains', 'containing', 'whose', 'which', 'where', 'about', 'into', 'this', 'they',
  'these', 'those', 'been', 'both', 'only', 'more', 'most', 'over', 'they', 'when',
]);

const WORDPLAY_RE =
  /\btitles?\b|\bwords?\b|\bletters?\b|\bnames?\b|spelled|palindrom|alliterat|anagram|rhym|initials|syllable|acronym/i;
const CREATOR_RE =
  /\b(directed|written|composed|produced|performed|recorded|adapted from|based on)\b|\bby\b|['’]s\b|^[A-Z][\w.'’-]*(?: [A-Z][\w.'’-]*)* (films|songs|novels|albums|poems|plays|stories)\b/;
const CANON_RE =
  /\b(award|awards|prize|winners?|nominat|oscar|grammy|booker|pulitzer|nobel|palme|razzie|franchise|series|entries|sequels?|trilogy|quartet|quintet|installments?|soundtrack|album|movement|era|generation|revival|school|scene|club|selections?|charts?|canon|hits|classics|standards|anthems|studio|label)\b|\b(19|20)\d0s\b|\b(19|20)\d{2}\b/i;

/**
 * Franchise and series-entry groups are banned outright. "The four Hunger Games films"
 * is not a connection — it is a list, recognised from one tile, and it burns four slots
 * on one property. The archive kept producing them because they are the easiest sentence
 * to write; that is exactly why they must fail rather than flag.
 *
 * Two forms: a word that names a franchise outright, and a numbered slice of a named
 * series ("Books 1–4 of …", "First four books of …"). The second needs both signals so
 * that a plain "…in a television series" content group survives.
 */
const FRANCHISE_RE =
  /\b(franchise|saga|cinematic universe|extended universe|trilogy|tetralogy|quartet|quintet|sequels?|prequels?|spin-?offs?|installments?|instalments?)\b/i;
const SERIES_RE = /\b(series|cycle|saga)\b/i;
const SERIES_SLICE_RE =
  /\b(books?|films?|novels?|volumes?|entries|parts?)\s*(#\s*)?\d|\b(first|last|final|opening|original)\s+(two|three|four|five|six|seven|eight|nine|ten|\d+)\b|\b\d\s*[–—-]\s*\d\b/i;

/**
 * Head nouns that say what the tiles are. The earliest one in the connection wins, so
 * "Film titles that join two characters' names" is works and "Directors of films…" is names.
 */
const WORK_NOUN_RE =
  /\b(films?|movies?|songs?|singles?|albums?|records?|tracks?|novels?|books?|poems?|plays?|stories|memoirs?|titles?)\b/i;
const NAME_NOUN_RE =
  /\b(actors?|actress(es)?|directors?|authors?|novelists?|poets?|playwrights?|(co-|screen|song)?writers?|(bass|guitar|pian|organ|violin|cell|saxophon|keyboard|harp|vocal)ists?|drummers?|front(man|men|woman|women)|translators?|illustrators?|editors?|artists?|acts?|bands?|groups?|singers?|composers?|musicians?|sidemen|rappers?|producers?|performers?|characters?|roles?|holders?|winners?|members?|(sur)?names?|people|stars?)\b/i;

/** Taste words: membership is an opinion, so a solver cannot verify a guess. */
const SUBJECTIVE_RE =
  /\b(famous|iconic|classic|classics|landmark|milestone|watershed|celebrated|acclaimed|beloved|essential|pivotal|groundbreaking|definitive|greatest|best|major|key|core|important|influential|notable|memorable|legendary)\b/i;

/** Properties true of unboundedly many items, so they cannot distinguish anything. */
const UNBOUNDED_RE =
  /\bwho (have )?(died|are dead)\b|\bdeceased\b|\bstill alive\b|\bwho are famous\b|\bthat exist\b/i;

/** Subordinating markers; two or more means the sentence was fitted to its items. */
const QUALIFIER_RE = /\b(that|which|where|whose|when|featuring|including|involving|based|during|between|without|rather than)\b/gi;

const MAX_CONNECTION_WORDS = 12;

/**
 * "Titles hiding a bird", "Actors with a hidden tree", "Names that hide a metal",
 * "Song titles hiding Thanksgiving dinner". The verb must take a thing as its object:
 * "hide their face" and "hidden truths" are content links, not wordplay.
 */
const HIDDEN_RE = /\bhid(e|es|ing)\s+(a|an|some\w*)\b|\bwith an? hidden\b|\bhidden\s+(in|inside)\b/i;
const HIDDEN_PROPER_RE = /\b[Hh]id(e|es|ing)\s+[A-Z]/;

/**
 * "Titles containing a golf term" plays exactly like "Titles hiding a fish": scan every
 * title for a word from a category. Contain must attach to a title or name.
 */
const CONTAINS_RE =
  /\b(titles?|names?)\b.*\bcontain(s|ing)?\b|\bcontain(s|ing)?\b.*\bin (the|their|its) (titles?|names?)\b/i;

/**
 * The word-in-title motif runs once per this many days across all three sites. Owner,
 * 2026-11-10: seeing it every day is not fun.
 */
const WORD_IN_TITLE_SPACING_DAYS = 14;

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function contentWords(text: string): Set<string> {
  return new Set(
    normalize(text)
      .split(' ')
      .filter((w) => w.length > 3 && !STOPWORDS.has(w)),
  );
}

/**
 * Which axis a connection runs on. Heuristic by design: it exists to notice a board
 * that has quietly put all four groups on one axis, not to adjudicate any single
 * group. A connection that stacks two constraints (creator + title) counts as
 * wordplay, because the title pattern is the harder half.
 *
 * Canon is tested before creator: the creator pattern also matches a capitalised
 * word sitting in front of "films"/"songs", which would swallow phrases like
 * "Classic films released in the 1960s".
 */
export function classifyAxis(connection: string): Axis {
  if (WORDPLAY_RE.test(connection)) return 'wordplay';
  if (CANON_RE.test(connection)) return 'canon';
  if (CREATOR_RE.test(connection)) return 'creator';
  return 'content';
}

/**
 * What kind of tile a connection's items are. Heuristic, like classifyAxis: it reads the
 * connection's head noun, and defaults to works because titles are the archive's norm.
 */
export function classifyTileKind(connection: string): TileKind {
  const work = connection.search(WORK_NOUN_RE);
  const name = connection.search(NAME_NOUN_RE);
  if (name === -1) return 'work';
  return work === -1 || name < work ? 'name' : 'work';
}

/**
 * Overlap against the smaller connection, so "Folk revival songs" still matches
 * "Songs that launched the indie folk revival of the mid-2000s". One shared word is
 * never enough: a two-word connection would otherwise match anything it touches.
 */
function connectionOverlap(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  const shared = [...a].filter((w) => b.has(w)).length;
  if (shared < 2) return 0;
  return shared / Math.min(a.size, b.size);
}

export function isHiddenWordGroup(connection: string): boolean {
  return HIDDEN_RE.test(connection) || HIDDEN_PROPER_RE.test(connection);
}

/** Hidden or plainly contained: either way the solver hunts a category word in each title. */
export function isWordInTitleGroup(connection: string): boolean {
  return isHiddenWordGroup(connection) || CONTAINS_RE.test(connection);
}

/** Letters only: a hidden word may straddle spaces and punctuation. */
function letters(text: string): string {
  return normalize(text).replace(/ /g, '');
}

function daysBetween(a: string, b: string): number {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 86_400_000;
}

/** Rule 2 — one item may not satisfy two connections on the same board. */
function checkPartition(groups: PuzzleGroup[]): Finding[] {
  const seen = new Map<string, number>();
  const findings: Finding[] = [];
  groups.forEach((g, gi) => {
    for (const item of g.items) {
      const key = normalize(item.title);
      const first = seen.get(key);
      if (first !== undefined && first !== gi) {
        findings.push({
          rule: 'partition',
          severity: 'fail',
          group: gi + 1,
          message: `"${item.title}" also sits in group ${first + 1}. Every item must satisfy exactly one connection.`,
        });
      } else {
        seen.set(key, gi);
      }
    }
  });
  return findings;
}

/**
 * A group solvable from the item strings alone is not a puzzle: either all four
 * items share a word, or they hand back a word from their own connection.
 */
function checkGiveaway(groups: PuzzleGroup[]): Finding[] {
  const findings: Finding[] = [];
  groups.forEach((g, gi) => {
    const itemWords = g.items.map((i) => contentWords(i.title));
    if (!itemWords.length) return;
    const sharedByAll = [...itemWords[0]].filter((w) => itemWords.every((s) => s.has(w)));
    if (sharedByAll.length) {
      findings.push({
        rule: 'giveaway',
        severity: 'fail',
        group: gi + 1,
        message: `All four items contain "${sharedByAll.join('", "')}" — the group solves itself.`,
      });
      return;
    }
    const connWords = contentWords(g.connection);
    const leaked = [...connWords].filter((w) => itemWords.every((s) => s.has(w)));
    if (leaked.length) {
      findings.push({
        rule: 'giveaway',
        severity: 'fail',
        group: gi + 1,
        message: `Every item repeats "${leaked.join('", "')}" from the connection.`,
      });
    }
  });
  return findings;
}

/** No group may be "the entries of X". See FRANCHISE_RE. */
function checkFranchise(groups: PuzzleGroup[]): Finding[] {
  const findings: Finding[] = [];
  groups.forEach((g, gi) => {
    const isFranchise =
      FRANCHISE_RE.test(g.connection) ||
      (SERIES_RE.test(g.connection) && SERIES_SLICE_RE.test(g.connection));
    if (!isFranchise) return;
    findings.push({
      rule: 'franchise',
      severity: 'fail',
      group: gi + 1,
      message: `"${g.connection}" lists the entries of one franchise or series — a list, not a connection. Find a property that crosses works.`,
    });
  });
  return findings;
}

/** The board must carry exactly one of each difficulty, with color in lockstep. */
function checkDifficulties(groups: PuzzleGroup[]): Finding[] {
  const findings: Finding[] = [];
  const present = groups.map((g) => g.difficulty).sort();
  const expected = [...DIFFICULTY_ORDER].sort();
  if (present.join(',') !== expected.join(',')) {
    findings.push({
      rule: 'difficulty-set',
      severity: 'fail',
      message: `Board needs one of each difficulty; got ${present.join(', ')}.`,
    });
  }
  groups.forEach((g, gi) => {
    const want = DIFFICULTY_ORDER.includes(g.difficulty as (typeof DIFFICULTY_ORDER)[number])
      ? colorForDifficulty(g.difficulty)
      : undefined;
    if (want && g.color !== want) {
      findings.push({
        rule: 'color-sync',
        severity: 'fail',
        group: gi + 1,
        message: `${g.difficulty} must be ${want}, found ${g.color}.`,
      });
    }
  });
  return findings;
}

/** Connections must be new. Items may repeat freely; the theme is what goes stale. */
function checkReuse(groups: PuzzleGroup[], ctx: ArchiveContext): Finding[] {
  const findings: Finding[] = [];
  groups.forEach((g, gi) => {
    const conn = normalize(g.connection);
    const words = contentWords(g.connection);
    const itemKeys = new Set(g.items.map((i) => normalize(i.title)));

    for (const prior of ctx.priorGroups) {
      if (normalize(prior.connection) === conn) {
        findings.push({
          rule: 'duplicate-connection',
          severity: 'fail',
          group: gi + 1,
          message: `Already used on ${prior.date}: "${prior.connection}".`,
        });
        return;
      }
    }

    // Report the closest prior group, not merely the first one scanned — the archive
    // is long enough that a weak early match would hide the real collision.
    let closest: { prior: PriorGroup; score: number; sharedItems: string[] } | undefined;
    for (const prior of ctx.priorGroups) {
      const overlap = connectionOverlap(words, contentWords(prior.connection));
      const sharedItems = prior.items.filter((t) => itemKeys.has(normalize(t)));
      if (overlap < 0.6 && sharedItems.length < 2) continue;
      const score = overlap + sharedItems.length;
      if (!closest || score > closest.score) closest = { prior, score, sharedItems };
    }
    if (closest) {
      findings.push({
        rule: 'near-duplicate',
        severity: 'flag',
        group: gi + 1,
        message: `Close to ${closest.prior.date} "${closest.prior.connection}"${
          closest.sharedItems.length ? ` — shares ${closest.sharedItems.join(', ')}` : ''
        }.`,
      });
    }
  });
  return findings;
}

/** Rule 1 — four groups need at least three distinct ways in. */
function checkAxisVariety(groups: PuzzleGroup[]): Finding[] {
  const axes = groups.map((g) => classifyAxis(g.connection));
  const distinct = new Set(axes);
  if (distinct.size >= 3) return [];
  return [
    {
      rule: 'axis-variety',
      severity: 'flag',
      message: `Only ${distinct.size} axis/axes on this board (${axes.join(', ')}). Four groups on one axis stop being distinguishable.`,
    },
  ];
}

/**
 * Three groups of titles and one group of names (or the reverse) sorts itself: the
 * odd kind is found by looking, not by solving. Kinds must come in pairs or not at all.
 */
function checkLoneTileKind(groups: PuzzleGroup[]): Finding[] {
  const kinds = groups.map((g) => classifyTileKind(g.connection));
  return kinds.flatMap((kind, gi) =>
    kinds.filter((k) => k === kind).length === 1
      ? [
          {
            rule: 'lone-tile-kind',
            severity: 'fail' as const,
            group: gi + 1,
            message: `The only group of ${kind === 'name' ? 'names' : 'titles'} on the board — solvers spot it by tile type alone. Use all one kind, or two and two.`,
          },
        ]
      : [],
  );
}

/** Rules 5–6 — the connection must be short, checkable and bounded. */
function checkConnectionQuality(groups: PuzzleGroup[]): Finding[] {
  const findings: Finding[] = [];
  groups.forEach((g, gi) => {
    const wordCount = g.connection.trim().split(/\s+/).length;
    const qualifiers = g.connection.match(QUALIFIER_RE)?.length ?? 0;
    if (wordCount > MAX_CONNECTION_WORDS || qualifiers >= 2) {
      findings.push({
        rule: 'over-qualified',
        severity: 'flag',
        group: gi + 1,
        message: `${wordCount} words, ${qualifiers} qualifier(s). Piled-up clauses mean the sentence was fitted to the items — check every item is actually true.`,
      });
    }
    if (SUBJECTIVE_RE.test(g.connection)) {
      findings.push({
        rule: 'subjective-qualifier',
        severity: 'flag',
        group: gi + 1,
        message: `Taste word in "${g.connection}" — a solver cannot verify membership.`,
      });
    }
    if (UNBOUNDED_RE.test(g.connection)) {
      findings.push({
        rule: 'unbounded-set',
        severity: 'flag',
        group: gi + 1,
        message: `"${g.connection}" is true of unboundedly many items, so it distinguishes nothing.`,
      });
    }
  });
  return findings;
}

/**
 * Rule 4 — in a pattern group, an item the archive has never used anywhere else is
 * usually filler dragged in to reach four.
 */
function checkFillerItems(groups: PuzzleGroup[], ctx: ArchiveContext): Finding[] {
  const findings: Finding[] = [];
  if (!ctx.itemFrequency.size) return findings;
  groups.forEach((g, gi) => {
    if (classifyAxis(g.connection) !== 'wordplay') return;
    const unknown = g.items.filter((i) => !ctx.itemFrequency.get(normalize(i.title)));
    // The tell is three obvious items and a fourth nobody has heard of. If most of the
    // group is unknown to the archive, that is a tile kind the archive has never held —
    // character or person names against a corpus of titles — and says nothing about fit.
    if (!unknown.length || unknown.length > g.items.length - 2) return;
    for (const item of unknown) {
      findings.push({
        rule: 'filler-item',
        severity: 'flag',
        group: gi + 1,
        message: `"${item.title}" appears nowhere else in the archive — is it the fourth-best item, or the fourth one that fits?`,
      });
    }
  });
  return findings;
}

/** Items may repeat across the archive; repeating one this week is what jars. */
function checkItemRecency(
  groups: PuzzleGroup[],
  ctx: ArchiveContext,
  opts: AuditOptions,
): Finding[] {
  const { date, recencyDays = 14 } = opts;
  if (!date) return [];
  const findings: Finding[] = [];
  groups.forEach((g, gi) => {
    for (const item of g.items) {
      const key = normalize(item.title);
      const recent = ctx.priorGroups.find(
        (p) =>
          daysBetween(p.date, date) <= recencyDays &&
          p.items.some((t) => normalize(t) === key),
      );
      if (recent) {
        findings.push({
          rule: 'item-recency',
          severity: 'flag',
          group: gi + 1,
          message: `"${item.title}" ran ${Math.round(daysBetween(recent.date, date))} days ago (${recent.date}, "${recent.connection}").`,
        });
      }
    }
  });
  return findings;
}

/**
 * A hidden-word group is only as good as its worst tile. Shipped boards had three tiles
 * hiding a bird and a fourth that did not, so each tile must name its word and the
 * letters must actually be there. A word standing whole in the title is not hidden.
 */
function checkHiddenWords(groups: PuzzleGroup[], opts: AuditOptions): Finding[] {
  const findings: Finding[] = [];
  groups.forEach((g, gi) => {
    if (!isHiddenWordGroup(g.connection)) return;
    for (const item of g.items) {
      if (!item.hidden) {
        if (opts.requireHiddenAnswers === false) continue;
        findings.push({
          rule: 'hidden-word',
          severity: 'fail',
          group: gi + 1,
          message: `"${item.title}" has no hidden word recorded. Add "hidden" so the tile can be checked.`,
        });
        continue;
      }
      if (!letters(item.title).includes(letters(item.hidden))) {
        findings.push({
          rule: 'hidden-word',
          severity: 'fail',
          group: gi + 1,
          message: `"${item.title}" does not contain "${item.hidden}".`,
        });
        continue;
      }
      if (normalize(item.title).split(' ').includes(normalize(item.hidden))) {
        findings.push({
          rule: 'hidden-word-visible',
          severity: 'flag',
          group: gi + 1,
          message: `"${item.hidden}" stands whole in "${item.title}" — visible, not hidden.`,
        });
      }
    }
  });
  return findings;
}

/** The archive's favourite trick; one per fortnight across all sites, either side of this date. */
function checkWordInTitleSpacing(
  groups: PuzzleGroup[],
  ctx: ArchiveContext,
  opts: AuditOptions,
): Finding[] {
  const { date } = opts;
  if (!date || !ctx.allGenreGroups) return [];
  const near = ctx.allGenreGroups.filter(
    (p) =>
      p.date !== date &&
      daysBetween(p.date, date) < WORD_IN_TITLE_SPACING_DAYS &&
      isWordInTitleGroup(p.connection),
  );
  if (!near.length) return [];
  const list = near.map((p) => `${p.date} ${p.genre} "${p.connection}"`).join('; ');
  return groups.flatMap((g, gi) =>
    isWordInTitleGroup(g.connection)
      ? [
          {
            rule: 'word-in-title-spacing',
            severity: 'fail' as const,
            group: gi + 1,
            message: `Word-in-title motif runs once per ${WORD_IN_TITLE_SPACING_DAYS} days across all sites; within range: ${list}. Use another kind of link.`,
          },
        ]
      : [],
  );
}

/**
 * The three sites publish together, so a trick on one is a repeat on the others. At most
 * one genre per day may run a word-in-title group.
 */
export function auditDay(boards: DayBoard[]): Finding[] {
  const hiding = boards.filter((b) => b.groups.some((g) => isWordInTitleGroup(g.connection)));
  if (hiding.length < 2) return [];
  return [
    {
      rule: 'day-word-in-title-clash',
      severity: 'fail',
      message: `Word-in-title groups in ${hiding.map((b) => b.genre).join(' and ')} on the same day. Keep one; give the others a different link.`,
    },
  ];
}

export function auditBoard(
  groups: PuzzleGroup[],
  ctx: ArchiveContext,
  opts: AuditOptions = {},
): Finding[] {
  return [
    ...checkPartition(groups),
    ...checkGiveaway(groups),
    ...checkFranchise(groups),
    ...checkDifficulties(groups),
    ...checkReuse(groups, ctx),
    ...checkAxisVariety(groups),
    ...checkLoneTileKind(groups),
    ...checkConnectionQuality(groups),
    ...checkFillerItems(groups, ctx),
    ...checkItemRecency(groups, ctx, opts),
    ...checkHiddenWords(groups, opts),
    ...checkWordInTitleSpacing(groups, ctx, opts),
  ];
}
