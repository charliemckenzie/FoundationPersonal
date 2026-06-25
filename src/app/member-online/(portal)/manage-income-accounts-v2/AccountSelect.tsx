import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import type { Theme } from '@mui/material/styles';
import { buildInputStyles } from '../../../../components/inputs/variantStyles';
import type { IncomeAccount } from './types';

export function AccountSelect({
  value,
  accounts,
  onChange,
}: {
  value: string;
  accounts: IncomeAccount[];
  onChange: (id: string) => void;
}) {
  return (
    <FormControl fullWidth>
      <MuiSelect
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) return <Box component="span" sx={{ color: 'text.disabled' }}>Select an account</Box>;
          if (selected === 'all') return 'All accounts';
          const acct = accounts.find((a) => a.id === selected);
          return acct ? `${acct.name} · Member no: ${acct.memberNumber}` : '';
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
          <MenuItem
            value="all"
            disableRipple
            sx={(t: Theme) => ({ mx: '4px', borderRadius: `${t.shape.xs}px`, width: 'calc(100% - 8px)' })}
          >
            <ListItemText
              primary="All accounts"
              slotProps={{ primary: { sx: { typography: 'body', fontWeight: 700 } } }}
            />
          </MenuItem>
          {accounts.map((acct) => (
            <MenuItem
              key={acct.id}
              value={acct.id}
              disableRipple
              sx={(t: Theme) => ({
                mx: '4px',
                borderRadius: `${t.shape.xs}px`,
                width: 'calc(100% - 8px)',
                alignItems: 'flex-start',
                py: 1.25,
              })}
            >
              <ListItemText
                primary={acct.name}
                secondary={acct.status === 'closed'
                  ? `Member no: ${acct.memberNumber} · Closed`
                  : `Member no: ${acct.memberNumber} · Next: ${acct.nextPaymentAmount} on ${acct.nextPaymentDate}`}
                slotProps={{
                  primary: { sx: { typography: 'body', fontWeight: 700, lineHeight: 1.4, mb: 0.25 } },
                  secondary: { sx: { typography: 'small', color: 'text.muted', lineHeight: 1.4 } },
                }}
              />
            </MenuItem>
          ))}
        </MuiSelect>
    </FormControl>
  );
}
