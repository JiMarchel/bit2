import { useMemo, useState } from "react";
import { LineChart, Loader2 } from "lucide-react";
import type { Analysis, Recommendation } from "@/shared/api";
import { useAnalyses } from "@/shared/api";
import { AnalysisCard } from "./analysis-card";
import { AnalysisFilter } from "./analysis-filter";
import { AnalysisDetailSheet } from "@/features/market-analysis";

export function MarketAnalysisPage() {
  const { data, isLoading, isError, error } = useAnalyses();
  const [filter, setFilter] = useState<Recommendation | "all">("all");
  const [selected, setSelected] = useState<Analysis | null>(null);

  const analyses = useMemo(() => {
    const list = data ?? [];
    if (filter === "all") return list;
    return list.filter((item) => item.analysis.recommendation === filter);
  }, [data, filter]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
            <LineChart className="size-5 text-primary" />
            Market Analysis
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated technical signals across major pairs.
          </p>
        </div>
        <AnalysisFilter value={filter} onChange={setFilter} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          Loading analyses…
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
          {error instanceof Error ? error.message : "Failed to load analyses."}
        </div>
      )}

      {!isLoading && !isError && analyses.length === 0 && (
        <div className="rounded-xl border border-border p-10 text-center text-sm text-muted-foreground">
          No analyses match this filter.
        </div>
      )}

      {!isLoading && !isError && analyses.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {analyses.map((item) => (
            <AnalysisCard
              key={item.symbol}
              analysis={item}
              onClick={() => setSelected(item)}
            />
          ))}
        </div>
      )}

      <AnalysisDetailSheet
        analysis={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </div>
  );
}
