'use client';

import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ListItemText from '@mui/material/ListItemText';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { Theme } from '@mui/material/styles';
import { IconButton } from '../../../components/IconButton';
import { Icon } from '../../../components/Icon';
import { buildInputStyles, selectedSoftBg } from '../../../components/inputs/variantStyles';
import { DescriptionList } from '../../../components/DescriptionList';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { TextField } from '../../../components/TextField';
import { Alert } from '../../../components/Alert';
import { Dialog } from '../../../components/Dialog';
import type { SavedBankAccount } from '../types';
import { parseBsbDigits, formatBsb, lookupBsbBank, verifyBankAccount } from '../utils';

// ── Bank card helpers ─────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days === 0) return 'Today';
  if (days === 1) return '1d ago';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1mo ago' : `${months}mo ago`;
}

export interface BankAccountSelectorProps {
  savedAccounts: SavedBankAccount[];
  onSelectAccount: (account: SavedBankAccount) => void;
  onNewAccountVerified: (details: { bsb: string; accountNumber: string; accountName: string; resolvedName: string; saveAccount: boolean }) => void;
  showValidation?: boolean;
}

export function BankAccountSelector({
  savedAccounts,
  onSelectAccount,
  onNewAccountVerified,
  showValidation = false,
}: BankAccountSelectorProps) {
  const sortedAccounts = useMemo(
    () => [...savedAccounts].sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()),
    [savedAccounts],
  );

  const hasAccounts = sortedAccounts.length > 0;
  const displayAccounts = sortedAccounts.slice(0, 3);

  const [selectedId, setSelectedId] = useState<string>('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<SavedBankAccount | null>(null);

  // Edit dialog state
  const [editBsb, setEditBsb] = useState('');
  const [editAccountNumber, setEditAccountNumber] = useState('');
  const [editAccountName, setEditAccountName] = useState('');
  const [editVerifyState, setEditVerifyState] = useState<'idle' | 'verified'>('idle');
  const [editResolvedName, setEditResolvedName] = useState<string | null>(null);

  // New account form state
  const [newBsb, setNewBsb] = useState('');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const [verifyState, setVerifyState] = useState<'idle' | 'verified'>('idle');
  const [resolvedName, setResolvedName] = useState<string | null>(null);
  const [saveAccount, setSaveAccount] = useState(false);
  const [confirmedAccount, setConfirmedAccount] = useState<{ bsb: string; accountNumber: string; accountName: string; bankName: string | null } | null>(null);

  // New account validation
  const bsbDigits = parseBsbDigits(newBsb);
  const bsbBankName = lookupBsbBank(newBsb);
  const bsbValid = bsbDigits.length === 6;
  const accountNumberValid = newAccountNumber.length >= 6;
  const accountNameValid = newAccountName.trim().length > 0;
  const canVerify = bsbValid && accountNumberValid && accountNameValid;

  const duplicateAccount = useMemo(() => {
    if (!bsbValid || !accountNumberValid) return null;
    const normalizedBsb = bsbDigits;
    const normalizedAccount = newAccountNumber.replace(/\D/g, '');
    return savedAccounts.find(
      (acc) => acc.bsb.replace(/\D/g, '') === normalizedBsb && acc.accountNumber.replace(/\D/g, '') === normalizedAccount,
    );
  }, [savedAccounts, bsbDigits, bsbValid, newAccountNumber, accountNumberValid]);

  const nameMismatch = resolvedName !== null && newAccountName.trim().toLowerCase() !== resolvedName.trim().toLowerCase();

  const showBsbError = showValidation && !bsbValid && newBsb.length > 0;
  const showAccountError = showValidation && !accountNumberValid && newAccountNumber.length > 0;
  const showAccountNameError = showValidation && !accountNameValid && newAccountName.length > 0;

  // Edit dialog validation
  const editBsbDigits = parseBsbDigits(editBsb);
  const editBsbBankName = lookupBsbBank(editBsb);
  const editBsbValid = editBsbDigits.length === 6;
  const editAccountNumberValid = editAccountNumber.length >= 6;
  const editAccountNameValid = editAccountName.trim().length > 0;
  const canEditVerify = editBsbValid && editAccountNumberValid && editAccountNameValid;
  const editNameMismatch = editResolvedName !== null && editAccountName.trim().toLowerCase() !== editResolvedName.trim().toLowerCase();

  function handleSelectSavedAccount(id: string) {
    setSelectedId(id);
    const account = sortedAccounts.find((a) => a.id === id);
    if (account) onSelectAccount(account);
    // Clear new account form
    setNewBsb('');
    setNewAccountNumber('');
    setNewAccountName('');
    setVerifyState('idle');
    setResolvedName(null);
    setSaveAccount(false);
    setConfirmedAccount(null);
  }

  function handleOpenEdit(account: SavedBankAccount) {
    setEditingAccount(account);
    setEditBsb(account.bsb);
    setEditAccountNumber(account.accountNumber);
    setEditAccountName(account.accountName);
    setEditVerifyState('idle');
    setEditResolvedName(null);
    setEditDialogOpen(true);
  }

  function handleEditVerify() {
    const result = verifyBankAccount(editBsb, editAccountNumber);
    if (result.success && result.accountHolderName) {
      setEditResolvedName(result.accountHolderName);
      setEditVerifyState('verified');
    }
  }

  function handleEditConfirm() {
    if (editResolvedName && editingAccount) {
      onNewAccountVerified({ bsb: editBsb, accountNumber: editAccountNumber, accountName: editAccountName, resolvedName: editResolvedName, saveAccount: true });
      setEditDialogOpen(false);
      setEditingAccount(null);
    }
  }

  function handleUseDuplicate() {
    if (duplicateAccount) {
      setSelectedId(duplicateAccount.id);
      onSelectAccount(duplicateAccount);
      setNewBsb('');
      setNewAccountNumber('');
      setNewAccountName('');
      setVerifyState('idle');
      setResolvedName(null);
    }
  }

  function handleVerifyAccount() {
    const result = verifyBankAccount(newBsb, newAccountNumber);
    if (result.success && result.accountHolderName) {
      setResolvedName(result.accountHolderName);
      setVerifyState('verified');
    }
  }

  function handleConfirmAccount() {
    if (resolvedName) {
      onNewAccountVerified({ bsb: newBsb, accountNumber: newAccountNumber, accountName: newAccountName, resolvedName, saveAccount });
      setConfirmedAccount({ bsb: newBsb, accountNumber: newAccountNumber, accountName: newAccountName, bankName: lookupBsbBank(newBsb) });
      setVerifyState('idle');
      setResolvedName(null);
      setNewBsb('');
      setNewAccountNumber('');
      setNewAccountName('');
      setSaveAccount(false);
      setSelectedId('');
    }
  }

  const newAccountSection = confirmedAccount ? (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'primary.main',
        bgcolor: 'primary.50',
      }}
    >
      <Box
        component="span"
        sx={(t: Theme) => ({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          flexShrink: 0,
          color: t.palette.primary.contrastText,
          backgroundColor: t.palette.primary.main,
        })}
      >
        <Icon icon="piggy-bank" size="lg" style="solid" color="inherit" />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="bodyStrong" component="div" sx={{ color: 'text.primary', lineHeight: 1.3 }}>
          {confirmedAccount.bankName ?? 'New account'}
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.muted', mt: 0.25 }}>
          ••• {confirmedAccount.accountNumber.slice(-4)} · {confirmedAccount.accountName}
        </Typography>
      </Box>
      <Button variant="ghost" size="small" label="Change" onClick={() => setConfirmedAccount(null)} />
    </Box>
  ) : (
    <NewAccountForm
      bsb={newBsb} onBsbChange={setNewBsb}
      accountNumber={newAccountNumber} onAccountNumberChange={setNewAccountNumber}
      accountName={newAccountName} onAccountNameChange={setNewAccountName}
      bsbBankName={bsbBankName}
      showBsbError={showBsbError} showAccountError={showAccountError} showAccountNameError={showAccountNameError}
      canVerify={canVerify} onVerify={handleVerifyAccount}
      verifyState={verifyState} resolvedName={resolvedName} nameMismatch={nameMismatch}
      saveAccount={saveAccount} onSaveAccountChange={setSaveAccount}
      onConfirm={handleConfirmAccount} onBack={() => setVerifyState('idle')}
      duplicateAccount={duplicateAccount} onUseDuplicate={handleUseDuplicate}
    />
  );

  if (!hasAccounts) {
    return newAccountSection;
  }

  return (
    <Stack spacing={3}>
      {/* Section 1: Saved accounts */}
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ color: 'text.heading' }}>Select a saved account</Typography>
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 0.75, typography: 'bodyStrong', color: 'text.primary' }}>
            Choose a bank account
          </FormLabel>
        <MuiSelect
          value={selectedId}
          onChange={(e) => handleSelectSavedAccount(e.target.value)}
          displayEmpty
          renderValue={(v) => {
            if (!v) return <Box component="span" sx={{ color: 'text.disabled' }}>Choose an account</Box>;
            const acc = displayAccounts.find((a) => a.id === v);
            return acc ? `${acc.bankName} · ${acc.maskedAccountNumber}` : '';
          }}
          sx={(t: Theme) => ({
            ...buildInputStyles(t),
            minHeight: '3rem',
            fontSize: t.typography.body.fontSize,
            '& div.MuiSelect-select': { lineHeight: 1.5, py: '0.6875rem' },
          })}
          MenuProps={{
            slotProps: {
              list: { sx: { py: '4px' } },
              paper: { sx: (t: Theme) => ({ borderRadius: `${t.shape.sm}px`, mt: 0.5 }) },
            },
          }}
        >
          {displayAccounts.map((account) => (
            <MenuItem
              key={account.id}
              value={account.id}
              disableRipple
              sx={(t: Theme) => ({
                mx: '4px',
                borderRadius: `${t.shape.xs}px`,
                width: 'calc(100% - 8px)',
                alignItems: 'center',
                py: 1.25,
                pr: 1,
              })}
            >
              <ListItemText
                primary={account.bankName}
                secondary={`${account.maskedAccountNumber} · ${account.accountName} · ${relativeTime(account.lastUsed)}`}
                slotProps={{
                  primary: { sx: { typography: 'body', fontWeight: 700, lineHeight: 1.4, mb: 0.25 } },
                  secondary: { sx: { typography: 'small', color: 'text.muted', lineHeight: 1.4 } },
                }}
              />
              <Box
                component="span"
                onClick={(e) => { e.stopPropagation(); handleOpenEdit(account); }}
                sx={{ flexShrink: 0, ml: 1 }}
              >
                <IconButton
                  icon="pen-to-square"
                  label={`Edit ${account.bankName} account`}
                  variant="ghost"
                  size="small"
                  onClick={() => handleOpenEdit(account)}
                />
              </Box>
            </MenuItem>
          ))}
        </MuiSelect>
        </FormControl>
      </Stack>

      <Divider>
        <Typography variant="caption" sx={{ color: 'text.muted', px: 1 }}>or</Typography>
      </Divider>

      {/* Section 2: New account */}
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ color: 'text.heading' }}>Add a new bank account</Typography>
        {newAccountSection}
      </Stack>

      {/* Edit account dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => { setEditDialogOpen(false); setEditVerifyState('idle'); }}
        title={`Edit account`}
        size="medium"
        hideCancel
        hideCloseButton={false}
        confirmLabel={editVerifyState === 'verified' ? 'Yes, this is my account' : 'Verify account'}
        confirmDisabled={editVerifyState === 'idle' ? !canEditVerify : false}
        onConfirm={editVerifyState === 'verified' ? handleEditConfirm : handleEditVerify}
      >
        <Stack spacing={3}>
          {editVerifyState === 'verified' && editResolvedName ? (
            <>
              <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 3 }}>
                <DescriptionList sx={{ border: 'none', borderRadius: 0, px: 0, pt: 0, pb: 0, bgcolor: 'transparent', backgroundColor: 'transparent' }}>
                  <DescriptionList.Item label="BSB" value={`${editBsb}${editBsbBankName ? ` · ${editBsbBankName}` : ''}`} />
                  <DescriptionList.Item label="Account number" value={editAccountNumber} />
                  <DescriptionList.Item label="Name you entered" value={editAccountName} />
                  <DescriptionList.Item label="Name on account" value={editResolvedName} />
                </DescriptionList>
              </Box>
              {editNameMismatch && (
                <Alert
                  severity="warning"
                  message="The name you entered doesn't match the name on the account. Please check the details are correct before confirming."
                />
              )}
              <Button variant="outlined" size="small" label="Go back and edit" onClick={() => setEditVerifyState('idle')} sx={{ alignSelf: 'flex-start' }} />
            </>
          ) : (
            <>
              <TextField
                label="BSB" fullWidth value={editBsb} placeholder="000-000"
                helperText={editBsbBankName ?? undefined}
                onChange={(e) => setEditBsb(formatBsb(parseBsbDigits(e.target.value)))}
                htmlInputProps={{ inputMode: 'numeric', pattern: '[0-9\\-]*', maxLength: 7 }}
              />
              <TextField
                label="Account number" fullWidth value={editAccountNumber} placeholder="Enter your account number"
                onChange={(e) => setEditAccountNumber(e.target.value.replace(/\D/g, ''))}
                htmlInputProps={{ inputMode: 'numeric', maxLength: 12 }}
              />
              <TextField
                label="Account name" fullWidth value={editAccountName} placeholder="e.g. Jane Smith"
                helperText="Enter the name on the bank account"
                onChange={(e) => setEditAccountName(e.target.value)}
              />
            </>
          )}
        </Stack>
      </Dialog>
    </Stack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface NewAccountFormProps {
  bsb: string; onBsbChange: (v: string) => void;
  accountNumber: string; onAccountNumberChange: (v: string) => void;
  accountName: string; onAccountNameChange: (v: string) => void;
  bsbBankName: string | null;
  showBsbError: boolean; showAccountError: boolean; showAccountNameError: boolean;
  canVerify: boolean; onVerify: () => void;
  verifyState: 'idle' | 'verified'; resolvedName: string | null; nameMismatch: boolean;
  saveAccount: boolean; onSaveAccountChange: (v: boolean) => void;
  onConfirm: () => void; onBack: () => void;
  duplicateAccount: SavedBankAccount | null; onUseDuplicate: () => void;
  backLabel?: string;
  isEditing?: boolean;
}

function NewAccountForm({
  bsb, onBsbChange, accountNumber, onAccountNumberChange, accountName, onAccountNameChange,
  bsbBankName, showBsbError, showAccountError, showAccountNameError,
  canVerify, onVerify, verifyState, resolvedName, nameMismatch,
  saveAccount, onSaveAccountChange,
  onConfirm, onBack, duplicateAccount, onUseDuplicate,
  backLabel = 'Go back and edit',
  isEditing = false,
}: NewAccountFormProps) {
  if (verifyState === 'verified' && resolvedName) {
    return (
      <Stack spacing={3}>
        <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 3 }}>
          <DescriptionList sx={{ border: 'none', borderRadius: 0, px: { xs: 0, sm: 0 }, pt: { xs: 0, sm: 0 }, pb: { xs: 0, sm: 0 }, bgcolor: 'transparent', backgroundColor: 'transparent' }}>
            <DescriptionList.Item label="BSB" value={`${bsb}${bsbBankName ? ` · ${bsbBankName}` : ''}`} />
            <DescriptionList.Item label="Account number" value={accountNumber} />
            <DescriptionList.Item label="Name you entered" value={accountName} />
            <DescriptionList.Item label="Name on account" value={resolvedName} />
          </DescriptionList>
        </Box>

        {nameMismatch && (
          <Alert
            severity="warning"
            message="The name you entered doesn't match the name on the account. Please check the details are correct before confirming."
          />
        )}

        {!isEditing && (
          <Checkbox
            label="Save this account for future use"
            checked={saveAccount}
            onChange={(isChecked) => onSaveAccountChange(isChecked)}
          />
        )}

        <Stack direction="row" spacing={2}>
          <Button variant="contained" label="Yes, this is my account" onClick={onConfirm} />
          <Button variant="outlined" label={backLabel} onClick={onBack} />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {duplicateAccount && (
        <Alert
          severity="info"
          message={
            <Stack spacing={1}>
              <span>This account is already saved as &ldquo;{duplicateAccount.accountName}&rdquo;</span>
              <Button variant="ghost" label="Use saved account instead" size="small" onClick={onUseDuplicate} sx={{ alignSelf: 'flex-start' }} />
            </Stack>
          }
        />
      )}
      <TextField
        label="BSB" fullWidth value={bsb} placeholder="000-000"
        helperText={showBsbError ? undefined : (bsbBankName ?? undefined)}
        error={showBsbError} errorMessage={showBsbError ? 'A valid 6-digit BSB is required' : undefined}
        onChange={(e) => onBsbChange(formatBsb(parseBsbDigits(e.target.value)))}
        htmlInputProps={{ inputMode: 'numeric', pattern: '[0-9\\-]*', maxLength: 7 }}
      />
      <TextField
        label="Account number" fullWidth value={accountNumber} placeholder="Enter your account number"
        error={showAccountError} errorMessage={showAccountError ? 'Account number is required' : undefined}
        onChange={(e) => onAccountNumberChange(e.target.value.replace(/\D/g, ''))}
        htmlInputProps={{ inputMode: 'numeric', maxLength: 12 }}
      />
      <TextField
        label="Account name" fullWidth value={accountName} placeholder="e.g. Jane Smith"
        helperText="Enter the name on the bank account"
        error={showAccountNameError} errorMessage={showAccountNameError ? 'Account name is required' : undefined}
        onChange={(e) => onAccountNameChange(e.target.value)}
      />
      <Button variant="contained" label="Verify account" onClick={onVerify} disabled={!canVerify || !!duplicateAccount} sx={{ alignSelf: 'flex-start' }} />
    </Stack>
  );
}
