import React from 'react';
import type { DescriptionListContextValue, DescriptionListDensity } from './types';

export const densityPy: Record<DescriptionListDensity, number> = {
  condensed: 1,
  default: 1.5,
  spaced: 2,
};

export const DescriptionListContext = React.createContext<DescriptionListContextValue>({
  valueAlign: 'left',
  density: 'default',
});
