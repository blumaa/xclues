import { describe, it, expect, vi } from 'vitest';
import { useState, useCallback } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as displayTitle from '../../../utils/displayTitle';
import { ItemTile } from '../ItemTile';
import type { Item } from '../../../types';

const items: Item[] = [
  { id: 1, title: 'Alpha' },
  { id: 2, title: 'Bravo' },
];

function Harness() {
  const [selected, setSelected] = useState<number | null>(null);
  const onSelect = useCallback((id: number) => setSelected(id), []);
  return (
    <>
      {items.map((item) => (
        <ItemTile
          key={item.id}
          item={item}
          isSelected={selected === item.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

// getDisplayTitle runs once per ItemTile body execution, so counting calls per
// item id tells us exactly which tiles re-rendered.
function bodyRunsFor(spy: ReturnType<typeof vi.spyOn>, id: number): number {
  return spy.mock.calls.filter((c: unknown[]) => (c[0] as Item).id === id)
    .length;
}

describe('ItemTile memoization', () => {
  it('is wrapped in React.memo', () => {
    expect((ItemTile as unknown as { $$typeof: symbol }).$$typeof).toBe(
      Symbol.for('react.memo'),
    );
  });

  it('does not re-render sibling tiles when one is selected', () => {
    const spy = vi.spyOn(displayTitle, 'getDisplayTitle');
    render(<Harness />);

    const alphaBefore = bodyRunsFor(spy, 1);
    const bravoBefore = bodyRunsFor(spy, 2);

    fireEvent.click(screen.getByLabelText(/Alpha/));

    // Alpha re-rendered (isSelected changed)...
    expect(bodyRunsFor(spy, 1)).toBeGreaterThan(alphaBefore);
    // ...Bravo's props were unchanged, so memo skipped its body.
    expect(bodyRunsFor(spy, 2)).toBe(bravoBefore);
  });
});
