import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MemberFooter } from '../../components/MemberOnline';
import { MOCK_FOOTER_DISCLAIMER, MOCK_FOOTER_LINKS } from './mockData';

const meta: Meta<typeof MemberFooter> = {
  title: 'Member Online / Target State / MemberFooter',
  component: MemberFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Slim compliance footer for the authenticated member experience: legal links inline + optional disclaimer text below.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MemberFooter>;

export const Default: Story = {
  args: { links: MOCK_FOOTER_LINKS, disclaimer: MOCK_FOOTER_DISCLAIMER },
};

export const LinksOnly: Story = {
  args: { links: MOCK_FOOTER_LINKS },
};
