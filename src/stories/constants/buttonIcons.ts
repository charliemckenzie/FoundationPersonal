/**
 * Curated list of Font Awesome icon names for button story controls.
 *
 * These are the icons available in the project's FA set that make sense
 * as button icons. To add or remove options, edit this file — all button
 * stories will update automatically.
 *
 * Icon names match the filenames in /public/icons/font-awesome/solid/
 * (strip the `-solid-full.svg` suffix).
 */
export const BUTTON_ICON_OPTIONS = [
  // Navigation / direction
  'arrow-right',
  'arrow-left',
  'arrow-up-right',
  'arrow-down-to-line',
  'chevron-right',
  'chevron-left',
  'chevron-down',
  'chevron-up',
  // Actions
  'plus',
  'minus',
  'xmark',
  'check',
  'magnifying-glass',
  'key',
  'lock',
  // Feedback / status
  'circle-check',
  'circle-info',
  'circle-question',
  'circle-plus',
  'circle-minus',
  'triangle-exclamation',
  // Content
  'bars',
  'ellipsis',
  'gift',
  'house',
  'piggy-bank',
  'umbrella',
  'circle-dollar',
  'magnifying-glass-dollar',
] as const;

export type ButtonIconOption = (typeof BUTTON_ICON_OPTIONS)[number] | '';
