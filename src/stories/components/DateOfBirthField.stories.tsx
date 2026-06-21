import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DateOfBirthField } from '../../components/DateOfBirthField';

const meta: Meta<typeof DateOfBirthField> = {
  title: 'Form Components / TextInput / DateOfBirthField',
  component: DateOfBirthField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DateOfBirthField is a date input pre-configured for date of birth entry. The min is clamped to 1900-01-01 and the max is clamped to today.

Styling is inherited from TextField — visual changes to TextField apply here automatically.

**Behaviour:**
- Renders a native date picker with \`type="date"\`
- Restricts selectable dates to 1900-01-01 through today
- The label defaults to "Date of birth" but can be overridden
- On iOS, the native date picker renders as a wheel — height collapse is prevented via \`-webkit-date-and-time-value\`
        `.trim(),
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    condensed: { control: 'boolean' },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DateOfBirthField>;

export const Playground: Story = {
  parameters: { docs: { description: { story: '' } } },
  args: {
    label: 'Date of birth',
    size: 'medium',
    condensed: false,
    error: false,
    required: false,
    disabled: false,
  },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Date of birth field with default label and native date picker. Min is 1900-01-01; max is today.' } },
  },
  args: {},
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const CustomLabel: Story = {
  parameters: {
    docs: { description: { story: 'Override the default label when the field is used in a different context.' } },
  },
  args: { label: 'Director date of birth' },
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
          <DateOfBirthField label="Date of birth (small)" size="small" />
          <DateOfBirthField label="Date of birth (medium)" size="medium" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Condensed</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <DateOfBirthField label="Date of birth (small)" size="small" condensed />
          <DateOfBirthField label="Date of birth (medium)" size="medium" condensed />
        </div>
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  args: { error: true, helperText: 'Enter a valid date of birth.' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  args: { defaultValue: '1990-06-15', disabled: true },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};
