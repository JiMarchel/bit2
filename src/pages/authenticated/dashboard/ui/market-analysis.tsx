import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Loader2, TrendingDown, TrendingUp } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Badge,
} from "@/shared/ui";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";
import {
  type Analysis,
  type Recommendation,
  getSymbolFlags,
  useAnalyses,
} from "@/shared/api";
import { AnalysisDetailSheet } from "@/features/market-analysis";

const signalClass: Record<Recommendation, string> = {
  buy: "bg-emerald-50 text-emerald-600",
  "strong buy": "bg-emerald-100 text-emerald-700",
  sell: "bg-rose-50 text-rose-500",
  "strong sell": "bg-rose-100 text-rose-700",
  neutral: "bg-amber-50 text-amber-600",
};

export function MarketAnalysis() {
  const { data, isLoading } = useAnalyses();
  const [selected, setSelected] = useState<Analysis | null>(null);
  const analyses = (data ?? []).slice(0, 3);
  const lastUpdate = analyses[0]?.analysis.last_update;

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-primary">
          Market Analysis
        </CardTitle>
        {lastUpdate && (
          <p className="text-xs text-muted-foreground">Last Update: {lastUpdate}</p>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading market analysis…
          </div>
        ) : (
          analyses.map((item) => {
            const { symbol, analysis: info } = item;
            const bullish = info.signals.ma_trend === "bullish";
            return (
              <button
                key={symbol}
                type="button"
                onClick={() => setSelected(item)}
                className="cursor-pointer rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AvatarGroup>
                      {getSymbolFlags(symbol).map((flag) => (
                        <Avatar key={flag} size="sm">
                          <AvatarImage src={flag} />
                          <AvatarFallback>{symbol.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroup>
                    <span className="font-bold text-card-foreground">{symbol}</span>
                  </div>
                  <Badge
                    className={cn(
                      "text-[10px] font-bold uppercase",
                      signalClass[info.recommendation],
                    )}
                  >
                    {info.recommendation}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold text-card-foreground">
                    {info.current_price.bid}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    RSI: {info.indicators.rsi.toFixed(2)}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1 font-semibold capitalize",
                      bullish ? "text-emerald-600" : "text-rose-500",
                    )}
                  >
                    {bullish ? (
                      <TrendingUp className="size-3.5" />
                    ) : (
                      <TrendingDown className="size-3.5" />
                    )}
                    {info.signals.ma_trend}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Link
          to="/market-analysis"
          className="flex w-full items-center justify-end gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all signals
          <ArrowRight className="size-4" />
        </Link>
      </CardFooter>

      <AnalysisDetailSheet
        analysis={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </Card>
  );
}
