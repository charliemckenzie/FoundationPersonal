import type { Metadata } from 'next';
import { BeneficiariesPage } from './BeneficiariesPage';

export const metadata: Metadata = {
  title: 'Beneficiaries | Australian Retirement Trust',
  description:
    'Nominate a beneficiary to make sure your super goes to the right people. Find out how to nominate, who you can nominate, and what type of nomination is right for you.',
};

export default function Page() {
  return <BeneficiariesPage />;
}
