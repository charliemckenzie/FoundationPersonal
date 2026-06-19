import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Icon } from '../../../components/Icon';
import { IconList } from '../../../components/IconList';

export function StepIntro() {
  return (
    <Stack spacing={3}>
      <Typography variant="body" sx={{ color: 'text.primary' }}>
        A Lifetime Pension account provides guaranteed, fortnightly tax-free income for life.
        It combines your contribution with others in a shared investment pool.
      </Typography>

      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Before you start
        </Typography>
        <Typography variant="body">
          Use this form to open a Lifetime Pension account. Here&rsquo;s what to expect.
        </Typography>
      </div>

      <Stack spacing={1}>
        <IconList
          items={[
            { text: 'Takes around 10 minutes to complete' },
            { text: 'Minimum purchase amount of $10,000' },
            { text: 'Have your drivers license, Medicare card or Passport handy as you may need to confirm your identity to process your application' },
            { text: 'Your payments will start from the next business day after processing' },
          ]}
        />
        {/* 5th item with inline PDS link — matches IconList md layout */}
        <Box
          component="li"
          sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, listStyle: 'none' }}
        >
          <Box
            sx={(t) => ({
              width: t.spacing(2.5),
              height: `calc(${t.typography.body.fontSize} * ${t.typography.body.lineHeight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            })}
          >
            <Icon icon="circle-check" size="lg" color="primary" />
          </Box>
          <Typography variant="body">
            You have read and understood the{' '}
            <Box
              component="a"
              href="#"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              Super Savings Product Disclosure Statement for Income Account and Lifetime Pension (PDS)
            </Box>
          </Typography>
        </Box>
      </Stack>

      <Typography variant="body" sx={{ color: 'text.primary' }}>
        <strong>Tax contributions:</strong> If you claimed a tax deduction on voluntary contributions
        in the current or last financial year, you must have confirmation. Without it, we cannot
        process your notice of deduction.
      </Typography>

      <Typography variant="small" sx={{ color: 'text.muted' }}>
        By continuing I acknowledge that I have reviewed the information above and am ready to set up my Lifetime Pension account.
      </Typography>
    </Stack>
  );
}
