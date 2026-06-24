import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../../components/Checkbox';
import { FileUpload } from '../../components/FileUpload';
import { IconList } from '../../components/IconList';
import { RadioGroup } from '../../components/RadioGroup';
import { TextButton } from '../../components/TextButton';
import { OTHER_ID_METHOD_OPTIONS } from './constants';
import type { OtherIdState } from './types';
import { IdDocumentsModal } from './IdDocumentsModal';

export interface OfflineIdvProps {
  state: OtherIdState;
  onChange: (next: OtherIdState) => void;
  showValidation: boolean;
}

function ImagePlaceholder() {
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: '100%',
        height: '13rem',
        borderRadius: (t) => `${t.shape.md}px`,
        backgroundColor: 'action.hover',
        border: '1px dashed',
        borderColor: 'border.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="small" sx={{ color: 'text.muted' }}>Image</Typography>
    </Box>
  );
}

function SelfieGuidance({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="body" sx={{ fontWeight: 700, color: 'text.primary' }}>
        What you&apos;ll need
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
        <Box sx={{ width: '100%' }}>
          <IconList
            listType="ol"
            size="md"
            items={[
              { text: 'A clear photo or scan of your ID (front AND back for a driver\'s licence).' },
              { text: 'A selfie of you holding that ID, your face and the writing must be legible.' },
              { text: 'Original photo files only (JPG or PNG, do not send a PDF).' },
            ]}
          />
        </Box>
        <ImagePlaceholder />
      </Box>
      <Box>
        <TextButton
          label="Which documents can I use?"
          startIcon="circle-info"
          hideIcon={false}
          onClick={onOpenModal}
        />
      </Box>
    </Stack>
  );
}

function CertifiedGuidance({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="body" sx={{ fontWeight: 700, color: 'text.primary' }}>
        What you&apos;ll need
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
        <Box sx={{ width: '100%' }}>
          <IconList
            listType="ul"
            size="md"
            defaultIcon="circle-check"
            items={[
              { text: 'A certified copy of ONE primary photo ID, OR' },
              { text: 'ONE non-photo ID plus TWO proof-of-address documents dated recently.' },
              { text: 'A certifier must write "certified true copy of the original", sign, date, and add their stamp or registration number.' },
            ]}
          />
        </Box>
        <ImagePlaceholder />
      </Box>
      <Box>
        <TextButton
          label="Who can certify & which documents?"
          startIcon="circle-info"
          hideIcon={false}
          onClick={onOpenModal}
        />
      </Box>
    </Stack>
  );
}

export function OfflineIdv({ state, onChange, showValidation }: OfflineIdvProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const uploadError =
    showValidation && (state.method === 'selfie' || state.method === 'certified') && state.files.length === 0
      ? 'Upload at least one file to continue.'
      : undefined;

  const methodError =
    showValidation && state.method === ''
      ? 'Choose how you want to send your ID.'
      : undefined;

  function handleMethodChange(value: string) {
    onChange({ method: value as OtherIdState['method'], files: [], laterConfirmed: false });
  }

  function handleFilesChange(files: File[]) {
    onChange({ ...state, files });
  }

  function handleLaterConfirmedChange(checked: boolean) {
    onChange({ ...state, laterConfirmed: checked });
  }

  return (
    <Stack spacing={3}>
      <RadioGroup
        legend="Choose how to send your ID"
        value={state.method}
        options={OTHER_ID_METHOD_OPTIONS.map((o) => ({ ...o }))}
        direction="row"
        variant="card"
        cardDirection="column"
        error={!!methodError}
        errorMessage={methodError}
        onChange={handleMethodChange}
      />

      {state.method === 'selfie' && (
        <Stack spacing={2}>
          <SelfieGuidance onOpenModal={() => setModalOpen(true)} />
          <FileUpload
            multiple
            accept="image/*"
            maxSizeMB={10}
            label="Upload your selfie ID"
            description="JPG or PNG. Include front and back of a licence."
            error={uploadError}
            onChange={handleFilesChange}
          />
        </Stack>
      )}

      {state.method === 'certified' && (
        <Stack spacing={2}>
          <CertifiedGuidance onOpenModal={() => setModalOpen(true)} />
          <FileUpload
            multiple
            accept="image/*,application/pdf"
            maxSizeMB={10}
            label="Upload your certified documents"
            description="Photo, scan, or PDF. Make sure every page is readable."
            error={uploadError}
            onChange={handleFilesChange}
          />
        </Stack>
      )}

      {state.method === 'later' && (
        <Stack spacing={2}>
          <Typography variant="h6" component="h3">
            You can provide your documents later
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Upload your identity documents via <strong>Upload files</strong> in Member Online once you&apos;re ready. We&apos;ll send you email reminders. Your application can&apos;t be processed until we receive them.
          </Typography>
          <Checkbox
            checked={state.laterConfirmed}
            onChange={handleLaterConfirmedChange}
            label="I understand I need to provide identity documents before my application can be processed."
          />
        </Stack>
      )}

      <IdDocumentsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Stack>
  );
}
