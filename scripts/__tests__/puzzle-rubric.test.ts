import { describe, it, expect } from 'vitest';
import {
  classifyAxis,
  classifyTileKind,
  auditBoard,
  auditDay,
  isHiddenWordGroup,
  isWordInTitleGroup,
  type ArchiveContext,
} from '../puzzle-rubric';
import type { PuzzleGroup } from '../puzzle-model';

/**
 * Fixtures are drawn from real boards (2026-07-21 → 2026-08-04) so each rule is
 * pinned to the puzzle that motivated it.
 */
function group(
  id: string,
  difficulty: string,
  color: string,
  connection: string,
  titles: string[],
): PuzzleGroup {
  return {
    id,
    difficulty,
    color,
    connection,
    items: titles.map((title, i) => ({ id: Number(`${id.length}${i}`), title })),
  };
}

/** A clean four-axis board: 2026-08-04 Filmclues. */
function cleanBoard(): PuzzleGroup[] {
  return [
    group('g1', 'easy', 'yellow', 'Films directed by Michael Bay', [
      'Bad Boys',
      'The Rock',
      'Armageddon',
      'Pearl Harbor',
    ]),
    group('g2', 'medium', 'green', 'Classic films released in the 1960s', [
      'Psycho',
      'Lawrence of Arabia',
      'The Graduate',
      'Butch Cassidy and the Sundance Kid',
    ]),
    group('g3', 'hard', 'blue', 'Films where an iconic sword is central to the quest', [
      'Excalibur',
      'Highlander',
      'The Princess Bride',
      'Crouching Tiger, Hidden Dragon',
    ]),
    group('g4', 'hardest', 'purple', 'Film titles that are a single palindromic word', [
      'Tenet',
      'Elle',
      'Hannah',
      'Anna',
    ]),
  ];
}

const emptyArchive: ArchiveContext = { priorGroups: [], itemFrequency: new Map() };

describe('classifyAxis', () => {
  it('reads title-pattern connections as wordplay', () => {
    expect(classifyAxis('Film titles that are a single palindromic word')).toBe('wordplay');
    expect(classifyAxis('Book titles containing an insect')).toBe('wordplay');
    expect(classifyAxis('Alliterative two-word book titles')).toBe('wordplay');
  });

  it('reads maker connections as creator', () => {
    expect(classifyAxis('Films directed by Michael Bay')).toBe('creator');
    expect(classifyAxis('Films adapted from novels by John Grisham')).toBe('creator');
    expect(classifyAxis('Sally Rooney novels')).toBe('creator');
  });

  it('reads award / franchise / era connections as canon', () => {
    expect(classifyAxis('Winners of the Booker Prize')).toBe('canon');
    expect(classifyAxis('Pixar sequels')).toBe('canon');
    expect(classifyAxis('Classic films released in the 1960s')).toBe('canon');
  });

  it('falls back to content for trope and plot connections', () => {
    expect(classifyAxis('Films where an iconic sword is central to the quest')).toBe('content');
    expect(classifyAxis('Heist crew that plans the job over food')).toBe('content');
  });

  it('treats a stacked creator+title connection as wordplay (the title is the harder constraint)', () => {
    expect(classifyAxis("Beatles song titles containing the word 'love'")).toBe('wordplay');
  });
});

