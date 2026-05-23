import { useState, useRef, useId, useCallback } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type React from 'react';
import { dashedBorderSvg, isFileAccepted } from './helpers';
import { FileCard } from './FileCard';
import type { FileCardStatus } from './FileCard';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  description?: string;
  defaultFiles?: File[];
  uploadProgress?: Record<string, number>;
  uploadError?: Record<string, string>;
  onChange?: (files: File[]) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
}

export function FileUpload({
  label,
  accept,
  maxSizeMB,
  multiple = false,
  description,
  defaultFiles,
  uploadProgress,
  uploadError,
  onChange,
  error,
  helperText,
  disabled = false,
}: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCountRef = useRef(0);
  const [files, setFiles] = useState<File[]>(defaultFiles ?? []);
  const [internalError, setInternalError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const displayError = error ?? (internalError || undefined);

  const processFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;
      const candidates = Array.from(incoming);

      if (candidates.some((f) => !isFileAccepted(f, accept))) {
        setInternalError('One or more files have an unsupported type.');
        return;
      }
      if (maxSizeMB != null && candidates.some((f) => f.size > maxSizeMB * 1024 * 1024)) {
        setInternalError(`One or more files exceed the ${maxSizeMB} MB limit.`);
        return;
      }

      setInternalError('');
      const next = multiple ? [...files, ...candidates] : candidates.slice(0, 1);
      setFiles(next);
      onChange?.(next);
    },
    [accept, maxSizeMB, multiple, files, onChange],
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = () => {
    dragCountRef.current += 1;
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = () => {
    dragCountRef.current -= 1;
    if (dragCountRef.current === 0) setIsDragOver(false);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dragCountRef.current = 0;
    setIsDragOver(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onChange?.(next);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {label && (
        <FormLabel
          htmlFor={inputId}
          disabled={disabled}
          error={!!displayError}
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            ...(!displayError && !disabled && { color: 'text.primary' }),
          }}
        >
          {label}
        </FormLabel>
      )}

      <Box
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => { if (!disabled) inputRef.current?.click(); }}
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
            displayError
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
        <Button label="Browse files" variant="soft" size="small" disabled={disabled} />
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          tabIndex={-1}
        />
      </Box>

      {displayError ? (
        <FormHelperText error role="alert" sx={{ mx: 0, mt: 0 }}>
          {displayError}
        </FormHelperText>
      ) : helperText ? (
        <FormHelperText sx={{ mx: 0, mt: 0 }}>
          {helperText}
        </FormHelperText>
      ) : null}

      {files.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
          {files.map((file, i) => {
            const prog = uploadProgress?.[file.name];
            const status: FileCardStatus =
              uploadError?.[file.name]  ? 'error'
              : prog == null           ? 'idle'
              : prog >= 100            ? 'complete'
              : 'uploading';
            return (
              <FileCard
                key={`${file.name}-${i}`}
                file={file}
                status={status}
                progress={prog}
                errorMessage={uploadError?.[file.name]}
                disabled={disabled}
                onRemove={() => removeFile(i)}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
