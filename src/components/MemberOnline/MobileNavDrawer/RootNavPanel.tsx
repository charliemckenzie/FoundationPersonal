import type { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Button } from '../../Button';
import { MemberInfoCard } from '../MemberInfoCard';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { MemberNavList } from '../hooks/memberNavParts';
import type { MemberBalance, MemberNavItem, MemberOnlineCopyResolved, MemberUser } from '../types';
import type { ThemeMode } from '../../../app/themes/ThemeModeContext';

interface RootNavPanelProps {
  inert: boolean;
  labels: MemberOnlineCopyResolved;
  user: MemberUser;
  balance: MemberBalance;
  primaryItems: MemberNavItem[];
  secondaryItems?: MemberNavItem[];
  activeItemId?: string;
  onItemClick: (item: MemberNavItem, event?: MouseEvent<HTMLElement>) => void;
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
  onLogout?: () => void;
  lastLoggedIn?: string;
}

export function RootNavPanel({
  inert,
  labels,
  user,
  balance,
  primaryItems,
  secondaryItems,
  activeItemId,
  onItemClick,
  mode,
  onModeChange,
  onLogout,
  lastLoggedIn,
}: RootNavPanelProps) {
  return (
    <Box
      inert={inert || undefined}
      sx={{
        flex: '0 0 50%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        pt: 2,
        px: 2,
        pb: 5,
        gap: 2,
      }}
    >
      <MemberInfoCard
        user={user}
        balance={balance}
        totalBalanceLabel={labels.totalBalanceLabel}
        memberNumberLabel={labels.memberNumberLabel}
        copyLabel={labels.copyLabel}
        copiedLabel={labels.copiedLabel}
      />
      <Box component="nav" aria-label="Primary" sx={{ mx: -0.5 }}>
        <MemberNavList
          items={primaryItems}
          activeItemId={activeItemId}
          onItemClick={onItemClick}
        />
      </Box>
      {secondaryItems !== undefined && secondaryItems.length > 0 && (
        <>
          <Divider sx={{ borderColor: 'border.subtle' }} />
          <Box component="nav" aria-label="Secondary">
            <MemberNavList
              items={secondaryItems}
              activeItemId={activeItemId}
              onItemClick={onItemClick}
              variant="secondary"
            />
          </Box>
        </>
      )}
      <Divider sx={{ borderColor: 'border.subtle' }} />
      <Box sx={{ mt: 1 }}>
        <ThemeSwitcher
          mode={mode}
          onChange={onModeChange}
          size="medium"
          fullWidth
          lightLabel={labels.lightLabel}
          darkLabel={labels.darkLabel}
        />
      </Box>
      <Button
        label={labels.logoutLabel}
        variant="outlined"
        fullWidth
        onClick={onLogout}
        sx={{ mt: 1, flexShrink: 0 }}
      />
      {lastLoggedIn !== undefined && (
        <Typography variant="small" component="p" sx={{ color: 'text.muted', m: 0, mt: 1, textAlign: 'center' }}>
          {labels.lastLoggedInLabel} {lastLoggedIn}
        </Typography>
      )}
    </Box>
  );
}
