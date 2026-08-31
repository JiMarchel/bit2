import { DepositForm } from "./deposit-form";
import { DepositHistory } from "./deposit-history";

export function DepositPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <DepositForm />
      <DepositHistory />
    </div>
  );
}
