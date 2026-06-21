import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PasswordField, type PasswordFieldProps } from '../../components/PasswordField';
import { Icon } from '../../components/Icon';

type PasswordFieldStoryArgs = PasswordFieldProps & { showHelperText?: boolean };

const meta: Meta<PasswordFieldStoryArgs> = {
  title: 'Form Components / TextInput / PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
PasswordField is a password input with a built-in show/hide toggle. Use it wherever a user needs to enter a password or sensitive value.

The show/hide toggle is always present and cannot be removed — it is a core accessibility and usability requirement. The toggle label updates for screen readers as state changes.

Do not use \`TextField type="password"\` directly — use this component instead.
        `.trim(),
      },
    },
  },
  argTypes: {
    condensed: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium'] },
    errorMessage: { if: { arg: 'error', truthy: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    htmlInputProps: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    autoComplete: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<PasswordFieldStoryArgs>;

export const Playground: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  argTypes: {
    showHelperText: { control: 'boolean', name: 'helperText' },
    helperText: { table: { disable: true } },
    startAdornment: { table: { disable: true } },
  },
  args: {
    condensed: false,
    label: 'Password',
    placeholder: '••••••••',
    size: 'medium',
    error: false,
    errorMessage: 'This field contains an error. Please check and try again.',
    required: false,
    disabled: false,
    showHelperText: false,
  } as Story['args'] & { showHelperText: boolean },
  render: (args) => {
    const { showHelperText, ...rest } = args as PasswordFieldProps & { showHelperText?: boolean };
    return (
      <div style={{ width: 320 }}>
        <PasswordField
          {...rest}
          helperText={showHelperText ? 'Use at least 8 characters, including a number and a symbol.' : undefined}
        />
      </div>
    );
  },
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Password field with label. The show/hide toggle is always present.' } },
  },
  args: { label: 'Password', placeholder: '••••••••' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const WithStartAdornment: Story = {
  parameters: {
    docs: { description: { story: '**Usage guidance:** Use `startAdornment` to reinforce the field purpose with an icon. The end adornment is reserved for the show/hide toggle.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <PasswordField label="Password" placeholder="••••••••" startAdornment={<Icon icon="lock" size="lg" />} />
      <PasswordField label="Confirm password" placeholder="••••••••" startAdornment={<Icon icon="key" size="lg" />} />
    </div>
  ),
};

export const NoLabel: Story = {
  parameters: {
    docs: { description: { story: 'When no label is present the placeholder renders at higher contrast automatically. Prefer a visible label wherever possible.' } },
  },
  render: () => (
    <div style={{ width: 320 }}>
      <PasswordField placeholder="Enter password" />
    </div>
  ),
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
          <PasswordField label="Small" size="small" placeholder="••••••••" />
          <PasswordField label="Medium" size="medium" placeholder="••••••••" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Condensed</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PasswordField label="Small" size="small" condensed placeholder="••••••••" />
          <PasswordField label="Medium" size="medium" condensed placeholder="••••••••" />
        </div>
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  parameters: {
    docs: { description: { story: '**Usage guidance:** Set `error` and `helperText` together — the helper text explains what went wrong.' } },
  },
  args: { label: 'Password', error: true, helperText: 'Password must be at least 8 characters.' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'The show/hide toggle is also disabled when the field is disabled.' } },
  },
  args: { label: 'Password', value: 'hidden-value', disabled: true },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
