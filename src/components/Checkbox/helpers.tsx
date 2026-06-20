import type React from 'react';
import Box from '@mui/material/Box';
import { type Theme } from '@mui/material/styles';
import { CheckboxCardLabel } from './CheckboxCardLabel';
import type { CheckboxVariant } from './types';

export function renderLabelContent(args: {
  label: string;
  description?: string;
  variant: CheckboxVariant;
  icon?: string;
  cardDirection: 'column' | 'row';
  isSelected: boolean;
  disabled: boolean;
}): React.ReactNode {
  const { label, description, variant, icon, cardDirection, isSelected, disabled } = args;
  if (variant === 'card') {
    return (
      <CheckboxCardLabel
        label={label}
        description={description}
        icon={icon}
        cardDirection={cardDirection}
        isSelected={isSelected}
        disabled={disabled}
      />
    );
  }
  if (description) {
    return (
      <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
        {label}
        <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => t.typography.small.fontSize, color: disabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted', lineHeight: 1.4 }}>
          {description}
        </Box>
      </Box>
    );
  }
  return label;
}
