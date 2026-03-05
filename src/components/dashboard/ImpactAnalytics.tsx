import { ArrowDown, ArrowUp } from "lucide-react";

interface ImpactAnalyticsProps {
  wasteRisk: number;
  demandCoverage: number;
  efficiencyScore: number;
  hasOptimized: boolean;
}

export function ImpactAnalytics({ wasteRisk, demandCoverage, efficiencyScore, hasOptimized }: ImpactAnalyticsProps) {
  if (!hasOptimized) return null;

  const metrics = [
    { label: "Waste Risk", before: 29, after: wasteRisk, unit: "%", good: "lower" as const },
    { label: "Demand Coverage", before: 70, after: demandCoverage, unit: "%", good: "higher" as const },
    { label: "Efficiency Score", before: 82, after: efficiencyScore, unit: "", good: "higher" as const },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5 card-shadow animate-slide-up-fade">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Impact Analytics</h3>
      <div className="space-y-3">
        {metrics.map((m) => {
          const improved = m.good === "lower" ? m.after < m.before : m.after > m.before;
          return (
            <div key={m.label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">{m.before}{m.unit}</span>
                <span className="text-muted-foreground">→</span>
                <span className={`font-bold ${improved ? "text-success" : "text-destructive"}`}>
                  {m.after}{m.unit}
                </span>
                {improved ? (
                  <ArrowUp className="h-3 w-3 text-success" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-destructive" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
