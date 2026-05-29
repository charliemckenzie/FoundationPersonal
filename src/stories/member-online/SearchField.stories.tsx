import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Stack from '@mui/material/Stack';
import { MemberSearchField } from '../..';

const meta: Meta<typeof MemberSearchField> = {
  title: 'Member Online / Target State / SearchField',
  component: MemberSearchField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Search input with leading magnifying-glass icon and an optional keyboard-shortcut hint. Two visual styles: `pill` (header) and `field` (rectangular form).',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['pill', 'field'] },
    shortcutHint: { control: 'text' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MemberSearchField>;

export const Default: Story = {
  args: { placeholder: 'Search', shortcutHint: '⌘ K' },
};

export const WithoutShortcut: Story = {
  args: { placeholder: 'Search' },
};

export const FieldVariant: Story = {
  args: { variant: 'field', placeholder: 'Search transactions' },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '20rem' }}>
      <MemberSearchField placeholder="Search" shortcutHint="⌘ K" />
      <MemberSearchField placeholder="Search" />
      <MemberSearchField variant="field" placeholder="Search transactions" fullWidth />
    </Stack>
  ),
};
