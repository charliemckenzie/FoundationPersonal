import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert, SEVERITY_ICONS } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { Icon } from '../../../components/Icon';
import { Tooltip } from '../../../components/Tooltip';
import type { AgeScenario } from '../types';

interface StepIntroProps {
  ageScenario: AgeScenario;
  declarationRead: boolean;
  declarationPermanent: boolean;
  showValidation: boolean;
  onAgeScenarioChange: (scenario: AgeScenario) => void;
  onDeclarationReadChange: (checked: boolean) => void;
  onDeclarationPermanentChange: (checked: boolean) => void;
}

export function StepIntro({
  ageScenario,
  declarationRead,
  declarationPermanent,
  showValidation,
  onAgeScenarioChange,
  onDeclarationReadChange,
  onDeclarationPermanentChange,
}: StepIntroProps) {
  const isAged6564 = ageScenario === '65-plus';

  const requirementCopy = isAged6564
    ? {
        intro: 'You are aged 65 or over so fully eligible to apply.',
        bullets: [] as string[],
      }
    : {
        intro: 'You are aged 64, this means you need to meet one of the following:',
        bullets: [
          'you are permanently retired from employment after age 60',
          'you have ceased gainful employment with an employer after age 60',
        ],
      };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography component="h1" variant="h2">
          Open a Lifetime Pension account
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          A Lifetime Pension account provides guaranteed, fortnightly tax-free income for life.
          It combines your contribution with others in a shared investment pool.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Box
          sx={{
            border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.md}px`,
          backgroundColor: 'background.paper',
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5">Requirements</Typography>

          <Stack spacing={0.75}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon
                  icon={isAged6564 ? 'circle-check' : 'circle-exclamation'}
                  size="2xl"
                  color={isAged6564 ? 'info' : 'text.muted'}
                />
              </Box>
              <Box
                component="button"
                onClick={() => onAgeScenarioChange(ageScenario === '60-64' ? '65-plus' : '60-64')}
                sx={{
                  background: 'none',
                  border: 'none',
                  p: 0,
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  fontWeight: 700,
                  color: 'secondary.main',
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {ageScenario === '60-64' ? 'Aged 60-64' : 'Aged 65+'}
              </Box>
            </Box>

            <Stack spacing={0.75} sx={{ pl: 5.25 }}>
              <Typography variant="small" sx={{ color: 'text.primary' }}>
                {requirementCopy.intro}
              </Typography>
              {requirementCopy.bullets.length > 0 && (
                <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2.25 }}>
                  {requirementCopy.bullets.map((item) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{ color: 'text.primary' }}
                    >
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="small" component="span">
                          {item}
                        </Typography>
                        <Tooltip
                          title="Eligibility wording can vary by employment status."
                          placement="top"
                        >
                          <Box component="span" sx={{ display: 'inline-flex', color: 'info.main' }}>
                            <Icon icon="circle-info" size="sm" color="info" aria-label="Eligibility information" />
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon="circle-check" size="2xl" color="info" />
            </Box>
            <Typography variant="body" sx={{ fontWeight: 700, color: 'secondary.main' }}>
              $10,000 minimum purchase amount
            </Typography>
          </Box>

          <Alert
            severity="warning"
            icon={<Icon icon={SEVERITY_ICONS.warning} color="inherit" size="lg" />}
            title="Important to note"
            message={
              <Box component="ul" sx={{ m: 0, mt: 1.5, pl: 2.25 }}>
                <Typography component="li" variant="body" sx={{ color: 'inherit', mb: 2.5 }}>
                  This is a <Box component="span" sx={{ fontWeight: 700 }}>permanent purchase</Box> after a 6 month cooling off period.
                </Typography>
                <Typography component="li" variant="body" sx={{ color: 'inherit', mb: 2.5 }}>
                  Leave at least <Box component="span" sx={{ fontWeight: 700 }}>$10,000</Box> in your accumulation account if you wish to keep it open.
                </Typography>
                <Typography component="li" variant="body" sx={{ color: 'inherit' }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>Tax Contributions:</Box> If you claimed a tax deduction on voluntary contributions in the current or last financial year, you must have confirmation. Without it, we cannot process your notice of deduction.
                </Typography>
              </Box>
            }
          />
        </Stack>
      </Box>

      <Stack spacing={2} sx={{ mt: '2rem !important' }}>
        <Checkbox
          variant="default"
          checked={declarationRead}
          onChange={onDeclarationReadChange}
          error={showValidation && !declarationRead}
          errorMessage={
            showValidation && !declarationRead
              ? 'Please confirm you have reviewed the information and PDS.'
              : undefined
          }
          label="I have read and reviewed the information and I am ready to complete the application. I also confirm that I have received, read and understood the accompanying Super Savings Product Disclosure Statement for Income Account and Lifetime Pension (PDS) which summarises the significant information about the product."
        />
        <Checkbox
          variant="default"
          checked={declarationPermanent}
          onChange={onDeclarationPermanentChange}
          error={showValidation && !declarationPermanent}
          errorMessage={
            showValidation && !declarationPermanent
              ? 'Please confirm you understand the permanent purchase terms.'
              : undefined
          }
          label="I understand Lifetime Pension is a permanent purchase after a 6-month cooling-off period and funds cannot be withdrawn after this point, except in the case of a terminal medical condition if money-back protection is payable."
        />
      </Stack>
      </Stack>
    </Stack>
  );
}
