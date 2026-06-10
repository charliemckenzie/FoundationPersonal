'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';

interface InvestmentMixIntroProps {
  formPath: string;
  overviewPath: string;
}

export function InvestmentMixIntro({ formPath, overviewPath }: InvestmentMixIntroProps) {
  const router = useRouter();
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Investments', href: overviewPath },
            { label: 'Change investment mix' },
          ]}
          onBack={() => router.push(overviewPath)}
        />
      </Box>
      <ContentContainer size="md">
        <Stack spacing={3} sx={{ py: 4 }}>
          <Typography variant="h2" component="h1">
            Change investment mix
          </Typography>

          <div>
            <Typography variant="h6" sx={{ mb: 2 }}>
              What to expect
            </Typography>
            <Stack component="ol" spacing={1.5} sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {[
                'Select the account you want to change',
                'Choose whether to apply changes to your current balance, future contributions, or both',
                'Set your new allocations — your total must equal 100%',
                'Review and confirm — changes typically take 2–3 business days to process',
              ].map((step, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: '1.75rem',
                      height: '1.75rem',
                      minWidth: '1.75rem',
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="body" sx={{ pt: 0.125 }}>
                    {step}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </div>

          <Alert
            severity="warning"
            title="Before you start"
            message="When you switch options, we sell your current units and buy into your new selections on the same business day at that day's unit prices. Your displayed balance may temporarily differ while the switch processes. Check the relevant PDS for your account type before proceeding."
          />

          <Checkbox
            label="I have read the above information and I'm ready to start."
            checked={acknowledged}
            onChange={setAcknowledged}
          />

          <Box>
            <Button
              label="Get started"
              variant="contained"
              disabled={!acknowledged}
              onClick={() => router.push(formPath)}
            />
          </Box>
        </Stack>
      </ContentContainer>
    </>
  );
}
