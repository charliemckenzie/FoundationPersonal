import type { Meta, StoryObj } from '@storybook/react';
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
import Box from '@mui/material/Box';
import { Button } from '../../../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components / Buttons / Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { 
    layout: 'centered',
    docs: {
      description: {
        component: `Primary action component for user interactions.

## Variants

**Contained** — highest emphasis, primary actions  
**Soft** — medium emphasis, secondary actions  
**Outlined** — low-medium emphasis, less prominent actions  
**Ghost** — lowest emphasis, tertiary actions or inline with text

## When to Use Each Variant

Use **contained** for the primary action in a view (submit, save, confirm).  
Use **soft** for important but not primary actions (cancel, back, alternative paths).  
Use **outlined** for secondary actions that need definition (filters, non-destructive edits).  
Use **ghost** for tertiary actions or when sitting on coloured backgrounds.

## Color Semantics

**Primary** — default for most actions  
**Secondary** — alternative actions, brand variety  
**Error** — destructive actions (delete, remove, cancel subscription)  
**Warning** — caution actions (proceed with risk, override)  
**Info** — informational actions (learn more, view details)  
**Success** — confirmations (approve, publish, complete)

## Reversed Usage

Use \`reversed\` when placing buttons on coloured backgrounds (\`background.brandPrimary\`, \`background.brandSecondary\`, or custom brand surfaces).

Reversed buttons render in white/light tones optimised for dark backgrounds. All variants (contained, soft, outlined, ghost) support reversed mode.

## Loading States

**Spinner only** (\`loading\`, default): Label hidden, spinner centered. Use for single-action contexts where the button label is clear from context.  
**Spinner with label** (\`loading hideLoadingText={false}\`): Spinner replaces start icon, label visible. Use for multi-step flows or when the action needs reinforcement.`,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const bgType = context.globals.backgroundColor || 'default';
      return (
        <Box sx={{ bgcolor: `background.${bgType}`, p: 3, minWidth: 200 }}>
          <Story />
        </Box>
      );
    },
  ],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'ghost', 'soft'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    reversed: { control: 'boolean' },
    onClick: { table: { disable: true } },
    type: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { label: 'Button' },
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Contained" variant="contained" />
      <Button label="Soft" variant="soft" />
      <Button label="Outlined" variant="outlined" />
      <Button label="Ghost" variant="ghost" />
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Small" size="small" />
      <Button label="Medium" size="medium" />
      <Button label="Large" size="large" />
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Primary" color="primary" />
      <Button label="Error" color="error" />
    </Box>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Add Item" startIcon={faPlus} />
      <Button label="Delete" endIcon={faTrash} color="error" variant="outlined" />
    </Box>
  ),
};

export const Loading: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600 }}>Spinner Only (default)</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button label="Primary" variant="contained" color="primary" loading />
          <Button label="Primary" variant="soft" color="primary" loading />
          <Button label="Primary" variant="ghost" color="primary" loading />
          <Button label="Primary" variant="outlined" color="primary" loading />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600 }}>With Label (hideLoadingText=false)</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button label="Saving..." variant="contained" color="primary" loading hideLoadingText={false} />
          <Button label="Saving..." variant="soft" color="primary" loading hideLoadingText={false} />
          <Button label="Saving..." variant="ghost" color="primary" loading hideLoadingText={false} />
          <Button label="Saving..." variant="outlined" color="primary" loading hideLoadingText={false} />
        </Box>
      </Box>
    </Box>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Contained" variant="contained" disabled />
      <Button label="Soft" variant="soft" disabled />
      <Button label="Outlined" variant="outlined" disabled />
      <Button label="Ghost" variant="ghost" disabled />
    </Box>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Box sx={{ width: 320 }}>
      <Button label="Full Width Button" fullWidth />
    </Box>
  ),
};

function ReversedShowcase() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        p: 6,
        bgcolor: 'background.brandPrimary',
      }}
    >
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Variants</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Contained" variant="contained" reversed />
          <Button label="Soft" variant="soft" reversed />
          <Button label="Outlined" variant="outlined" reversed />
          <Button label="Ghost" variant="ghost" reversed />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Sizes</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Small" variant="contained" size="small" reversed />
          <Button label="Medium" variant="contained" size="medium" reversed />
          <Button label="Large" variant="contained" size="large" reversed />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Disabled</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Contained" variant="contained" reversed disabled />
          <Button label="Soft" variant="soft" reversed disabled />
          <Button label="Outlined" variant="outlined" reversed disabled />
          <Button label="Ghost" variant="ghost" reversed disabled />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Loading — Spinner Only (default)</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Primary" variant="contained" reversed loading />
          <Button label="Primary" variant="soft" reversed loading />
          <Button label="Primary" variant="ghost" reversed loading />
          <Button label="Primary" variant="outlined" reversed loading />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Loading — With Label</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Saving..." variant="contained" reversed loading hideLoadingText={false} />
          <Button label="Saving..." variant="soft" reversed loading hideLoadingText={false} />
          <Button label="Saving..." variant="ghost" reversed loading hideLoadingText={false} />
          <Button label="Saving..." variant="outlined" reversed loading hideLoadingText={false} />
        </Box>
      </Box>
    </Box>
  );
}

export const OnPrimaryBackground: Story = {
  name: 'Reversed — On Primary Background',
  parameters: { layout: 'fullscreen' },
  render: () => <ReversedShowcase />,
};
