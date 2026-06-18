'use client';

import { useEffect, useState } from 'react';
import type React from 'react';
import { MemberOnlineLayout } from '../../../components/MemberOnline';
import type { MemberNavItem } from '../../../components/MemberOnline';
import { Logo } from '../../../components/Logo';
import { PageTransition } from '../../../components/PageTransition';
import { PAGE_TRANSITION_EXCLUDE } from '../../pageTransition.config';
import { NavConfigProvider, useNavConfig } from './NavConfigContext';
import { NAV_CONFIGS } from './navConfigs';

const FOOTER_LINKS = [
  { label: 'Terms and conditions', href: '#' },
  { label: 'Privacy policy', href: '#' },
  { label: 'Disclaimer', href: '#' },
  { label: 'MySuper product dashboard', href: '#' },
  { label: 'Contact us', href: '#' },
];

const FOOTER_DISCLAIMER =
  'Australian Retirement Trust Pty Ltd ABN 88 010 720 840 AFSL No. 228975. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet lorem leo.';

// Account-level items — unchanged across nav configs.
const SECONDARY_ITEMS: MemberNavItem[] = [
  { id: 'rewards', label: 'Rewards', href: '#' },
  { id: 'beneficiaries', label: 'Beneficiaries', href: '#' },
  { id: 'profile', label: 'Profile', href: '#' },
  { id: 'security', label: 'Security and login', href: '#' },
  { id: 'messages', label: 'Messages', href: '#' },
  { id: 'help', label: 'Help & contact', href: '#' },
];

function PortalShell({ children }: { children: React.ReactNode }) {
  const { navConfig } = useNavConfig();
  const config = NAV_CONFIGS[navConfig];
  const [activeId, setActiveId] = useState('home');

  // Items differ per config, so reset the highlight to Home when it changes.
  useEffect(() => {
    setActiveId('home');
  }, [navConfig]);

  return (
    <MemberOnlineLayout
      user={{ name: 'Adam Finden', memberNumber: '900000031' }}
      balance={config.balance}
      primaryItems={config.primaryItems}
      secondaryItems={SECONDARY_ITEMS}
      footerLinks={FOOTER_LINKS}
      footerDisclaimer={FOOTER_DISCLAIMER}
      logo={<Logo variant="primary" size="lg" />}
      drawerLogo={<Logo variant="secondary" size="md" />}
      mobileLogo={<Logo variant="mark" size="md" />}
      homeHref="/"
      activeItemId={activeId}
      onItemClick={(item) => setActiveId(item.id)}
      lastLoggedIn="24 May 2026"
      onLogout={() => alert('Logged out')}
    >
      <PageTransition excludePaths={PAGE_TRANSITION_EXCLUDE}>
        {children}
      </PageTransition>
    </MemberOnlineLayout>
  );
}

export default function MemberOnlineLayoutRoute({ children }: { children: React.ReactNode }) {
  return (
    <NavConfigProvider>
      <PortalShell>{children}</PortalShell>
    </NavConfigProvider>
  );
}
