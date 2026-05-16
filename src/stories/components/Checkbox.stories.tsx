import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form Components / Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Accept terms and conditions',
    indeterminate: false,
    error: false,
  },
  argTypes: {
    label: { control: 'text' },
    color: { table: { disable: true } },
    size: { table: { disable: true } },
    checked: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    labelPlacement: { table: { disable: true } },
    onChange: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { label: 'Checked', checked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Partially selected', indeterminate: true },
};

export const WithHelperText: Story = {
  args: { label: 'Subscribe to newsletter', helperText: 'We send one email per week, no spam.' },
};

export const ErrorStates: Story = {
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
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const WithDescription: Story = {
  args: { label: 'Subscribe to newsletter', description: 'We send one email per week. Unsubscribe any time.' },
};

export const Boxed: Story = {
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

export const Card: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Without description</p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
          <Checkbox variant="card" label="Savings" icon="piggy-bank" />
          <Checkbox variant="card" label="Investment" icon="chart-line" defaultChecked />
          <Checkbox variant="card" label="Insurance" icon="umbrella" disabled />
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
          <Checkbox variant="card" label="Savings" description="Grow your balance" icon="piggy-bank" />
          <Checkbox variant="card" label="Investment" description="Build long-term wealth" icon="chart-line" defaultChecked />
          <Checkbox variant="card" label="Insurance" description="Protect what matters" icon="umbrella" />
        </div>
      </div>
    </div>
  ),
};

export const CardLeft: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Without description</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
          <Checkbox variant="card" cardDirection="left" label="Savings" icon="piggy-bank" />
          <Checkbox variant="card" cardDirection="left" label="Investment" icon="chart-line" defaultChecked />
          <Checkbox variant="card" cardDirection="left" label="Insurance" icon="umbrella" disabled />
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
          <Checkbox variant="card" cardDirection="left" label="Savings" description="Grow your balance" icon="piggy-bank" />
          <Checkbox variant="card" cardDirection="left" label="Investment" description="Build long-term wealth" icon="chart-line" defaultChecked />
          <Checkbox variant="card" cardDirection="left" label="Insurance" description="Protect what matters" icon="umbrella" />
        </div>
      </div>
    </div>
  ),
};
