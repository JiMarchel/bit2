import { WithdrawalForm } from "./withdrawal-form";
import { WithdrawalHistory } from "./withdrawal-history";

export function WithdrawalPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <WithdrawalForm />
      <WithdrawalHistory />
    </div>
  );
}
