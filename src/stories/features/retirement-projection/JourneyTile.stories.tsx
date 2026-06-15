import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { JourneyTile } from '../../../features/retirement-projection/JourneyTile';

const meta = {
  title: 'Features / Retirement Projection / JourneyTile',
  component: JourneyTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Collapsed call-to-action tile for the "ways to improve" journeys. Renders as a real <button> — keyboard operable and announced correctly.',
      },
    },
  },
  argTypes: {
    onActivate: { action: 'activated' },
    image: { table: { disable: true } },
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 480 }}><Story /></Box>],
} satisfies Meta<typeof JourneyTile>;

export default meta;
type Story = StoryObj<typeof JourneyTile>;

export const AddContributions: Story = {
  args: {
    image: '/images/add-to-super.svg',
    icon: 'plus',
    title: 'Add more to your super',
    description: 'Adding extra contributions may improve your projection, but it can also reduce your take-home pay.',
  },
};

export const ChangeRetirementGoal: Story = {
  args: {
    image: '/images/profile.svg',
    icon: 'pen-to-square',
    title: 'Change your retirement age or target income',
    description: 'Adjusting your retirement age or income goal can significantly change your projected outcome.',
  },
};
