import Typography from '@mui/material/Typography';
import type React from 'react';
import { Button } from '../Button';
import { TextButton } from '../TextButton';
import type {
  CardBodyVariant,
  CardCta,
  CardHeaderLevel,
  CardHeaderVariant,
} from './types';

export function renderSectionText(
  value: React.ReactNode,
  variantName: CardHeaderVariant | CardBodyVariant,
  component: CardHeaderLevel | 'p',
  color: 'text.heading' | 'text.primary',
  marginBottom: number,
) {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return (
      <Typography variant={variantName} component={component} color={color} sx={{ mb: marginBottom }}>
        {value}
      </Typography>
    );
  }

  return value;
}

export function renderCta(cta: CardCta, role: 'primary' | 'secondary') {
  const kind = cta.kind ?? 'button';

  if (kind === 'textButton') {
    return <TextButton label={cta.label} onClick={cta.onClick} />;
  }

  return (
    <Button
      label={cta.label}
      variant={role === 'primary' ? 'contained' : 'outlined'}
      onClick={cta.onClick}
    />
  );
}
