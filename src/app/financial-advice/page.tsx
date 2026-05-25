'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card } from '../../components/Card';

const STATS = [
  { value: '1 in 3', label: 'Australians seek advice', description: 'Around a third of Australians have consulted a financial adviser at some point in their lives.' },
  { value: '43%', label: 'Feel more confident', description: 'People who receive financial advice report significantly higher confidence about their financial future.' },
  { value: '$98K', label: 'Average advice benefit', description: 'Research suggests advised Australians accumulate an average of $98,000 more in retirement savings.' },
];

const ADVICE_TYPES = [
  {
    step: '01',
    title: 'Personal financial advice',
    body: 'Advice tailored to your individual circumstances, goals, and financial situation. Your adviser must consider your full picture before making a recommendation.',
  },
  {
    step: '02',
    title: 'General financial advice',
    body: 'Broad information about financial products and strategies that does not take your personal circumstances into account. Useful for education, not personalised decisions.',
  },
  {
    step: '03',
    title: 'Scaled or limited advice',
    body: 'Advice on a single topic — such as contribution strategy or investment options — rather than a full financial plan. Often lower cost and faster to deliver.',
  },
  {
    step: '04',
    title: 'Comprehensive financial planning',
    body: 'A holistic review of your entire financial position: super, investments, insurance, tax, estate planning, and retirement income. Best suited to complex situations.',
  },
];

const BENEFITS = [
  { title: 'Retirement readiness', body: 'An adviser can model different retirement scenarios, helping you understand how much you need and the most tax-effective way to draw it down.' },
  { title: 'Investment strategy', body: 'Professional advice on the right asset allocation for your risk tolerance and time horizon — avoiding costly emotional decisions during market volatility.' },
  { title: 'Tax optimisation', body: 'Strategies such as salary sacrifice, spouse contributions, and transition-to-retirement pensions can reduce your tax and boost your long-term outcome.' },
  { title: 'Insurance adequacy', body: 'Many Australians are under- or over-insured. An adviser can review your life, TPD, and income protection cover to make sure your family is properly protected.' },
  { title: 'Estate planning', body: 'Ensure your assets pass to the right people in the most tax-effective way. Binding nominations, testamentary trusts, and superannuation proceeds can all be structured strategically.' },
  { title: 'Peace of mind', body: 'Knowing your finances are in order reduces stress and frees you to focus on the things that matter. Good advice pays for itself many times over.' },
];

const HOW_TO_FIND = [
  { label: "ASIC's MoneySmart", body: "The federal government's MoneySmart website lists licensed advisers and explains how to check an adviser's credentials and complaints history." },
  { label: 'Your super fund', body: 'Many super funds offer access to financial advisers — sometimes at no additional cost for questions about your super account.' },
  { label: 'Professional associations', body: 'The Financial Advice Association Australia (FAAA) and the CPA Australia register can help you find qualified, licensed professionals in your area.' },
  { label: 'Referrals', body: "A recommendation from a trusted friend, family member, or accountant remains one of the most reliable ways to find an adviser who suits your needs." },
];

export default function FinancialAdvicePage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Box sx={{ maxWidth: 720 }}>
          <Typography variant="display-4" component="h1" gutterBottom>
            Financial advice
          </Typography>
          <Typography variant="lead" sx={{ opacity: 0.9, mt: 2 }}>
            Good financial advice can transform your retirement outcome. Whether you need
            help with a single decision or a comprehensive plan, understanding your options
            is the first step.
          </Typography>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 5, md: 8 }, bgcolor: 'background.default' }}>
        <Grid container spacing={3}>
          {STATS.map((stat) => (
            <Grid key={stat.value} size={{ xs: 12, sm: 4 }}>
              <Card variant="contained" sx={{ height: '100%' }}>
                <Typography
                  variant="display-4"
                  component="p"
                  color="primary"
                  gutterBottom
                >
                  {stat.value}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="small" color="text.secondary">
                  {stat.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider />

      {/* Types of advice */}
      <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 5, md: 8 } }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Types of financial advice
        </Typography>
        <Typography variant="body" color="text.secondary" sx={{ mb: 5, maxWidth: 600 }}>
          Not all financial advice is the same. Understanding the difference helps you
          choose the right kind of help for your situation.
        </Typography>

        <Grid container spacing={3}>
          {ADVICE_TYPES.map((item) => (
            <Grid key={item.step} size={{ xs: 12, sm: 6 }}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Typography
                  variant="display-4"
                  component="span"
                  color="text.disabled"
                  sx={{ lineHeight: 1, flexShrink: 0, fontSize: '2.5rem' }}
                >
                  {item.step}
                </Typography>
                <Box>
                  <Typography variant="h6" component="p" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="small" color="text.secondary">
                    {item.body}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider />

      {/* Benefits */}
      <Box
        sx={{
          px: { xs: 3, md: 8 },
          py: { xs: 5, md: 8 },
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h2" component="h2" gutterBottom>
          Why seek financial advice?
        </Typography>
        <Typography variant="body" color="text.secondary" sx={{ mb: 5, maxWidth: 600 }}>
          The benefits of advice extend well beyond picking the right investments. A good
          adviser considers your whole financial life.
        </Typography>

        <Grid container spacing={3}>
          {BENEFITS.map((benefit) => (
            <Grid key={benefit.title} size={{ xs: 12, sm: 6 }}>
              <Card variant="contained" sx={{ height: '100%' }}>
                <Typography variant="h6" component="p" gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="small" color="text.secondary">
                  {benefit.body}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider />

      {/* How to find an adviser */}
      <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 5, md: 8 } }}>
        <Typography variant="h2" component="h2" gutterBottom>
          How to find an adviser
        </Typography>
        <Typography variant="body" color="text.secondary" sx={{ mb: 5, maxWidth: 600 }}>
          All financial advisers in Australia must be licensed and registered with ASIC.
          Here are the best places to start your search.
        </Typography>

        <Grid container spacing={3}>
          {HOW_TO_FIND.map((item) => (
            <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
              <Card variant="contained" sx={{ height: '100%' }}>
                <Typography variant="h6" component="p" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="small" color="text.secondary">
                  {item.body}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer CTA */}
      <Box
        sx={{
          px: { xs: 3, md: 8 },
          py: { xs: 5, md: 8 },
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
        }}
      >
        <Typography variant="h3" component="p" gutterBottom>
          Ready to get personalised advice?
        </Typography>
        <Typography variant="body" sx={{ opacity: 0.9, maxWidth: 560 }}>
          Log in to your member portal to connect with a financial adviser through your
          super fund — it may cost you nothing for advice about your account.
        </Typography>
      </Box>
    </Box>
  );
}
