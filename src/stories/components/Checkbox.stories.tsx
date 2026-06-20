import type { ComponentProps, ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../../components/Checkbox';

type CheckboxArgs = ComponentProps<typeof Checkbox> & {
  showHelperText: boolean;
  showDescription: boolean;
};

const meta: Meta<CheckboxArgs> = {
  title: 'Form Components / Checkbox / Checkbox',
  component: Checkbox as ComponentType<CheckboxArgs>,
  tags: ['autodocs'],
  decorators: [
    (Story, { args }) => {
      const { showHelperText, showDescription, ...rest } = args;
      return (
        <Story
          args={{
            ...rest,
            helperText: showHelperText ? rest.helperText : undefined,
            description: showDescription ? rest.description : undefined,
          }}
        />
      );
    },
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Checkbox supports two variants:

- \`default\` — a standard checkbox with label, helper text, and optional description. Use for binary choices in standard form layouts.
- \`boxed\` — a full-width bordered row. Use for settings lists or permission toggles where visual separation between options improves scannability.

For card tile multi-select groups use **CheckboxCardGroup**. For compact button-style multi-select groups use **CheckboxButtonGroup**.

All variants support \`error\`, \`disabled\`, and \`description\`. The \`indeterminate\` state is available on the default variant for parent-child selection patterns.
        `.trim(),
      },
    },
  },
  args: {
    label: 'Accept terms and conditions',
    variant: 'default',
    indeterminate: false,
    disabled: false,
    required: false,
    error: false,
    errorMessage: 'This field is required.',
    showHelperText: false,
    helperText: "We'll never share your details with anyone else.",
    showDescription: false,
    description: 'Additional context about this option.',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'boxed'] },
    label: { control: 'text' },
    icon: { table: { disable: true } },
    cardDirection: { table: { disable: true } },
    color: { table: { disable: true } },
    size: { table: { disable: true } },
    checked: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text', if: { arg: 'error', truthy: true } },
    showHelperText: { control: 'boolean' },
    helperText: { control: 'text', if: { arg: 'showHelperText', truthy: true } },
    helperTextPosition: { control: 'inline-radio', options: ['top', 'bottom'], if: { arg: 'showHelperText', truthy: true } },
    showDescription: { control: 'boolean' },
    description: { control: 'text', if: { arg: 'showDescription', truthy: true } },
    labelPlacement: { table: { disable: true } },
    onChange: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Standard checkbox with label. Use for binary choices — accepting terms, toggling a preference, or selecting an item in a list.',
      },
    },
  },
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled checked state.',
      },
    },
  },
  args: { label: 'Checked', checked: true },
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `indeterminate` when a parent checkbox represents a group where some — but not all — children are selected, such as a "Select all" control.',
      },
    },
  },
  args: { label: 'Partially selected', indeterminate: true },
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `helperText` for persistent guidance below the checkbox.',
      },
    },
  },
  args: { label: 'Subscribe to newsletter', helperText: 'We send one email per week, no spam.', showHelperText: true },
};

export const HelperTextTop: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Usage guidance:** Set `helperTextPosition="top"` to render the helper text above the checkbox row. ' +
          'Use it for descriptive guidance the member should read *before* ticking the box. ' +
          'The helper text stays linked to the checkbox via `aria-describedby` in both positions.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="body" component="p" sx={{ fontWeight: 700, mb: 0.25 }}>
        Will you be transferring $10,000 or more?
      </Typography>
      <Checkbox
        label="Yes, I'll be transferring $10,000 or more"
        helperText="A minimum transfer of $10,000 applies to open this account."
        helperTextPosition="top"
      />
    </Box>
  ),
};

export const ErrorStates: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `error` when validation fails. Use `helperText` for context. Add `errorMessage` when you need a separate validation message displayed beneath.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Error with helper text</p>
        <Checkbox label="Accept terms" error helperText="You must accept the terms to continue." />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Error with helper text and error message</p>
        <Checkbox label="Accept terms" error helperText="You must accept the terms before proceeding." errorMessage="This field is required." />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` when the checkbox cannot be interacted with in the current state.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `description` to add secondary text below the label — useful for explaining what checking the option does.',
      },
    },
  },
  args: { label: 'Subscribe to newsletter', description: 'We send one email per week. Unsubscribe any time.', showDescription: true },
};

export const Boxed: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `variant="boxed"` for settings-style lists where each row is a distinct, bordered option. Works with or without `description`. Use for multi-select scenarios where visual separation between options improves scannability.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Without description</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Checkbox variant="boxed" label="Email notifications" />
          <Checkbox variant="boxed" label="Email notifications" defaultChecked />
          <Checkbox variant="boxed" label="Email notifications" disabled />
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Checkbox variant="boxed" label="Email notifications" description="Receive updates about your account activity." />
          <Checkbox variant="boxed" label="SMS alerts" description="Get urgent alerts sent directly to your phone." defaultChecked />
          <Checkbox variant="boxed" label="Marketing emails" description="Offers, promotions, and product news." disabled />
        </div>
      </div>
    </div>
  ),
};
