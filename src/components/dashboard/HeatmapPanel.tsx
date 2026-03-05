import type { MarketData } from "@/hooks/useDashboardState";

interface HeatmapPanelProps {
  marketData: MarketData[];
  wasteRisk: number;
  demandCoverage: number;
  efficiencyScore: number;
  hasOptimized: boolean;
}

function statusColor(status: MarketData["status"]) {
  switch (status) {
    case "balanced": return "bg-success/15 text-success";
    case "shortage": return "bg-destructive/15 text-destructive";
    case "oversupply": return "bg-secondary/15 text-secondary";
  }
}

function statusLabel(status: MarketData["status"]) {
  switch (status) {
    case "balanced": return "Balanced";
    case "shortage": return "Shortage";
    case "oversupply": return "Oversupply";
  }
}

export function HeatmapPanel({ marketData, wasteRisk, demandCoverage, efficiencyScore, hasOptimized }: HeatmapPanelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="text-sm font-semibold text-foreground">Supply-Demand Balance</h3>
      <p className="mb-3 text-xs text-muted-foreground">Market allocation overview</p>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Market</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Demand</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Allocated</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((m) => (
              <tr key={m.market} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-medium text-foreground">{m.market}</td>
                <td className="px-3 py-2 text-right text-muted-foreground">{m.demand}t</td>
                <td className="px-3 py-2 text-right font-medium text-foreground">{m.allocated}t</td>
                <td className="px-3 py-2 text-right">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor(m.status)}`}>
                    {statusLabel(m.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary metrics */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-muted/50 p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Waste Risk</div>
          <div className={`text-sm font-bold ${wasteRisk <= 15 ? "text-success" : "text-destructive"}`}>{wasteRisk}%</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Coverage</div>
          <div className={`text-sm font-bold ${demandCoverage >= 90 ? "text-success" : "text-foreground"}`}>{demandCoverage}%</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Efficiency</div>
          <div className="text-sm font-bold text-foreground">{efficiencyScore}</div>
        </div>
      </div>
    </div>
  );
}
