import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { ensureUniqueItemIds } from "../uniqueItemIds";
import type { Group } from "../../../types";

const itemArb = fc.record({
  id: fc.integer({ min: 0, max: 12 }),
  title: fc.string(),
});
const groupArb = fc.record({
  id: fc.string({ minLength: 1 }),
  items: fc.array(itemArb, { minLength: 1, maxLength: 6 }),
  connection: fc.string(),
  difficulty: fc.constantFrom("easy", "medium", "hard", "hardest"),
  color: fc.constantFrom("yellow", "green", "blue", "purple"),
});
const groupsArb = fc.array(groupArb, { minLength: 1, maxLength: 5 });

describe("ensureUniqueItemIds (property)", () => {
  it("produces globally-unique item ids for any input", () => {
    fc.assert(
      fc.property(groupsArb, (groups) => {
        const out = ensureUniqueItemIds(groups as Group[]);
        const ids = out.flatMap((g) => g.items.map((i) => i.id));
        expect(new Set(ids).size).toBe(ids.length);
      }),
    );
  });

  it("preserves group count, item order, titles and metadata", () => {
    fc.assert(
      fc.property(groupsArb, (groups) => {
        const out = ensureUniqueItemIds(groups as Group[]);
        expect(out.length).toBe(groups.length);
        out.forEach((g, gi) => {
          expect(g.items.length).toBe(groups[gi].items.length);
          expect(g.connection).toBe(groups[gi].connection);
          expect(g.difficulty).toBe(groups[gi].difficulty);
          expect(g.color).toBe(groups[gi].color);
          expect(g.items.map((i) => i.title)).toEqual(
            groups[gi].items.map((i) => i.title),
          );
        });
      }),
    );
  });

  it("leaves already-unique ids unchanged", () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.string(), { minLength: 1, maxLength: 4 }), {
          minLength: 1,
          maxLength: 4,
        }),
        (titleGroups) => {
          let nextId = 0;
          const groups: Group[] = titleGroups.map((titles, gi) => ({
            id: `g${gi}`,
            items: titles.map((title) => ({ id: nextId++, title })),
            connection: `c${gi}`,
            difficulty: "easy",
            color: "yellow",
          }));
          const out = ensureUniqueItemIds(groups);
          expect(out.flatMap((g) => g.items.map((i) => i.id))).toEqual(
            groups.flatMap((g) => g.items.map((i) => i.id)),
          );
        },
      ),
    );
  });
});
