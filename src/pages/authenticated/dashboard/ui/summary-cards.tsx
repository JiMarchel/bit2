import { ArrowDownRight, ArrowLeftRight, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";

const stats = [
  {
    label: "Total Deposit this month",
    value: "$ 200",
    delta: "-100%",
    icon: TrendingUp,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Total Withdrawal this month",
    value: "$ 23",
    delta: "-100%",
    icon: TrendingDown,
    iconClass: "bg-rose-50 text-rose-500",
  },
  {
    label: "Total Transactions",
    value: "17",
    delta: "-100%",
    icon: ArrowLeftRight,
    iconClass: "bg-sky-50 text-sky-600",
  },
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="shadow-sm">
          <CardContent className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-card-foreground">
                {stat.value}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-rose-500">
                <ArrowDownRight className="size-3.5" />
                {stat.delta}
              </p>
            </div>
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${stat.iconClass}`}
            >
              <stat.icon className="size-5" />
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
