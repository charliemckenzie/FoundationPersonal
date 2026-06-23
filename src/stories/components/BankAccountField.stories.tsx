import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BankAccountField } from '../../components/BankAccountField';
import {
  MOCK_SAVED_ACCOUNTS,
  MOCK_SAVED_ACCOUNTS_MANY,
  MOCK_SAVED_ACCOUNTS_SINGLE,
  mockVerifyAndAdd,
} from '../../components/BankAccountField/mockData';

const meta: Meta<typeof BankAccountField> = {
  title: 'Form Components / Bank Accounts / BankAccountField',
  component: BankAccountField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
BankAccountField is a composite form control for managing bank account selection and entry. Its behaviour is derived entirely from which props are provided — no mode prop required.

**Add only** (no \`savedAccounts\`): renders a BSB/account number/account name form with a "Verify and add" button. Use BSB starting with \`999\` to trigger a verification failure.

**Select from saved**: renders radio cards, one per account. Selecting a card calls \`onSelectAccount\`.

**Select + add**: renders cards plus a collapsible "Add a new account" panel.

**Full management**: cards with delete icons, add new, and a confirmation dialog before deletion.

All interactive elements support \`disabled\` to lock the control during submission or review steps.
        `.trim(),
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    savedAccounts: { table: { disable: true } },
    onSelectAccount: { table: { disable: true } },
    onVerifyAndAdd: { table: { disable: true } },
    onDeleteAccount: { table: { disable: true } },
    onEditAccount: { table: { disable: true } },
    onVerifyAndEdit: { table: { disable: true } },
    onAccountEdited: { table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BankAccountField>;

export const AddOnly: Story = {
  args: {
    onVerifyAndAdd: mockVerifyAndAdd,
  },
  parameters: {
    docs: {
      description: {
        story:
          'No saved accounts — only the add-new form is shown. Enter a BSB starting with `999` (e.g. `999-000`) and click "Verify and add" to see the inline verification failure message. Any other valid BSB succeeds.',
      },
    },
  },
};

export const SelectWithAdd: Story = {
  args: {
    savedAccounts: MOCK_SAVED_ACCOUNTS,
    onSelectAccount: () => {},
    onVerifyAndAdd: mockVerifyAndAdd,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Two saved accounts plus an "Add a new account" button. Clicking the button expands the add form inline. Focus moves to the first field automatically.',
      },
    },
  },
};

export const ManageableEdit: Story = {
  render: () => {
    const [accounts, setAccounts] = React.useState([...MOCK_SAVED_ACCOUNTS]);
    return (
      <div style={{ maxWidth: 480 }}>
        <BankAccountField
          savedAccounts={accounts}
          onVerifyAndEdit={async (_accountId, details) => mockVerifyAndAdd(details)}
          onAccountEdited={(accountId, details) =>
            setAccounts((prev) =>
              prev.map((a) => (a.id === accountId ? { ...a, ...details } : a))
            )
          }
          onDeleteAccount={(id) => setAccounts((prev) => prev.filter((a) => a.id !== id))}
          onVerifyAndAdd={mockVerifyAndAdd}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accounts rendered as non-selectable display boxes. Clicking the edit icon expands the card inline with pre-populated fields and a "Verify and save" button. Delete shows the confirmation dialog. A BSB starting with `999` triggers a verification failure.',
      },
    },
  },
};

export const SingleAccount: Story = {
  args: {
    savedAccounts: MOCK_SAVED_ACCOUNTS_SINGLE,
    onSelectAccount: () => {},
    onVerifyAndAdd: mockVerifyAndAdd,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: one saved account with both delete and add available. After deletion the list empties and focus moves to the "Add a new account" button.',
      },
    },
  },
};

export const ManyAccounts: Story = {
  args: {
    savedAccounts: MOCK_SAVED_ACCOUNTS_MANY,
    onSelectAccount: () => {},
    onVerifyAndAdd: mockVerifyAndAdd,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When there are more than 4 saved accounts the list switches to a Select dropdown. The radio variant is used for 4 or fewer accounts.',
      },
    },
  },
};

