'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Accordion } from '../../components/Accordion';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { HeroIcon } from '../../components/HeroIcon';
import { IconList } from '../../components/IconList';
import { SkipLinks } from '../../components/SkipLinks';
import type { CtaAction, NavItemLink, NavItemMegamenu, UtilityLink } from '../../components/Header/types';

// ── Nav data ──────────────────────────────────────────────────────────────────

const navItems: (NavItemMegamenu | NavItemLink)[] = [
  {
    type: 'megamenu',
    label: 'Super',
    columns: [
      {
        heading: 'Manage your super',
        links: [
          { label: 'Beneficiaries', href: '/beneficiaries' },
          { label: 'Investment options', href: '#investments' },
          { label: 'Contributions', href: '#contributions' },
          { label: 'Insurance', href: '#insurance' },
        ],
      },
      {
        heading: 'Getting started',
        links: [
          { label: 'Join ART', href: '#join' },
          { label: 'Consolidate super', href: '#consolidate' },
        ],
      },
    ],
  },
  { type: 'link', label: 'Retirement', href: '#retirement' },
  { type: 'link', label: 'Investments', href: '#investments' },
  { type: 'link', label: 'Insurance', href: '#insurance' },
  { type: 'link', label: 'Tools & advice', href: '#tools' },
];

const secondaryNavItems: NavItemLink[] = [
  { type: 'link', label: 'For employers', href: '#employers' },
  { type: 'link', label: 'For advisers', href: '#advisers' },
];

const primaryCta: CtaAction = {
  label: 'Join',
  menu: [
    { label: 'Join as a member', href: '#join-member' },
    { label: 'Join as an employer', href: '#join-employer' },
  ],
};

const secondaryCta: CtaAction = {
  label: 'Log in',
  menu: [
    { label: 'Member login', href: '#login-member' },
    { label: 'Employer login', href: '#login-employer' },
  ],
};

