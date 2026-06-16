import React, { useState } from 'react';
import MuiIconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import { Icon, type IconSize } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Dialog } from '../Dialog';
import type { TooltipPlacement } from '../Tooltip';
import {
  buildGhostStyles,
  buildFocusStyles,
} from '../buttons/variantStyles';

export type InfoButtonMode = 'tooltip' | 'dialog';
export type InfoButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface InfoButtonTooltipProps {
  /** Content to show in the tooltip. */
  tooltip: React.ReactNode;
  dialogTitle?: never;
  dialogContent?: never;
}

export interface InfoButtonDialogProps {
  /** Title for the info dialog. */
  dialogTitle: string;
  /** Content to show inside the dialog body. */
  dialogContent: React.ReactNode;
  tooltip?: never;
}

export type InfoButtonProps = (InfoButtonTooltipProps | InfoButtonDialogProps) & {
  /** Accessible label for the button. Defaults to "More information". */
  label?: string;
  /** Font Awesome icon name. Defaults to "circle-info". */
  icon?: string;
  /** Button size. Defaults to "md". */
  size?: InfoButtonSize;
  /** Tooltip placement (tooltip mode only). Defaults to "top". */
  placement?: TooltipPlacement;
  sx?: SxProps<Theme>;
};

/** Hit-target dimension for each size, in rem. */
const DIMENSION: Record<InfoButtonSize, string> = {
  sm: '1.5rem',   // 24px
  md: '1.75rem',  // 28px
  lg: '2rem',     // 32px
  xl: '2.25rem',  // 36px
};

/** Icon size that best fills the hit target at each button size. */
const ICON_SIZE: Record<InfoButtonSize, IconSize> = {
  sm: 'lg',   // 20px in 24px
  md: 'xl',   // 24px in 28px
  lg: 'xl+',  // 28px in 32px
  xl: '2xl',  // 32px in 36px
};

const ghostStyles = buildGhostStyles('primary');
const focusStyles = buildFocusStyles(false, 'primary');

export function InfoButton({
  label = 'More information',
  icon = 'circle-info',
  size = 'md',
  placement = 'top',
  sx,
  ...modeProps
}: InfoButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const dimension = DIMENSION[size];

  const button = (
    <MuiIconButton
      aria-label={label}
      disableRipple
      onClick={'dialogContent' in modeProps ? () => setDialogOpen(true) : undefined}
      sx={[
        {
          display: 'inline-flex',
          verticalAlign: 'middle',
          alignItems: 'center',
          justifyContent: 'center',
          width: dimension,
          height: dimension,
          minWidth: dimension,
          minHeight: dimension,
          p: 0,
          borderRadius: '50%',
          ...ghostStyles,
          ...focusStyles,
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Icon icon={icon} style="regular" size={ICON_SIZE[size]} color="inherit" />
    </MuiIconButton>
  );

  if ('dialogContent' in modeProps) {
    return (
      <>
        {button}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title={modeProps.dialogTitle}
          hideCancel
          confirmLabel="Close"
          onConfirm={() => setDialogOpen(false)}
          variant="info"
        >
          {modeProps.dialogContent}
        </Dialog>
      </>
    );
  }

  return (
    <Tooltip title={modeProps.tooltip} placement={placement} arrow>
      {button}
    </Tooltip>
  );
}
