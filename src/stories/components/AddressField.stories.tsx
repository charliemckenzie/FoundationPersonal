import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AddressField, mockAddressProvider } from '../../components/AddressField';

const meta: Meta<typeof AddressField> = {
  title: 'Form Components / AddressField',
  component: AddressField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
AddressField is a composite form control for capturing physical addresses. It supports Australian and international addresses in the same field, with an optional postal address section.

Pass \`addressLookup\` with an address provider to enable autocomplete search for Australian addresses. When a match is selected the full form is pre-filled and remains editable. International addresses are unaffected by autocomplete.
        `.trim(),
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    defaultHasPostalAddress: { control: 'boolean' },
    onChange: { table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof AddressField>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Australian address selected by default. Switch to "Outside Australia" to see the international form with country search and generic address fields.',
      },
    },
  },
};

export const WithPostalAddress: Story = {
  args: { defaultHasPostalAddress: true },
  parameters: {
    docs: {
      description: {
        story: 'Postal address section opens when "I have a different postal address" is checked. Each section independently supports Australian and international addresses.',
      },
    },
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` when the address has been confirmed and should not be edited — for example, during submission or in a read-only review step.',
      },
    },
  },
  args: { disabled: true },
};

export const WithAutocomplete: Story = {
  args: {
    addressLookup: { provider: mockAddressProvider },
  },
  parameters: {
    docs: {
      description: {
        story: 'Australian addresses can be looked up via an autocomplete search. Type at least 2 characters to see results. Selecting an address expands the full form pre-filled and editable. "Can\'t find your address?" falls back to manual entry. International addresses are unaffected.',
      },
    },
  },
};
