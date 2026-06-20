import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import { RadioUncheckedIcon, RadioCheckedIcon } from './icons';
import { RadioCardLabel } from './RadioCardLabel';
import { cardContainerSx, cardRadioSx, defaultRadioSx, buttonContainerSx } from './styles';
import type { RadioColor, RadioGroupVariant, RadioOption, RadioSize } from './types';

interface RadioOptionItemProps {
  option: RadioOption;
  variant: RadioGroupVariant;
  color: RadioColor;
  size: RadioSize;
  cardDirection: 'column' | 'row';
  groupDisabled: boolean;
  resolvedValue: string;
}

export function RadioOptionItem({
  option,
  variant,
  color,
  size,
  cardDirection,
  groupDisabled,
  resolvedValue,
}: RadioOptionItemProps) {
  const isBoxedOrCard = variant === 'boxed' || variant === 'card';
  const isButton = variant === 'button';
  const isItemDisabled = groupDisabled || (option.disabled ?? false);
  const isSelected = (isBoxedOrCard || isButton) && option.value === resolvedValue;

  const labelNode = isBoxedOrCard ? (
    <RadioCardLabel
      label={option.label}
      description={option.description}
      icon={option.icon}
      variant={variant as 'boxed' | 'card'}
      cardDirection={cardDirection}
      isSelected={isSelected}
      isItemDisabled={isItemDisabled}
    />
  ) : option.description ? (
    <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
      {option.label}
      <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => t.typography.small.fontSize, color: isItemDisabled ? 'text.disabled' : 'text.muted', lineHeight: 1.4 }}>
        {option.description}
      </Box>
    </Box>
  ) : option.label;

  if (isButton) {
    return (
      <FormControlLabel
        value={option.value}
        label={option.label}
        disabled={isItemDisabled}
        sx={buttonContainerSx({ isSelected, isItemDisabled })}
        control={
          <Radio
            color={color}
            size={size}
            disableRipple
            disableTouchRipple
            sx={cardRadioSx}
          />
        }
      />
    );
  }

  if (!isBoxedOrCard) {
    return (
      <FormControlLabel
        value={option.value}
        label={labelNode}
        disabled={isItemDisabled}
        sx={{ ml: 0, gap: 1.25, alignItems: option.description ? 'flex-start' : 'center' }}
        control={
          <Radio
            color={color}
            size={size}
            disableRipple
            disableTouchRipple
            icon={<RadioUncheckedIcon disabled={isItemDisabled} />}
            checkedIcon={<RadioCheckedIcon />}
            sx={defaultRadioSx}
          />
        }
      />
    );
  }

  return (
    <FormControlLabel
      value={option.value}
      label={labelNode}
      disabled={isItemDisabled}
      sx={cardContainerSx({
        variant: variant as 'boxed' | 'card',
        cardDirection,
        description: !!option.description,
        isSelected,
        isItemDisabled,
      })}
      control={
        <Radio
          color={color}
          size={size}
          disableRipple
          disableTouchRipple
          icon={variant === 'card' ? undefined : <RadioUncheckedIcon disabled={isItemDisabled} />}
          checkedIcon={variant === 'card' ? undefined : <RadioCheckedIcon />}
          sx={variant === 'card' ? cardRadioSx : defaultRadioSx}
        />
      }
    />
  );
}
