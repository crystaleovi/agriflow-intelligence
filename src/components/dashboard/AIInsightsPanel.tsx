import { Brain, Zap, Shield, Lightbulb } from "lucide-react";

interface AIInsightsPanelProps {
  reasoning: string[];
  confidence: number;
  wasteRisk: number;
  demandCoverage: number;
  hasOptimized: boolean;
  redistribution: number;
  targetMarket: string;
}

export function AIInsightsPanel({
  reasoning,
  confidence,
  wasteRisk,
  demandCoverage,
  hasOptimized,
  redistribution,
  targetMarket,
}: AIInsightsPanelProps) {
  const defaultReasoning = [
    "Oversupply detected in Kuala Lumpur",
    "Predicted demand surge in Penang",
    "Transport routes within acceptable freshness window",
    "Redistribution reduces spoilage risk",
  ];

  const displayReasoning = reasoning.length > 0 ? reasoning : defaultReasoning;

  return (
    <div className="space-y-4">
      {/* AI Decision Engine */}
      <div className="rounded-xl border border-border bg-card p-5 card-shadow">
        <div className="mb-3 flex items-center gap-2">
          <Brain className="h-4 w-4 text-secondary" />
          <h3 className="text-sm font-semibold text-foreground">AI Decision Engine</h3>
        </div>
        <div className="space-y-2">
          {displayReasoning.map((r, i) => (
            <div key={i} className="flex items-start gap-2 animate-slide-up-fade" style={{ animationDelay: `${i * 100}ms` }}>
              <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-warning" />
              <span className="text-xs text-muted-foreground">{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="rounded-xl border border-border bg-card p-5 card-shadow">
        <div className="mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Recommendation</h3>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium text-foreground">
            Redirect {redistribution} tons of tomatoes from Johor to {targetMarket} market.
          </p>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Waste Risk</span>
              <span>
                <span className="text-destructive">29%</span>
                <span className="mx-1 text-muted-foreground">→</span>
                <span className={`font-semibold ${hasOptimized ? "text-success" : "text-muted-foreground"}`}>
                  {hasOptimized ? `${wasteRisk}%` : "—"}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Demand Coverage</span>
              <span className={`font-semibold ${hasOptimized ? "text-success" : "text-muted-foreground"}`}>
                {hasOptimized ? `${demandCoverage}%` : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confidence */}
      {hasOptimized && confidence > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 card-shadow animate-slide-up-fade">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-success" />
            <h3 className="text-sm font-semibold text-foreground">Prediction Confidence</h3>
          </div>
          <div className="text-2xl font-bold text-success">{confidence}%</div>
          <p className="mt-1 text-[10px] text-muted-foreground">Based on historical demand data and supply chain patterns.</p>
        </div>
      )}
    </div>
  );
}