describe('classifyTileKind', () => {
  it('reads people and characters as names', () => {
    expect(classifyTileKind('Actors who trained as dancers')).toBe('name');
    expect(classifyTileKind('Directors of films adapted from Roald Dahl')).toBe('name');
    expect(classifyTileKind("Wes Anderson's co-writers")).toBe('name');
    expect(classifyTileKind('Razzie holders with an Academy Award')).toBe('name');
    expect(classifyTileKind('Characters whose book carries a Pulitzer')).toBe('name');
    expect(classifyTileKind('Roles played by Daniel Day-Lewis')).toBe('name');
    expect(classifyTileKind('Band names that include a number')).toBe('name');
    expect(classifyTileKind('Acts that recorded for the Sub Pop label')).toBe('name');
    expect(classifyTileKind('Composers who have written a requiem')).toBe('name');
    expect(classifyTileKind('Members of Blackpink')).toBe('name');
    expect(classifyTileKind('Original members of the Beatles')).toBe('name');
  });

  it('reads instrumentalists, frontmen and songwriters as names', () => {
    expect(classifyTileKind('Bassists who sing lead')).toBe('name');
    expect(classifyTileKind("Guitarists who played in Bowie's band")).toBe('name');
    expect(classifyTileKind('Pianists who sing lead')).toBe('name');
    expect(classifyTileKind('Drummers who fronted a band')).toBe('name');
    expect(classifyTileKind('Frontmen who replaced a founder')).toBe('name');
    expect(classifyTileKind('Songwriters behind a Motown hit')).toBe('name');
    expect(classifyTileKind('Singers who were Mouseketeers')).toBe('name');
  });

  it('reads films, songs, albums, books and poems as works', () => {
    expect(classifyTileKind('Films set in Antarctica')).toBe('work');
    expect(classifyTileKind("Film titles that join two characters' names")).toBe('work');
    expect(classifyTileKind('Novels filmed by Alfred Hitchcock')).toBe('work');
    expect(classifyTileKind('Hugo-winning novels of the 1960s')).toBe('work');
    expect(classifyTileKind('Titles that contain a coin')).toBe('work');
    expect(classifyTileKind('Poems by Elizabeth Bishop')).toBe('work');
    expect(classifyTileKind('Song of the Year trophies handed out in the 1990s')).toBe('work');
  });
});

describe('auditBoard — tile kinds', () => {
  const names = (id: string, difficulty: string, color: string) =>
    group(id, difficulty, color, 'Actors who trained as dancers', [
      `${id} A`, `${id} B`, `${id} C`, `${id} D`,
    ]);

  it('fails one names group among three title groups (it sorts itself)', () => {
    const groups = cleanBoard();
    groups[3] = names('g4', 'hardest', 'purple');
    expect(auditBoard(groups, emptyArchive)).toContainEqual(
      expect.objectContaining({ rule: 'lone-tile-kind', severity: 'fail', group: 4 }),
    );
  });

  it('fails one title group among three names groups', () => {
    const groups = cleanBoard().map((g, i) => (i === 0 ? g : names(g.id, g.difficulty, g.color)));
    expect(auditBoard(groups, emptyArchive)).toContainEqual(
      expect.objectContaining({ rule: 'lone-tile-kind', severity: 'fail', group: 1 }),
    );
  });

  it('passes an all-titles board and a two-and-two board', () => {
    const twoAndTwo = cleanBoard().map((g, i) => (i < 2 ? g : names(g.id, g.difficulty, g.color)));
    for (const groups of [cleanBoard(), twoAndTwo]) {
      expect(auditBoard(groups, emptyArchive).map((f) => f.rule)).not.toContain('lone-tile-kind');
    }
  });
});

