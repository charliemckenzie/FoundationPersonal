import MuiTooltip from '@mui/material/Tooltip';
import type React from 'react';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  arrow?: boolean;
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
  disableTouchListener?: boolean;
}

export function Tooltip({
  title,
  children,
  placement = 'top',
  arrow = true,
  disableHoverListener,
  disableFocusListener,
  disableTouchListener,
}: TooltipProps) {
  return (
    <MuiTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      disableHoverListener={disableHoverListener}
      disableFocusListener={disableFocusListener}
      disableTouchListener={disableTouchListener}
      slotProps={{
        tooltip: {
          sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1.2,
            py: 0.5,
          },
        },
      }}
    >
      {children}
    </MuiTooltip>
  );
}
