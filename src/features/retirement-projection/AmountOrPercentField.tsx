'use client';

import { MoneyField } from '../../components/MoneyField';
import { PercentageField } from '../../components/PercentageField';

interface AmountOrPercentFieldProps {
  label: string;
  /** Current unit — 'percent' renders a PercentageField, 'dollar' a MoneyField. */
  unit: string;
  /** Current value as held in flow state (raw numeric string). */
  value: string;
  placeholder?: string;
  helperText?: string;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
}

const UNIT_OPTIONS = [
  { value: 'percent', label: 'Percent' },
  { value: 'dollar', label: 'Dollar' },
];

/**
 * A money/percentage input with a unit selector. Switching units swaps the
 * underlying field so dollar amounts aren't clamped to 100 by PercentageField.
 */
export function AmountOrPercentField({
  label,
  unit,
  value,
  placeholder,
  helperText,
  onValueChange,
  onUnitChange,
}: AmountOrPercentFieldProps) {
  const numericValue = value === '' ? undefined : Number(value);
  const selectAdornment = {
    options: UNIT_OPTIONS,
    defaultValue: unit,
    onChange: onUnitChange,
  };

  if (unit === 'dollar') {
    return (
      <MoneyField
        key="dollar"
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        value={numericValue ?? null}
        onChange={(v) => onValueChange(v?.toString() ?? '')}
        selectAdornment={selectAdornment}
      />
    );
  }

  return (
    <PercentageField
      key="percent"
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      value={numericValue ?? null}
      onChange={(v) => onValueChange(v?.toString() ?? '')}
      selectAdornment={selectAdornment}
    />
  );
}