const utilityLinks: UtilityLink[] = [
  { label: 'Rewards', href: '#rewards', icon: 'gift' },
  { label: 'Contact', href: '#contact', icon: 'phone-sharp' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function BeneficiariesPage() {
  return (
    <>
      <SkipLinks />
      <Header
        navItems={navItems}
        secondaryNavItems={secondaryNavItems}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        utilityLinks={utilityLinks}
        searchPlaceholder="Search Australian Retirement Trust"
        onSearch={() => {}}
      />

      <Box component="main" id="main-content">
        <HeroSection />
        <WhatIsSection />
        <WhyNominateSection />
        <NominationTypesSection />
        <WhoCanNominateSection />
        <HowToSection />
        <FaqSection />
        <CtaBannerSection />
      </Box>

      <Footer />
    </>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{ bgcolor: 'background.tintCool', py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              id="hero-heading"
              variant="h1"
              sx={{ mb: 2, color: 'text.heading' }}
            >
              Nominate a beneficiary
            </Typography>
            <Typography variant="lead" component="p" sx={{ mb: 4, color: 'text.primary' }}>
              Make sure your super goes to the right people. Nominating a beneficiary takes just minutes and gives your family lasting peace of mind.
            </Typography>
            <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Button label="Log in to nominate" variant="contained" size="large" />
              <Button label="Learn how it works" variant="outlined" size="large" />
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' } }}
          >
            <HeroIcon name="Death Benefit" brand="art" size="3xl" background="none" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function WhatIsSection() {
  return (
    <Box
      component="section"
      aria-labelledby="what-is-heading"
      sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              id="what-is-heading"
              variant="h2"
              sx={{ mb: 2, color: 'text.heading' }}
            >
              What is a beneficiary?
            </Typography>
            <Typography variant="body" component="p" sx={{ mb: 2 }}>
              A beneficiary is the person — or people — you want to receive your superannuation savings if you pass away.
            </Typography>
            <Typography variant="body" component="p" sx={{ color: 'text.muted' }}>
              Unlike most assets, your super is not automatically covered by your will. By nominating a beneficiary, you take direct control of where your savings go — and protect your loved ones from unnecessary delays and uncertainty.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <IconList
              size="md"
              listType="ul"
              defaultIcon="circle-check"
              items={[
                { text: 'Your super is held in trust and is not automatically covered by your will' },
                { text: 'Without a valid nomination, the trustee decides who receives your super' },
                { text: 'A valid nomination ensures your wishes are legally followed' },
                { text: 'Some nominations expire and must be renewed to stay valid' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function WhyNominateSection() {
  const reasons = [
    {
      icon: 'Love',
      heading: 'Peace of mind',
      body: 'Know that your loved ones will be taken care of — and that your savings won\'t be held up in legal delays when your family needs them most.',
    },
    {
      icon: 'Shield',
      heading: 'Your super, your choice',
      body: 'Without a nomination, the trustee decides who gets your super. A valid nomination puts that decision firmly in your hands.',
    },
    {
      icon: 'Time 1',
      heading: 'Faster payments',
      body: 'A valid nomination helps your super be paid out quickly, reducing financial pressure on your family at an already difficult time.',
    },
  ];

  return (
    <Box
      component="section"
      aria-labelledby="why-heading"
      sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="lg">
        <Typography
          id="why-heading"
          variant="h2"
          sx={{ mb: 1, color: 'text.heading', textAlign: 'center' }}
        >
          Why nominate?
        </Typography>
        <Typography
          variant="lead"
          component="p"
          sx={{ mb: 6, textAlign: 'center', color: 'text.muted' }}
        >
          Three reasons to do it today.
        </Typography>
        <Grid container spacing={3}>
          {reasons.map((reason) => (
            <Grid key={reason.heading} size={{ xs: 12, md: 4 }}>
              <Card variant="contained">
                <HeroIcon name={reason.icon} brand="art" size="lg" background="grey" />
                <Typography variant="h4" sx={{ mt: 2, mb: 1, color: 'text.heading' }}>
                  {reason.heading}
                </Typography>
                <Typography variant="body" component="p">
                  {reason.body}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function NominationTypesSection() {
  return (
    <Box
      component="section"
      aria-labelledby="types-heading"
      sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="md">
        <Typography
          id="types-heading"
          variant="h2"
          sx={{ mb: 1.5, color: 'text.heading' }}
        >
          Types of nominations
        </Typography>
        <Typography variant="body" component="p" sx={{ mb: 4, color: 'text.muted' }}>
          There are three main ways to nominate a beneficiary — each with a different level of control and flexibility.
        </Typography>
        <Accordion
          items={[
            {
              id: 'binding',
              title: 'Binding death benefit nomination',
              content: (
                <>
                  <Typography variant="body" component="p" sx={{ mb: 2 }}>
                    A binding nomination legally directs the trustee to pay your super to the people you nominate. It's the most certain way to ensure your wishes are followed.
                  </Typography>
                  <IconList
                    size="sm"
                    listType="ul"
                    defaultIcon="circle-check"
                    items={[
                      { text: 'Valid for 3 years — must be renewed before expiry' },
                      { text: 'Trustee must follow your nomination if it\'s valid' },
                      { text: 'Available as a lapsing or non-lapsing nomination' },
                    ]}
                  />
                </>
              ),
            },
            {
              id: 'non-binding',
              title: 'Non-binding nomination',
              content: (
                <>
                  <Typography variant="body" component="p" sx={{ mb: 2 }}>
                    A non-binding nomination tells the trustee your preferred beneficiaries, but they retain discretion to decide the final distribution based on your circumstances at the time.
                  </Typography>
                  <IconList
                    size="sm"
                    listType="ul"
                    defaultIcon="circle-check"
                    items={[
                      { text: 'Does not expire — stays on file indefinitely' },
                      { text: 'Trustee can use discretion, which may better reflect changed circumstances' },
                      { text: 'Less certainty about the exact outcome' },
                    ]}
                  />
                </>
              ),
            },
            {
              id: 'reversionary',
              title: 'Reversionary beneficiary',
              content: (
                <>
                  <Typography variant="body" component="p" sx={{ mb: 2 }}>
                    A reversionary beneficiary nomination applies to income accounts (pension accounts) only. Your pension will continue to be paid to your nominated person after your death.
                  </Typography>
                  <IconList
                    size="sm"
                    listType="ul"
                    defaultIcon="circle-check"
                    items={[
                      { text: 'Applies to account-based pensions only — not accumulation accounts' },
                      { text: 'Pension payments continue directly to your beneficiary' },
                      { text: 'Can be changed before the pension commences, but not after' },
                    ]}
                  />
                </>
              ),
            },
          ]}
        />
      </Container>
    </Box>
  );
}

function WhoCanNominateSection() {
  return (
    <Box
      component="section"
      aria-labelledby="who-heading"
      sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <HeroIcon name="People" brand="art" size="2xl" background="grey" />
            <Typography
              id="who-heading"
              variant="h2"
              sx={{ mt: 3, mb: 2, color: 'text.heading' }}
            >
              Who can you nominate?
            </Typography>
            <Typography variant="body" component="p" sx={{ color: 'text.muted' }}>
              Super law limits who you can name. Your nominee must be an eligible dependant or your legal personal representative.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <IconList
              size="md"
              listType="ul"
              defaultIcon="circle-check"
              items={[
                {
                  heading: 'Spouse or partner',
                  text: 'Including de facto and same-sex partners.',
                },
                {
                  heading: 'Children',
                  text: 'Including adopted, step, or ex-nuptial children of any age.',
                },
                {
                  heading: 'Financial dependants',
                  text: 'Anyone financially dependent on you at the time of your death.',
                },
                {
                  heading: 'Interdependants',
                  text: 'Someone with whom you share a close personal relationship and mutual financial or domestic support.',
                },
                {
                  heading: 'Legal personal representative',
                  text: 'Your estate — super is then distributed according to your will.',
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function HowToSection() {
  return (
    <Box
      component="section"
      aria-labelledby="how-to-heading"
      sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="md">
        <Typography
          id="how-to-heading"
          variant="h2"
          sx={{ mb: 1, color: 'text.heading', textAlign: 'center' }}
        >
          How to nominate
        </Typography>
        <Typography
          variant="body"
          component="p"
          sx={{ mb: 5, textAlign: 'center', color: 'text.muted' }}
        >
          It only takes a few minutes online.
        </Typography>
        <IconList
          size="lg"
          listType="ol"
          items={[
            {
              heading: 'Log in to Member Online',
              text: 'Access your account at art.com.au or through the ART mobile app.',
            },
            {
              heading: 'Go to "Beneficiaries"',
              text: 'Find the Beneficiaries section under your account settings.',
            },
            {
              heading: 'Choose your nomination type',
              text: 'Select binding, non-binding, or reversionary depending on your needs and account type.',
            },
            {
              heading: 'Add your nominees',
              text: 'Enter the details of each person you\'d like to nominate and their relationship to you.',
            },
            {
              heading: 'Review and submit',
              text: 'Check your nomination details and confirm. You\'ll receive a confirmation by email.',
            },
          ]}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Button label="Log in to nominate now" variant="contained" size="large" />
        </Box>
      </Container>
    </Box>
  );
}

function FaqSection() {
  return (
    <Box
      component="section"
      aria-labelledby="faq-heading"
      sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="md">
        <Typography
          id="faq-heading"
          variant="h2"
          sx={{ mb: 4, color: 'text.heading' }}
        >
          Common questions
        </Typography>
        <Accordion
          variant="exclusive"
          items={[
            {
              id: 'faq-1',
              title: 'What happens if I don\'t nominate a beneficiary?',
              content: (
                <Typography variant="body" component="p">
                  If you don't make a nomination, or your nomination is not valid, the trustee will decide who receives your super. They will consider your dependants and your legal personal representative, but the outcome may not match your wishes.
                </Typography>
              ),
            },
            {
              id: 'faq-2',
              title: 'How long does a binding nomination last?',
              content: (
                <Typography variant="body" component="p">
                  A standard binding nomination is valid for 3 years. You'll need to renew it before it expires — or it becomes invalid. A non-lapsing binding nomination does not expire, but it can be revoked at any time.
                </Typography>
              ),
            },
            {
              id: 'faq-3',
              title: 'Can I nominate more than one person?',
              content: (
                <Typography variant="body" component="p">
                  Yes. You can nominate multiple people and specify what percentage of your super each person should receive. The percentages must add up to 100%.
                </Typography>
              ),
            },
            {
              id: 'faq-4',
              title: 'Can I change or cancel my nomination?',
              content: (
                <Typography variant="body" component="p">
                  Yes. You can update or cancel your nomination at any time through Member Online. It's a good idea to review your nomination after major life changes — such as marriage, separation, or the birth of a child.
                </Typography>
              ),
            },
            {
              id: 'faq-5',
              title: 'Is my super covered by my will?',
              content: (
                <Typography variant="body" component="p">
                  Not automatically. Super is held in trust and is generally not considered part of your estate. To ensure your super is distributed according to your will, nominate your legal personal representative (your estate) as a beneficiary — but seek financial advice first, as this may have tax implications.
                </Typography>
              ),
            },
          ]}
        />
      </Container>
    </Box>
  );
}

function CtaBannerSection() {
  return (
    <Box
      component="section"
      aria-labelledby="cta-heading"
      sx={{
        bgcolor: 'background.brandPrimary',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          id="cta-heading"
          variant="h2"
          sx={{ mb: 2, color: 'text.inverse' }}
        >
          Ready to nominate?
        </Typography>
        <Typography
          variant="lead"
          component="p"
          sx={{ mb: 5, color: 'text.inverse', opacity: 0.9 }}
        >
          It takes just a few minutes. Log in to Member Online and update your beneficiaries today.
        </Typography>
        <Button
          label="Log in to nominate"
          variant="contained"
          reversed
          size="large"
        />
      </Container>
    </Box>
  );
}
