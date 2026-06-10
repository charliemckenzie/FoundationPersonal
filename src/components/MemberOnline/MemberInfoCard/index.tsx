'use client';

import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '../../IconButton';
import {
  DEFAULT_MEMBER_ONLINE_COPY,
  type MemberBalance,
  type MemberUser,
} from '../types';

export interface MemberInfoCardProps {
  user: MemberUser;
  balance: MemberBalance;
  /** Override label copy. */
  totalBalanceLabel?: string;
  memberNumberLabel?: string;
  copyLabel?: string;
  copiedLabel?: string;
}

const COPY_FEEDBACK_MS = 1800;

export function MemberInfoCard({
  user,
  balance,
  totalBalanceLabel = DEFAULT_MEMBER_ONLINE_COPY.totalBalanceLabel,
  memberNumberLabel = DEFAULT_MEMBER_ONLINE_COPY.memberNumberLabel,
  copyLabel = DEFAULT_MEMBER_ONLINE_COPY.copyLabel,
  copiedLabel = DEFAULT_MEMBER_ONLINE_COPY.copiedLabel,
}: MemberInfoCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(user.memberNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch {
      /* clipboard not available — silent */
    }
  }, [user.memberNumber]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ px: 1.5 }}>
        <Typography variant="h6" sx={{ color: 'text.heading', m: 0, lineHeight: 1.3 }}>
          {user.name}
        </Typography>
        <Typography
          variant="body"
          sx={{ color: 'text.primary', mt: 0.5, m: 0, lineHeight: 1.4 }}
        >
          {totalBalanceLabel}{' '}
          <Box component="span" sx={{ fontWeight: 700 }}>
            {balance.amount}
          </Box>
        </Typography>
        <Typography variant="small" sx={{ color: 'text.muted', m: 0, mt: 0.25 }}>
          {balance.asAt}
        </Typography>
      </Box>

      <Box
        sx={(t) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          px: 1.5,
          py: 1.5,
          borderRadius: `${t.shape.sm}px`,
          backgroundColor: t.palette.primary.softMain!,
        })}
      >
        <Box>
          <Typography
            variant="small"
            sx={{ color: 'text.primary', m: 0 }}
          >
            {memberNumberLabel}
          </Typography>
          <Typography
            variant="body"
            sx={{ color: 'text.heading', fontWeight: 700, m: 0, lineHeight: 1.3 }}
          >
            {user.memberNumber}
          </Typography>
        </Box>
        <IconButton
          icon="copy"
          label={copied ? copiedLabel : copyLabel}
          variant="ghost"
          color="primary"
          size="medium"
          condensed
          onClick={handleCopy}
          showTooltip={false}
        />
      </Box>
    </Box>
  );
}
