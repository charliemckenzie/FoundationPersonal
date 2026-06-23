import Radio from '@mui/material/Radio';
import MuiRadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import MuiFormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useId, useState } from 'react';
import { IconButton } from '../IconButton';
import { cardContainerSx, defaultRadioSx } from '../RadioGroup/styles';
import { RadioUncheckedIcon, RadioCheckedIcon } from '../RadioGroup/icons';
import { buildSelectSx } from '../Select/styles';
import type { SavedBankAccount } from './types';
import { maskAccountNumber } from './utils';
import { lookupBsbBank } from '../BankDetailsField/utils';

/** Switch to Select dropdown when account count exceeds this threshold. */
const SELECT_THRESHOLD = 4;

interface SavedAccountsListProps {
  accounts: SavedBankAccount[];
  selectedId?: string;
  onSelect: (account: SavedBankAccount) => void;
  onDeleteRequest: (account: SavedBankAccount) => void;
  showDeleteButtons: boolean;
  /** IDs of accounts that should never show a delete button (e.g. locally-added, not yet persisted). */
  nonDeletableIds?: ReadonlySet<string>;
  /** Mask account numbers to show only the last 4 digits. Defaults to `true`. */
  maskAccountNumbers?: boolean;
  disabled?: boolean;
}

interface AccountCardLabelProps {
  account: SavedBankAccount;
  maskAccountNumber: boolean;
}

function AccountCardLabel({ account, maskAccountNumber: mask }: AccountCardLabelProps) {
  const displayNumber = mask ? maskAccountNumber(account.accountNumber) : account.accountNumber;
  const bankName = lookupBsbBank(account.bsb);
  return (
    <Stack spacing={0} sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        variant="body"
        component="span"
        sx={{ fontWeight: 'fontWeightMedium', display: 'block' }}
      >
        {account.accountName}
      </Typography>
      {bankName && (
        <Typography
          variant="small"
          component="span"
          sx={{ color: 'text.muted', display: 'block' }}
        >
          {bankName}
        </Typography>
      )}
      <Typography
        variant="small"
        component="span"
        sx={{ color: 'text.muted', display: 'block' }}
      >
        {account.bsb} · {displayNumber}
      </Typography>
    </Stack>
  );
}

