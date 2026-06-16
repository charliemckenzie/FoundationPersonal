import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { Button } from '../../../components/Button';
import { BUTTON_ICON_OPTIONS } from '../../constants/buttonIcons';

const meta = {
  title: 'Components / Buttons / Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { 
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary action component with contained, outlined, and ghost variants. Includes loading, disabled, size, color, icon, and reversed-on-brand-background examples.',
      },
    },
  },
  argTypes: {
    label:           { control: 'text' },
    variant:         { control: 'select', options: ['contained', 'outlined', 'ghost'] },
    size:            { control: 'select', options: ['small', 'medium', 'large'] },
    condensed:       { control: 'boolean', description: 'Reduces height by 4px across all sizes. Use in dense layouts where vertical space is limited.' },
    color:           { control: 'select', options: ['primary', 'white', 'success'] },
    disabled:        { control: 'boolean' },
    loading:         { control: 'boolean' },
    hideLoadingText: { control: 'boolean' },
    fullWidth:       { control: 'boolean' },
    reversed:        { control: 'boolean' },
    startIcon:       { control: 'select', options: ['', ...BUTTON_ICON_OPTIONS], description: 'Leading icon' },
    endIcon:         { control: 'select', options: ['', ...BUTTON_ICON_OPTIONS], description: 'Trailing icon' },
    onClick:         { table: { disable: true } },
    type:            { table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    disabled: false,
    loading: false,
    hideLoadingText: true,
    fullWidth: false,
    reversed: false,
    condensed: false,
    startIcon: '',
    endIcon: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'The interactive playground. Use the controls panel to explore every prop combination. **Condensed** is surfaced at the top of the controls panel — toggle it to preview the 4px height reduction.',
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '**Contained** — highest visual weight. Use for the single primary action on a screen. One per view.',
          '',
          '**Outlined** — medium-low weight. Use when the action is important but should not compete with contained buttons. 1px border at full opacity.',
          '',
          '**Ghost** — lowest weight. Use for tertiary actions, cancellation, or destructive flows where de-emphasis is intentional.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Contained" variant="contained" />
      <Button label="Outlined" variant="outlined" />
      <Button label="Ghost" variant="ghost" />
    </Box>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Three sizes cover the full range of layout needs.',
          '',
          '| Size | Default height | Condensed height |',
          '|------|---------------|-----------------|',
          '| Small | 40px | 36px |',
          '| Medium | 48px | 44px |',
          '| Large | 56px | 52px |',
          '',
          '**Default** — use in standard form layouts, cards, and dialogs.',
          '',
          '**Condensed** — use in dense interfaces: data tables, toolbars, inline actions, and anywhere vertical rhythm is tight. Apply `condensed` prop; do not reduce size by choosing a smaller size tier.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Default</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button label="Small" size="small" />
          <Button label="Medium" size="medium" />
          <Button label="Large" size="large" />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Condensed</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button label="Small" size="small" condensed />
          <Button label="Medium" size="medium" condensed />
          <Button label="Large" size="large" condensed />
        </Box>
      </Box>
    </Box>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Icons reinforce meaning — they never replace the label.',
          '',
          '**Start icon** — use when the icon previews the action (e.g. `plus` before "Add item", `arrow-down-to-line` before "Download").',
          '',
          '**End icon** — use for direction or consequence (e.g. `arrow-right` after "Next", `arrow-up-right` to signal leaving the site).',
          '',
          'Do not use both a start and end icon on the same button.',
          '',
          '---',
          '',
          '**Decorative vs meaningful icons**',
          '',
          'Most button icons are decorative — the label already communicates everything and the icon simply reinforces it visually. These are correctly hidden from screen readers (`aria-hidden`).',
          '',
          'Some icons carry information that is not present in the label — for example, `arrow-up-right` communicating that a link opens in a new tab. When the icon adds meaning, use `endIconLabel` or `startIconLabel` to describe what it communicates. The description is appended to the button\'s accessible name: *"Find out more, opens in a new tab"*.',
          '',
          'Rule of thumb: if removing the icon would change what a sighted user understands about the action, it needs a label.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Sizes with icons</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Small" size="small" startIcon="plus" />
          <Button label="Medium" size="medium" startIcon="plus" />
          <Button label="Large" size="large" startIcon="plus" />
        </Box>
      </Box>

      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Common patterns</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Add item"          startIcon="plus" />
          <Button label="Download"          startIcon="arrow-down-to-line" />
          <Button label="Upload"            startIcon="arrow-up-from-line" />
          <Button label="Copy"              startIcon="copy" />
          <Button label="Next"              endIcon="arrow-right" />
          <Button label="Complete online"   endIcon="arrow-right-to-bracket" />
          <Button label="Will leave site"   endIcon="arrow-up-right" />
          <Button label="Open menu"         endIcon="chevron-down" />
          <Button label="More"              endIcon="ellipsis" />
        </Box>
      </Box>

      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Meaningful icons</Box>
        <Box sx={{ mb: 1.5, typography: 'small', color: 'text.muted' }}>
          These icons convey information not present in the visible label. Use <code>endIconLabel</code> or <code>startIconLabel</code> so screen readers announce the full meaning.
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Find out more"   endIcon="arrow-up-right" endIconLabel="opens in a new tab" />
          <Button label="View on map"     endIcon="arrow-up-right" endIconLabel="opens in a new tab" />
          <Button label="Visit website"   endIcon="arrow-up-right" endIconLabel="opens in a new tab" />
        </Box>
      </Box>

    </Box>
  ),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Button ships two colors. Semantic colors are deliberately restricted — most actions are brand-primary.',
          '',
          '**Primary** (default) — the brand color. Use for almost every action.',
          '',
          '**Success** — reserved for positive/confirmation actions, typically inside a success surface (e.g. a "Calculate" affordance within a success-tinted callout). Do not use it as a generic alternative to primary.',
          '',
          'No other semantic colors (error, warning, info) are supported — destructive and cautionary intent is communicated through copy and surrounding context, not button color.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Primary</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button label="Contained" variant="contained" color="primary" />
          <Button label="Outlined" variant="outlined" color="primary" />
          <Button label="Ghost" variant="ghost" color="primary" />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Success</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button label="Contained" variant="contained" color="success" />
          <Button label="Outlined" variant="outlined" color="success" />
          <Button label="Ghost" variant="ghost" color="success" />
        </Box>
      </Box>
    </Box>
  ),
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Use the loading state to give feedback during async operations (form submission, data fetch, file upload).',
          '',
          '**Spinner only** (`hideLoadingText={true}`, default) — button width stays fixed and the label is replaced by a centred spinner. Prevents layout shift.',
          '',
          '**With label** (`hideLoadingText={false}`) — spinner appears as the start icon alongside the label. Use when the action label (e.g. "Saving…") provides useful context.',
          '',
          'While loading, the button ignores click events. Do not also set `disabled` — the loading state is self-contained.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600 }}>Spinner Only (default)</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button label="Primary" variant="contained" color="primary" loading />
          <Button label="Primary" variant="outlined" color="primary" loading />
          <Button label="Primary" variant="ghost" color="primary" loading />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600 }}>With Label (hideLoadingText=false)</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button label="Saving..." variant="contained" color="primary" loading hideLoadingText={false} />
          <Button label="Saving..." variant="outlined" color="primary" loading hideLoadingText={false} />
          <Button label="Saving..." variant="ghost" color="primary" loading hideLoadingText={false} />
        </Box>
      </Box>
    </Box>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Disabled buttons are a last resort. They give users no indication of why an action is unavailable.',
          '',
          'Prefer: showing the button in its active state and surfacing a validation message when the user attempts the action.',
          '',
          'If you must disable: ensure a visible explanation is present nearby (e.g. a form error summary, a tooltip on the disabled button, or inline helper text).',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Contained" variant="contained" disabled />
      <Button label="Outlined" variant="outlined" disabled />
      <Button label="Ghost" variant="ghost" disabled />
    </Box>
  ),
};

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `fullWidth` in single-column mobile layouts, form footers, and modal actions where the button should span the container. Avoid in desktop layouts with wide containers — a 600px button is not a button, it is a banner.',
      },
    },
  },
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
        bgcolor: 'background.brandSecondary',
      }}
    >
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Variants</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Contained" variant="contained" reversed />
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
          <Button label="Outlined" variant="outlined" reversed disabled />
          <Button label="Ghost" variant="ghost" reversed disabled />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Loading — Spinner Only (default)</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Primary" variant="contained" reversed loading />
          <Button label="Primary" variant="outlined" reversed loading />
          <Button label="Primary" variant="ghost" reversed loading />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Loading — With Label</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button label="Saving..." variant="contained" reversed loading hideLoadingText={false} />
          <Button label="Saving..." variant="outlined" reversed loading hideLoadingText={false} />
          <Button label="Saving..." variant="ghost" reversed loading hideLoadingText={false} />
        </Box>
      </Box>
    </Box>
  );
}

export const OnSecondaryBackground: Story = {
  name: 'Reversed — On Secondary Background',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: [
          'Use `reversed` when buttons sit on a brand-coloured background (hero banners, coloured cards, branded headers).',
          '',
          'All variants adapt: contained becomes white-fill, outlined uses a white border, and ghost uses a white-tinted background.',
          '',
          'Do not use reversed on neutral or light backgrounds — the contrast assumptions are inverted and accessibility will fail.',
        ].join('\n'),
      },
    },
  },
  render: () => <ReversedShowcase />,
};
