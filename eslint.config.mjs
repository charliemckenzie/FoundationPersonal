// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "storybook-static/**",
    "next-env.d.ts",
  ]),
  ...storybook.configs["flat/recommended"],
  // Foundation charter enforcement — see AGENTS.md.
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "no-restricted-syntax": [
        "error",
        {
          // Bans MUI's default Typography variants that are disabled in src/types/mui.d.ts.
          // Valid scale: display-1 → display-5, h1–h6, lead, body, small, caption, inherit.
          selector:
            "JSXAttribute[name.name='variant']" +
            "[value.type='Literal']" +
            "[value.value=/^(body1|body2|subtitle1|subtitle2|button|overline)$/]",
          message:
            "Charter: MUI default Typography variants are disabled. " +
            "Use the design system scale: display-1 → display-5, h1–h6, lead, body, small, caption. " +
            "See src/types/mui.d.ts.",
        },
      ],
      // React 19 / Next 16 flag the "reset state on prop change" effect pattern as an
      // error by default. We have three legitimate cases (Icon, useDrawerDrag, the
      // AustralianAutocomplete debounce). Downgrading to warn until each is refactored
      // to the compare-in-render pattern — tracked in docs/Adam/quality-review.md.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    files: ["src/stories/**/*.{ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
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
