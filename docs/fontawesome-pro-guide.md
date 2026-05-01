# Local SVG Icon Guide

This project uses local SVG assets from `public/icons`.

## How Icons Work

- The `Icon` component takes a string icon name.
- Icons are loaded from `public/icons/qsuper/<name>.svg`.
- Font Awesome local icons are loaded from `public/icons/font-awesome/<style>/<name>.svg`.
- Unknown names fall back to `public/icons/qsuper/general.svg`.

## Font Awesome Local Folder Structure

Use style folders under `font-awesome`:

```
public/icons/font-awesome/
  solid/
    house.svg
  light/
    house.svg
```

You can keep your source files in:

```
src/assets/icons/font-awesome/
  solid/
  light/
```

Then sync them to `public`:

```bash
npm run sync-font-awesome-icons
```

## Basic Usage

```tsx
import { Icon } from '@/components/Icon';

<Icon icon="search" />
<Icon icon="chevron_right" color="primary" />
<Icon icon="alert_2" size="lg" color="error" />

// Font Awesome local: solid/light from public/icons/font-awesome
<Icon icon="house" source="font-awesome" style="solid" />
<Icon icon="house" source="font-awesome" style="light" />
```

## Icon Props

```tsx
interface IconProps {
  icon: string;
  source?: 'qsuper' | 'art' | 'font-awesome';
  style?: 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'sharp';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'text.primary' | 'text.muted' | 'text.disabled';
  'aria-label'?: string;
}
```

Note: `style` remains for API compatibility and is not used to switch files.
For `source="font-awesome"`, use `style="solid"` or `style="light"`.

## Using Icons In Buttons

```tsx
<Button label="Add Item" startIcon="plus" />
<Button label="Delete" endIcon="delete" color="error" />

<TextButton label="Open external link" endIcon="arrow-up-right" />
<TextButton label="Download" startIcon="arrow-down-to-line" />
```

## Naming Rules

- Use the file name without `.svg`.
- Underscore names work directly (`chevron_right`).
- Legacy kebab-case aliases are supported for common values (`chevron-right`, `arrow-up-right`, `circle-info`).

## Adding New Icons

1. Add the SVG into `public/icons/qsuper`.
2. Use that filename in `icon` props.
3. If you need backward compatibility aliases, add mapping entries in `src/components/Icon/index.tsx`.

## Storybook

See `Components / Icons / Icon` for current examples and supported naming patterns.
