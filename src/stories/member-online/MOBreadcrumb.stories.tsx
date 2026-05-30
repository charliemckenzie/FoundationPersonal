import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MOBreadcrumb } from '../../components/MemberOnline';

const meta: Meta<typeof MOBreadcrumb> = {
  title: 'Member Online / Target State / MOBreadcrumb',
  component: MOBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Breadcrumb navigation for Member Online pages. The back button navigates to the previous section; breadcrumb items show the path to the current page with the active page highlighted in the brand primary colour. Member Online only — use the public `Breadcrumb` component on non-portal pages.',
      },
    },
  },
  argTypes: {
    onBack: { action: 'back' },
  },
};

export default meta;
type Story = StoryObj<typeof MOBreadcrumb>;

export const WithBack: Story = {
  args: {
    items: [
      { label: 'Beneficiaries', href: '/member-online/beneficiaries' },
      { label: 'New binding nomination' },
    ],
  },
};

export const WithoutBack: Story = {
  args: {
    items: [
      { label: 'Beneficiaries', href: '/member-online/beneficiaries' },
      { label: 'New binding nomination' },
    ],
    onBack: undefined,
  },
};

export const MultiLevel: Story = {
  args: {
    items: [
      { label: 'Home', href: '/member-online' },
      { label: 'Beneficiaries', href: '/member-online/beneficiaries' },
      { label: 'Update nomination' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Beneficiaries' }],
  },
};
