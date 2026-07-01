import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { XButton, XInput, XHeading, XText, XCard } from '../atoms';
import { GroupCard } from '../molecules/GroupCard';
import { MistakesIndicator } from '../molecules/MistakesIndicator';
import type { Group } from '../../types';

const group: Group = {
  id: 'g1',
  connection: 'Tarantino films',
  difficulty: 'easy',
  color: 'yellow',
  items: [
    { id: 1, title: 'Pulp Fiction' },
    { id: 2, title: 'Kill Bill' },
    { id: 3, title: 'Jackie Brown' },
    { id: 4, title: 'Reservoir Dogs' },
  ],
};

async function expectNoViolations(ui: React.ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results.violations).toEqual([]);
}

describe('accessibility (axe)', () => {
  it('XButton has no violations', async () => {
    await expectNoViolations(<XButton variant="primary">Submit</XButton>);
  });

  it('XInput has no violations', async () => {
    await expectNoViolations(
      <XInput aria-label="Email" placeholder="Email" />,
    );
  });

  it('XHeading + XText have no violations', async () => {
    await expectNoViolations(
      <div>
        <XHeading level={1}>Title</XHeading>
        <XText>Body copy</XText>
      </div>,
    );
  });

  it('XCard has no violations', async () => {
    await expectNoViolations(<XCard>Card content</XCard>);
  });

  it('GroupCard (solved group) has no violations', async () => {
    await expectNoViolations(<GroupCard group={group} />);
  });

  it('MistakesIndicator has no violations', async () => {
    await expectNoViolations(
      <MistakesIndicator mistakes={1} maxMistakes={4} />,
    );
  });
});