describe('auditBoard — mechanical failures', () => {
  it('passes a clean four-axis board', () => {
    const findings = auditBoard(cleanBoard(), emptyArchive);
    expect(findings.filter((f) => f.severity === 'fail')).toEqual([]);
  });

  it('fails when one item satisfies two groups (2026-07-31: Speed)', () => {
    const groups = cleanBoard();
    groups[2].items[0].title = 'Tenet';
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'partition', severity: 'fail' }),
    );
  });

  it('fails a giveaway group whose items all share a word', () => {
    const groups = cleanBoard();
    groups[0] = group('g1', 'easy', 'yellow', 'The Hunger Games franchise films', [
      'The Hunger Games',
      'The Hunger Games: Catching Fire',
      'The Hunger Games: Mockingjay – Part 1',
      'The Hunger Games: Mockingjay – Part 2',
    ]);
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'giveaway', severity: 'fail', group: 1 }),
    );
  });

  it('fails when the items give away a word from their own connection', () => {
    const groups = cleanBoard();
    groups[0] = group('g1', 'easy', 'yellow', 'Songs with "wanna" in the title', [
      'I Wanna Dance with Somebody',
      'I Wanna Be Sedated',
      'Wanna Be Startin’ Somethin’',
      'I Wanna Be Adored',
    ]);
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'giveaway', severity: 'fail', group: 1 }),
    );
  });

  it('fails a board missing one of each difficulty', () => {
    const groups = cleanBoard();
    groups[3].difficulty = 'easy';
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'difficulty-set', severity: 'fail' }),
    );
  });

  it('fails when color and difficulty desync', () => {
    const groups = cleanBoard();
    groups[1].color = 'purple';
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'color-sync', severity: 'fail', group: 2 }),
    );
  });

  it('fails a connection already used in the archive (2026-07-21 / 08-01: Emma Stone films)', () => {
    const groups = cleanBoard();
    groups[0].connection = 'Emma Stone films';
    const ctx: ArchiveContext = {
      priorGroups: [
        { date: '2026-07-21', connection: 'Emma Stone films', items: ['La La Land', 'Easy A'] },
      ],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(groups, ctx);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'duplicate-connection', severity: 'fail', group: 1 }),
    );
  });

  it('fails a franchise-entries group (2026-08-05 Hunger Games, 2026-08-06 Toy Story)', () => {
    const groups = cleanBoard();
    groups[0].connection = 'The Hunger Games franchise films';
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'franchise', severity: 'fail', group: 1 }),
    );
  });

  it('fails a series-entries group whatever the wording (2026-08-06 Temeraire, 08-05 Song of the Lioness)', () => {
    for (const connection of [
      "Books 1–4 of Naomi Novik's Temeraire series",
      "First four books of Tamora Pierce's Tortall: Song of the Lioness quartet",
      'Toy Story franchise entries',
      'The first four Star Wars sequels',
      'Films in the Marvel Cinematic Universe',
    ]) {
      const groups = cleanBoard();
      groups[0].connection = connection;
      const findings = auditBoard(groups, emptyArchive);
      expect(
        findings.some((f) => f.rule === 'franchise' && f.severity === 'fail'),
        `expected franchise FAIL for "${connection}"`,
      ).toBe(true);
    }
  });

  it('does not call a shared-creator or shared-canon group a franchise', () => {
    for (const connection of [
      'Films directed by Michael Bay',
      'Songs from the Purple Rain soundtrack',
      'Novels shortlisted for the Booker Prize',
      'Albums recorded at Abbey Road Studios',
    ]) {
      const groups = cleanBoard();
      groups[0].connection = connection;
      const findings = auditBoard(groups, emptyArchive);
      expect(
        findings.some((f) => f.rule === 'franchise'),
        `false franchise FAIL for "${connection}"`,
      ).toBe(false);
    }
  });
});

