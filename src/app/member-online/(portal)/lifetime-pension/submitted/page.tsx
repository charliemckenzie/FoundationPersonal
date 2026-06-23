'use client';

import { useRouter } from 'next/navigation';
import { ContentContainer } from '../../../../../components/MemberOnline';
import { useIdvGate } from '../../../../../features/idv';
import { StepSuccess } from '../../../../../features/lifetime-pension/steps/StepSuccess';

export default function LifetimePensionSubmittedPage() {
  const router = useRouter();
  const gate = useIdvGate();
  // This page is for applications that have been submitted but IDV is still
  // outstanding — always show the "verification required" state regardless of
  // any existing IDV cache from other flows.
  const pendingGate = { ...gate, alreadyVerified: false };

  return (
    <ContentContainer size="md">
      <StepSuccess
        onReturnDashboard={() => router.push('/member-online')}
        gate={pendingGate}
        verifyMethod="online"
        otherIdMethod=""
      />
    </ContentContainer>
  );
}
