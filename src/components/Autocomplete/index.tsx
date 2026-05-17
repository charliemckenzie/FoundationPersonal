import { useId } from 'react';
import { type Theme } from '@mui/material/styles';
import MuiAutocomplete from '@mui/material/Autocomplete';
import MuiTextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import type React from 'react';
import { buildInputStyles } from '../inputs/variantStyles';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export type AutocompleteSize = 'small' | 'medium';

export interface AutocompleteProps {
  label: string;
  options: AutocompleteOption[];
  value?: AutocompleteOption | null;
  defaultValue?: AutocompleteOption | null;
  onChange?: (value: AutocompleteOption | null) => void;
  placeholder?: string;
  size?: AutocompleteSize;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
    option: AutocompleteOption
  ) => React.ReactNode;
  groupBy?: (option: AutocompleteOption) => string;
  id?: string;
  name?: string;
}

const inputSx = (t: Theme) => ({
  ...buildInputStyles(t),
  fontSize: '1rem',
  // MUI Autocomplete adds `padding: 9px` via `.MuiAutocomplete-inputRoot.MuiOutlinedInput-root`.
  // Matching that class directly beats it on injection order (sx injects later).
  '&.MuiAutocomplete-inputRoot': {
    paddingTop: 0,
    paddingBottom: 0,
  },
  '&.MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    lineHeight: 1.5,
  },
});

const listboxSx = (t: Theme) => ({
  py: '4px',
  '& .MuiAutocomplete-option': {
    fontSize: '1rem',
    mx: '4px',
    borderRadius: `${t.shape.xs}px`,
    width: `calc(100% - 8px)`,
  },
  '& .MuiAutocomplete-groupLabel': {
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: 2,
    color: t.palette.text.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  '& li:not(:first-child) .MuiAutocomplete-groupLabel': {
    paddingTop: '0.75rem',
  },
  '& .MuiAutocomplete-groupUl': {
    padding: 0,
  },
});

const paperSx = (t: Theme) => ({ borderRadius: `${t.shape.sm}px`, boxShadow: t.shadows[8] });

export function Autocomplete({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  size = 'medium',
  helperText,
  errorMessage,
  error = false,
  required = false,
  disabled = false,
  fullWidth = false,
  loading = false,
  renderOption,
  groupBy,
  id,
  name,
}: AutocompleteProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  const controlledProps = value !== undefined ? { value } : {};

  const defaultRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
    option: AutocompleteOption
  ) => (
    <Box component="li" {...props} key={option.value}>
      {option.label}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ...(fullWidth && { width: '100%' }) }}>
      <FormLabel
        htmlFor={fieldId}
        required={required}
        error={error}
        disabled={disabled}
        sx={{ fontWeight: 700, fontSize: '1rem', ...(!error && !disabled && { color: 'text.primary' }) }}
      >
        {label}
      </FormLabel>
      <MuiAutocomplete
        id={fieldId}
        options={options}
        {...controlledProps}
        defaultValue={defaultValue}
        onChange={(_, newValue) => onChange?.(newValue)}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        loading={loading}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        groupBy={groupBy}
        renderOption={renderOption ?? defaultRenderOption}
        slotProps={{
          clearIndicator: { disableRipple: true },
          popupIndicator: { disableRipple: true },
          listbox: { sx: listboxSx },
          paper: { sx: paperSx },
        }}
        renderInput={(params) => (
          <MuiTextField
            {...params}
            fullWidth
            error={error}
            required={required}
            placeholder={placeholder}
            slotProps={{
              ...params.slotProps,
              input: { ...params.slotProps?.input, sx: inputSx },
              htmlInput: { ...params.slotProps?.htmlInput, name },
            }}
          />
        )}
      />
      {helperText && (
        <FormHelperText
          error={error && !errorMessage}
          disabled={disabled}
          role={error && !errorMessage ? 'alert' : undefined}
          sx={{ mx: 0 }}
        >
          {helperText}
        </FormHelperText>
      )}
      {error && errorMessage && (
        <FormHelperText error disabled={disabled} role="alert" sx={{ mx: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
}
