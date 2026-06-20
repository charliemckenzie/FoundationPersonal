import React from 'react';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import { type IconColor } from '../Icon';
import type { DialogSize, DialogVariant } from './types';

export const SIZE_MAP: Record<DialogSize, 'xs' | 'sm' | 'md'> = { small: 'xs', medium: 'sm', large: 'md' };
export const VARIANT_ICONS: Record<Exclude<DialogVariant, 'neutral' | 'alert'>, string> = { info: 'info_1', warning: 'alert_1', danger: 'alert_2' };
export const VARIANT_ICON_COLOR: Record<Exclude<DialogVariant, 'neutral' | 'alert'>, IconColor> = { info: 'info', warning: 'warning', danger: 'error' };
export const VARIANT_BUTTON_COLOR: Record<Exclude<DialogVariant, 'alert'>, 'primary'> = { neutral: 'primary', info: 'primary', warning: 'primary', danger: 'primary' };

export const SlideUp = React.forwardRef<unknown, TransitionProps & { children: React.ReactElement }>(
  function SlideUp(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);
