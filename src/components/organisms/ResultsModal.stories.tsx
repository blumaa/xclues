import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResultsModal } from './ResultsModal';
import { StatsProvider } from '../../providers/StatsProvider';
import { StorageProvider } from '../../providers/StorageProvider';
import { SiteProvider } from '../../providers/SiteProvider';
import type { GuessColor } from '../../types/stats';

// Example guess histories representing different gameplay scenarios
const PERFECT_GAME: GuessColor[][] = [
  ['yellow', 'yellow', 'yellow', 'yellow'],
  ['green', 'green', 'green', 'green'],
  ['blue', 'blue', 'blue', 'blue'],
  ['purple', 'purple', 'purple', 'purple'],
];

const WON_WITH_ONE_MISTAKE: GuessColor[][] = [
  ['yellow', 'yellow', 'green', 'yellow'], // mistake - had one green mixed in
  ['yellow', 'yellow', 'yellow', 'yellow'], // found yellow
  ['green', 'green', 'green', 'green'],
  ['blue', 'blue', 'blue', 'blue'],
  ['purple', 'purple', 'purple', 'purple'],
];

const WON_WITH_THREE_MISTAKES: GuessColor[][] = [
  ['yellow', 'green', 'blue', 'purple'], // mistake - all different
  ['yellow', 'yellow', 'green', 'green'], // mistake - mixed
  ['yellow', 'yellow', 'yellow', 'blue'], // mistake - close but one wrong
  ['yellow', 'yellow', 'yellow', 'yellow'], // found yellow
  ['green', 'green', 'green', 'green'],
  ['blue', 'blue', 'blue', 'blue'],
  ['purple', 'purple', 'purple', 'purple'],
];

const LOST_GAME: GuessColor[][] = [
  ['yellow', 'green', 'blue', 'purple'], // mistake 1
  ['yellow', 'yellow', 'green', 'green'], // mistake 2
  ['yellow', 'yellow', 'yellow', 'blue'], // mistake 3
  ['green', 'green', 'blue', 'blue'], // mistake 4 - game over
];

const meta: Meta<typeof ResultsModal> = {
  title: 'Game/ResultsModal',
  component: ResultsModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SiteProvider>
        <StorageProvider>
          <StatsProvider>
            <Story />
          </StatsProvider>
        </StorageProvider>
      </SiteProvider>
    ),
  ],
  args: {
    genre: 'films',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    gameStatus: { control: 'select', options: ['won', 'lost'] },
    mistakes: { control: { type: 'number', min: 0, max: 4 } },
    genre: { control: 'select', options: ['films', 'books', 'music'] },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof ResultsModal>;

export const Won: Story = {
  args: {
    isOpen: true,
    gameStatus: 'won',
    mistakes: 1,
    guessHistory: WON_WITH_ONE_MISTAKE,
  },
};

export const WonPerfect: Story = {
  args: {
    isOpen: true,
    gameStatus: 'won',
    mistakes: 0,
    guessHistory: PERFECT_GAME,
  },
};

export const Lost: Story = {
  args: {
    isOpen: true,
    gameStatus: 'lost',
    mistakes: 4,
    guessHistory: LOST_GAME,
  },
};

export const WonWithMistakes: Story = {
  args: {
    isOpen: true,
    gameStatus: 'won',
    mistakes: 3,
    guessHistory: WON_WITH_THREE_MISTAKES,
  },
};

