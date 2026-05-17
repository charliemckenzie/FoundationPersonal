// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Selector matches static palette object-notation access on brand colours, e.g.
// `theme.palette.primary.main` or `t.palette.error.dark`. Allowed forms — and the
// reason this selector skips them — :
//   - String shorthand in sx: `color: 'primary.main'` (not a MemberExpression at all)
//   - Dynamic key access: `theme.palette[color].main` (object.computed = true)
//   - Non-brand palette nodes: `theme.palette.action.active`, `text.primary`,
//     `border.focus`, `background.paper` (property.name not in the brand list)
const STATIC_BRAND_PALETTE_ACCESS =
  "MemberExpression[computed=false][property.name=/^(main|light|dark|contrastText)$/]" +
  "[object.type='MemberExpression'][object.computed=false]" +
  "[object.object.type='MemberExpression'][object.object.computed=false]" +
  "[object.object.property.name='palette']" +
  "[object.property.name=/^(primary|secondary|error|warning|info|success|tertiary|quaternary)$/]";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ...storybook.configs["flat/recommended"],
  // Foundation charter enforcement — see AGENTS.md.
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "no-restricted-syntax": [
        "warn",
        {
          selector: STATIC_BRAND_PALETTE_ACCESS,
          message:
            'Charter: in sx, prefer the string shorthand (e.g. "primary.main") over the object form theme.palette.primary.main. ' +
            "If the colour key is prop-driven, use the dynamic access form theme.palette[colorVar].main inside a callback. " +
            "See AGENTS.md > Code Quality & Standards Charter.",
        },
      ],
      // React 19 / Next 16 flag the "reset state on prop change" effect pattern as an
      // error by default. We have three legitimate cases (Icon, useDrawerDrag, the
      // AustralianAutocomplete debounce). Downgrading to warn until each is refactored
      // to the compare-in-render pattern — tracked in docs/Adam/quality-review.md.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Shared variant-style helpers legitimately use static palette access internally
  // (e.g. the MuiIconButton override's action.active fallback). They are the source
  // of truth that everywhere else delegates to.
  {
    files: [
      "src/components/buttons/variantStyles.ts",
      "src/components/inputs/variantStyles.ts",
      "src/app/themes/**/*.ts",
    ],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);

export default eslintConfig;
