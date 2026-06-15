import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RetirementScore } from '../../../features/retirement-projection/RetirementScore';

const meta = {
  title: 'Features / Retirement Projection / RetirementScore',
  component: RetirementScore,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Circular progress ring showing the retirement score (0–100%). Colour follows the score severity: success ≥ 90, warning ≥ 50, error below.',
      },
    },
  },
  argTypes: {
    score: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    severity: { control: 'inline-radio', options: ['success', 'warning', 'error'] },
  },
} satisfies Meta<typeof RetirementScore>;

export default meta;
type Story = StoryObj<typeof RetirementScore>;

export const OnTrack: Story = { args: { score: 100, severity: 'success' } };
export const Warning: Story = { args: { score: 65, severity: 'warning' } };
export const Behind: Story = { args: { score: 30, severity: 'error' } };
