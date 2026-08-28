import { LineChart, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

type Signal = "SELL" | "BUY" | "NEUTRAL" | "STRONG BUY" | "STRONG SELL";

type Pair = {
  pair: string;
  signal: Signal;
  price: string;
  rsi: number;
  trend: "Bullish" | "Bearish";
};

const pairs: Pair[] = [
  { pair: "NZDUSD", signal: "SELL", price: "0.59605", rsi: 67, trend: "Bullish" },
  { pair: "EURJPY", signal: "NEUTRAL", price: "185.722", rsi: 29, trend: "Bearish" },
  { pair: "EURGBP", signal: "NEUTRAL", price: "0.85676", rsi: 24, trend: "Bearish" },
  { pair: "GBPJPY", signal: "SELL", price: "216.764", rsi: 48, trend: "Bearish" },
  { pair: "EURUSD", signal: "STRONG BUY", price: "1.16452", rsi: 53, trend: "Bullish" },
  { pair: "GBPUSD", signal: "BUY", price: "1.35892", rsi: 61, trend: "Bullish" },
  { pair: "USDJPY", signal: "STRONG SELL", price: "159.331", rsi: 34, trend: "Bearish" },
];

const signalClass: Record<Signal, string> = {
  BUY: "bg-emerald-50 text-emerald-600",
  "STRONG BUY": "bg-emerald-100 text-emerald-700",
  SELL: "bg-rose-50 text-rose-500",
  "STRONG SELL": "bg-rose-100 text-rose-700",
  NEUTRAL: "bg-amber-50 text-amber-600",
};

export function MarketAnalysis() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-primary">
          <LineChart className="size-5" />
          Market Analysis
        </h2>
        <p className="text-xs text-muted-foreground">
          Last Update: 2026-08-27 23:22:54
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {pairs.map((item) => {
          const bullish = item.trend === "Bullish";
          return (
            <div
              key={item.pair}
              className="min-w-52 shrink-0 rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-card-foreground">{item.pair}</span>
                <Badge className={cn("text-[10px] font-bold", signalClass[item.signal])}>
                  {item.signal}
                </Badge>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-semibold text-card-foreground">{item.price}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">RSI: {item.rsi}</span>
                <span
                  className={cn(
                    "flex items-center gap-1 font-semibold",
                    bullish ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {bullish ? (
                    <TrendingUp className="size-3.5" />
                  ) : (
                    <TrendingDown className="size-3.5" />
                  )}
                  {item.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
