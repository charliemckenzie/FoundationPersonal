'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MuiRadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import type { Theme } from '@mui/material/styles';
import { MoneyField } from '../../../components/MoneyField';
import { Icon } from '../../../components/Icon';
import { Alert } from '../../../components/Alert';
import type { LifestyleOption } from '../types';
import { getLifestyleOptions } from '../constants';
import type { StepErrors } from '../RetirementProjectionFlow';

interface StepLifestyleProps {
  lifestyle: LifestyleOption | null;
  customTarget: string;
  couple?: boolean;
  homeowner?: boolean;
  errors?: Pick<StepErrors, 'lifestyle' | 'customTarget'>;
  onLifestyleChange: (value: LifestyleOption) => void;
  onCustomTargetChange: (value: number | null) => void;
  sectionLabel?: string;
}

/*
 * The lifestyle cards keep the rich visual design (illustration, headline
 * amount, embedded custom field) that Foundation's RadioGroup card variant
 * can't render, but use the same accessibility technique it does: a real
 * radio per card, visually hidden, inside one MUI RadioGroup so screen
 * readers and arrow keys get a standard radio group. If another flow needs
 * this card style, it belongs in RadioGroup itself (Moe's call).
 */

const hiddenRadioSx = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  opacity: 0,
  p: 0,
  m: 0,
  overflow: 'hidden',
  '&.Mui-focusVisible': { outline: 'none' },
};

const cardSx = (isSelected: boolean) => (t: Theme) => ({
  m: 0,
  p: 3,
  width: '100%',
  borderRadius: '0.75rem',
  border: '2px solid',
  borderColor: isSelected ? 'primary.main' : 'border.default',
  backgroundColor: isSelected ? t.palette.primary.softMain : 'background.paper',
  cursor: 'pointer',
  transition: 'all 150ms ease',
  ...(!isSelected && { '&:hover': { backgroundColor: 'action.hover' } }),
  '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
});

export function StepLifestyle({
  lifestyle,
  customTarget,
  couple = false,
  homeowner = true,
  errors,
  onLifestyleChange,
  onCustomTargetChange,
  sectionLabel,
}: StepLifestyleProps) {
  const lifestyleOptions = getLifestyleOptions(couple, homeowner);
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        columnGap: { xs: 0, md: 3 },
        rowGap: 3,
      }}
    >
      <Box sx={{ gridColumn: { md: '1 / 6' } }}>
        {sectionLabel && (
          <Typography variant="small" sx={{ display: 'block', fontWeight: 600, mb: 1, color: 'text.muted' }}>
            {sectionLabel}
          </Typography>
        )}
        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
          Choose the lifestyle you&rsquo;d like to plan for
        </Typography>
        <Typography variant="body" color="text.muted" sx={{ mb: 2, lineHeight: 1.75 }}>
          We&rsquo;ll use this as your target retirement income. You can choose one of these options or enter your own target.
        </Typography>
        <Typography variant="body" color="text.muted" sx={{ mb: 3 }}>
          These options are estimates only and may not reflect your exact spending needs.
        </Typography>
        <Box sx={{ mt: 3 }}>
        <Alert
          severity="info"
          title="ASFA Retirement Standard"
          icon={<Icon icon="circle-info" color="inherit" size="lg" />}
          message={
            <Typography variant="small" color="text.muted">
              The Association of Superannuation Funds of Australia publishes benchmarks for retirement income. &ldquo;Modest&rdquo; covers basic needs; &ldquo;Comfortable&rdquo; includes leisure, travel, and better healthcare.{' '}
              <Typography component="a" href="https://www.superannuation.asn.au/resources/retirement-standard/" target="_blank" rel="noopener noreferrer" variant="small" color="primary.main" sx={{ textDecoration: 'underline' }}>
                Find out more here.
              </Typography>
            </Typography>
          }
        />
        </Box>
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <MuiRadioGroup
          aria-label="Target retirement lifestyle"
          value={lifestyle ?? ''}
          onChange={(e) => onLifestyleChange(e.target.value as LifestyleOption)}
          sx={{ gap: 2 }}
        >
          {lifestyleOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio disableRipple disableTouchRipple sx={hiddenRadioSx} />}
              sx={cardSx(lifestyle === option.value)}
              label={
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box component="img" src={option.image} alt="" sx={{ width: '2rem', height: '2rem', flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body" component="span" sx={{ fontWeight: 600, display: 'block' }}>
                      {option.label}
                    </Typography>
                    <Typography variant="h4" component="span" color="primary.main" sx={{ my: 0.25, display: 'block' }}>
                      {option.yearlyAmount}
                    </Typography>
                    <Typography variant="small" component="span" color="text.muted" sx={{ display: 'block' }}>
                      {option.description}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          ))}

          {/* Custom amount card — the field sits beside the radio's label, never inside it */}
          <Box sx={cardSx(lifestyle === 'custom')} onClick={() => onLifestyleChange('custom')}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box component="img" src="/images/asfa-custom.svg" alt="" sx={{ width: '2rem', height: '2rem', flexShrink: 0, mt: '2px' }} />
              <Box sx={{ flex: 1 }}>
                <FormControlLabel
                  value="custom"
                  control={<Radio disableRipple disableTouchRipple sx={hiddenRadioSx} />}
                  sx={{ m: 0, mb: 1.5, display: 'flex' }}
                  label={
                    <Typography variant="body" component="span" sx={{ fontWeight: 600 }}>
                      Custom amount
                    </Typography>
                  }
                />
                <MoneyField
                  label=""
                  placeholder="Enter amount per year"
                  error={!!errors?.customTarget}
                  helperText={errors?.customTarget ?? 'Enter your own target retirement income'}
                  value={customTarget ? Number(customTarget) : null}
                  onChange={onCustomTargetChange}
                />
              </Box>
            </Box>
          </Box>
        </MuiRadioGroup>

        {errors?.lifestyle && (
          <FormHelperText error role="alert" sx={{ m: 0, mt: 1 }}>
            {errors.lifestyle}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
}
