import { ArrowDownRight, ArrowLeftRight, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

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
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          Transaction Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-1 items-start justify-between gap-4 rounded-xl border border-border p-4"
          >
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
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
