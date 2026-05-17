import type { Meta, StoryObj } from '@storybook/react';
import { TextArea, type TextAreaProps } from '../../components/TextArea';

type TextAreaStoryArgs = TextAreaProps & { showHelperText?: boolean };

const meta: Meta<TextAreaStoryArgs> = {
  title: 'Form Components / TextInput / TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
TextArea is a multi-line text input. Use it for freeform content that may span multiple lines — notes, descriptions, addresses, and feedback.

Height is controlled by \`rows\`, not by size or condensed props. The \`size\` prop affects the label and font size only.

Do not use \`TextField multiline\` directly — use this component instead.
        `.trim(),
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    rows: { control: 'number' },
    errorMessage: { if: { arg: 'error', truthy: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
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
type Story = StoryObj<TextAreaStoryArgs>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: '' } },
  },
  argTypes: {
    showHelperText: { control: 'boolean', name: 'helperText' },
    helperText: { table: { disable: true } },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    size: 'medium',
    rows: 4,
    error: false,
    errorMessage: 'This field contains an error. Please check and try again.',
    required: false,
    disabled: false,
    showHelperText: false,
  } as Story['args'] & { showHelperText: boolean },
  render: (args) => {
    const { showHelperText, ...rest } = args as TextAreaProps & { showHelperText?: boolean };
    return (
      <div style={{ width: 400 }}>
        <TextArea
          {...rest}
          helperText={showHelperText ? 'Enter a value that matches the required format.' : undefined}
        />
      </div>
    );
  },
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Standard textarea with label. Height is set by `rows` (default 4).' } },
  },
  args: { label: 'Notes', placeholder: 'Write your notes here...' },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const Rows: Story = {
  parameters: {
    docs: { description: { story: '**Usage guidance:** Use `rows` to set the initial visible height. Choose based on the expected length of the content — short notes (2–3), medium descriptions (4–5), long content (6+).' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <TextArea label="Short (2 rows)" rows={2} placeholder="Brief note..." />
      <TextArea label="Default (4 rows)" rows={4} placeholder="Standard description..." />
      <TextArea label="Tall (6 rows)" rows={6} placeholder="Longer content..." />
    </div>
  ),
};

export const HelperText: Story = {
  parameters: {
    docs: { description: { story: '**Usage guidance:** Use `helperText` for character limits, format hints, or context the user needs before typing.' } },
  },
  args: { label: 'Bio', placeholder: 'Tell us about yourself...', helperText: 'Maximum 500 characters.' },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const ErrorState: Story = {
  parameters: {
    docs: { description: { story: '**Usage guidance:** Set `error` and `helperText` together to explain what went wrong.' } },
  },
  args: { label: 'Description', error: true, helperText: 'Description is required.' },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const Required: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  args: { label: 'Feedback', required: true, placeholder: 'Share your feedback...' },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: '' } },
  },
  args: { label: 'Notes', value: 'This content cannot be edited.', disabled: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};
