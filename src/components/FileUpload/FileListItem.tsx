import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { formatBytes } from './helpers';

export interface FileListItemProps {
  file: File;
  progress?: number;
  disabled?: boolean;
  onRemove: () => void;
}

export function FileListItem({ file, progress, disabled, onRemove }: FileListItemProps) {
  const isUploading = progress != null && progress < 100;

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
        borderColor: 'border.subtle',
        backgroundColor: 'background.paper',
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
          color: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        })}
      >
        <Icon icon={isUploading ? 'arrow-up-from-line' : 'file'} size="lg" color="inherit" />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body" noWrap title={file.name}>
          {file.name}
        </Typography>
        {isUploading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={(theme) => ({
                flex: 1,
                height: 4,
                borderRadius: `${theme.shape.full}px`,
                backgroundColor: 'action.hover',
                '& .MuiLinearProgress-bar': { borderRadius: `${theme.shape.full}px` },
              })}
            />
            <Typography variant="small" sx={{ color: 'text.muted', flexShrink: 0 }}>
              {progress}%
            </Typography>
          </Box>
        ) : (
          <Typography variant="small" sx={{ display: 'block', color: 'text.muted' }}>
            {formatBytes(file.size)}
          </Typography>
        )}
      </Box>
      {!isUploading && (
        <IconButton
          label="Delete"
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
