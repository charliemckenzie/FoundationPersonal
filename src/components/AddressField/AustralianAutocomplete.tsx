import { useState, useEffect, useId } from 'react';
import { alpha, type Theme } from '@mui/material/styles';
import MuiAutocomplete from '@mui/material/Autocomplete';
import MuiTextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AustralianFields } from './AustralianFields';
import { TextButton } from '../TextButton';
import ButtonBase from '@mui/material/ButtonBase';
import type { AustralianAddress, AddressSuggestion, AddressLookupConfig } from './types';

type Mode = 'search' | 'confirmed' | 'manual';

interface AustralianAutocompleteProps {
  value: AustralianAddress;
  onChange: (value: AustralianAddress) => void;
  lookup: AddressLookupConfig;
  section?: string;
  disabled?: boolean;
  onModeChange?: (isSearching: boolean) => void;
}

function isPopulated(v: AustralianAddress): boolean {
  return v.line1.trim().length > 0;
}

const inputSx = (t: Theme) => ({
  fontSize: t.typography.body.fontSize,
  borderRadius: `${t.shape.sm}px`,
  backgroundColor: 'background.paper',
  '&.MuiAutocomplete-inputRoot': { paddingTop: 0, paddingBottom: 0 },
  '&.Mui-disabled': { backgroundColor: alpha(t.palette.background.default, 0.6) },
  '&&.Mui-disabled fieldset': { borderColor: alpha(t.palette.border.input, 0.6) },
  '&.MuiAutocomplete-inputRoot .MuiAutocomplete-input': { paddingTop: '12px', paddingBottom: '12px', lineHeight: 1.5 },
  '& fieldset': { borderColor: 'border.input', borderRadius: `${t.shape.sm}px` },
  '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) fieldset': { borderColor: 'border.input' },
  '&.Mui-focused': { outline: `2px solid ${t.palette.border.focus}`, outlineOffset: '2px' },
  '&&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: '1px', borderColor: 'border.input' },
});

const listboxSx = (t: Theme) => ({
  py: '4px',
  '& .MuiAutocomplete-option': { fontSize: t.typography.body.fontSize, mx: '4px', borderRadius: `${t.shape.xs}px`, width: 'calc(100% - 8px)' },
});

const paperSx = (t: Theme) => ({
  borderRadius: `${t.shape.sm}px`,
  boxShadow: t.shadows[8],
  '& .MuiAutocomplete-noOptions': { fontSize: t.typography.body.fontSize },
  '& .MuiAutocomplete-loading': { fontSize: t.typography.body.fontSize },
});

