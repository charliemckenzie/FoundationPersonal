---
description: 'Playwright test writing guidelines for Foundation. Applies best practices for locators, assertions, test structure, and file organisation.'
applyTo: '**/*.spec.ts'
---

## Playwright + TypeScript — Test Writing Guidelines

### Code Quality Standards

- **Locators**: Prioritise user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility alignment. Use `test.step()` to group interactions and improve readability.
- **Assertions**: Use auto-retrying web-first assertions starting with `await` (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting. Never use hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that state intent clearly. Add comments only for complex logic or non-obvious interactions.

### Test Structure

- **Imports**: Always start with `import { test, expect } from '@playwright/test';`
- **Organisation**: Group related tests for a feature under a `test.describe()` block
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page)
- **Titles**: Follow the convention `Feature - Specific action or scenario`

### File Organisation

- **Location**: Store all test files in the `tests/` directory
- **Naming**: Use the convention `<feature-or-page>.spec.ts` (e.g., `login.spec.ts`, `stepper.spec.ts`)
- **Scope**: One test file per major application feature or page

### Assertion Best Practices

- **UI Structure**: Use `toMatchAriaSnapshot` to verify the accessibility tree of a component
- **Element Counts**: Use `toHaveCount` to assert the number of elements
- **Text Content**: Use `toHaveText` for exact matches and `toContainText` for partial matches
- **Navigation**: Use `toHaveURL` to verify the page URL after an action

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Investment Mix Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/investment-mix');
  });

  test('Investment Mix - user can advance through all steps', async ({ page }) => {
    await test.step('Complete step 1', async () => {
      await page.getByRole('button', { name: 'Next' }).click();
    });

    await test.step('Verify step 2 is active', async () => {
      await expect(page.getByRole('heading', { name: 'Step 2' })).toBeVisible();
    });
  });

  test('Investment Mix - shows validation error when step is invalid', async ({ page }) => {
    await test.step('Click Next without filling required fields', async () => {
      await page.getByRole('button', { name: 'Next' }).click();
    });

    await test.step('Verify error alert appears above actions', async () => {
      await expect(page.getByRole('alert')).toContainText('Please complete all required fields');
    });
  });
});
```

### Test Execution Strategy

1. Run: `npx playwright test --project=chromium`
2. Debug failures with `--debug` flag or Playwright UI mode: `npx playwright test --ui`
3. Refine locators, assertions, or test logic as needed
4. Ensure tests pass consistently before committing

### Quality Checklist

Before finalising tests:
- [ ] All locators are role-based or user-facing (not CSS selectors or test IDs unless no alternative)
- [ ] Tests are grouped logically with `test.describe()`
- [ ] `test.step()` used to document intent within a test
- [ ] Assertions use web-first async forms (`await expect(...)`)
- [ ] No hard-coded waits (`page.waitForTimeout()`)
- [ ] File is in `tests/` directory following `<feature>.spec.ts` naming
- [ ] Tests cover default state, happy path, and at least one error/edge case