describe('auditBoard — judgment flags', () => {
  it('flags a near-duplicate of a prior connection (popular-science books, 3 days apart)', () => {
    const groups = cleanBoard();
    groups[1].connection = 'Popular science books about stars and the cosmos';
    const ctx: ArchiveContext = {
      priorGroups: [
        {
          date: '2026-07-31',
          connection: 'Landmark popular-science books',
          items: ['Cosmos', 'A Brief History of Time'],
        },
      ],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(groups, ctx);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'near-duplicate', severity: 'flag', group: 2 }),
    );
  });

  it('flags a near-duplicate when two items are shared with a prior group', () => {
    const groups = cleanBoard();
    groups[1].connection = 'Novels of the second world war';
    const ctx: ArchiveContext = {
      priorGroups: [
        {
          date: '2026-07-28',
          connection: 'Historical fiction novels',
          items: ['Psycho', 'The Graduate', 'Wolf Hall'],
        },
      ],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(groups, ctx);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'near-duplicate', severity: 'flag', group: 2 }),
    );
  });

  it('does not call two connections alike on the strength of one shared generic word', () => {
    const groups = cleanBoard();
    groups[1].connection = 'Landmark works of American Black feminist criticism';
    const ctx: ArchiveContext = {
      priorGroups: [{ date: '2026-01-23', connection: 'Works by Amy Tan', items: [] }],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(groups, ctx);
    expect(findings.filter((f) => f.rule === 'near-duplicate')).toEqual([]);
  });

  it('flags a board that runs fewer than three axes (2026-07-24 attribute ladder)', () => {
    const groups = [
      group('g1', 'easy', 'yellow', 'Writers known by one name', [
        'Homer',
        'Voltaire',
        'Colette',
        'Sappho',
      ]),
      group('g2', 'medium', 'green', 'Writers with alliterative names', [
        'Rick Riordan',
        'Michael Moorcock',
        'Wally Lamb',
        'Sara Shepard',
      ]),
      group('g3', 'hard', 'blue', 'Writer names that are a single syllable', [
        'Ovid',
        'Poe',
        'Pope',
        'Gray',
      ]),
      group('g4', 'hardest', 'purple', 'Writers who are deceased', [
        'Charles Dickens',
        'Jane Austen',
        'Franz Kafka',
        'Leo Tolstoy',
      ]),
    ];
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'axis-variety', severity: 'flag' }),
    );
  });

  it('flags an unbounded property connection ("who are deceased")', () => {
    const groups = cleanBoard();
    groups[3].connection = 'Actors who have died';
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'unbounded-set', severity: 'flag', group: 4 }),
    );
  });

  it('flags a taste-word connection whose membership cannot be verified', () => {
    const groups = cleanBoard();
    groups[1].connection = 'Famous breakup songs';
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'subjective-qualifier', severity: 'flag', group: 2 }),
    );
  });

  it('flags an over-qualified connection as reverse-engineered from its items', () => {
    const groups = cleanBoard();
    groups[2].connection =
      'Songs that are credited collaborations between two genre-crossing legends from different continents';
    const findings = auditBoard(groups, emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'over-qualified', severity: 'flag', group: 3 }),
    );
  });

  /**
   * Owner correction, 2026-08-04: an axis does not fix a difficulty. A pattern a solver
   * can see on the tile — alliterating character names — is the easiest group on a board,
   * and obscure production trivia is the hardest, whatever axis either one classifies as.
   * Difficulty is how hidden the link is, which no regex can measure.
   */
  it('does not judge a slot by its axis', () => {
    const groups = cleanBoard();
    groups[0] = group('g1', 'easy', 'yellow', 'Characters whose first and last names alliterate', [
      'Willy Wonka',
      'Peter Parker',
      'Severus Snape',
      'Donnie Darko',
    ]);
    groups[3] = group('g4', 'hardest', 'purple', 'Directors who shoot on celluloid, not digital', [
      'Christopher Nolan',
      'Quentin Tarantino',
      'Wes Anderson',
      'Steven Spielberg',
    ]);
    const findings = auditBoard(groups, emptyArchive);
    expect(findings.filter((f) => f.rule === 'difficulty-inversion')).toEqual([]);
  });

  it('flags filler items — a wordplay group holding titles the archive has never seen', () => {
    const groups = cleanBoard();
    groups[3] = group('g4', 'hardest', 'purple', 'Book titles that are weather phenomena', [
      'The Storm',
      'Hailstorm',
      'Fog',
      'Blizzard',
    ]);
    const ctx: ArchiveContext = {
      priorGroups: [],
      itemFrequency: new Map([
        ['the storm', 3],
        ['fog', 2],
        ['blizzard', 1],
      ]),
    };
    const findings = auditBoard(groups, ctx);
    const filler = findings.filter((f) => f.rule === 'filler-item');
    expect(filler).toHaveLength(1);
    expect(filler[0].message).toContain('Hailstorm');
  });

  it('does not call a wordplay item filler when the archive knows it', () => {
    const groups = cleanBoard();
    const ctx: ArchiveContext = {
      priorGroups: [],
      itemFrequency: new Map([
        ['tenet', 2],
        ['elle', 2],
        ['hannah', 2],
        ['anna', 2],
      ]),
    };
    const findings = auditBoard(groups, ctx);
    expect(findings.filter((f) => f.rule === 'filler-item')).toEqual([]);
  });

  it('flags an item reused in the same genre within two weeks', () => {
    const groups = cleanBoard();
    const ctx: ArchiveContext = {
      priorGroups: [
        { date: '2026-07-30', connection: 'Films about explosions', items: ['Armageddon'] },
      ],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(groups, ctx, { date: '2026-08-04' });
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'item-recency', severity: 'flag', group: 1 }),
    );
  });

  it('does not flag item reuse beyond the recency window', () => {
    const groups = cleanBoard();
    const ctx: ArchiveContext = {
      priorGroups: [
        { date: '2026-06-01', connection: 'Films about explosions', items: ['Armageddon'] },
      ],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(groups, ctx, { date: '2026-08-04' });
    expect(findings.filter((f) => f.rule === 'item-recency')).toEqual([]);
  });

  it('flags the odd item out when the rest of the group is archive-known', () => {
    const groups = cleanBoard();
    const ctx: ArchiveContext = {
      priorGroups: [],
      itemFrequency: new Map([
        ['tenet', 3],
        ['elle', 2],
        ['anna', 4],
      ]),
    };
    const findings = auditBoard(groups, ctx);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'filler-item', group: 4 }),
    );
    expect(findings.filter((f) => f.rule === 'filler-item')).toHaveLength(1);
  });

  it('does not call every tile filler when the group uses a kind the archive has never held', () => {
    const groups = cleanBoard();
    groups[3] = {
      ...groups[3],
      connection: 'Characters whose first and last names alliterate',
      items: ['Willy Wonka', 'Peter Parker', 'Severus Snape', 'Donnie Darko'].map((title, i) => ({
        id: 400 + i,
        title,
      })),
    };
    const ctx: ArchiveContext = {
      priorGroups: [],
      itemFrequency: new Map([['psycho', 2], ['titanic', 5]]),
    };
    const findings = auditBoard(groups, ctx);
    expect(findings.filter((f) => f.rule === 'filler-item')).toEqual([]);
  });
});

