# Font Awesome Pro Guide

Your Foundation design system is now using **Font Awesome Pro** with access to 16,000+ icons and multiple icon styles.

## Two Ways to Use Icons

### Method 1: Icon Names (Recommended - Simple & Dynamic)

Use icon names as strings - no imports needed!

```tsx
import { Icon } from '@/components/Icon';

// Basic usage - defaults to solid style
<Icon icon="bed-front" />
<Icon icon="coffee" color="primary" />

// Specify different styles
<Icon icon="heart" style="regular" />
<Icon icon="star" style="light" size="large" />
<Icon icon="house" style="thin" color="warning" />

// With or without "fa-" prefix (both work)
<Icon icon="bed-front" />
<Icon icon="fa-bed-front" />  // Same result

// In buttons
<Button label="Add" startIcon="plus" />
<TextButton label="Delete" endIcon="trash" color="error" />
```

**Benefits:**
- No imports needed
- Easy to make icons dynamic/configurable
- Perfect for CMS-driven content
- Switch styles on the fly

### Method 2: Import Icon Definitions (Type-Safe)

Import icon objects for TypeScript type safety:

```tsx
import { faHome, faUser, faBell } from '@fortawesome/pro-solid-svg-icons';
import { faHome as faHomeRegular } from '@fortawesome/pro-regular-svg-icons';
import { Icon } from '@/components/Icon';

<Icon icon={faHome} />
<Icon icon={faHomeRegular} />
```

**Benefits:**
- TypeScript autocomplete
- Build-time verification
- Tree-shaking (only imports used icons)

## Icon Packages Available

| Package | Style | Use Case |
|---------|-------|----------|
| `@fortawesome/pro-solid-svg-icons` | **Solid** (filled) | Primary UI elements, emphasis |
| `@fortawesome/pro-regular-svg-icons` | **Regular** (outlined) | Secondary actions, subtle UI |
| `@fortawesome/pro-light-svg-icons` | **Light** (thin outline) | Delicate interfaces, large icons |
| `@fortawesome/pro-thin-svg-icons` | **Thin** (hairline) | Minimal designs, headings |
| `@fortawesome/pro-duotone-svg-icons` | **Duotone** (two-tone) | Visual interest, accents |
| `@fortawesome/sharp-solid-svg-icons` | **Sharp Solid** | Modern, geometric look |

## Icon Component Props

```tsx
interface IconProps {
  icon: IconDefinition | string;  // Icon object OR icon name string
  style?: 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'sharp';
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'text.primary' | 'text.muted' | 'text.disabled';
  'aria-label'?: string;
}
```

## How to Use

### Using Icon Names (Simple)

```tsx
import { Icon } from '@/components/Icon';

// All styles available via the style prop
<Icon icon="home" />                           // solid (default)
<Icon icon="home" style="regular" />          // outlined style
<Icon icon="home" style="light" />            // light weight
<Icon icon="home" style="thin" />             // thinnest weight

// Combine with other props
<Icon icon="star" style="thin" size="large" color="warning" />
<Icon icon="heart" style="regular" color="error" aria-label="Favorite" />

// Empty string defaults to "house" icon
<Icon icon="" />  // Shows house icon
```

**Note:** If an empty string is provided for the `icon` prop, the component defaults to the "house" icon.

### Using Icon Imports (Type-Safe)

```tsx
// Import specific icons from specific style packages
import { faHome, faUser, faBell } from '@fortawesome/pro-solid-svg-icons';
import { faHome as faHomeRegular } from '@fortawesome/pro-regular-svg-icons';
import { Icon } from '@/components/Icon';

<Icon icon={faHome} />          // Solid
<Icon icon={faHomeRegular} />   // Regular/outlined
```

### In Other Components

```tsx
// Using icon names (string)
<Button label="Add Item" startIcon="plus" />
<TextButton label="Delete" endIcon="trash" color="error" />

// OR using imported icons
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
<Button label="Add Item" startIcon={faPlus} />
<TextButton label="Delete" endIcon={faTrash} color="error" />
```

## Finding Icons

Browse all 16,000+ Pro icons at: **https://fontawesome.com/icons**

Filter by:
- **Style** (Solid, Regular, Light, Thin, Duotone, Sharp)
- **Category** (Arrows, Business, Chat, etc.)
- **Pro** toggle (see Pro-only icons)

## Icon Naming

When using icon names as strings, use the kebab-case name from Font Awesome:

| Font Awesome Name | String Usage | Import Usage |
|------------------|--------------|--------------|
| "home" | `icon="home"` | `faHome` |
| "arrow-right" | `icon="arrow-right"` | `faArrowRight` |
| "circle-check" | `icon="circle-check"` | `faCircleCheck` |
| "bed-front" | `icon="bed-front"` | `faBedFront` |

**Note:** You can optionally use the `fa-` prefix: `icon="fa-home"` works the same as `icon="home"`

## Style Recommendations

| Context | Recommended Style | Why |
|---------|------------------|-----|
| Buttons, primary actions | **Solid** | Strong, clear, recognizable |
| Secondary UI, navigation | **Regular** | Clean, unobtrusive |
| Large display icons | **Light** or **Thin** | Elegant at scale |
| Data tables, compact UI | **Solid** or **Regular** | Clarity at small sizes |
| Hero sections, marketing | **Light** or **Duotone** | Visual impact |

## Storybook Examples

Check out **Components / Icon** in Storybook to see:
- **Using Icon Names** - Examples of using string icon names (bed-front, coffee, plane, etc.)
- **Icon Name With Styles** - Same icon (star) shown in all 4 styles using icon names
- **Icon Name Example** - Interactive playground to test any icon name
- **Pro Styles** - Heart icon in Solid, Regular, Light, and Thin using imported definitions
- All standard examples (sizes, colors, etc.)

## Security Note

Your Font Awesome Pro token is stored in `.npmrc` and excluded from git via `.gitignore`. Never commit this file to version control.

## Need More Icons?

With Pro, you have access to **16,000+ icons** vs. the 2,000 in the free version. Browse the full catalog at fontawesome.com/icons with the "Pro" filter enabled.
