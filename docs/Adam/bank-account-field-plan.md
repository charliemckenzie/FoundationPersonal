# BankAccountField — Component Extension Plan

**Date:** 23 June 2026  
**Status:** Ready to execute  
**Prerequisite:** `BankDetailsField` component (already built and passed pipeline)

---

## What we're building

A smart composite component — `BankAccountField` — that wraps `BankDetailsField` and extends it to cover the full range of bank account management interactions across Member Online:

| Scenario | What the user sees |
|---|---|
| No saved accounts | BankDetailsField + "Verify and add" button |
| Has saved accounts | Radio cards (one per account) + optional "Add a new account" expansion |
| Management mode | Radio cards with delete buttons + add new flow |

This component handles four real-world surfaces:
- **User account settings** — view, add, delete accounts
- **Income account opening** — select or add where to receive payments
- **Lump sum withdrawal** — select or add where to pay
- **Insurance claims / forms** — select or add where to pay

The fundamental building blocks already exist:
- `BankDetailsField` — primitive input (BSB, account number, account name)
- `Dialog` (`variant="alert"`) — confirmation for delete
- `RadioGroup` (`variant="card"`) — saved account selection

---

## Recommended architecture

**One smart component** (`BankAccountField`) with well-typed props that drive its behaviour. No `mode` prop — behaviour is derived naturally from what's provided:

| What you pass | What the user gets |
|---|---|
| No `savedAccounts` (or empty array) | Add-only: BankDetailsField + Verify & Add button |
| `savedAccounts` with accounts | Selection cards + collapsible "Add a new account" panel |
| `savedAccounts` + `onDeleteAccount` | Selection cards with delete icons on each + add panel |

---

## File structure

```
src/components/BankAccountField/
  index.tsx                 ← BankAccountField component + BankAccountFieldProps
  types.ts                  ← SavedBankAccount, VerificationResult
  mockData.ts               ← MOCK_SAVED_ACCOUNTS, mock verification service
  AddNewAccountPanel.tsx    ← BankDetailsField + Verify & Add button (sub-component)
  SavedAccountsList.tsx     ← RadioGroup cards + optional delete (sub-component)

src/stories/components/BankAccountField.stories.tsx
```

---

## Types (`types.ts`)

```ts
import type { BankDetailsValue } from '../BankDetailsField';

export interface SavedBankAccount extends BankDetailsValue {
  id: string;           // unique identifier (UUID in real system)
  nickname?: string;    // optional label e.g. "My Westpac account"
}

export interface VerificationResult {
  success: boolean;
  errorMessage?: string;
}
```

---

## Props interface (`index.tsx`)

```ts
export interface BankAccountFieldProps {
  /**
   * Existing saved bank accounts for this member.
   * If absent or empty, only the add-new flow is shown.
   */
  savedAccounts?: SavedBankAccount[];

  /**
   * The currently selected account id.
   * If provided and matches a savedAccount.id, that card is pre-selected.
   */
  selectedAccountId?: string;

  /**
   * Called when the user selects a saved account.
   */
  onSelectAccount?: (account: SavedBankAccount) => void;

  /**
   * Async function to verify then add a new bank account.
   * Returns VerificationResult. If result.success is false,
   * result.errorMessage is displayed inline.
   * If absent, the add-new flow is not available.
   */
  onVerifyAndAdd?: (details: BankDetailsValue) => Promise<VerificationResult>;

  /**
   * Called when the user confirms deletion of a saved account.
   * If absent, no delete UI is shown.
   */
  onDeleteAccount?: (accountId: string) => void;

  /** Disables all interactive elements. */
  disabled?: boolean;
}
```

---

## Sub-component: `AddNewAccountPanel`

Wraps `BankDetailsField` with a "Verify and add" `Button`.

**Internal state:**
- `showValidation: boolean` — flip to `true` when button is clicked before verification
- `verifying: boolean` — `true` during the async verification call
- `verificationError: string | undefined` — inline error if verification fails

**Behaviour:**
1. User fills BSB, account number, account name
2. Clicks "Verify and add"
3. `showValidation` → `true` — if any field invalid, stops here (standard BankDetailsField errors)
4. If all fields valid → `verifying` → `true` → call `onVerifyAndAdd(details)`
5. On `result.success: false` → `verifying: false`, show `verificationError` in an `Alert` below the fields
6. On `result.success: true` → panel closes / parent updates

