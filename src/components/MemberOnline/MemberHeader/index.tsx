'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button } from '../../Button';
import { IconButton } from '../../IconButton';
import { UserChip } from '../UserChip';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { DEFAULT_MEMBER_ONLINE_COPY, type MemberUser } from '../types';
import type { ThemeMode } from '../../../app/themes/ThemeModeContext';

export interface MemberHeaderProps {
  user: MemberUser;
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  onLogout?: () => void;
  /** Hide the search field (e.g. screens where search is irrelevant). */
  hideSearch?: boolean;
  /** ⌘K hint string. Pass `null` to hide. Defaults to `'⌘ K'`. */
  searchShortcut?: string | null;
  logoutLabel?: string;
  searchPlaceholder?: string;
}

const DEFAULT_SHORTCUT = '⌘ K';

export function MemberHeader({
  user,
  mode,
  onModeChange,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onLogout,
  hideSearch = false,
  searchShortcut = DEFAULT_SHORTCUT,
  logoutLabel = DEFAULT_MEMBER_ONLINE_COPY.logoutLabel,
  searchPlaceholder = DEFAULT_MEMBER_ONLINE_COPY.searchPlaceholder,
}: MemberHeaderProps) {
  return (
    <Box
      component="header"
      sx={(t) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 3,
        height: '4.5rem',
        backgroundColor: t.palette.background.paper,
        borderBottom: `1px solid ${t.palette.border.subtle}`,
      })}
    >
      {!hideSearch && (
        <IconButton
          icon="magnifying-glass"
          label={searchPlaceholder}
          variant="soft"
          color="primary"
          size="small"
          onClick={() => onSearchSubmit?.('')}
          showTooltip={false}
        />
      )}
      {!hideSearch && (
        <Divider orientation="vertical" sx={{ height: '1.5rem', alignSelf: 'center', borderColor: 'border.subtle' }} />
      )}
      <UserChip user={user} />
      <Box sx={{ flex: 1 }} />
      <ThemeSwitcher mode={mode} onChange={onModeChange} />
      <Button label={logoutLabel} variant="soft" size="small" onClick={onLogout} />
    </Box>
  );
}
