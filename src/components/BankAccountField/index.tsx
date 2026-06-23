import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { SavedAccountsList } from './SavedAccountsList';
import { AddNewAccountPanel } from './AddNewAccountPanel';
import type { SavedBankAccount, VerificationResult } from './types';
import type { BankDetailsValue } from '../BankDetailsField';

export type { SavedBankAccount, VerificationResult };

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
   * If absent, the add-new flow is not shown.
   */
  onVerifyAndAdd?: (details: BankDetailsValue) => Promise<VerificationResult>;

  /**
   * Called when the user confirms deletion of a saved account.
   * If absent, no delete UI is shown.
   */
  onDeleteAccount?: (accountId: string) => void;

  /** Disables all interactive elements. */
  disabled?: boolean;

  /** Mask account numbers to show only the last 4 digits. Defaults to `true`. */
  maskAccountNumbers?: boolean;
}

export function BankAccountField({
  savedAccounts,
  selectedAccountId,
  onSelectAccount,
  onVerifyAndAdd,
  onDeleteAccount,
  disabled = false,
  maskAccountNumbers = false,
}: BankAccountFieldProps) {
  const [addedAccounts, setAddedAccounts] = useState<SavedBankAccount[]>([]);
  const [activeSelectedId, setActiveSelectedId] = useState<string | undefined>(selectedAccountId);
  const [addPanelOpen, setAddPanelOpen] = useState(!(savedAccounts && savedAccounts.length > 0));
  const [pendingDelete, setPendingDelete] = useState<SavedBankAccount | null>(null);
  const [focusListAfterDelete, setFocusListAfterDelete] = useState(false);

  const allAccounts = [...(savedAccounts ?? []), ...addedAccounts];
  const addedAccountIds: ReadonlySet<string> = new Set(addedAccounts.map((a) => a.id));
  const hasSavedAccounts = allAccounts.length > 0;
  const showDeleteButtons = Boolean(onDeleteAccount);
  const showAddNew = Boolean(onVerifyAndAdd);

  // Track the pre-panel selection so Cancel can restore it
  const prevSelectedIdRef = useRef<string | undefined>(undefined);

  // Focus management: when the add-new panel opens, focus moves to its first field
  const addPanelFirstFocusRef = useRef<HTMLElement | null>(null);
  const addNewButtonRef = useRef<HTMLButtonElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const addPanelId = useId();

  function handleOpenAddPanel() {
    prevSelectedIdRef.current = activeSelectedId;
    setActiveSelectedId(undefined);
    setAddPanelOpen(true);
    // Move focus after the panel opens (next tick)
    requestAnimationFrame(() => {
      const el = addPanelFirstFocusRef.current;
      if (el) {
        const first = el.querySelector<HTMLElement>(
          'input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        );
        first?.focus();
      }
    });
  }

  function handleCancelAdd() {
    setActiveSelectedId(prevSelectedIdRef.current);
    setAddPanelOpen(false);
  }

  function handleVerify(details: BankDetailsValue): Promise<VerificationResult> {
    return onVerifyAndAdd!(details);
  }

  function handleAddConfirmed(details: BankDetailsValue) {
    const newAccount: SavedBankAccount = {
      id: `local-${Date.now()}`,
      bsb: details.bsb,
      accountNumber: details.accountNumber,
      accountName: details.accountName,
    };
    setAddedAccounts((prev) => [...prev, newAccount]);
    setActiveSelectedId(newAccount.id);
    onSelectAccount?.(newAccount);
    setAddPanelOpen(false);
  }

  function handleDeleteRequest(account: SavedBankAccount) {
    setPendingDelete(account);
  }

  function handleDeleteConfirm() {
    if (pendingDelete) {
      onDeleteAccount!(pendingDelete.id);
      setFocusListAfterDelete(true);
    }
    setPendingDelete(null);
  }

  // After deletion, move focus to the first remaining radio or the add button
  useEffect(() => {
    if (!focusListAfterDelete) return;
    setFocusListAfterDelete(false);
    requestAnimationFrame(() => {
      const list = listContainerRef.current;
      if (list) {
        const firstRadio = list.querySelector<HTMLElement>('input[type="radio"]:not([disabled])');
        if (firstRadio) { firstRadio.focus(); return; }
      }
      addNewButtonRef.current?.focus();
    });
  }, [savedAccounts, focusListAfterDelete]);

  function handleDeleteCancel() {
    setPendingDelete(null);
  }

  return (
    <>
      <Stack spacing={2}>
        {/* Saved accounts selection */}
        {hasSavedAccounts && (
          <div ref={listContainerRef}>
            <SavedAccountsList
              accounts={allAccounts}
              selectedId={addPanelOpen ? undefined : activeSelectedId}
              onSelect={(account) => {
                setActiveSelectedId(account.id);
                onSelectAccount?.(account);
              }}
              onDeleteRequest={handleDeleteRequest}
              showDeleteButtons={showDeleteButtons}
              nonDeletableIds={addedAccountIds}
              maskAccountNumbers={maskAccountNumbers}
              disabled={disabled}
            />
          </div>
        )}

        {/* Add new account — shown inline when no saved accounts exist,
            or expanded via a toggle button when saved accounts are present */}
        {showAddNew && hasSavedAccounts && !addPanelOpen && (
          <Button
            label="Add a new account"
            variant="outlined"
            startIcon="plus"
            disabled={disabled}
            onClick={handleOpenAddPanel}
            type="button"
            aria-expanded={addPanelOpen}
            aria-controls={addPanelId}
            ref={addNewButtonRef as React.RefObject<HTMLButtonElement>}
          />
        )}

        {showAddNew && (
          <div id={addPanelId}>
            <Collapse in={addPanelOpen} unmountOnExit>
              <AddNewAccountPanel
                onVerify={handleVerify}
                onAddConfirmed={handleAddConfirmed}
                onCancel={hasSavedAccounts ? handleCancelAdd : undefined}
                disabled={disabled}
                firstFocusRef={addPanelFirstFocusRef}
              />
            </Collapse>
          </div>
        )}

      </Stack>

      {/* Delete confirmation dialog */}
      {pendingDelete && (
        <Dialog
          open={Boolean(pendingDelete)}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          variant="alert"
          title="Delete bank account?"
          description={`BSB ${pendingDelete.bsb} · account ending ${pendingDelete.accountNumber.slice(-4)} will be removed. This cannot be undone.`}
          confirmLabel="Delete account"
          cancelLabel="Keep account"
        />
      )}
    </>
  );
}
