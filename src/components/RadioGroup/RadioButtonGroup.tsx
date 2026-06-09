import { RadioGroup } from './index';
import type { RadioGroupProps } from './index';

export interface RadioButtonOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioButtonGroupProps {
  options: RadioButtonOption[];
  legend?: string;
  value?: string;
  defaultValue?: string;
  /** Layout of options. `row` arranges buttons horizontally. Defaults to `row`. */
  direction?: 'column' | 'row';
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  legendBold?: boolean;
  onChange?: (value: string) => void;
  name?: string;
}

export function RadioButtonGroup({
  direction = 'row',
  ...props
}: RadioButtonGroupProps) {
  return (
    <RadioGroup
      {...(props as RadioGroupProps)}
      variant="button"
      direction={direction}
    />
  );
}
