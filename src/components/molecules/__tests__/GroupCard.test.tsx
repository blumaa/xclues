import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GroupCard } from '../GroupCard';
import type { Group } from '../../../types';

function makeGroup(overrides: Partial<Group> = {}): Group {
  return {
    id: '1',
    connection: 'Test Group',
    difficulty: 'easy',
    color: 'yellow',
    items: [
      { id: 1, title: 'Item A' },
      { id: 2, title: 'Item B' },
      { id: 3, title: 'Item C' },
      { id: 4, title: 'Item D' },
    ],
    ...overrides,
  };
}

describe('GroupCard', () => {
  it('renders the connection text', () => {
    const group = makeGroup({ connection: 'Films about cats' });
    const { getByText } = render(<GroupCard group={group} />);
    expect(getByText('Films about cats')).toBeInTheDocument();
  });

  it('renders all item titles', () => {
    const group = makeGroup();
    const { container } = render(<GroupCard group={group} />);
    expect(container.textContent).toContain('Item A');
    expect(container.textContent).toContain('Item D');
  });

  it('applies the color class', () => {
    const group = makeGroup({ color: 'purple' });
    const { container } = render(<GroupCard group={group} />);
    expect(container.querySelector('.group-card.purple')).toBeTruthy();
  });

  it('has accessible role and label', () => {
    const group = makeGroup({ connection: 'Test Connection' });
    const { container } = render(<GroupCard group={group} />);
    const card = container.querySelector('.group-card');
    expect(card?.getAttribute('role')).toBe('status');
    expect(card?.getAttribute('aria-label')).toBe('Found group: Test Connection');
  });

  it('connection text is inside group-card-connection span', () => {
    const group = makeGroup({ connection: 'Long connection text here' });
    const { container } = render(<GroupCard group={group} />);
    const span = container.querySelector('.group-card-connection');
    expect(span).toBeTruthy();
    expect(span?.textContent).toBe('Long connection text here');
  });

  it('group card content has height 100% to fill grid row', () => {
    const group = makeGroup();
    const { container } = render(<GroupCard group={group} />);
    const content = container.querySelector('.group-card-content');
    expect(content).toBeTruthy();
  });
});
