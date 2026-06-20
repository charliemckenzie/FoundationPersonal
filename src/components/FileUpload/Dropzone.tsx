import type React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { dashedBorderSvg } from './helpers';

interface DropzoneProps {
  label?: string;
  description?: string;
  describedBy?: string;
  hasError: boolean;
  isDragOver: boolean;
  disabled: boolean;
  multiple: boolean;
  inputId: string;
  inputRef: React.Ref<HTMLInputElement>;
  accept?: string;
  onDragEnter: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function Dropzone({
  label,
  description,
  describedBy,
  hasError,
  isDragOver,
  disabled,
  multiple,
  inputId,
  inputRef,
  accept,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onInputChange,
}: DropzoneProps) {
  return (
    <Box
      role="region"
      aria-label={label ?? 'File upload'}
      aria-describedby={describedBy}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => { if (!disabled) (inputRef as React.RefObject<HTMLInputElement>).current?.click(); }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          (inputRef as React.RefObject<HTMLInputElement>).current?.click();
        }
      }}
      tabIndex={disabled ? -1 : 0}
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '11rem',
        px: 3,
        py: 3,
        borderRadius: `${theme.shape.sm}px`,
        backgroundImage: dashedBorderSvg(
          hasError
            ? theme.palette.error.main
            : isDragOver
            ? theme.palette.primary.main
            : theme.palette.border.input,
          theme.shape.sm,
        ),
        backgroundColor: isDragOver
          ? alpha(theme.palette.primary.main, 0.04)
          : disabled
            ? alpha(theme.palette.background.default, 0.6)
            : 'background.paper',
        transition: 'background-color 0.15s',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...(!disabled && !isDragOver && { '&:hover': { backgroundColor: 'action.hover' } }),
        '&:focus-within': {
          outline: `2px solid ${theme.palette.border.focus}`,
          outlineOffset: '2px',
        },
      })}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          flexShrink: 0,
          border: '1px dashed',
          borderColor: disabled ? 'action.disabled' : 'border.input',
          color: disabled ? 'text.disabled' : 'text.primary',
          backgroundColor: 'background.paper',
          mb: 1,
        }}
      >
        <Icon icon="arrow-up-from-line" size="xl" color="inherit" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Typography variant="body" sx={{ textAlign: 'center' }}>
          <Box
            component="span"
            sx={{ fontWeight: 700, color: disabled ? 'text.disabled' : 'text.primary' }}
          >
            Choose {multiple ? 'files' : 'a file'}
          </Box>
          <Box component="span" sx={{ fontWeight: 700, color: disabled ? 'text.disabled' : 'text.primary' }}>
            {' '}or drag &amp; drop {multiple ? 'them' : 'it'} here
          </Box>
        </Typography>
        {description && (
          <Typography variant="small" sx={{ textAlign: 'center', color: disabled ? 'text.disabled' : 'text.muted' }}>
            {description}
          </Typography>
        )}
      </Box>
      <Button label="Browse files" variant="outlined" size="small" disabled={disabled} />
      <Box
        component="input"
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onInputChange}
        sx={{ display: 'none' }}
        tabIndex={-1}
      />
    </Box>
  );
}
