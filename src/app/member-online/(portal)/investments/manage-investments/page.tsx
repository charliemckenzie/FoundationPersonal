import { InvestmentAccountSelect } from '@/features/investment-mix/InvestmentAccountSelect';
import { MOCK_ACCOUNTS } from '@/features/investment-mix/mockData';

export default function ManageInvestmentsPage() {
  return (
    <InvestmentAccountSelect
      accounts={MOCK_ACCOUNTS}
      formPath="/member-online/investments/manage-investments/change-mix"
      historyPath="/member-online/investments/manage-investments/history"
    />
  );
}
