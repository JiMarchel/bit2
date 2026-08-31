import type { ReactNode } from "react";
import { BookmarkPlus, Copy, Sparkles } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Badge,
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui";
import { toast } from "@/shared/ui/toast";
import { cn } from "@/shared/lib/cn";
import type { Analysis } from "@/shared/api";
import { getSymbolFlags } from "@/shared/api";
import { RecommendationBadge } from "./recommendation";

function fmt(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 5 });
}

function signalTone(value: string) {
  if (/bull|buy|oversold/.test(value)) return "bg-emerald-50 text-emerald-600";
  if (/bear|sell|overbought/.test(value)) return "bg-rose-50 text-rose-500";
  return "bg-muted text-muted-foreground";
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-card-foreground">{value}</span>
    </div>
  );
}

function SignalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <Badge className={cn("capitalize", signalTone(value))}>{value}</Badge>
    </div>
  );
}

export function AnalysisDetailSheet({
  analysis,
  open,
  onOpenChange,
}: {
  analysis: Analysis | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const data = analysis?.analysis;

  function handleCopy() {
    if (!analysis || !data) return;
    const text = [
      `${analysis.symbol} — ${data.recommendation.toUpperCase()}`,
      `Bid ${fmt(data.current_price.bid)} / Ask ${fmt(data.current_price.ask)}`,
      `RSI ${data.indicators.rsi} (${data.signals.rsi})`,
      `MA trend ${data.signals.ma_trend}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(
      () => toast.add({ title: "Copied", description: `${analysis.symbol} signal copied` }),
      () => toast.add({ title: "Copy failed", description: "Clipboard unavailable" }),
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>{analysis ? `${analysis.symbol} Signal` : "Signal"}</SheetTitle>
        </SheetHeader>

        {analysis && data && (
          <div className="flex flex-col gap-4 p-4">
            {/* Signal banner */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <AvatarGroup>
                  {getSymbolFlags(analysis.symbol).map((flag) => (
                    <Avatar key={flag} size="default">
                      <AvatarImage src={flag} />
                      <AvatarFallback>{analysis.symbol.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                <div>
                  <p className="font-bold text-card-foreground">{analysis.symbol}</p>
                  <p className="text-xs text-muted-foreground uppercase">
                    {data.recommendation} signal
                  </p>
                </div>
              </div>
            </div>

            {/* Entry / TP / SL */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
                <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  Entry
                </p>
                <p className="mt-1 font-bold text-emerald-600">{fmt(data.current_price.bid)}</p>
              </div>
              <div className="rounded-lg border border-sky-200 bg-sky-50/60 p-3 text-center dark:border-sky-900 dark:bg-sky-950/30">
                <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  Take Profit
                </p>
                <p className="mt-1 font-bold text-sky-600">
                  {data.trading_suggestions ? fmt(data.trading_suggestions.take_profit.key_level) : "—"}
                </p>
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3 text-center dark:border-rose-900 dark:bg-rose-950/30">
                <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  Stop Loss
                </p>
                <p className="mt-1 font-bold text-rose-500">
                  {data.trading_suggestions ? fmt(data.trading_suggestions.stop_loss) : "—"}
                </p>
              </div>
            </div>

            {/* Signals */}
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h3 className="font-semibold text-card-foreground">Signal Analysis</h3>
                <RecommendationBadge recommendation={data.recommendation} className="ml-auto" />
              </div>
              <Separator className="my-3" />
              <Row label="RSI" value={`${data.indicators.rsi} (${data.signals.rsi})`} />
              <SignalRow label="MA Trend" value={data.signals.ma_trend} />
              <SignalRow label="MA Cross" value={data.signals.ma_cross} />
              <SignalRow label="MACD" value={data.signals.macd} />
              <SignalRow label="Bollinger" value={data.signals.bollinger} />
            </div>

            {/* Indicators */}
            <div className="rounded-xl border border-border p-4">
              <h3 className="font-semibold text-card-foreground">Indicators</h3>
              <Separator className="my-3" />
              <Row label="SMA 10" value={fmt(data.indicators.moving_averages.sma_10)} />
              <Row label="SMA 20" value={fmt(data.indicators.moving_averages.sma_20)} />
              <Row label="SMA 50" value={fmt(data.indicators.moving_averages.sma_50)} />
              <Row label="MACD line" value={fmt(data.indicators.macd.macd_line)} />
              <Row label="Signal line" value={fmt(data.indicators.macd.signal_line)} />
              <Row label="Histogram" value={fmt(data.indicators.macd.histogram)} />
              <Row label="Bollinger upper" value={fmt(data.indicators.bollinger_bands.upper)} />
              <Row label="Bollinger lower" value={fmt(data.indicators.bollinger_bands.lower)} />
            </div>

            {/* Trading suggestion */}
            {data.trading_suggestions && (
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold text-card-foreground">Trading Suggestion</h3>
                <Separator className="my-3" />
                <Row
                  label="Risk / Reward"
                  value={`1 : ${data.trading_suggestions.risk_reward.atr_based.toFixed(2)}`}
                />
                <Row label="Volatility (ATR)" value={fmt(data.trading_suggestions.volatility.atr)} />
                <Row label="Daily range" value={fmt(data.trading_suggestions.volatility.daily_range)} />
                <Row label="Recent high" value={fmt(data.trading_suggestions.key_levels.recent_high)} />
                <Row label="Recent low" value={fmt(data.trading_suggestions.key_levels.recent_low)} />
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground">
              Last update: {data.last_update}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <BookmarkPlus className="size-4" />
                Save Signal
              </Button>
              <Button className="flex-1 bg-emerald-500 text-white hover:bg-emerald-500/90" onClick={handleCopy}>
                <Copy className="size-4" />
                Copy Signal
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
