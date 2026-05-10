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
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    size: { control: 'select', options: ['small', 'medium'] },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: { label: 'Username', placeholder: 'Enter username' },
};

export const NoLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <TextField placeholder="Enter username" />
      <TextField type="email" placeholder="Enter email" />
      <TextField type="password" placeholder="Enter password" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <TextField label="Small" size="small" placeholder="Small field" />
      <TextField label="Medium" size="medium" placeholder="Medium field" />
    </div>
  ),
};

export const Types: Story = {
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
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <TextField label="Email" type="email" placeholder="you@example.com" startAdornment={<EmailIcon fontSize="small" />} />
      <TextField label="Search" type="search" placeholder="Search..." endAdornment={<SearchIcon fontSize="small" />} />
    </div>
  ),
};

export const HelperText: Story = {
  args: { label: 'Username', placeholder: 'Enter username', helperText: 'Must be 3–20 characters.' },
};

export const ErrorState: Story = {
  args: { label: 'Email', value: 'not-an-email', error: true, helperText: 'Enter a valid email address.' },
};

export const ErrorWithHelperText: Story = {
  args: {
    label: 'Username',
    value: 'ab',
    error: true,
    helperText: 'Must be 3–20 characters.',
    errorMessage: 'Username is too short.',
  },
};

export const Required: Story = {
  args: { label: 'Full name', required: true, placeholder: 'Your full name' },
};

export const Disabled: Story = {
  args: { label: 'Disabled field', value: 'Cannot edit this', disabled: true },
};

export const Specialized: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <DateOfBirthField />
      <MoneyField label="Amount" placeholder="0" />
      <PercentageField label="Rate" placeholder="0.00" />
    </div>
  ),
};

export const Multiline: Story = {
  args: { label: 'Notes', placeholder: 'Write your notes here...', multiline: true, rows: 4, fullWidth: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};
