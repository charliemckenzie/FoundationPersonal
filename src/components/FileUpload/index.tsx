import { useState, useRef, useId, useCallback } from 'react';
import type React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { isFileAccepted } from './helpers';
import { Dropzone } from './Dropzone';
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
  const errorId = displayError ? `${inputId}-error` : undefined;
  const helperId = helperText && !displayError ? `${inputId}-helper-text` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

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
            typography: 'body',
            fontWeight: 700,
            ...(!displayError && !disabled && { color: 'text.primary' }),
          }}
        >
          {label}
        </FormLabel>
      )}

      <Dropzone
        label={label}
        description={description}
        describedBy={describedBy}
        hasError={!!displayError}
        isDragOver={isDragOver}
        disabled={disabled}
        multiple={multiple}
        inputId={inputId}
        inputRef={inputRef}
        accept={accept}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onInputChange={handleInputChange}
      />

      {displayError ? (
        <FormHelperText error role="alert" id={errorId} sx={{ mx: 0, mt: 0 }}>
          {displayError}
        </FormHelperText>
      ) : helperText ? (
        <FormHelperText id={helperId} sx={{ mx: 0, mt: 0 }}>
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
