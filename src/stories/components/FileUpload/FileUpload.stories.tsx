import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../../../components/FileUpload';

const SHARED_ARGS = {
  accept: '.jpg,.jpeg,.png,.pdf,.doc,.docx',
  maxSizeMB: 20,
  description: 'JPEG, PNG, PDF, DOC and DOCX formats, up to 20 MB.',
};

function mockFile(name: string, sizeKB: number, type: string): File {
  return new File([new Uint8Array(sizeKB * 1024)], name, { type });
}

const meta: Meta<typeof FileUpload> = {
  title: 'Form Components / FileUpload / FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
FileUpload is a drag-and-drop file input with click-to-browse, file list preview, and built-in validation.

**Behaviour:**
- Click anywhere in the zone or the Browse button to open the system file picker
- Drag files onto the drop zone — the border highlights on entry
- Selected files appear below the zone as FileCards with name, size, and a remove button
- \`onChange\` fires with the current valid \`File[]\` after every add or remove
- Invalid files (wrong type or too large) are rejected and an error is shown — they are not added to the list
- \`error\` (string) overrides internal validation errors

**Validation:**
- \`accept\` — passed to the \`<input>\` for the picker; also validated on drag-drop
- \`maxSizeMB\` — files over the limit are rejected before \`onChange\` fires
- \`description\` — human-readable format and size hint; always provide alongside \`accept\` and \`maxSizeMB\`

**Upload state:**
- \`uploadProgress\` — map of filename → 0–100; drives the FileCard progress bar
- \`uploadError\` — map of filename → error message; switches the FileCard to error state
        `.trim(),
      },
    },
  },
  args: SHARED_ARGS,
  argTypes: {
    accept:         { control: 'text' },
    maxSizeMB:      { control: 'number' },
    multiple:       { control: 'boolean' },
    description:    { control: 'text' },
    error:          { control: 'text' },
    helperText:     { control: 'text' },
    disabled:       { control: 'boolean' },
    defaultFiles:   { table: { disable: true } },
    uploadProgress: { table: { disable: true } },
    uploadError:    { table: { disable: true } },
    onChange:       { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { docs: { description: { story: '' } } },
  args: { multiple: false, disabled: false },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Single file. `description` always shows accepted formats and size limit inside the zone.' } },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const MultiFile: Story = {
  parameters: {
    docs: { description: { story: 'Set `multiple` to allow more than one file. Each selection appends to the list.' } },
  },
  args: { multiple: true, helperText: 'Upload all supporting documents.' },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const WithFile: Story = {
  parameters: {
    docs: { description: { story: 'A single file has been selected. The FileCard appears below the zone.' } },
  },
  args: {
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf')],
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const WithMultipleFiles: Story = {
  parameters: {
    docs: { description: { story: 'Multiple files selected. Each file gets its own card; remove any individually.' } },
  },
  args: {
    multiple: true,
    defaultFiles: [
      mockFile('annual-report-2024.pdf', 480, 'application/pdf'),
      mockFile('tax-statement.docx', 210, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
      mockFile('profile-photo.jpg', 95, 'image/jpeg'),
    ],
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const Uploading: Story = {
  parameters: {
    docs: { description: { story: 'Pass `uploadProgress` (filename → 0–100) to show a LinearProgress bar on individual file cards. The remove button is hidden while uploading.' } },
  },
  args: {
    multiple: true,
    defaultFiles: [
      mockFile('annual-report-2024.pdf', 480, 'application/pdf'),
      mockFile('tax-statement.docx', 210, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    ],
    uploadProgress: { 'annual-report-2024.pdf': 62 },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const UploadComplete: Story = {
  parameters: {
    docs: { description: { story: 'A file with progress at 100 transitions to the complete state.' } },
  },
  args: {
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf')],
    uploadProgress: { 'annual-report-2024.pdf': 100 },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const UploadError: Story = {
  parameters: {
    docs: { description: { story: 'Pass `uploadError` (filename → error message) to show the error state on a file card.' } },
  },
  args: {
    multiple: true,
    defaultFiles: [
      mockFile('annual-report-2024.pdf', 480, 'application/pdf'),
      mockFile('tax-statement.docx', 210, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    ],
    uploadError: { 'tax-statement.docx': 'This file could not be processed. Please try again.' },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const WithFileDisabled: Story = {
  parameters: {
    docs: { description: { story: 'Disabled state with a file already present. The zone and remove button are both inert.' } },
  },
  args: {
    disabled: true,
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf')],
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const ErrorState: Story = {
  parameters: {
    docs: { description: { story: 'Pass `error` as a string to show an external validation error. Overrides any internal validation message.' } },
  },
  args: { error: 'This file could not be processed. Try again.' },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'All interactions are blocked. The zone and button are visually dimmed.' } },
  },
  args: { disabled: true },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
