import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '../../components/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Form Components / Date / Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    minDate: { table: { disable: true } },
    maxDate: { table: { disable: true } },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return <Calendar {...args} value={value} onChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(new Date('2025-06-15'));
    return <Calendar {...args} value={value} onChange={setValue} />;
  },
};

export const WithConstraints: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        minDate={new Date('2025-01-01')}
        maxDate={new Date('2025-12-31')}
      />
    );
  },
};

export const Disabled: Story = {
  render: function Render(args) {
    return <Calendar {...args} value={new Date('2025-06-15')} onChange={() => undefined} />;
  },
  args: { disabled: true },
};