/** A hidden-word group with its answers attached, as candidate JSON carries them. */
function hiddenBirds(hidden: (string | undefined)[]): PuzzleGroup {
  const titles = ['Swallows and Amazons', 'Crowded House', 'Brave New World', 'Antitrust'];
  return {
    id: 'g4',
    difficulty: 'hardest',
    color: 'purple',
    connection: 'Titles hiding a bird',
    items: titles.map((title, i) => ({ id: 40 + i, title, hidden: hidden[i] })),
  };
}

describe('isHiddenWordGroup', () => {
  it.each(['Titles hiding a bird', 'Film titles hiding a number', 'Actors with a hidden tree', 'Names that hide a metal'])(
    'recognises %s',
    (c) => expect(isHiddenWordGroup(c)).toBe(true),
  );
  it.each([
    'Films set in Rome',
    'Song titles that are also cocktails',
    'Musicians who hide their face',
    'Songs about hidden truths and deception',
    'Books where the dedication page contains a hidden message or code',
  ])('ignores %s', (c) => expect(isHiddenWordGroup(c)).toBe(false));
  it('recognises "hiding something"', () =>
    expect(isHiddenWordGroup('Film titles hiding something on a Christmas tree')).toBe(true));
  it('recognises a capitalised hidden thing', () =>
    expect(isHiddenWordGroup('Song titles hiding Thanksgiving dinner')).toBe(true));
});

/**
 * "Titles hiding a fish" and "Titles containing a golf term" play the same: scan each
 * title for a word from a category. One motif, one ration.
 */
describe('isWordInTitleGroup', () => {
  it.each([
    'Film titles hiding an animal',
    'Titles containing a golf term',
    'Song titles that contain an airline',
    'Books whose titles contain a weapon',
    'Songs containing a planet name in the title',
    'Artists whose name contains a food',
  ])('recognises %s', (c) => expect(isWordInTitleGroup(c)).toBe(true));
  it.each([
    'Books that contain a fake bibliography or index that readers have tried to verify',
    'Films set entirely inside a confined space',
    'Films titled after a book inside the story',
    'Film titles that are a single palindromic word',
  ])('ignores %s', (c) => expect(isWordInTitleGroup(c)).toBe(false));
});