export function SavedAccountsList({
  accounts,
  selectedId,
  onSelect,
  onDeleteRequest,
  showDeleteButtons,
  nonDeletableIds,
  maskAccountNumbers = false,
  disabled = false,
}: SavedAccountsListProps) {
  const groupId = useId();
  const labelId = `${groupId}-legend`;
  const selectId = `${groupId}-select`;
  const [internalSelectValue, setInternalSelectValue] = useState(selectedId ?? '');
  const resolvedSelectValue = selectedId ?? internalSelectValue;
  const useSelectVariant = accounts.length > SELECT_THRESHOLD;

  // Select variant — used when there are more than SELECT_THRESHOLD accounts
  if (useSelectVariant) {
    function handleSelectChange(event: SelectChangeEvent) {
      const val = event.target.value;
      setInternalSelectValue(val);
      const account = accounts.find((a) => a.id === val);
      if (account) onSelect(account);
    }

    return (
      <MuiFormControl fullWidth disabled={disabled}>
        <FormLabel
          htmlFor={selectId}
          sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary', mb: 0.5 }}
        >
          Select bank account
        </FormLabel>
        <MuiSelect
          id={selectId}
          value={resolvedSelectValue}
          onChange={handleSelectChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) return <Box component="span" sx={{ color: 'text.muted' }}>Select an account</Box>;
            const account = accounts.find((a) => a.id === selected);
            if (!account) return selected;
            const bankName = lookupBsbBank(account.bsb);
            const displayNumber = maskAccountNumbers ? maskAccountNumber(account.accountNumber) : account.accountNumber;
            return (
              <Stack spacing={0}>
                <Typography variant="body" component="span" sx={{ fontWeight: 'fontWeightMedium', display: 'block', lineHeight: 1.4 }}>
                  {account.accountName}
                </Typography>
                <Typography variant="small" component="span" sx={{ color: 'text.muted', display: 'block', lineHeight: 1.4 }}>
                  {[bankName, `${account.bsb} · ${displayNumber}`].filter(Boolean).join(' · ')}
                </Typography>
              </Stack>
            );
          }}
          MenuProps={{
            slotProps: {
              list: { sx: { py: '4px' } },
              paper: { sx: (t) => ({ borderRadius: `${t.shape.sm}px` }) },
            },
          }}
          sx={buildSelectSx('medium', false)}
        >
          {accounts.map((account) => {
            const bankName = lookupBsbBank(account.bsb);
            const displayNumber = maskAccountNumbers ? maskAccountNumber(account.accountNumber) : account.accountNumber;
            return (
              <MenuItem
                key={account.id}
                value={account.id}
                disableRipple
                sx={(t) => ({
                  mx: '4px',
                  borderRadius: `${t.shape['xs']}px`,
                  width: 'calc(100% - 8px)',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  py: 1.5,
                })}
              >
                <Typography variant="body" component="span" sx={{ fontWeight: 'fontWeightMedium', display: 'block', lineHeight: 1.4 }}>
                  {account.accountName}
                </Typography>
                {bankName && (
                  <Typography variant="small" component="span" sx={{ color: 'text.muted', display: 'block', lineHeight: 1.4 }}>
                    {bankName}
                  </Typography>
                )}
                <Typography variant="small" component="span" sx={{ color: 'text.muted', display: 'block', lineHeight: 1.4 }}>
                  {account.bsb} · {displayNumber}
                </Typography>
              </MenuItem>
            );
          })}
        </MuiSelect>
      </MuiFormControl>
    );
  }

  // Radio (boxed) variant — used when there are SELECT_THRESHOLD or fewer accounts
  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <FormLabel
        component="legend"
        id={labelId}
        sx={{
          typography: 'body',
          fontWeight: 700,
          color: 'text.heading',
          mb: 1,
          display: 'block',
        }}
      >
        Select bank account
      </FormLabel>
      <MuiRadioGroup
        aria-labelledby={labelId}
        value={selectedId ?? ''}
        onChange={(_e, val) => {
          const account = accounts.find((a) => a.id === val);
          if (account) onSelect(account);
        }}
      >
        <Stack spacing={1.5}>
          {accounts.map((account) => {
            const isSelected = account.id === selectedId;
            const isItemDisabled = disabled;
            const canDelete = showDeleteButtons && !(nonDeletableIds?.has(account.id) ?? false);

            return (
              <Box key={account.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                  value={account.id}
                  disabled={isItemDisabled}
                  sx={[
                    cardContainerSx({
                      variant: 'boxed',
                      cardDirection: 'row',
                      description: true,
                      isSelected,
                      isItemDisabled,
                    }),
                    { flex: 1 },
                  ]}
                  label={<AccountCardLabel account={account} maskAccountNumber={maskAccountNumbers} />}
                  control={
                    <Radio
                      disableRipple
                      disableTouchRipple
                      sx={defaultRadioSx}
                      icon={<RadioUncheckedIcon disabled={isItemDisabled} />}
                      checkedIcon={<RadioCheckedIcon />}
                      slotProps={{
                        input: {
                          'aria-label': [
                            account.accountName,
                            lookupBsbBank(account.bsb) ?? `BSB ${account.bsb}`,
                            maskAccountNumbers
                              ? `account ending ${account.accountNumber.slice(-4)}`
                              : `account number ${account.accountNumber}`,
                          ].join(', '),
                        },
                      }}
                    />
                  }
                />

                {canDelete && (
                  <IconButton
                    icon="trash"
                    iconStyle="solid"
                    label={`Delete ${account.accountName}`}
                    variant="outlined"
                    size="medium"
                    disabled={disabled}
                    showTooltip
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDeleteRequest(account);
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Stack>
      </MuiRadioGroup>
    </FormControl>
  );
}
