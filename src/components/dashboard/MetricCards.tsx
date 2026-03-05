import { AlertTriangle, TrendingUp, Package } from "lucide-react";

interface MetricCardsProps {
  wasteRisk: number;
  predictedDemand: number;
  totalSupply: number;
  hasOptimized: boolean;
}

export function MetricCards({ wasteRisk, predictedDemand, totalSupply, hasOptimized }: MetricCardsProps) {
  const isLowRisk = wasteRisk <= 15;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-5 card-shadow transition-shadow hover:card-shadow-hover">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Waste Risk</span>
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isLowRisk ? "bg-success/10" : "bg-destructive/10"}`}>
            <AlertTriangle className={`h-4 w-4 ${isLowRisk ? "text-success" : "text-destructive"}`} />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${isLowRisk ? "text-success" : "text-destructive"} ${hasOptimized ? "animate-count-up" : ""}`}>
            {wasteRisk}%
          </span>
          {hasOptimized && (
            <span className="text-xs font-medium text-success">↓ optimized</span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {isLowRisk ? "Supply balanced across markets." : "Oversupply detected in Kuala Lumpur market."}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 card-shadow transition-shadow hover:card-shadow-hover">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Predicted Demand</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-3xl font-bold text-foreground">{predictedDemand} <span className="text-lg font-medium text-muted-foreground">tons</span></span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Next-day market demand forecast.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 card-shadow transition-shadow hover:card-shadow-hover">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Total Supply</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
            <Package className="h-4 w-4 text-secondary" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-3xl font-bold text-foreground">{totalSupply} <span className="text-lg font-medium text-muted-foreground">tons</span></span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Tomato supply from Johor farms.</p>
      </div>
    </div>
  );
}
