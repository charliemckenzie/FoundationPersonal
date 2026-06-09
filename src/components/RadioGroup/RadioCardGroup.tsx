import { RadioGroup } from './index';
import type { RadioGroupProps } from './index';

export interface RadioCardOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface RadioCardGroupProps {
  options: RadioCardOption[];
  legend?: string;
  value?: string;
  defaultValue?: string;
  /** Layout of options. `row` arranges cards horizontally. Defaults to `row`. */
  direction?: 'column' | 'row';
  /** Internal layout of each card. `column` stacks icon above label. `row` places icon left of label. Defaults to `column`. */
  cardDirection?: 'column' | 'row';
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  legendBold?: boolean;
  onChange?: (value: string) => void;
  name?: string;
}

export function RadioCardGroup({
  direction = 'row',
  ...props
}: RadioCardGroupProps) {
  return (
    <RadioGroup
      {...(props as RadioGroupProps)}
      variant="card"
      direction={direction}
    />
  );
}
