import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextField, type TextFieldProps } from '../../components/TextField';
import { Icon } from '../../components/Icon';

const ADORNMENT_ICONS = ['magnifying-glass', 'lock', 'key', 'circle-info', 'circle-question', 'circle-check', 'xmark', 'circle-dollar'] as const;

type TextFieldStoryArgs = TextFieldProps & {
  showHelperText?: boolean;
  showStartAdornment?: boolean;
  startAdornmentIcon?: string;
  startAdornmentText?: string;
  showEndAdornment?: boolean;
  endAdornmentIcon?: string;
  endAdornmentText?: string;
};

const meta: Meta<TextFieldStoryArgs> = {
  title: 'Form Components / TextInput / TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
TextField is a single-line text input. Use it for free-text entry — names, emails, search queries, and other unstructured values.

For passwords, multi-line text, currency, percentages, or date of birth, use the purpose-built components in this group instead. They inherit TextField's styling automatically.
        `.trim(),
      },
    },
  },
  argTypes: {
    condensed: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'number', 'tel', 'url', 'search', 'date'] },
    size: { control: 'select', options: ['small', 'medium'] },
    errorMessage: { if: { arg: 'error', truthy: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    multiline: { table: { disable: true } },
    rows: { table: { disable: true } },
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
type Story = StoryObj<TextFieldStoryArgs>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  argTypes: {
    showHelperText: { control: 'boolean', name: 'helperText' },
    helperText: { table: { disable: true } },
    startAdornment: { table: { disable: true } },
    endAdornment: { table: { disable: true } },
    showStartAdornment: { control: 'boolean', name: 'startAdornment' },
    startAdornmentIcon: { control: 'select', options: ADORNMENT_ICONS, name: 'start icon', if: { arg: 'showStartAdornment', truthy: true } },
    startAdornmentText: { control: 'text', name: 'start text', if: { arg: 'showStartAdornment', truthy: true } },
    showEndAdornment: { control: 'boolean', name: 'endAdornment' },
    endAdornmentIcon: { control: 'select', options: ADORNMENT_ICONS, name: 'end icon', if: { arg: 'showEndAdornment', truthy: true } },
    endAdornmentText: { control: 'text', name: 'end text', if: { arg: 'showEndAdornment', truthy: true } },
  },
  args: {
    condensed: false,
    label: 'Label',
    placeholder: 'Placeholder text',
    type: 'text',
    size: 'medium',
    error: false,
    errorMessage: 'This field contains an error. Please check and try again.',
    required: false,
    disabled: false,
    showHelperText: false,
    showStartAdornment: false,
    startAdornmentIcon: 'magnifying-glass',
    startAdornmentText: '',
    showEndAdornment: false,
    endAdornmentIcon: 'circle-info',
    endAdornmentText: '',
  } as Story['args'] & {
    showHelperText: boolean;
    showStartAdornment: boolean;
    startAdornmentIcon: string;
    startAdornmentText: string;
    showEndAdornment: boolean;
    endAdornmentIcon: string;
    endAdornmentText: string;
  },
  render: (args) => {
    const {
      showHelperText,
      showStartAdornment, startAdornmentIcon, startAdornmentText,
      showEndAdornment, endAdornmentIcon, endAdornmentText,
      ...rest
    } = args as TextFieldProps & {
      showHelperText?: boolean;
      showStartAdornment?: boolean;
      startAdornmentIcon?: string;
      startAdornmentText?: string;
      showEndAdornment?: boolean;
      endAdornmentIcon?: string;
      endAdornmentText?: string;
    };

    const startAdornment = showStartAdornment
      ? (startAdornmentText ? <span>{startAdornmentText}</span> : <Icon icon={startAdornmentIcon ?? 'magnifying-glass'} size="lg" />)
      : undefined;

    const endAdornment = showEndAdornment
      ? (endAdornmentText ? <span>{endAdornmentText}</span> : <Icon icon={endAdornmentIcon ?? 'circle-info'} size="lg" />)
      : undefined;

    return (
      <div style={{ width: 320 }}>
        <TextField
          key={rest.type}
          {...rest}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          helperText={showHelperText ? 'Enter a value that matches the required format.' : undefined}
        />
      </div>
    );
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Standard text field with label and placeholder.',
      },
    },
  },
  args: { label: 'Username', placeholder: 'Enter username' },
};

export const NoLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "**Usage guidance:** Omit `label` when the surrounding context makes the field's purpose clear — search bars, inline edit fields, or table cell inputs.",
          '',
          '> **Placeholder contrast:** When no label is present, the placeholder is the only descriptor for the field. The component automatically renders it at a higher contrast (`text.secondary`, full opacity) in this case. Do not suppress or lighten placeholder text on unlabelled fields.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <TextField placeholder="Enter username" />
      <TextField type="email" placeholder="Enter email" />
      <TextField type="search" placeholder="Search..." />
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
          <TextField label="Small" size="small" placeholder="Small field" />
          <TextField label="Medium" size="medium" placeholder="Medium field" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Condensed</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TextField label="Small" size="small" condensed placeholder="Small condensed" />
          <TextField label="Medium" size="medium" condensed placeholder="Medium condensed" />
        </div>
      </div>
    </div>
  ),
};

export const Types: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `type` to trigger the correct keyboard on mobile and enable browser behaviour for that input type — email validation, numeric input, and so on. For passwords use `PasswordField`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <TextField label="Text" type="text" placeholder="Text input" />
      <TextField label="Email" type="email" placeholder="you@example.com" />
      <TextField label="Number" type="number" placeholder="0" />
      <TextField label="Search" type="search" placeholder="Search..." />
    </div>
  ),
};

export const WithAdornments: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `startAdornment` and `endAdornment` for icons, units, or action buttons. One adornment per side maximum.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <TextField label="Search" type="search" placeholder="Search..." startAdornment={<Icon icon="magnifying-glass" size="lg" />} />
      <TextField label="Password" type="password" placeholder="••••••••" startAdornment={<Icon icon="lock" size="lg" />} />
    </div>
  ),
};

export const HelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `helperText` for persistent guidance the user needs before typing — constraints, format hints, or context.',
      },
    },
  },
  args: { label: 'Username', placeholder: 'Enter username', helperText: 'Must be 3–20 characters.' },
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `error` when validation fails. Always pair with `helperText` to explain what went wrong.',
      },
    },
  },
  args: { label: 'Email', value: 'not-an-email', error: true, helperText: 'Enter a valid email address.' },
};

export const ErrorWithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `errorMessage` alongside `helperText` when you need both persistent context and a specific validation message on the same field. `helperText` shows in its normal position; `errorMessage` appears beneath it in red.',
      },
    },
  },
  args: {
    label: 'Username',
    value: 'ab',
    error: true,
    helperText: 'Must be 3–20 characters.',
    errorMessage: 'Username is too short.',
  },
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `required` to mark mandatory fields. The asterisk is visible; assistive technologies will also announce the requirement.',
      },
    },
  },
  args: { label: 'Full name', required: true, placeholder: 'Your full name' },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` when the field is not editable — for example, while a form is submitting or a value has been locked.',
      },
    },
  },
  args: { label: 'Disabled field', value: 'Cannot edit this', disabled: true },
};

