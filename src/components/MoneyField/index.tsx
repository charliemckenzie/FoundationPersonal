import { useState } from 'react';
import { TextField } from '../TextField';
import type { TextFieldSize } from '../TextField';
import type { SelectAdornmentConfig } from '../InputSelect';
import type React from 'react';

export interface MoneyFieldProps {
  label?: string;
  /** Controlled value. When provided, the field reflects it (e.g. external resets). */
  value?: number | null;
  defaultValue?: number;
  placeholder?: string;
  size?: TextFieldSize;
  condensed?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  selectAdornment?: SelectAdornmentConfig;
  onChange?: (value: number | null) => void;
  /** Fires on every keystroke with the current parsed value. Use for live UI updates; `onChange` still fires the committed value on blur. */
  onInputChange?: (value: number | null) => void;
  max?: number;
  id?: string;
  name?: string;
}

function sanitize(input: string): string {
  const stripped = input.replace(/[^0-9.]/g, '');
  const firstDot = stripped.indexOf('.');
  if (firstDot === -1) return stripped;
  const dec = stripped.slice(firstDot + 1).replace(/\./g, '').slice(0, 2);
  return `${stripped.slice(0, firstDot)}.${dec}`;
}

function formatMoney(raw: string, normalize = false): string {
  if (!raw) return '';
  const dotIndex = raw.indexOf('.');
  const hasDot = dotIndex !== -1;
  const intStr = hasDot ? raw.slice(0, dotIndex) : raw;
  const decStr = hasDot ? raw.slice(dotIndex + 1) : '';
  // During typing (normalize=false) use regex comma-insertion so leading zeros are
  // preserved as an intermediate editing state (e.g. "00,000" after deleting the
  // leading digit of "200,000"). On blur (normalize=true) collapse via parseInt to
  // produce a canonical number like "0" or "100,000".
  const formattedInt = intStr
    ? normalize
      ? (parseInt(intStr, 10) || 0).toLocaleString('en-US')
      : intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '';
  if (!hasDot) return formattedInt;
  if (normalize && !decStr) return formattedInt;
  if (normalize) return `${formattedInt || '0'}.${decStr.slice(0, 2).padEnd(2, '0')}`;
  return `${formattedInt}.${decStr}`;
}

function nextCursor(rawInput: string, formatted: string, cursorInRaw: number): number {
  const commasBefore = (rawInput.slice(0, cursorInRaw).match(/,/g) ?? []).length;
  const unformattedPos = cursorInRaw - commasBefore;
  if (unformattedPos === 0) return 0;
  let count = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (formatted[i] !== ',') count++;
    if (count === unformattedPos) return i + 1;
  }
  return formatted.length;
}

export function MoneyField({
  label,
  value,
  defaultValue,
  placeholder = '0',
  size,
  condensed,
  helperText,
  error,
  required,
  disabled,
  fullWidth,
  selectAdornment,
  onChange,
  onInputChange,
  max,
  id,
  name,
}: MoneyFieldProps) {
  const [displayValue, setDisplayValue] = useState(() => {
    const initial = value ?? defaultValue;
    return initial != null
      ? initial.toLocaleString('en-US', { maximumFractionDigits: 2 })
      : '';
  });
  const [focused, setFocused] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  // Reflect a controlled value that changed externally (e.g. a reset), but never
  // while the user is editing. Adjusting state during render is the React-blessed
  // alternative to a syncing effect.
  if (value !== undefined && value !== prevValue && !focused) {
    setPrevValue(value);
    setDisplayValue(value === null ? '' : value.toLocaleString('en-US', { maximumFractionDigits: 2 }));
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputEl = e.target;
    const cursorPos = inputEl.selectionStart ?? 0;
    const rawInput = e.target.value;
    const sanitized = sanitize(rawInput);
    const formatted = formatMoney(sanitized);
    const cursor = nextCursor(rawInput, formatted, cursorPos);
    setDisplayValue(formatted);
    if (onInputChange) {
      const num = parseFloat(sanitized);
      onInputChange(sanitized === '' ? null : isNaN(num) ? null : num);
    }
    requestAnimationFrame(() => {
      inputEl.setSelectionRange(cursor, cursor);
    });
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => setFocused(true);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setFocused(false);
    const stripped = displayValue.replace(/,/g, '');
    if (!stripped || stripped === '.') {
      setDisplayValue('');
      onChange?.(null);
      return;
    }
    let num = parseFloat(stripped);
    if (!isNaN(num) && max !== undefined && num > max) {
      num = max;
    }
    const normalized = formatMoney(isNaN(num) ? stripped : String(num), true);
    setDisplayValue(normalized);
    onChange?.(isNaN(num) ? null : num);
  };

  return (
    <TextField
      label={label}
      value={displayValue}
      placeholder={placeholder}
      size={size}
      condensed={condensed}
      helperText={helperText}
      error={error}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      startAdornment="$"
      selectAdornment={selectAdornment}
      htmlInputProps={{ inputMode: 'decimal' }}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      id={id}
      name={name}
    />
  );
}