describe('auditBoard — hidden words', () => {
  function boardWith(g4: PuzzleGroup): PuzzleGroup[] {
    const groups = cleanBoard();
    groups[3] = g4;
    return groups;
  }

  it('passes when every tile really hides its word', () => {
    const findings = auditBoard(boardWith(hiddenBirds(['swallow', 'crow', 'raven', 'tit'])), emptyArchive);
    expect(findings.filter((f) => f.rule.startsWith('hidden-word'))).toEqual([]);
  });

  it('fails a tile whose letters do not contain the claimed word', () => {
    const findings = auditBoard(boardWith(hiddenBirds(['swallow', 'crow', 'raven', 'owl'])), emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'hidden-word', severity: 'fail', group: 4 }),
    );
  });

  it('finds a word that spans a word break (Pelican Brief hides "canbr")', () => {
    const g = hiddenBirds(['swallow', 'crow', 'raven', 'tit']);
    g.items[1] = { id: 41, title: 'Pelican Brief', hidden: 'canbr' };
    const findings = auditBoard(boardWith(g), emptyArchive);
    expect(findings.filter((f) => f.rule === 'hidden-word')).toEqual([]);
  });

  it('fails a tile with no hidden word recorded, so nobody ships an unchecked tile', () => {
    const findings = auditBoard(boardWith(hiddenBirds(['swallow', 'crow', undefined, 'tit'])), emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'hidden-word', severity: 'fail', group: 4 }),
    );
  });

  it('skips the check for archived boards, which never stored answers', () => {
    const findings = auditBoard(
      boardWith(hiddenBirds([undefined, undefined, undefined, undefined])),
      emptyArchive,
      { requireHiddenAnswers: false },
    );
    expect(findings.filter((f) => f.rule === 'hidden-word')).toEqual([]);
  });

  it('flags a word sitting in plain sight — that is "titles containing", not hiding', () => {
    const findings = auditBoard(boardWith(hiddenBirds(['swallows', 'crow', 'raven', 'tit'])), emptyArchive);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'hidden-word-visible', severity: 'flag', group: 4 }),
    );
  });

  it('fails a word-in-title group within 14 days of one on any site', () => {
    const ctx: ArchiveContext = {
      priorGroups: [],
      allGenreGroups: [{ date: '2026-11-03', genre: 'music', connection: 'Titles containing a golf term' }],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(boardWith(hiddenBirds(['swallow', 'crow', 'raven', 'tit'])), ctx, {
      date: '2026-11-16',
    });
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'word-in-title-spacing', severity: 'fail', group: 4 }),
    );
  });

  it('looks forward too, so a replacement board cannot crowd one already scheduled', () => {
    const ctx: ArchiveContext = {
      priorGroups: [],
      allGenreGroups: [{ date: '2026-11-20', genre: 'books', connection: 'Titles hiding a tool' }],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(boardWith(hiddenBirds(['swallow', 'crow', 'raven', 'tit'])), ctx, {
      date: '2026-11-10',
    });
    expect(findings.map((f) => f.rule)).toContain('word-in-title-spacing');
  });

  it('allows one exactly 14 days after the last', () => {
    const ctx: ArchiveContext = {
      priorGroups: [],
      allGenreGroups: [{ date: '2026-11-02', genre: 'films', connection: 'Film titles hiding a fish' }],
      itemFrequency: new Map(),
    };
    const findings = auditBoard(boardWith(hiddenBirds(['swallow', 'crow', 'raven', 'tit'])), ctx, {
      date: '2026-11-16',
    });
    expect(findings.map((f) => f.rule)).not.toContain('word-in-title-spacing');
  });
});

describe('auditDay', () => {
  const plain = cleanBoard();
  const withHidden = (() => {
    const g = cleanBoard();
    g[3] = hiddenBirds(['swallow', 'crow', 'raven', 'tit']);
    return g;
  })();

  it('fails a hidden-word group and a containing group on the same day', () => {
    const containing = cleanBoard();
    containing[3] = { ...containing[3], connection: 'Titles containing a golf term' };
    expect(auditDay([{ genre: 'films', groups: withHidden }, { genre: 'books', groups: containing }])).toContainEqual(
      expect.objectContaining({ rule: 'day-word-in-title-clash', severity: 'fail' }),
    );
  });

  it('passes a day with at most one hidden-word group across genres', () => {
    expect(auditDay([{ genre: 'films', groups: withHidden }, { genre: 'music', groups: plain }])).toEqual([]);
  });

  it('fails when two genres run a hidden-word group on the same day', () => {
    const findings = auditDay([
      { genre: 'films', groups: withHidden },
      { genre: 'music', groups: plain },
      { genre: 'books', groups: withHidden },
    ]);
    expect(findings).toContainEqual(
      expect.objectContaining({ rule: 'day-word-in-title-clash', severity: 'fail' }),
    );
    expect(findings[0].message).toMatch(/films.*books/);
  });
});
