import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BankDetailsField } from '../../components/BankDetailsField';

const meta: Meta<typeof BankDetailsField> = {
  title: 'Form Components / Bank Accounts / BankDetailsField',
  component: BankDetailsField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
BankDetailsField is a composite form control for capturing bank account details. It collects a BSB, account number, and account name as a single group.

When a valid BSB is entered, the matching bank name appears beneath the field as confirmation. All three fields validate independently and show individual error messages.
        `.trim(),
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    showValidation: { control: 'boolean' },
    onChange: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BankDetailsField>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Empty fields with no pre-filled values and no errors shown. The starting state for a new bank details entry.',
      },
    },
  },
};

export const WithValidation: Story = {
  args: { showValidation: true },
  parameters: {
    docs: {
      description: {
        story: 'All three fields are empty with validation active. Each field shows its error message, indicating required information is missing.',
      },
    },
  },
};

export const WithPrefill: Story = {
  args: {
    defaultValue: {
      bsb: '062-000',
      accountNumber: '12345678',
      accountName: 'Jane Smith',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'BSB 062-000 is recognised as Commonwealth Bank — the bank name appears beneath the BSB field as confirmation. All fields remain editable.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` when the bank details have been confirmed and should not be edited — for example, during submission or in a read-only review step.',
      },
    },
  },
};
