import { useId, useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'small' | 'medium';

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: SelectSize;
  helperText?: string;
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
  helperText,
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
      return <Box component="span" sx={{ color: 'text.secondary' }}>{placeholder}</Box>;
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
        sx={{ fontWeight: 700, fontSize: '1rem', ...(!error && !disabled && { color: 'text.primary' }) }}
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
            fontSize: '1rem',
            borderRadius: `${t.shape.sm}px`,
            backgroundColor: t.palette.background.paper,
            '&.Mui-disabled': {
              backgroundColor: alpha(t.palette.background.default, 0.6),
            },
            '&&.Mui-disabled fieldset': {
              borderColor: alpha(t.palette.border.input, 0.6),
            },
            '& div.MuiSelect-select': {
              paddingTop: '12px',
              paddingBottom: '12px',
            },
            '&& select.MuiInputBase-input': {
              paddingTop: '12px',
              paddingBottom: '12px',
            },
            '& fieldset': {
              borderColor: t.palette.border.input,
              borderRadius: `${t.shape.sm}px`,
            },
            '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) fieldset': {
              borderColor: t.palette.border.input,
            },
            '&.Mui-focused': {
              outline: `2px solid ${t.palette.border.focus}`,
              outlineOffset: '2px',
            },
            '&&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: t.palette.border.input,
            },
            '&&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: t.palette.error.main,
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
              <MenuItem key={option.value} value={option.value} disabled={option.disabled} sx={(t) => ({ fontSize: '1rem', mx: '4px', borderRadius: `${t.shape['xs']}px`, width: `calc(100% - 8px)` })}>
                {option.label}
              </MenuItem>
            ))
          )}
        </MuiSelect>
        {helperText && <FormHelperText role={error ? 'alert' : undefined} sx={{ mx: 0 }}>{helperText}</FormHelperText>}
      </MuiFormControl>

      {!native && (
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: '24px 24px 0 0',
                maxHeight: '80vh',
                ...(dragY > 0 && {
                  transform: `translateY(${dragY}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform',
                }),
              },
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
