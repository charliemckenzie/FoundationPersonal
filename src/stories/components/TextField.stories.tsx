import type { Meta, StoryObj } from '@storybook/react';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '../../components/TextField';
import { MoneyField } from '../../components/MoneyField';
import { PercentageField } from '../../components/PercentageField';
import { DateOfBirthField } from '../../components/DateOfBirthField';

const meta: Meta<typeof TextField> = {
  title: 'Form Components / TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
TextField is a single-line text input. Use it for free-text entry — names, emails, passwords, search queries, and other unstructured values.

**Specialised wrappers built on TextField:**
- \`MoneyField\` — currency input with formatting
- \`PercentageField\` — percentage input with formatting
- \`DateOfBirthField\` — date of birth split into day/month/year

Use these wrappers instead of \`TextField\` when the input type matches.
        `.trim(),
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    size: { control: 'select', options: ['small', 'medium'] },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    type: 'text',
    size: 'medium',
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
    multiline: false,
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
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
        story: "**Usage guidance:** Omit `label` when the surrounding context makes the field's purpose clear — search bars, inline edit fields, or table cell inputs.",
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <TextField placeholder="Enter username" />
      <TextField type="email" placeholder="Enter email" />
      <TextField type="password" placeholder="Enter password" />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** `small` reduces the input height. Use in dense layouts or compact forms. `medium` is the default.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <TextField label="Small" size="small" placeholder="Small field" />
      <TextField label="Medium" size="medium" placeholder="Medium field" />
    </div>
  ),
};

export const Types: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `type` to trigger the correct keyboard on mobile and enable browser behaviour for that input type — password masking, email validation, and numeric input.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <TextField label="Text" type="text" placeholder="Text input" />
      <TextField label="Email" type="email" placeholder="you@example.com" />
      <TextField label="Password" type="password" placeholder="••••••••" />
      <TextField label="Number" type="number" placeholder="0" />
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
      <TextField label="Email" type="email" placeholder="you@example.com" startAdornment={<EmailIcon fontSize="small" />} />
      <TextField label="Search" type="search" placeholder="Search..." endAdornment={<SearchIcon fontSize="small" />} />
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

export const Specialized: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use these purpose-built wrappers instead of `TextField` when the input type matches — they handle formatting, validation, and mobile UX automatically.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <DateOfBirthField />
      <MoneyField label="Amount" placeholder="0" />
      <PercentageField label="Rate" placeholder="0.00" />
    </div>
  ),
};

export const Multiline: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `multiline` and `rows` for freeform multi-line text. Use for notes, descriptions, or any content that may span multiple lines.',
      },
    },
  },
  args: { label: 'Notes', placeholder: 'Write your notes here...', multiline: true, rows: 4, fullWidth: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};
