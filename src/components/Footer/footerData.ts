export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterNavSection {
  title: string;
  links: FooterLink[];
}

export const NAV_SECTIONS: FooterNavSection[] = [
  {
    title: 'Getting started',
    links: [
      { label: 'Why choose us', href: '#' },
      { label: 'Strong performance', href: '#' },
      { label: 'Focused on lower fees', href: '#' },
      { label: 'Changing jobs', href: '#' },
      { label: 'Join online', href: '#' },
    ],
  },
  {
    title: 'Already a member',
    links: [
      { label: 'Set up online access', href: '#' },
      { label: 'Consolidate super', href: '#' },
      { label: 'Check your balance', href: '#' },
      { label: 'Download statement', href: '#' },
      { label: 'View transactions', href: '#' },
    ],
  },
  {
    title: 'Help & tools',
    links: [
      { label: 'Forms and tasks', href: '#' },
      { label: 'Calculators', href: '#' },
      { label: 'Financial advice', href: '#' },
      { label: 'Events and seminars', href: '#' },
      { label: 'PDS and guides', href: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Governance & Reporting', href: '#' },
      { label: 'Media Releases', href: '#' },
      { label: 'Learn about super', href: '#' },
    ],
  },
];

export const FUND_DETAILS = [
  { label: 'Fund name', value: 'Australian Retirement Trust' },
  { label: 'Account type', value: 'Super Savings' },
  { label: 'ABN', value: '60 905 115 063' },
  { label: 'USI', value: '60 905 115 063 003' },
] as const;

export const SOCIAL_LINKS = [
  { icon: 'linkedin-in-brands', label: 'LinkedIn', href: '#' },
  { icon: 'youtube-brands', label: 'YouTube', href: '#' },
  { icon: 'facebook-f-brands', label: 'Facebook', href: '#' },
  { icon: 'instagram-brands', label: 'Instagram', href: '#' },
] as const;

export const LEGAL_LINKS = [
  'Disclaimer and disclosures',
  'Privacy policy',
  'Member outcomes assessment',
  'TMDs',
  'MySuper product dashboard',
  'Sitemap',
] as const;

export const AOC_TEXT =
  'We want to respectfully acknowledge the Traditional Owners and Custodians of these lands, seas, and waters throughout Australia. We pay our respects to Elders both past and present. We acknowledge the history, the resilience and the continual contributions of Aboriginal and Torres Strait Islander peoples of their Country.';