**Props:**
```ts
interface AddNewAccountPanelProps {
  onVerifyAndAdd: (details: BankDetailsValue) => Promise<VerificationResult>;
  disabled?: boolean;
}
```

---

## Sub-component: `SavedAccountsList`

Renders existing accounts using `RadioGroup variant="card"`.

Each card shows:
- Account name (bold)
- BSB — formatted as `XXX-XXX`
- Account number — masked as `•••• XXXX` (last 4 digits visible)
- Bank name — looked up via the BSB utilities (if recognised)
- Delete icon button — only rendered if `onDeleteAccount` is provided

**Props:**
```ts
interface SavedAccountsListProps {
  accounts: SavedBankAccount[];
  selectedId?: string;
  onSelect: (account: SavedBankAccount) => void;
  onDeleteRequest: (account: SavedBankAccount) => void;  // opens confirmation
  showDeleteButtons: boolean;
  disabled?: boolean;
}
```

**RadioGroup option shape:**
Each account maps to a `RadioOption`. The `label` is the account name; the full card content is rendered via the `description` slot or a custom render prop (check `RadioGroup` API — may need a `renderOption` or `description` field to display BSB + account number beneath the label).

> **Note for Lenny:** Read `src/components/RadioGroup/index.tsx` and the RadioGroup stories before implementing this sub-component to understand the exact card rendering API.

---

## `BankAccountField` — full component behaviour

```
savedAccounts empty/absent + onVerifyAndAdd provided
  → Show AddNewAccountPanel only

savedAccounts has items
  → Show SavedAccountsList
  → If onVerifyAndAdd provided: show "Add a new account" Button below the list
     → clicking expands AddNewAccountPanel inline (accordion/show-hide)
  → If onDeleteAccount provided: pass showDeleteButtons={true} to SavedAccountsList

Delete flow:
  1. User clicks delete icon on a card
  2. Dialog (variant="alert") opens inline in index.tsx — no wrapper sub-component needed
     title: "Delete bank account?"
     description: "BSB [bsb] · Account [masked number] will be removed. This cannot be undone."
     confirmLabel: "Delete account" / cancelLabel: "Keep account"
  3. User confirms → onDeleteAccount(account.id) called → dialog closes
  4. User cancels → dialog closes (no action)
```

---

## Mock data (`mockData.ts`)

```ts
import type { SavedBankAccount } from './types';
import type { BankDetailsValue } from '../BankDetailsField';
import type { VerificationResult } from './types';

export const MOCK_SAVED_ACCOUNTS: SavedBankAccount[] = [
  {
    id: 'acc-001',
    bsb: '062-000',
    accountNumber: '12345678',
    accountName: 'Jane Smith',
    nickname: 'CBA Everyday',
  },
  {
    id: 'acc-002',
    bsb: '032-001',
    accountNumber: '87654321',
    accountName: 'Jane Smith',
    nickname: 'Westpac Savings',
  },
];

export const MOCK_SAVED_ACCOUNTS_SINGLE: SavedBankAccount[] = [
  MOCK_SAVED_ACCOUNTS[0],
];

export const MOCK_SAVED_ACCOUNTS_EMPTY: SavedBankAccount[] = [];

/**
 * Mock verification service.
 * Simulates network latency (1.2s).
 * BSB starting with "999" is treated as invalid (for demo purposes).
 */
export async function mockVerifyAndAdd(
  details: BankDetailsValue
): Promise<VerificationResult> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  if (details.bsb.startsWith('999')) {
    return {
      success: false,
      errorMessage:
        'We could not verify this account. Check the BSB and account number and try again.',
    };
  }
  return { success: true };
}
```

---

## Storybook stories

Story file: `src/stories/components/BankAccountField.stories.tsx`  
Title: `'Form Components / BankAccountField'`

| Story | Props | Shows |
|---|---|---|
| `AddOnly` | No `savedAccounts`, `onVerifyAndAdd={mockVerifyAndAdd}` | Add-new flow; BSB `999-000` triggers failure |
| `SelectFromSaved` | `savedAccounts={MOCK_SAVED_ACCOUNTS}`, `onSelectAccount` | Two radio cards, no delete, no add |
| `SelectWithAdd` | `savedAccounts={MOCK_SAVED_ACCOUNTS}`, `onVerifyAndAdd`, `onSelectAccount` | Cards + "Add a new account" panel |
| `FullManagement` | All props including `onDeleteAccount` | Cards with delete icons, add new flow, delete dialog |
| `SingleAccount` | `savedAccounts={MOCK_SAVED_ACCOUNTS_SINGLE}`, `onDeleteAccount`, `onVerifyAndAdd` | One card + delete + add (edge case) |
| `Disabled` | `savedAccounts={MOCK_SAVED_ACCOUNTS}`, `disabled` | All controls non-interactive |

