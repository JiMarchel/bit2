import { buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import type { Recommendation } from "@/shared/api";
import { RECOMMENDATION_OPTIONS } from "@/features/market-analysis";

export function AnalysisFilter({
  value,
  onChange,
}: {
  value: Recommendation | "all";
  onChange: (value: Recommendation | "all") => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {RECOMMENDATION_OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              buttonVariants({ variant: active ? "default" : "outline", size: "sm" }),
              "cursor-pointer capitalize",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
