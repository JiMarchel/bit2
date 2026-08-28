import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

const chartConfig = {
  deposit: { label: "Deposit", color: "#10b981" },
  withdrawal: { label: "Withdrawal", color: "#f43f5e" },
} satisfies ChartConfig;

const days = [
  30, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27,
];
const deposits = [0, 40, 20, 0, 80, 30, 0, 120, 60, 0, 45, 90, 20, 0, 200];
const withdrawals = [0, 10, 0, 25, 0, 15, 40, 0, 12, 30, 0, 8, 23, 0, 5];

const data = days.map((day, i) => ({
  date: `${String(day).padStart(2, "0")}/0${day >= 30 ? 7 : 8}`,
  deposit: deposits[i],
  withdrawal: withdrawals[i],
}));

export function TransactionHistory() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <AreaChart data={data} margin={{ left: -8, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillDeposit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-deposit)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-deposit)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillWithdrawal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-withdrawal)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-withdrawal)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} className="text-xs" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="deposit"
              type="monotone"
              stroke="var(--color-deposit)"
              strokeWidth={2}
              fill="url(#fillDeposit)"
            />
            <Area
              dataKey="withdrawal"
              type="monotone"
              stroke="var(--color-withdrawal)"
              strokeWidth={2}
              fill="url(#fillWithdrawal)"
            />
          </AreaChart>
        </ChartContainer>
        <div className="mt-2 flex items-center justify-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-emerald-500" />
            Deposit
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-500" />
            Withdrawal
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
