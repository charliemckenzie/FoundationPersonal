import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { FileCard } from '../../../components/FileUpload/FileCard';

function mockFile(name: string, sizeKB: number, type: string): File {
  return new File([new Uint8Array(sizeKB * 1024)], name, { type });
}

const PDF = mockFile('annual-report-2024.pdf', 480, 'application/pdf');

const meta: Meta<typeof FileCard> = {
  title: 'Form Components / FileUpload / FileCard',
  component: FileCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FileCard displays a single file entry within a FileUpload list.

**States:**
- \`idle\` — file selected, ready to upload
- \`uploading\` — upload in progress; shows a LinearProgress bar and percentage
- \`complete\` — upload finished; icon and size text turn green
- \`error\` — upload failed; shows an error message below the filename

Pass \`onRemove\` to show the remove button. It is hidden while uploading.
        `.trim(),
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
  argTypes: {
    status:       { control: 'select', options: ['idle', 'uploading', 'complete', 'error'] },
    progress:     { control: { type: 'range', min: 0, max: 100 } },
    errorMessage: { control: 'text' },
    disabled:     { control: 'boolean' },
    file:         { table: { disable: true } },
    onRemove:     { table: { disable: true } },
  },
  args: { file: PDF },
};

export default meta;
type Story = StoryObj<typeof FileCard>;

export const Idle: Story = {
  parameters: { docs: { description: { story: 'File selected, ready to upload.' } } },
  args: { status: 'idle', onRemove: () => {} },
};

export const Uploading: Story = {
  parameters: { docs: { description: { story: 'Upload in progress. Remove button is hidden until complete.' } } },
  args: { status: 'uploading', progress: 62 },
};

export const Complete: Story = {
  parameters: { docs: { description: { story: 'Upload finished successfully. Icon and file size text are green.' } } },
  args: { status: 'complete', onRemove: () => {} },
};

export const Error: Story = {
  parameters: { docs: { description: { story: 'Upload failed. Error message shown below the filename.' } } },
  args: {
    status: 'error',
    errorMessage: 'This file could not be processed. Please try again.',
    onRemove: () => {},
  },
};

export const Disabled: Story = {
  parameters: { docs: { description: { story: 'Disabled state. Remove button is inert.' } } },
  args: { status: 'idle', disabled: true, onRemove: () => {} },
};

export const AllStates: Story = {
  parameters: { docs: { description: { story: 'All four states shown together for comparison.' } } },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <FileCard file={PDF} status="idle"      onRemove={() => {}} />
      <FileCard file={PDF} status="uploading" progress={62} />
      <FileCard file={PDF} status="complete"  onRemove={() => {}} />
      <FileCard
        file={PDF}
        status="error"
        errorMessage="This file could not be processed. Please try again."
        onRemove={() => {}}
      />
    </Box>
  ),
};
