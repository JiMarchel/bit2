import { TrendingDown, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/shared/ui";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";
import type { Analysis } from "@/shared/api";
import { getSymbolFlags } from "@/shared/api";
import { RecommendationBadge } from "@/features/market-analysis";

export function AnalysisCard({
  analysis,
  onClick,
}: {
  analysis: Analysis;
  onClick: () => void;
}) {
  const { symbol, analysis: data } = analysis;
  const flags = getSymbolFlags(symbol);
  const bullish = data.signals.ma_trend === "bullish";

  return (
    <button type="button" onClick={onClick} className="h-full w-full cursor-pointer text-left">
      <Card className="h-full transition-colors hover:bg-muted/40">
        <CardHeader className="flex justify-between">
          <div className="flex items-center gap-2">
            <AvatarGroup>
              {flags.map((flag) => (
                <Avatar key={flag} size="default">
                  <AvatarImage src={flag} />
                  <AvatarFallback>{symbol.slice(0, 2)}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <span className="font-bold text-card-foreground">{symbol}</span>
          </div>
          <RecommendationBadge recommendation={data.recommendation} />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Bid:</span>
            <span className="font-semibold text-card-foreground">
              {data.current_price.bid}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ask:</span>
            <span className="font-semibold text-card-foreground">
              {data.current_price.ask}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">RSI:</span>
            <span className="font-semibold text-card-foreground">
              {data.indicators.rsi.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Trend:</span>
            <span
              className={cn(
                "flex items-center gap-1 font-semibold",
                bullish ? "text-emerald-600" : "text-rose-500",
              )}
            >
              {bullish ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
              {data.signals.ma_trend}
            </span>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}