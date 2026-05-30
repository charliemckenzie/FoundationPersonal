import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../Icon';
import { elevatedFocusRingSx } from './styles';

interface PanelFooterAction {
  icon: string;
  label: string;
  onClick: () => void;
}

interface PanelFooterProps {
  primary: PanelFooterAction;
  secondary?: PanelFooterAction;
}

type ButtonPosition = 'full' | 'left' | 'right';

function FooterButton({ action, position }: { action: PanelFooterAction; position: ButtonPosition }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={action.onClick}
      sx={(t: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        height: '100%',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
        color: 'primary.main',
        outline: 'none',
        transition: 'background-color 200ms ease',
        ...(position === 'right' && {
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderLeftColor: 'border.subtle',
        }),
        borderRadius:
          position === 'full' ? `0 0 ${t.shape.lg}px ${t.shape.lg}px`
          : position === 'left' ? `0 0 0 ${t.shape.lg}px`
          : `0 0 ${t.shape.lg}px 0`,
        '&:hover': { backgroundColor: alpha(t.palette.primary.main, 0.08) },
        '&:focus-visible': elevatedFocusRingSx,
      })}
    >
      <Icon icon={action.icon} size="md" color="primary" />
      <Typography variant="body" sx={{ fontWeight: 700 }}>
        {action.label}
      </Typography>
    </Box>
  );
}

export function PanelFooter({ primary, secondary }: PanelFooterProps) {
  return (
    <Box
      sx={(t: Theme) => ({
        borderTop: '1px solid',
        borderTopColor: 'border.subtle',
        display: 'grid',
        gridTemplateColumns: secondary ? '1fr 1fr' : '1fr',
        height: t.spacing(7),
      })}
    >
      <FooterButton action={primary} position={secondary ? 'left' : 'full'} />
      {secondary && <FooterButton action={secondary} position="right" />}
    </Box>
  );
}
