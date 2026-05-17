import type { Meta, StoryObj } from '@storybook/react';
import { PercentageField } from '../../components/PercentageField';

const meta: Meta<typeof PercentageField> = {
  title: 'Form Components / TextInput / PercentageField',
  component: PercentageField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
PercentageField is a numeric input clamped to 0–100. It validates on change and normalises to two decimal places on blur.

Styling is inherited from TextField — visual changes to TextField apply here automatically.

**Behaviour:**
- Accepts numeric input with up to two decimal places
- Shows an inline error if the value exceeds 100 while typing
- On blur, clamps to 0–100 and normalises to two decimal places (e.g. \`75\` → \`75.00\`)
- Emits the numeric value via \`onChange\` (not the formatted string)
- Emits \`null\` when the field is cleared
        `.trim(),
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    condensed: { control: 'boolean' },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof PercentageField>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { docs: { description: { story: '' } } },
  args: {
    label: 'Rate',
    placeholder: '0.00',
    size: 'medium',
    condensed: false,
    error: false,
    required: false,
    disabled: false,
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Type a number and tab away — the field normalises to two decimal places on blur. Entering a value over 100 shows an inline error.' } },
  },
  args: { label: 'Rate', placeholder: '0.00' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const WithDefaultValue: Story = {
  parameters: {
    docs: { description: { story: 'Use `defaultValue` (numeric, 0–100) to pre-populate the field.' } },
  },
  args: { label: 'Allocation', defaultValue: 33.5 },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Two sizes cover the full range of layout needs.',
          '',
          '| Size | Default height | Condensed height |',
          '|------|---------------|-----------------|',
          '| Small | 40px | 36px |',
          '| Medium | 48px | 44px |',
          '',
          '**Default** — use in standard form layouts, dialogs, and standalone inputs.',
          '',
          '**Condensed** — use in dense interfaces: data tables, filter bars, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not substitute a smaller size tier to save space.',
          '',
          '> **iOS zoom:** Input font size is fixed at `1rem` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Default</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PercentageField label="Small" size="small" placeholder="0.00" />
          <PercentageField label="Medium" size="medium" placeholder="0.00" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Condensed</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PercentageField label="Small" size="small" condensed placeholder="0.00" />
          <PercentageField label="Medium" size="medium" condensed placeholder="0.00" />
        </div>
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  args: { label: 'Rate', error: true, helperText: 'Enter a percentage between 0 and 100.' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  args: { label: 'Rate', defaultValue: 25, disabled: true },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};
