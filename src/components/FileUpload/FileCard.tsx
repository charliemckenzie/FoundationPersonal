import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { LinearProgress } from '../LinearProgress';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { formatBytes } from './helpers';

export type FileCardStatus = 'idle' | 'uploading' | 'complete' | 'error';

export interface FileCardProps {
  file: File;
  /** Visual state of the card. Defaults to 'idle'. */
  status?: FileCardStatus;
  /** Upload progress 0–100. Only used when status is 'uploading'. */
  progress?: number;
  /** Error message displayed when status is 'error'. */
  errorMessage?: string;
  disabled?: boolean;
  onRemove?: () => void;
}

const ICON_NAME: Record<FileCardStatus, string> = {
  idle:      'arrow-up-from-line',
  uploading: 'arrow-up-from-line',
  complete:  'circle-check',
  error:     'circle-exclamation',
};

export function FileCard({
  file,
  status = 'idle',
  progress,
  errorMessage,
  disabled = false,
  onRemove,
}: FileCardProps) {
  const isUploading = status === 'uploading';
  const isError     = status === 'error';
  const isComplete  = status === 'complete';

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 1.5,
        py: 1.5,
        borderRadius: `${theme.shape.sm}px`,
        border: '1px solid',
        borderColor: isError ? alpha(theme.palette.error.main, 0.4) : 'border.subtle',
        backgroundColor: isError
          ? alpha(theme.palette.error.main, 0.04)
          : 'background.paper',
      })}
    >
      <Box
        component="span"
        sx={(theme) => ({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          flexShrink: 0,
          color: isError
            ? theme.palette.error.main
            : isComplete
            ? theme.palette.success.main
            : theme.palette.primary.main,
          backgroundColor: isError
            ? theme.palette.error.background!
            : isComplete
            ? theme.palette.success.background!
            : theme.palette.primary.softMain!,
        })}
      >
        <Icon icon={ICON_NAME[status]} size="lg" color="inherit" />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body" noWrap title={file.name}>
          {file.name}
        </Typography>
        {isUploading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress variant="determinate" value={progress ?? 0} label="Upload progress" />
            </Box>
            <Typography variant="small" sx={{ color: 'text.muted', flexShrink: 0 }}>
              {progress ?? 0}%
            </Typography>
          </Box>
        ) : isError ? (
          <Typography variant="small" sx={{ display: 'block', color: 'error.main' }}>
            {errorMessage ?? 'Upload failed. Please try again.'}
          </Typography>
        ) : (
          <Typography
            variant="small"
            sx={{ display: 'block', color: isComplete ? 'success.main' : 'text.muted' }}
          >
            {formatBytes(file.size)}
          </Typography>
        )}
      </Box>

      {!isUploading && onRemove && (
        <IconButton
          label="Remove file"
          icon="trash"
          variant="ghost"
          size="small"
          disabled={disabled}
          onClick={onRemove}
        />
      )}
    </Box>
  );
}
