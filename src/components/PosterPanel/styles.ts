import type { PosterPanelGradientDirection } from './types';

const GRADIENT_CSS_DIRECTION: Record<PosterPanelGradientDirection, string> = {
  'from-left': 'to right',
  'from-right': 'to left',
  'from-bottom': 'to top',
};

export function buildGradient(direction: PosterPanelGradientDirection, color: string): string {
  return `linear-gradient(${GRADIENT_CSS_DIRECTION[direction]}, ${color} 0%, transparent 70%)`;
}
