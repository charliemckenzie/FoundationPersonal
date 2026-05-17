import type { Meta, StoryObj } from '@storybook/react';
import { MoneyField } from '../../components/MoneyField';

const meta: Meta<typeof MoneyField> = {
  title: 'Form Components / TextInput / MoneyField',
  component: MoneyField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
MoneyField is a currency input with automatic thousand-separator formatting and two-decimal normalisation on blur.

Styling is inherited from TextField — visual changes to TextField apply here automatically.

**Behaviour:**
- Formats the integer part with comma separators as the user types
- On blur, normalises to two decimal places (e.g. \`1234\` → \`1,234.00\`)
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
type Story = StoryObj<typeof MoneyField>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { docs: { description: { story: '' } } },
  args: {
    label: 'Amount',
    placeholder: '0',
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
    docs: { description: { story: 'Type a number and tab away — the field formats to two decimal places on blur.' } },
  },
  args: { label: 'Amount', placeholder: '0' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const WithDefaultValue: Story = {
  parameters: {
    docs: { description: { story: 'Use `defaultValue` (numeric) to pre-populate the field. The value is formatted on mount.' } },
  },
  args: { label: 'Balance', defaultValue: 1234567.89 },
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
          <MoneyField label="Small" size="small" placeholder="0" />
          <MoneyField label="Medium" size="medium" placeholder="0" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Condensed</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MoneyField label="Small" size="small" condensed placeholder="0" />
          <MoneyField label="Medium" size="medium" condensed placeholder="0" />
        </div>
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  args: { label: 'Amount', error: true, helperText: 'Enter a valid dollar amount.' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  args: { label: 'Amount', defaultValue: 500, disabled: true },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};
