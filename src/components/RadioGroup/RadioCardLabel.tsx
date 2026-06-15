import Box from '@mui/material/Box';
import { type Theme } from '@mui/material/styles';
import { Icon } from '../Icon';
import { selectedSoftBg } from '../inputs/variantStyles';

export interface RadioCardLabelProps {
  label: string;
  description?: string;
  icon?: string;
  variant: 'boxed' | 'card';
  cardDirection: 'column' | 'row';
  isSelected: boolean;
  isItemDisabled: boolean;
}

function IconCircle({ icon, cardDirection, isSelected, isItemDisabled }: { icon: string; cardDirection: 'column' | 'row'; isSelected: boolean; isItemDisabled: boolean }) {
  const circleSize = cardDirection === 'column' ? '3rem' : '2.5rem';
  const iconSize = cardDirection === 'column' ? 'xl' : 'lg';
  return (
    <Box
      component="span"
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: circleSize,
        height: circleSize,
        borderRadius: '50%',
        flexShrink: 0,
        color: isItemDisabled
          ? theme.palette.action.disabled
          : isSelected
          ? theme.palette.primary.contrastText
          : theme.palette.primary.main,
        backgroundColor: isItemDisabled
          ? theme.palette.action.disabledBackground
          : isSelected
          ? theme.palette.primary.main
          : selectedSoftBg(theme),
      })}
    >
      <Icon icon={icon} size={iconSize} style={isSelected ? 'solid' : 'light'} color="inherit" />
    </Box>
  );
}

const descriptionSx = (isItemDisabled: boolean, isSelected: boolean) => ({
  display: 'block',
  fontSize: (t: Theme) => t.typography.small.fontSize,
  color: isItemDisabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted',
  lineHeight: 1.4,
});

export function RadioCardLabel({ label, description, icon, variant, cardDirection, isSelected, isItemDisabled }: RadioCardLabelProps) {
  if (variant !== 'card') {
    return (
      <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
        {label}
        {description && (
          <Box component="span" sx={descriptionSx(isItemDisabled, isSelected)}>{description}</Box>
        )}
      </Box>
    );
  }

  const iconCircle = icon ? <IconCircle icon={icon} cardDirection={cardDirection} isSelected={isSelected} isItemDisabled={isItemDisabled} /> : null;

  if (cardDirection === 'row') {
    return (
      <Box component="span" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, width: '100%' }}>
        {iconCircle}
        <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box component="span" sx={{ fontWeight: 500 }}>{label}</Box>
          {description && (
            <Box component="span" sx={descriptionSx(isItemDisabled, isSelected)}>{description}</Box>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%' }}>
      {iconCircle}
      <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box component="span" sx={{ fontWeight: 500, textAlign: 'center' }}>{label}</Box>
        {description && (
          <Box component="span" sx={{ ...descriptionSx(isItemDisabled, isSelected), textAlign: 'center' }}>{description}</Box>
        )}
      </Box>
    </Box>
  );
}
