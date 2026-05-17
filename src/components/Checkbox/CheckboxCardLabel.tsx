import Box from '@mui/material/Box';
import { alpha, type Theme } from '@mui/material/styles';
import { Icon } from '../Icon';
import { selectedSoftBg } from '../inputs/variantStyles';

export interface CheckboxCardLabelProps {
  label: string;
  description?: string;
  icon?: string;
  cardDirection: 'column' | 'row';
  isSelected: boolean;
  disabled: boolean;
}

function IconCircle({ icon, cardDirection, isSelected, disabled }: { icon: string; cardDirection: 'column' | 'row'; isSelected: boolean; disabled: boolean }) {
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
        color: disabled
          ? theme.palette.action.disabled
          : isSelected
          ? theme.palette.common.white
          : theme.palette.primary.main,
        backgroundColor: disabled
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

function CornerIndicator({ isSelected, disabled }: { isSelected: boolean; disabled: boolean }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={(theme) => ({
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        width: '1.125rem',
        height: '1.125rem',
        borderRadius: '0.1875rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        flexShrink: 0,
        transition: 'background-color 150ms ease, border-color 150ms ease',
        ...(isSelected
          ? {
              backgroundColor: disabled ? theme.palette.action.disabledBackground : theme.palette.primary.main,
              border: 'none',
            }
          : {
              backgroundColor: 'transparent',
              border: `1px solid ${disabled ? alpha(theme.palette.border.input, 0.6) : theme.palette.border.input}`,
            }),
      })}
    >
      {isSelected && (
        <Box component="span" sx={{ color: 'common.white', display: 'inline-flex', lineHeight: 0 }}>
          <Icon icon="check" size="sm" color="inherit" style="solid" />
        </Box>
      )}
    </Box>
  );
}

const descriptionSx = (disabled: boolean, isSelected: boolean) => ({
  display: 'block',
  fontSize: (t: Theme) => t.typography.small.fontSize,
  color: disabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted',
  lineHeight: 1.4,
});

export function CheckboxCardLabel({ label, description, icon, cardDirection, isSelected, disabled }: CheckboxCardLabelProps) {
  const iconCircle = icon ? <IconCircle icon={icon} cardDirection={cardDirection} isSelected={isSelected} disabled={disabled} /> : null;
  const cornerIndicator = <CornerIndicator isSelected={isSelected} disabled={disabled} />;

  if (cardDirection === 'row') {
    return (
      <Box component="span" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, width: '100%' }}>
        {iconCircle}
        <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box component="span" sx={{ fontWeight: 500 }}>{label}</Box>
          {description && (
            <Box component="span" sx={descriptionSx(disabled, isSelected)}>{description}</Box>
          )}
        </Box>
        {cornerIndicator}
      </Box>
    );
  }

  return (
    <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%' }}>
      {iconCircle}
      <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box component="span" sx={{ fontWeight: 500 }}>{label}</Box>
        {description && (
          <Box component="span" sx={{ ...descriptionSx(disabled, isSelected), textAlign: 'center' }}>{description}</Box>
        )}
      </Box>
      {cornerIndicator}
    </Box>
  );
}
