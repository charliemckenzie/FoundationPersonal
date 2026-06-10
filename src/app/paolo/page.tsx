'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Divider } from '../../components/Divider';
import { HeroIcon } from '../../components/HeroIcon';

interface Section {
  icon: string;
  heading: string;
  body: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    icon: 'Contributions Icon',
    heading: 'The Superannuation Guarantee (SG)',
    body: (
      <Stack spacing={2}>
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          SG is a compulsory contribution which all employers need to make on behalf of each of their eligible employees. Employer contributions are paid directly to each employee's nominated super fund, or a default fund on their behalf.
        </Typography>
        <Link href="#" underline="hover">Learn more about the SG legislation</Link>
      </Stack>
    ),
  },
  {
    icon: 'Checklist',
    heading: 'Choice of fund',
    body: (
      <Stack spacing={2}>
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          Choice of Fund legislation allows eligible employees to choose the super fund that their super is paid into. As an employer, you are responsible for:
        </Typography>
        <List
          disablePadding
          sx={{
            listStyleType: 'disc',
            pl: 3,
            '& .MuiListItem-root': { display: 'list-item', pl: 0.5, py: 0.25 },
          }}
        >
          {[
            'Identifying if your employees are eligible',
            'Providing them with a Standard Choice form within 28 days of their start date',
            'Making sure SG contributions are received by the fund no later than 20 days after their first payday',
            "Selecting a default fund for employees who don't make a choice",
          ].map((item) => (
            <ListItem key={item} disableGutters>
              <Typography variant="body" component="span">{item}</Typography>
            </ListItem>
          ))}
        </List>
        <Link href="#" underline="hover">Learn more about offering your employees choice</Link>
      </Stack>
    ),
  },
  {
    icon: 'Tax',
    heading: 'Claim a tax deduction',
    body: (
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        You can claim a tax deduction for super payments you make for employees in the financial year you make them. Contributions are considered paid when the super fund receives them; it's not enough that the money has left your bank account. We suggest that you pay before 17 June to allow sufficient time for the funds to be transferred.
      </Typography>
    ),
  },
  {
    icon: 'Transfer',
    heading: 'SuperStream',
    body: (
      <Stack spacing={2}>
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          SuperStream is the name of the Superannuation Data and Payment standards you need to be compliant with when paying super contributions for your employees. Under SuperStream, you need to pay your employees' super contributions online.
        </Typography>
        <Link href="#" underline="hover">Learn more about the SuperStream requirements</Link>
      </Stack>
    ),
  },
];

export default function PaoloPage() {
  return (
    <>
      {/* Hero banner */}
      <Box sx={{ bgcolor: 'primary.main', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="display-5" component="h1" sx={{ color: 'primary.contrastText', mb: 1.5 }}>
            What employers need to know
          </Typography>
          <Typography variant="lead" component="p" sx={{ color: 'primary.contrastText', opacity: 0.85, maxWidth: '42rem' }}>
            Everything you need to understand your super obligations — from compulsory contributions to compliance requirements.
          </Typography>
          <Link href="/paolo/cards-responsive" underline="hover" sx={{ mt: 2, display: 'inline-block', color: 'primary.contrastText' }}>
            Open Paolo local card responsive demo
          </Link>
          <Link href="/paolo/card-kitchen-sink" underline="hover" sx={{ mt: 1, display: 'block', color: 'primary.contrastText' }}>
            Open Paolo local Card kitchen sink
          </Link>
          <Link href="/paolo/card-cta-accessibility" underline="hover" sx={{ mt: 1, display: 'block', color: 'primary.contrastText' }}>
            Open Paolo local card CTA accessibility lab
          </Link>
        </Container>
      </Box>

      {/* Icon-led strips */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack divider={<Divider />} spacing={0}>
            {SECTIONS.map((section) => (
              <Box
                key={section.heading}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 3, sm: 5 },
                  py: { xs: 5, md: 6 },
                  alignItems: { sm: 'flex-start' },
                }}
              >
                {/* Icon */}
                <Box sx={{ flexShrink: 0 }}>
                  <HeroIcon
                    name={section.icon}
                    brand="art"
                    size="xl"
                    background="brand"
                  />
                </Box>

                {/* Content */}
                <Stack spacing={2} sx={{ flex: 1, pt: { sm: 1 } }}>
                  <Typography variant="h4" component="h2" sx={{ color: 'text.heading' }}>
                    {section.heading}
                  </Typography>
                  {section.body}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

