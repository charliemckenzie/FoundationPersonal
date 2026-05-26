import { useId, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiFormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type React from 'react';
import { useDrawerDrag } from '../Dialog/useDrawerDrag';
import { buildInputStyles } from '../inputs/variantStyles';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'small' | 'medium';

const CONDENSED_REDUCTION = 0.25; // rem = 4px

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: SelectSize;
  condensed?: boolean;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  native?: boolean;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
}

export function Select({
  label,
  options,
  value,
  defaultValue,
  placeholder,
  size = 'medium',
  condensed = false,
  helperText,
  errorMessage,
  error = false,
  required = false,
  disabled = false,
  fullWidth = false,
  native = false,
  onChange,
  id,
  name,
}: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const labelId = `${fieldId}-label`;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectOpen, setSelectOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');

  const currentValue = value ?? internalValue;
  const { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd } = useDrawerDrag(drawerOpen, () => setDrawerOpen(false));

  function handleChange(event: SelectChangeEvent) {
    setInternalValue(event.target.value);
    onChange?.(event.target.value);
  }

  function handleOpen() {
    if (!native && isMobile) {
      setDrawerOpen(true);
    } else {
      setSelectOpen(true);
    }
  }

  function handleClose() {
    setSelectOpen(false);
  }

  function handleOptionSelect(optionValue: string) {
    setInternalValue(optionValue);
    onChange?.(optionValue);
    setDrawerOpen(false);
  }

  function renderValue(selected: unknown): React.ReactNode {
    if (!selected && placeholder) {
      return <Box component="span" sx={{ color: 'text.muted' }}>{placeholder}</Box>;
    }
    return options.find(o => o.value === (selected as string))?.label ?? '';
  }

  const selectValue = !native && isMobile ? currentValue : value;
  const selectDefaultValue = !native && isMobile ? undefined : defaultValue;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ...(fullWidth && { width: '100%' }) }}>
      <FormLabel
        id={labelId}
        htmlFor={fieldId}
        required={required}
        error={error}
        disabled={disabled}
        sx={{ fontWeight: 700, fontSize: size === 'small' ? '0.875rem' : '1rem', ...(!error && !disabled && { color: 'text.primary' }) }}
      >
        {label}
      </FormLabel>
      <MuiFormControl size={size} error={error} required={required} disabled={disabled} fullWidth={fullWidth}>
        <MuiSelect
          labelId={labelId}
          native={native}
          open={!native ? selectOpen : undefined}
          onOpen={!native ? handleOpen : undefined}
          onClose={!native ? handleClose : undefined}
          displayEmpty={!native && !!placeholder}
          value={selectValue}
          defaultValue={selectDefaultValue}
          onChange={handleChange}
          renderValue={!native && placeholder ? renderValue : undefined}
          inputProps={{ id: fieldId, name }}
          MenuProps={{ slotProps: { list: { sx: { py: '4px' } }, paper: { sx: (t) => ({ borderRadius: `${t.shape.sm}px` }) } } }}
          sx={(t) => ({
            ...buildInputStyles(t),
            minHeight: size === 'small'
              ? `${2.5 - (condensed ? CONDENSED_REDUCTION : 0)}rem`
              : `${3 - (condensed ? CONDENSED_REDUCTION : 0)}rem`,
            fontSize: '1rem',
            '& div.MuiSelect-select': {
              lineHeight: 1.5,
              paddingTop: size === 'small'
                ? `${0.5 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`
                : `${0.75 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`,
              paddingBottom: size === 'small'
                ? `${0.5 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`
                : `${0.75 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`,
            },
            '&& select.MuiInputBase-input': {
              paddingTop: size === 'small'
                ? `${0.5 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`
                : `${0.75 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`,
              paddingBottom: size === 'small'
                ? `${0.5 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`
                : `${0.75 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`,
            },
          })}
        >
          {native ? (
            <>
              {placeholder && <option value="" disabled>{placeholder}</option>}
              {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </>
          ) : (
            options.map((option) => (
              <MenuItem key={option.value} value={option.value} disabled={option.disabled} disableRipple sx={(t) => ({ fontSize: '1rem', mx: '4px', borderRadius: `${t.shape['xs']}px`, width: `calc(100% - 8px)` })}>
                {option.label}
              </MenuItem>
            ))
          )}
        </MuiSelect>
        {helperText && (
          <FormHelperText error={errorMessage ? false : undefined} role={error && !errorMessage ? 'alert' : undefined} sx={{ mx: 0 }}>
            {helperText}
          </FormHelperText>
        )}
      </MuiFormControl>
      {error && errorMessage && (
        <FormHelperText error role="alert" sx={{ mx: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}

      {!native && (
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          slotProps={{
            paper: {
              sx: (t) => ({
                borderRadius: `${t.shape.xl}px ${t.shape.xl}px 0 0`,
                maxHeight: '80vh',
                ...(dragY > 0 && {
                  transform: `translateY(${dragY}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform',
                }),
              }),
            },
          }}
        >
          <Box
            aria-hidden="true"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            sx={(t) => ({
              width: t.spacing(5),
              height: t.spacing(0.5),
              borderRadius: `${t.shape['xs']}px`,
              backgroundColor: 'divider',
              mx: 'auto',
              mt: 1.5,
              position: 'relative',
              touchAction: 'none',
              cursor: 'grab',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -12,
                bottom: -12,
                left: -40,
                right: -40,
              },
            })}
          />
          <List sx={{ pt: 1, pb: 2, px: 1, overflowY: 'auto' }}>
            {options.map((option) => (
              <ListItemButton
                key={option.value}
                disabled={option.disabled}
                selected={currentValue === option.value}
                onClick={() => handleOptionSelect(option.value)}
                sx={(t) => ({ borderRadius: `${t.shape['xs']}px` })}
              >
                <ListItemText
                  primary={option.label}
                  slotProps={{ primary: { sx: { fontSize: '1rem' } } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}
    </Box>
  );
}
