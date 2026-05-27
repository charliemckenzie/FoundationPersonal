import type { NavItemMegamenu, CtaAction, AudienceLink, ResourceLink } from '../../../components/Header/types';

const productsItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Products',
  columns: [
    {
      links: [
        { label: 'Why QSuper', href: '/why-qsuper', description: 'Awaken your super with Australian Retirement Trust' },
        { label: 'Can I join QSuper', href: '/join' },
        { label: 'Investment options', href: '/products/investments' },
        { label: 'Fees', href: '/products/fees' },
        { label: 'Financial advice', href: '/advice' },
        { label: 'Compare us', href: '/compare' },
      ],
    },
    {
      groups: [
        {
          heading: 'Insurance',
          links: [
            { label: 'Income protection', href: '/insurance/income' },
            { label: 'Death cover', href: '/insurance/death' },
            { label: 'TPD cover', href: '/insurance/tpd' },
          ],
        },
        {
          heading: 'Account types',
          links: [
            { label: 'Accumulation account', href: '/products/accumulation' },
            { label: 'Transition to Retirement Income account', href: '/products/ttr' },
            { label: 'Retirement Income account', href: '/products/income' },
            { label: 'Lifetime Pension', href: '/products/lifetime' },
          ],
        },
      ],
    },
  ],
};

const superItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Super',
  columns: [
    {
      heading: 'Your super',
      links: [
        { label: 'How super works', href: '/super/how' },
        { label: 'Consolidate super', href: '/super/consolidate' },
        { label: 'Super contributions', href: '/super/contributions' },
      ],
    },
    {
      heading: 'Defined Benefit',
      links: [
        { label: 'Defined Benefit account', href: '/super/defined-benefit' },
        { label: 'CSS, PSS & SASS', href: '/super/css-pss' },
      ],
    },
  ],
};

const retirementItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Retirement',
  columns: [
    {
      heading: 'Planning',
      links: [
        { label: 'Retirement guide', href: '/retirement/guide' },
        { label: 'When to retire', href: '/retirement/when' },
        { label: 'Age pension', href: '/retirement/pension' },
      ],
    },
  ],
};

const investmentsItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Investments',
  columns: [
    {
      heading: 'Investment options',
      links: [
        { label: 'Lifetime', href: '/investments/lifetime' },
        { label: 'Diversified options', href: '/investments/diversified' },
        { label: 'Single sector options', href: '/investments/single' },
      ],
    },
    {
      heading: 'Performance',
      links: [
        { label: 'Investment performance', href: '/investments/performance' },
        { label: 'Investment updates', href: '/investments/updates' },
      ],
    },
  ],
};

const insuranceItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Insurance',
  columns: [
    {
      heading: 'Cover',
      links: [
        { label: 'Income protection', href: '/insurance/income' },
        { label: 'Death cover', href: '/insurance/death' },
        { label: 'TPD cover', href: '/insurance/tpd' },
      ],
    },
  ],
};

const adviceItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Advice',
  columns: [
    {
      heading: 'Financial advice',
      links: [
        { label: 'Get advice', href: '/advice' },
        { label: 'Find an adviser', href: '/advice/find' },
        { label: 'Advice fees', href: '/advice/fees' },
      ],
    },
  ],
};

export const NAV_ITEMS = [productsItem, superItem, retirementItem, investmentsItem, insuranceItem, adviceItem];

export const AUDIENCE_LINKS: AudienceLink[] = [
  { label: 'Personal', href: '/personal' },
  { label: 'Employers', href: '/employers' },
  { label: 'Advisers', href: '/advisers' },
];

export const RESOURCE_LINKS: ResourceLink[] = [
  { label: 'Calculators & forms', href: '/calculators' },
  { label: 'News Hub', href: '/news' },
  { label: 'Contact us', href: '/contact' },
];

export const PRIMARY_CTA: CtaAction = { label: 'Join' };

export const SECONDARY_CTA: CtaAction = { label: 'Log In' };
