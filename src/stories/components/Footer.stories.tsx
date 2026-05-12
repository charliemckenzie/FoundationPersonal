import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../../components/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Public web / Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    // Full-screen so the footer renders at realistic width with no padding
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

/** Default footer at desktop width. Resize the viewport to see the accordion treatment on mobile and tablet (below 960px). */
export const Default: Story = {};
