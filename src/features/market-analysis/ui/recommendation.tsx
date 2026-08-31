import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui";
import type { Recommendation } from "@/shared/api";

export const RECOMMENDATION_OPTIONS: Array<{
  value: Recommendation | "all";
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "neutral", label: "Neutral" },
];

const recommendationClass: Record<Recommendation, string> = {
  buy: "bg-emerald-50 text-emerald-600",
  "strong buy": "bg-emerald-100 text-emerald-700",
  sell: "bg-rose-50 text-rose-500",
  "strong sell": "bg-rose-100 text-rose-700",
  neutral: "bg-amber-50 text-amber-600",
};

export function RecommendationBadge({
  recommendation,
  className,
}: {
  recommendation: Recommendation;
  className?: string;
}) {
  return (
    <Badge className={cn("text-[10px] font-bold", recommendationClass[recommendation], className)}>
      {recommendation.toUpperCase()}
    </Badge>
  );
}
