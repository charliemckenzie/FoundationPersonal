import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { TextField } from '../../components/TextField';
import { MoneyField } from '../../components/MoneyField';
import { PercentageField } from '../../components/PercentageField';
import Box from '@mui/material/Box';

const meta: Meta = {
  title: 'Form Components / TextInput / InputSelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A unified input field with an attached select dropdown. Pass the \`selectAdornment\` prop to TextField, MoneyField, or PercentageField to render a combined input + select control sharing a single border.
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

// --- TextField + Select (Duration) ---

export const Duration: StoryObj = {
  render: function DurationStory() {
    const [unit, setUnit] = useState('years');
    return (
      <TextField
        label="Duration"
        defaultValue="10"
        selectAdornment={{
          label: 'Unit',
          options: [
            { value: 'years', label: 'Years' },
            { value: 'months', label: 'Months' },
            { value: 'weeks', label: 'Weeks' },
          ],
          value: unit,
          onChange: setUnit,
        }}
      />
    );
  },
};

// --- MoneyField + Select (Contribution frequency) ---

export const MoneyWithFrequency: StoryObj = {
  name: 'Money + Frequency',
  render: function MoneyFrequencyStory() {
    const [frequency, setFrequency] = useState('weekly');
    return (
      <MoneyField
        label="Contribution"
        defaultValue={100}
        selectAdornment={{
          label: 'Frequency',
          options: [
            { value: 'weekly', label: 'Weekly' },
            { value: 'fortnightly', label: 'Fortnightly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'annually', label: 'Annually' },
          ],
          value: frequency,
          onChange: setFrequency,
        }}
      />
    );
  },
};

// --- PercentageField + Select (Rate type) ---

export const PercentageWithType: StoryObj = {
  name: 'Percentage + Type',
  render: function PercentageTypeStory() {
    const [rateType, setRateType] = useState('percent');
    return (
      <PercentageField
        label="Interest rate"
        defaultValue={7.5}
        selectAdornment={{
          label: 'Rate type',
          options: [
            { value: 'percent', label: 'Percent' },
            { value: 'basis', label: 'Basis pts' },
          ],
          value: rateType,
          onChange: setRateType,
        }}
      />
    );
  },
};

// --- States ---

export const ErrorState: StoryObj = {
  name: 'Error State',
  render: function ErrorStory() {
    const [unit, setUnit] = useState('years');
    return (
      <TextField
        label="Duration"
        defaultValue="0"
        error
        errorMessage="Duration must be greater than zero"
        selectAdornment={{
          label: 'Unit',
          options: [
            { value: 'years', label: 'Years' },
            { value: 'months', label: 'Months' },
          ],
          value: unit,
          onChange: setUnit,
        }}
      />
    );
  },
};

export const Disabled: StoryObj = {
  render: function DisabledStory() {
    return (
      <TextField
        label="Duration"
        defaultValue="10"
        disabled
        selectAdornment={{
          label: 'Unit',
          options: [
            { value: 'years', label: 'Years' },
            { value: 'months', label: 'Months' },
          ],
          value: 'years',
          onChange: () => {},
        }}
      />
    );
  },
};

export const SmallSize: StoryObj = {
  name: 'Small Size',
  render: function SmallSizeStory() {
    const [unit, setUnit] = useState('months');
    return (
      <TextField
        label="Duration"
        defaultValue="6"
        size="small"
        selectAdornment={{
          label: 'Unit',
          options: [
            { value: 'years', label: 'Years' },
            { value: 'months', label: 'Months' },
          ],
          value: unit,
          onChange: setUnit,
        }}
      />
    );
  },
};

// --- Edge cases ---

export const WithPlaceholder: StoryObj = {
  name: 'Placeholder (no selection)',
  render: function PlaceholderStory() {
    const [unit, setUnit] = useState('');
    return (
      <TextField
        label="Duration"
        defaultValue="10"
        selectAdornment={{
          label: 'Unit',
          options: [
            { value: 'years', label: 'Years' },
            { value: 'months', label: 'Months' },
            { value: 'weeks', label: 'Weeks' },
          ],
          value: unit,
          onChange: setUnit,
          placeholder: 'Select unit',
        }}
      />
    );
  },
};

export const WithDisabledOption: StoryObj = {
  name: 'Disabled Option',
  render: function DisabledOptionStory() {
    const [freq, setFreq] = useState('monthly');
    return (
      <MoneyField
        label="Contribution"
        defaultValue={250}
        selectAdornment={{
          label: 'Frequency',
          options: [
            { value: 'weekly', label: 'Weekly' },
            { value: 'fortnightly', label: 'Fortnightly', disabled: true },
            { value: 'monthly', label: 'Monthly' },
            { value: 'annually', label: 'Annually' },
          ],
          value: freq,
          onChange: setFreq,
        }}
      />
    );
  },
};

export const Uncontrolled: StoryObj = {
  name: 'Uncontrolled',
  render: function UncontrolledStory() {
    return (
      <TextField
        label="Duration"
        defaultValue="5"
        selectAdornment={{
          label: 'Unit',
          options: [
            { value: 'years', label: 'Years' },
            { value: 'months', label: 'Months' },
          ],
          defaultValue: 'years',
        }}
      />
    );
  },
};
