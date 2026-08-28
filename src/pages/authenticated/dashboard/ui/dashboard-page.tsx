import { BalanceCard } from "./balance-card";
import { SummaryCards } from "./summary-cards";
import { MarketAnalysis } from "./market-analysis";
import { TransactionHistory } from "./transaction-history";
import { EconomicCalendar } from "./economic-calendar";
import { LatestNews } from "./latest-news";
import { ActivePromotions } from "./active-promotions";

export function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <BalanceCard />
      <SummaryCards />
      <MarketAnalysis />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        <TransactionHistory />
        <EconomicCalendar />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <LatestNews />
        <ActivePromotions />
      </div>
    </div>
  );
}