---

## Use-case prop mapping

| Surface | `savedAccounts` | `onSelectAccount` | `onVerifyAndAdd` | `onDeleteAccount` |
|---|---|---|---|---|
| User account settings (manage) | From API | ✓ | ✓ | ✓ |
| Income account opening | From API | ✓ | ✓ | — |
| Lump sum withdrawal | From API | ✓ | ✓ | — |
| Insurance form | From API | ✓ | ✓ | — |
| Change income account bank | From API | ✓ | ✓ | — |

In the mock/demo setup: pass `MOCK_SAVED_ACCOUNTS` (or `MOCK_SAVED_ACCOUNTS_EMPTY`) and `mockVerifyAndAdd` from `mockData.ts`.

---

## BSB masking utility

Add a `maskAccountNumber(accountNumber: string): string` helper to `utils.ts` inside `BankAccountField/`:

```ts
// Shows last 4 digits: "12345678" → "•••• 5678"
export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber;
  return `•••• ${accountNumber.slice(-4)}`;
}
```

---

## Account number masking — security note

Account numbers are masked in the UI for display (last 4 visible). The full account number should never be logged, never included in analytics events, and never stored in `localStorage`. The mock service can hold full data in memory only.

---

## Dependencies

All already exist in Foundation:
- `BankDetailsField` — just built
- `Dialog` (`src/components/Dialog/`) — used directly in `index.tsx` for delete confirmation
- `RadioGroup` (`src/components/RadioGroup/`) with `variant="card"`
- `Button` — for "Verify and add" and "Add a new account"
- `Alert` — for inline verification error
- `Stack`, `Box`, `Typography` — layout

No new dependencies needed.

---

## Pipeline

```
Moe → approve BankAccountField API (sub-components + full props)
  → Lenny → build (4 files: index, types, mockData, 3 sub-components)
  → Chalmers → quality review
  → Flanders → a11y (focus management when add panel expands; delete dialog focus)
  → Marge → visual consistency (card layout, masking display)
  → Lisa → Storybook stories (6 stories)
  → Willie → status entry (draft)
```

---

## Key a11y concerns for Flanders

Flag these proactively to Lenny before build:

1. **Add panel expand/collapse** — when "Add a new account" button is clicked, focus must move to the first field in the panel. Use `useRef` + `.focus()` after the panel opens.
2. **Delete dialog focus** — when the dialog opens, focus lands on the "Keep account" (cancel) button by default, not the destructive action. `Dialog` component handles this via MUI — confirm it's correct.
3. **After delete** — when a deleted account is removed from the list, focus must move somewhere logical (previous card, or the "Add new" button if no accounts remain).
4. **Radio card aria** — `RadioGroup variant="card"` renders proper `role="radio"` — verify account details inside each card are readable as a whole, not just the label.
5. **Verification loading state** — "Verify and add" button must show `aria-busy="true"` or equivalent while verifying, and the button label should change to "Verifying…".
6. **Verification error** — the `Alert` that appears after a failed verification needs `role="alert"` so AT users hear it immediately. Foundation `Alert` likely handles this.

---

## Open questions (resolved in planning)

| Question | Decision |
|---|---|
| Verification service | Mock — `async` function interface, swappable for real API |
| Failure UX | Inline error (Alert below fields), user can correct and retry |
| Account source | Passed as `savedAccounts` prop from the parent |
| Display style | RadioGroup `variant="card"` |
| Account cap | No limit assumed |
| Delete confirmation | Dialog `variant="alert"` |
| Component architecture | Single composite component, behaviour derived from props |
| PayID | Not in scope for now |

---

## Implementation order

1. `types.ts` — `SavedBankAccount`, `VerificationResult`
2. `mockData.ts` — mock accounts + `mockVerifyAndAdd`
3. `AddNewAccountPanel.tsx` — `BankDetailsField` + verify flow
4. `SavedAccountsList.tsx` — RadioGroup cards with optional delete
5. `index.tsx` — assembles sub-components + Dialog directly, exposes `BankAccountFieldProps`
6. Stories file

Do not start `index.tsx` until sub-components are working in isolation.
