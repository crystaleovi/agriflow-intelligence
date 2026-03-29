import { useState, useCallback } from "react";
import { Play, Loader2, ArrowRight, CheckCircle2, AlertTriangle, TrendingDown, TrendingUp, RotateCcw, Truck, Package, BarChart3 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SimResult {
  wasteRisk: number;
  demandForecast: number;
  supplyEfficiency: number;
  recommendations: string[];
  before: { wasteRisk: number; efficiency: number; coverage: number };
  after: { wasteRisk: number; efficiency: number; coverage: number };
}

const REGION_PROFILES: Record<string, Record<string, { baseWaste: number; baseDemand: number; baseEff: number }>> = {
  Johor: {
    Vegetables: { baseWaste: 18, baseDemand: 85, baseEff: 72 },
    Rice: { baseWaste: 8, baseDemand: 120, baseEff: 88 },
    Poultry: { baseWaste: 22, baseDemand: 95, baseEff: 68 },
  },
  "Kuala Lumpur": {
    Vegetables: { baseWaste: 14, baseDemand: 150, baseEff: 78 },
    Rice: { baseWaste: 6, baseDemand: 180, baseEff: 91 },
    Poultry: { baseWaste: 19, baseDemand: 140, baseEff: 74 },
  },
  Penang: {
    Vegetables: { baseWaste: 21, baseDemand: 65, baseEff: 69 },
    Rice: { baseWaste: 10, baseDemand: 80, baseEff: 85 },
    Poultry: { baseWaste: 25, baseDemand: 72, baseEff: 65 },
  },
  Ipoh: {
    Vegetables: { baseWaste: 16, baseDemand: 45, baseEff: 75 },
    Rice: { baseWaste: 7, baseDemand: 55, baseEff: 89 },
    Poultry: { baseWaste: 20, baseDemand: 50, baseEff: 70 },
  },
};

function computeResult(region: string, food: string, supply: number): SimResult {
  const profile = REGION_PROFILES[region]?.[food] || { baseWaste: 15, baseDemand: 100, baseEff: 75 };
  const ratio = supply / profile.baseDemand;
  const oversupply = Math.max(0, ratio - 1);
  const undersupply = Math.max(0, 1 - ratio);

  const wasteRisk = Math.round(Math.min(95, profile.baseWaste + oversupply * 40 - undersupply * 5));
  const efficiency = Math.round(Math.min(99, profile.baseEff - oversupply * 15 + (ratio > 0.9 && ratio < 1.1 ? 8 : 0)));
  const coverage = Math.round(Math.min(100, ratio * 100));

  const afterWaste = Math.round(Math.max(3, wasteRisk * 0.35));
  const afterEff = Math.round(Math.min(99, efficiency + 15));
  const afterCoverage = Math.round(Math.min(100, coverage + (100 - coverage) * 0.7));

  const recs: string[] = [];
  if (oversupply > 0.15) recs.push(`Reduce ${food.toLowerCase()} supply to ${region} by ${Math.round(oversupply * profile.baseDemand)} tonnes`);
  if (oversupply > 0.05) recs.push(`Redistribute surplus to deficit regions via optimized routing`);
  if (undersupply > 0.1) recs.push(`Increase ${food.toLowerCase()} allocation to ${region} — deficit detected`);
  recs.push(`Optimize logistics routes for ${region} distribution corridor`);
  if (wasteRisk > 15) recs.push(`Activate cold chain monitoring for perishable inventory`);

  return {
    wasteRisk,
    demandForecast: profile.baseDemand,
    supplyEfficiency: efficiency,
    recommendations: recs.slice(0, 4),
    before: { wasteRisk, efficiency: profile.baseEff, coverage },
    after: { wasteRisk: afterWaste, efficiency: afterEff, coverage: afterCoverage },
  };
}

export function SimulationControlSection() {
  const [region, setRegion] = useState("Johor");
  const [food, setFood] = useState("Vegetables");
  const [supply, setSupply] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SimResult | null>(null);

  const runForecast = useCallback(() => {
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(computeResult(region, food, supply));
      setIsLoading(false);
    }, 1800);
  }, [region, food, supply]);

  const reset = () => {
    setResult(null);
    setSupply(100);
  };

  return (
    <section id="simulation" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">Interactive Simulation</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            AI-Powered Decision Engine
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
            Configure parameters and run real-time AI forecasting to observe cause-and-effect outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="glass-card rounded-2xl p-7">
            <h3 className="text-sm font-semibold text-foreground mb-1">Simulation Control Panel</h3>
            <p className="text-xs text-muted-foreground mb-6">Configure supply chain parameters</p>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Region</label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="h-10 rounded-xl bg-muted/50 border-border/50 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Johor", "Kuala Lumpur", "Penang", "Ipoh"].map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Food Category</label>
                <Select value={food} onValueChange={setFood}>
                  <SelectTrigger className="h-10 rounded-xl bg-muted/50 border-border/50 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Vegetables", "Rice", "Poultry"].map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-muted-foreground">Supply Level</label>
                  <span className="text-xs font-semibold text-foreground">{supply} tonnes</span>
                </div>
                <Slider
                  value={[supply]}
                  onValueChange={([v]) => setSupply(v)}
                  min={20}
                  max={200}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">20t</span>
                  <span className="text-[10px] text-muted-foreground">200t</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={runForecast}
                  disabled={isLoading}
                  className="flex-1 h-11 rounded-xl bg-foreground text-background hover:opacity-90 transition-all text-sm font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run AI Forecast
                    </>
                  )}
                </Button>
                {result && (
                  <Button onClick={reset} variant="outline" size="icon" className="h-11 w-11 rounded-xl border-border/50">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {isLoading && (
              <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center animate-fade-up">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                <p className="text-sm font-medium text-foreground">Running AI Analysis</p>
                <p className="text-xs text-muted-foreground mt-1">Processing supply chain parameters...</p>
              </div>
            )}

            {result && !isLoading && (
              <>
                {/* Live Metrics */}
                <div className="grid grid-cols-3 gap-4 animate-fade-up">
                  {[
                    {
                      label: "Waste Risk",
                      value: `${result.wasteRisk}%`,
                      icon: AlertTriangle,
                      color: result.wasteRisk > 20 ? "text-destructive" : "text-primary",
                    },
                    {
                      label: "Demand Forecast",
                      value: `${result.demandForecast}t`,
                      icon: TrendingUp,
                      color: "text-foreground",
                    },
                    {
                      label: "Supply Efficiency",
                      value: `${result.supplyEfficiency}/100`,
                      icon: BarChart3,
                      color: result.supplyEfficiency > 80 ? "text-primary" : "text-warning",
                    },
                  ].map((m) => (
                    <div key={m.label} className="glass-card rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{m.label}</span>
                      </div>
                      <span className={`text-2xl font-semibold tracking-tight ${m.color}`}>{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="glass-card rounded-2xl p-7 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">System Recommendations</h3>
                  </div>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs leading-relaxed text-foreground/80">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before vs After */}
                <div className="glass-card rounded-2xl p-7 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                  <h3 className="text-sm font-semibold text-foreground mb-5">Before vs After AI Optimization</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Waste Risk", before: result.before.wasteRisk, after: result.after.wasteRisk, unit: "%", lower: true },
                      { label: "Efficiency Score", before: result.before.efficiency, after: result.after.efficiency, unit: "/100", lower: false },
                      { label: "Demand Coverage", before: result.before.coverage, after: result.after.coverage, unit: "%", lower: false },
                    ].map((row) => {
                      const improved = row.lower ? row.after < row.before : row.after > row.before;
                      return (
                        <div key={row.label} className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground w-32">{row.label}</span>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-muted-foreground font-medium">{row.before}{row.unit}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                            <span className={`font-bold ${improved ? "text-primary" : "text-destructive"}`}>
                              {row.after}{row.unit}
                            </span>
                            {improved ? (
                              <TrendingDown className="h-3.5 w-3.5 text-primary" />
                            ) : (
                              <TrendingUp className="h-3.5 w-3.5 text-destructive" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {!result && !isLoading && (
              <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Play className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Configure & Run</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                  Select a region, food category, and supply level, then click "Run AI Forecast" to see predictions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