export function AustralianAutocomplete({
  value,
  onChange,
  lookup,
  section,
  disabled,
  onModeChange,
}: AustralianAutocompleteProps) {
  const [mode, setMode] = useState<Mode>(() => (isPopulated(value) ? 'confirmed' : 'search'));
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const labelId = useId();

  const minChars = lookup.minChars ?? 2;
  const debounceMs = lookup.debounceMs ?? 300;

  useEffect(() => {
    if (inputValue.length < minChars) {
      setOptions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await lookup.provider(inputValue);
        setOptions(results);
      } finally {
        setLoading(false);
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [inputValue, lookup, minChars, debounceMs]);

  function handleSelect(_: React.SyntheticEvent, suggestion: AddressSuggestion | null) {
    if (!suggestion) return;
    onChange(suggestion.value);
    setMode('confirmed');
    onModeChange?.(false);
  }

  function handleChangeAddress() {
    onChange({ type: 'australian', line1: '', line2: '', suburb: '', state: '', postcode: '' });
    setInputValue('');
    setOptions([]);
    setMode('search');
    onModeChange?.(true);
  }

  function handleUseManual() {
    setMode('manual');
    onModeChange?.(false);
  }

  const linkSx = (t: Theme) => ({
    fontSize: t.typography.small.fontSize,
    color: 'primary.main',
    fontFamily: t.typography.fontFamily,
    fontWeight: 400,
    lineHeight: 1.5,
    textAlign: 'left' as const,
    alignSelf: 'flex-start',
    borderRadius: '2px',
    '&:hover': { color: 'primary.dark', textDecoration: 'underline' },
    '&.Mui-focusVisible': { outline: `2px solid ${t.palette.border.focus}`, outlineOffset: '2px' },
    '&:disabled': { color: 'action.disabled' },
  });

  if (mode === 'confirmed') {
    const addrLine1 = [value.line1, value.line2].filter(Boolean).join(', ');
    const addrLine2 = [value.suburb, value.state, value.postcode].filter(Boolean).join(' ');
    return (
      <Stack spacing={1.5}>
        <Box sx={(t) => ({
          border: `1px solid ${t.palette.border.input}`,
          borderRadius: `${t.shape.sm}px`,
          backgroundColor: 'background.paper',
          px: '14px',
          py: '12px',
        })}>
          <Typography variant="body">{addrLine1}</Typography>
          <Typography variant="body">{addrLine2}</Typography>
        </Box>
        <ButtonBase disableRipple onClick={handleChangeAddress} disabled={disabled} sx={linkSx}>
          Change address
        </ButtonBase>
      </Stack>
    );
  }

  if (mode === 'manual') {
    return (
      <Stack spacing={2}>
        <Box sx={{ alignSelf: 'flex-start' }}>
          <TextButton
            label="Use address search"
            size="small"
            onClick={handleChangeAddress}
            disabled={disabled}
            iconDirection="left"
          />
        </Box>
        <AustralianFields value={value} onChange={onChange} section={section} disabled={disabled} />
      </Stack>
    );
  }

  return (
    <Stack spacing={1}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <FormLabel
          htmlFor={labelId}
          disabled={disabled}
          sx={{ typography: 'body', fontWeight: 700, color: 'text.primary' }}
        >
          Search for your address
        </FormLabel>
        <MuiAutocomplete<AddressSuggestion>
          id={labelId}
          options={options}
          loading={loading}
          filterOptions={(x) => x}
          getOptionLabel={(o) => o.label}
          isOptionEqualToValue={(o, v) => o.id === v.id}
          onChange={handleSelect}
          onInputChange={(_, v) => setInputValue(v)}
          noOptionsText={
            inputValue.length < minChars
              ? 'Start typing to search for your address'
              : 'No addresses found'
          }
          disabled={disabled}
          fullWidth
          forcePopupIcon={false}
          slotProps={{
            listbox: { sx: listboxSx },
            paper: { sx: paperSx },
            clearIndicator: { disableRipple: true },
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              <Stack spacing={0}>
                <Typography variant="body">{option.label}</Typography>
                <Typography variant="small" sx={{ color: 'text.secondary', lineHeight: 1.43 }}>
                  {option.description}
                </Typography>
              </Stack>
            </Box>
          )}
          renderInput={(params) => (
            <MuiTextField
              {...params}
              fullWidth
              placeholder="e.g. 88 Pitt Street, Sydney"
              slotProps={{
                ...params.slotProps,
                input: { ...params.slotProps?.input, sx: inputSx },
              }}
            />
          )}
        />
      </Box>
      <ButtonBase
        disableRipple
        onClick={handleUseManual}
        disabled={disabled}
        sx={(t) => ({
          fontSize: t.typography.small.fontSize,
          color: 'primary.main',
          fontFamily: t.typography.fontFamily,
          fontWeight: 400,
          lineHeight: 1.5,
          textAlign: 'left',
          alignSelf: 'flex-start',
          borderRadius: '2px',
          '&:hover': { color: 'primary.dark', textDecoration: 'underline' },
          '&.Mui-focusVisible': { outline: `2px solid ${t.palette.border.focus}`, outlineOffset: '2px' },
          '&:disabled': { color: 'action.disabled' },
        })}
      >
        Can&apos;t find your address? Enter manually
      </ButtonBase>
    </Stack>
  );
}
