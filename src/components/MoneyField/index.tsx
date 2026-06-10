import { useState } from 'react';
import { TextField } from '../TextField';
import type { TextFieldSize } from '../TextField';
import type { SelectAdornmentConfig } from '../InputSelect';
import type React from 'react';

export interface MoneyFieldProps {
  label?: string;
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
  const formattedInt = intStr
    ? (parseInt(intStr, 10) || 0).toLocaleString('en-US')
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
  id,
  name,
}: MoneyFieldProps) {
  const [displayValue, setDisplayValue] = useState(() =>
    defaultValue != null
      ? defaultValue.toLocaleString('en-US', { maximumFractionDigits: 2 })
      : ''
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputEl = e.target;
    const cursorPos = inputEl.selectionStart ?? 0;
    const rawInput = e.target.value;
    const sanitized = sanitize(rawInput);
    const formatted = formatMoney(sanitized);
    const cursor = nextCursor(rawInput, formatted, cursorPos);
    setDisplayValue(formatted);
    requestAnimationFrame(() => {
      inputEl.setSelectionRange(cursor, cursor);
    });
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    const stripped = displayValue.replace(/,/g, '');
    if (!stripped || stripped === '.') {
      setDisplayValue('');
      onChange?.(null);
      return;
    }
    const normalized = formatMoney(stripped, true);
    setDisplayValue(normalized);
    const num = parseFloat(stripped);
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
      onChange={handleChange}
      onBlur={handleBlur}
      id={id}
      name={name}
    />
  );
}
