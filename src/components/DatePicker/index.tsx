'use client';
import { useId, useState } from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { Icon } from '../Icon';

const CONDENSED_REDUCTION = 0.25; // rem = 4px

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  condensed?: boolean;
  minDate?: Date;
  maxDate?: Date;
  id?: string;
  name?: string;
  /** When true the entire input area opens the calendar on click. Keyboard entry is disabled. */
  pickerOnly?: boolean;
}

function CalendarIcon() { return <Icon icon="calendar" size="lg" />; }
function ChevronLeftIcon() { return <Icon icon="chevron-left" size="md" />; }
function ChevronRightIcon() { return <Icon icon="chevron-right" size="md" />; }
function ChevronDownIcon() { return <Icon icon="chevron-down" size="sm" />; }

export function DatePicker({
  value,
  onChange,
  label,
  helperText,
  errorMessage,
  error,
  required,
  disabled,
  fullWidth,
  size = 'medium',
  condensed = false,
  minDate,
  maxDate,
  id,
  name,
  pickerOnly = false,
}: DatePickerProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hasError = error || !!errorMessage;
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ...(fullWidth && { width: '100%' }) }}>
        {label && (
          <FormLabel
            htmlFor={fieldId}
            required={required}
            error={hasError}
            disabled={disabled}
            sx={(t) => ({ fontWeight: 700, fontSize: size === 'small' ? t.typography.small.fontSize : t.typography.body.fontSize, ...(!hasError && !disabled && { color: 'text.primary' }) })}
          >
            {label}
          </FormLabel>
        )}
        <MuiDatePicker
          value={value ? dayjs(value) : null}
          onChange={(v) => onChange?.(v ? v.toDate() : null)}
          format="DD/MM/YYYY"
          disabled={disabled}
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          {...(pickerOnly && {
            open: pickerOpen,
            onOpen: () => setPickerOpen(true),
            onClose: () => setPickerOpen(false),
          })}
          sx={fullWidth ? { width: '100%' } : undefined}
          slots={{
            openPickerIcon: CalendarIcon,
            leftArrowIcon: ChevronLeftIcon,
            rightArrowIcon: ChevronRightIcon,
            switchViewIcon: ChevronDownIcon,
          }}
          slotProps={{
            desktopPaper: {
              sx: (t) => ({
                borderRadius: `${t.shape.sm}px`,
                boxShadow: t.shadows[8],
              }),
            },
            openPickerButton: {
              disableRipple: true,
              sx: (theme) => ({
                // Ghost icon button — circular, transparent, neutral colour
                width: size === 'small' ? '2rem' : '2.25rem',
                height: size === 'small' ? '2rem' : '2.25rem',
                borderRadius: '50%',
                color: 'action.active',
                backgroundColor: 'transparent',
                '&:hover': { backgroundColor: 'action.hover' },
                '&:active': { backgroundColor: 'action.selected' },
                '&.Mui-disabled': { color: 'action.disabled' },
                '&.Mui-focusVisible': {
                  outline: `2px solid ${theme.palette.border.focus}`,
                  outlineOffset: '2px',
                  boxShadow: 'none',
                },
              }),
            },
            previousIconButton: { disableRipple: true },
            nextIconButton: { disableRipple: true },
            switchViewButton: { disableRipple: true },
            day: { disableRipple: true },
            textField: {
              id: fieldId,
              name,
              required,
              error: hasError,
              size,
              fullWidth,
              ...(pickerOnly && { onClick: () => setPickerOpen(true) }),
              slotProps: {
                input: {
                  readOnly: pickerOnly,
                  sx: () => ({
                    minHeight: size === 'small'
                      ? `${2.5 - (condensed ? CONDENSED_REDUCTION : 0)}rem`
                      : `${3 - (condensed ? CONDENSED_REDUCTION : 0)}rem`,
                    ...(pickerOnly && { cursor: 'pointer' }),
                    '& .MuiInputAdornment-root': {
                      alignSelf: 'stretch',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      maxHeight: 'none',
                      // Pin adornment width to button width so the circle doesn't overflow
                      width: size === 'small' ? '2rem' : '2.25rem',
                      flexShrink: 0,
                    },
                    // PickersOutlinedInputSectionsContainer sets padding:16.5px — override here
                    '& .MuiPickersInputBase-sectionsContainer': {
                      paddingTop: size === 'small'
                        ? `${0.5 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`
                        : `${0.75 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`,
                      paddingBottom: size === 'small'
                        ? `${0.5 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`
                        : `${0.75 - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`,
                      ...(pickerOnly && { cursor: 'pointer' }),
                    },
                  }),
                },
              },
            },
          }}
        />
        {hasError && errorMessage && (
          <FormHelperText error role="alert" sx={{ mx: 0, mt: 0 }}>
            {errorMessage}
          </FormHelperText>
        )}
        {!hasError && helperText && (
          <FormHelperText sx={{ mx: 0, mt: 0 }}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </LocalizationProvider>
  );
}
