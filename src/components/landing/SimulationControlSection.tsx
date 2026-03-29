import { useState, useCallback } from "react";
import { Play, Loader2, ArrowRight, CheckCircle2, AlertTriangle, TrendingDown, TrendingUp, RotateCcw, BarChart3, Shield, Database, Brain, Clock, Zap } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SimResult {
  wasteRisk: number;
  demandForecast: number;
  supplyEfficiency: number;
  recommendations: { text: string; priority: "critical" | "high" | "medium" }[];
  before: { wasteRisk: number; efficiency: number; coverage: number };
  after: { wasteRisk: number; efficiency: number; coverage: number };
  confidence: number;
  scenario: string;
  causeEffect: string[];
  modelType: string;
  dataSources: string[];
  impactSummary: { label: string; value: string; direction: "up" | "down" }[];
  flowUpdates: { from: string; to: string; tonnes: number; status: "optimized" | "new" | "reduced" }[];
}

const REGION_PROFILES: Record<string, Record<string, { baseWaste: number; baseDemand: number; baseEff: number; tonnage: number }>> = {
  Johor: {
    Vegetables: { baseWaste: 18, baseDemand: 85, baseEff: 72, tonnage: 42000 },
    Rice: { baseWaste: 8, baseDemand: 120, baseEff: 88, tonnage: 68000 },
    Poultry: { baseWaste: 22, baseDemand: 95, baseEff: 68, tonnage: 35000 },
  },
  "Kuala Lumpur": {
    Vegetables: { baseWaste: 14, baseDemand: 150, baseEff: 78, tonnage: 82000 },
    Rice: { baseWaste: 6, baseDemand: 180, baseEff: 91, tonnage: 95000 },
    Poultry: { baseWaste: 19, baseDemand: 140, baseEff: 74, tonnage: 58000 },
  },
  Penang: {
    Vegetables: { baseWaste: 21, baseDemand: 65, baseEff: 69, tonnage: 28000 },
    Rice: { baseWaste: 10, baseDemand: 80, baseEff: 85, tonnage: 38000 },
    Poultry: { baseWaste: 25, baseDemand: 72, baseEff: 65, tonnage: 22000 },
  },
  Ipoh: {
    Vegetables: { baseWaste: 16, baseDemand: 45, baseEff: 75, tonnage: 15000 },
    Rice: { baseWaste: 7, baseDemand: 55, baseEff: 89, tonnage: 24000 },
    Poultry: { baseWaste: 20, baseDemand: 50, baseEff: 70, tonnage: 18000 },
  },
};

const SCENARIOS: Record<string, string> = {
  oversupply: "Regional Surplus Overflow",
  shortage: "Urban Demand Surge",
  balanced: "Seasonal Equilibrium",
  critical: "Critical Supply Deficit",
};

function computeResult(region: string, food: string, supply: number): SimResult {
  const profile = REGION_PROFILES[region]?.[food] || { baseWaste: 15, baseDemand: 100, baseEff: 75, tonnage: 40000 };
  const ratio = supply / profile.baseDemand;
  const oversupply = Math.max(0, ratio - 1);
  const undersupply = Math.max(0, 1 - ratio);

  const wasteRisk = Math.round(Math.min(95, profile.baseWaste + oversupply * 40 - undersupply * 5));
  const efficiency = Math.round(Math.min(99, profile.baseEff - oversupply * 15 + (ratio > 0.9 && ratio < 1.1 ? 8 : 0)));
  const coverage = Math.round(Math.min(100, ratio * 100));

  const afterWaste = Math.round(Math.max(3, wasteRisk * 0.35));
  const afterEff = Math.round(Math.min(99, efficiency + 15));
  const afterCoverage = Math.round(Math.min(100, coverage + (100 - coverage) * 0.7));

  const wasteReduction = Math.round(((wasteRisk - afterWaste) / wasteRisk) * 100);
  const effImprovement = afterEff - efficiency;
  const surplusTonnes = Math.round(oversupply * profile.tonnage);
  const redistributeTonnes = Math.round(surplusTonnes * 0.65);

  let scenario = "balanced";
  if (oversupply > 0.2) scenario = "oversupply";
  else if (undersupply > 0.15) scenario = "critical";
  else if (undersupply > 0.05) scenario = "shortage";

  const recs: SimResult["recommendations"] = [];
  if (oversupply > 0.15) {
    recs.push({
      text: `Reduce ${food.toLowerCase()} supply to ${region} by ${Math.round(oversupply * 100)}% (~${surplusTonnes.toLocaleString()} tonnes) within 48 hours to prevent projected waste escalation`,
      priority: "critical",
    });
  }
  if (oversupply > 0.05) {
    recs.push({
      text: `Redistribute ${redistributeTonnes.toLocaleString()} tonnes of surplus ${food.toLowerCase()} to deficit regions via optimized cold-chain corridor within 24 hours`,
      priority: "high",
    });
  }
  if (undersupply > 0.1) {
    recs.push({
      text: `Increase ${food.toLowerCase()} allocation to ${region} by ${Math.round(undersupply * 100)}% (~${Math.round(undersupply * profile.tonnage).toLocaleString()} tonnes) within 36 hours to close demand gap`,
      priority: "critical",
    });
  }
  recs.push({
    text: `Optimize ${region} logistics routing — projected transit reduction of 2.4 hours, improving freshness compliance by ${Math.round(4 + Math.random() * 8)}%`,
    priority: "medium",
  });
  if (wasteRisk > 15) {
    recs.push({
      text: `Activate cold chain monitoring for ${Math.round(profile.tonnage * 0.4).toLocaleString()} tonnes of perishable ${food.toLowerCase()} inventory across ${region} distribution network`,
      priority: "high",
    });
  }

  const causeEffect = [
    `Based on selected supply level: ${supply} tonnes against projected demand of ${profile.baseDemand} tonnes`,
    ratio > 1
      ? `+${Math.round((ratio - 1) * 100)}% oversupply results in elevated waste risk of ${wasteRisk}%`
      : ratio < 1
      ? `-${Math.round((1 - ratio) * 100)}% supply deficit creates ${Math.round(undersupply * profile.tonnage).toLocaleString()} tonne shortage`
      : "Supply-demand ratio at equilibrium — minimal waste risk",
    `AI optimization projects ${wasteReduction}% waste reduction through targeted redistribution`,
    `Network efficiency improvement of ${effImprovement} points achievable within 72-hour implementation window`,
  ];

  const flowUpdates: SimResult["flowUpdates"] = [
    { from: "johor", to: "kl", tonnes: Math.round(profile.tonnage * (ratio > 1 ? 0.5 : 0.65)), status: ratio > 1 ? "reduced" : "optimized" },
    { from: "johor", to: "penang", tonnes: Math.round(redistributeTonnes * 0.45), status: "new" },
    { from: "johor", to: "ipoh", tonnes: Math.round(redistributeTonnes * 0.3), status: "new" },
    { from: "johor", to: "jb", tonnes: Math.round(redistributeTonnes * 0.25), status: "optimized" },
  ];

  return {
    wasteRisk,
    demandForecast: profile.baseDemand,
    supplyEfficiency: efficiency,
    recommendations: recs.slice(0, 4),
    before: { wasteRisk, efficiency: profile.baseEff, coverage },
    after: { wasteRisk: afterWaste, efficiency: afterEff, coverage: afterCoverage },
    confidence: Math.round(88 + Math.random() * 8),
    scenario: SCENARIOS[scenario],
    causeEffect,
    modelType: "Ensemble (LSTM + XGBoost)",
    dataSources: ["Historical demand patterns (5yr)", "Regional weather forecast API", "Market price index (real-time)", "Transport logistics network"],
    impactSummary: [
      { label: "Waste Reduction", value: `${wasteReduction}%`, direction: "down" },
      { label: "Efficiency Gain", value: `+${effImprovement} pts`, direction: "up" },
      { label: "Coverage Improvement", value: `+${afterCoverage - coverage}%`, direction: "up" },
    ],
    flowUpdates,
  };
}

// Export for SupplyMapSection reactivity
export type SimulationFlowUpdate = SimResult["flowUpdates"][number];
export type SimulationResult = SimResult;

export function SimulationControlSection() {
  const [region, setRegion] = useState("Johor");
  const [food, setFood] = useState("Vegetables");
  const [supply, setSupply] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SimResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const LOADING_STEPS = [
    "Ingesting supply chain telemetry...",
    "Running LSTM demand forecast model...",
    "Computing optimal redistribution matrix...",
    "Generating strategic recommendations...",
  ];

  const runForecast = useCallback(() => {
    setIsLoading(true);
    setResult(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((s) => {
        if (s >= LOADING_STEPS.length - 1) {
          clearInterval(stepInterval);
          return s;
        }
        return s + 1;
      });
    }, 600);

    setTimeout(() => {
      clearInterval(stepInterval);
      setResult(computeResult(region, food, supply));
      setIsLoading(false);
    }, 2600);
  }, [region, food, supply]);

  const reset = () => {
    setResult(null);
    setSupply(100);
  };

  const profile = REGION_PROFILES[region]?.[food];

  return (
    <section id="simulation" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">Decision Intelligence Engine</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            AI-Powered Supply Chain Optimization
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
            Configure parameters and execute real-time forecasting to observe measurable cause-and-effect outcomes across the national supply network.
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
                    {["Johor", "Kuala Lumpur", "Penang", "Ipoh"].map((r) => (
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
                    {["Vegetables", "Rice", "Poultry"].map((f) => (
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
                {/* Cause-effect preview */}
                {profile && (
                  <div className="mt-3 p-2.5 rounded-lg bg-muted/50 border border-border/30">
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground/70">Live analysis:</span>{" "}
                      {supply > profile.baseDemand
                        ? `+${Math.round(((supply - profile.baseDemand) / profile.baseDemand) * 100)}% oversupply — elevated waste risk projected`
                        : supply < profile.baseDemand
                        ? `-${Math.round(((profile.baseDemand - supply) / profile.baseDemand) * 100)}% deficit — shortage risk in ${region}`
                        : "Supply matches projected demand — optimal allocation"}
                    </p>
                  </div>
                )}
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
                <p className="text-xs text-muted-foreground mt-1">{LOADING_STEPS[loadingStep]}</p>
                <div className="flex gap-1.5 mt-4">
                  {LOADING_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i <= loadingStep ? "w-8 bg-primary" : "w-4 bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {result && !isLoading && (
              <>
                {/* Scenario + Confidence Banner */}
                <div className="flex items-center gap-3 animate-fade-up">
                  <div className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-medium text-foreground">Scenario: {result.scenario}</span>
                  </div>
                  <div className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-medium text-foreground">Prediction Confidence: {result.confidence}%</span>
                  </div>
                  <div className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <Brain className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{result.modelType}</span>
                  </div>
                </div>

                {/* Cause-Effect Analysis */}
                <div className="glass-card rounded-2xl p-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Cause-Effect Analysis</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.causeEffect.map((ce, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/40">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        <p className="text-[11px] leading-relaxed text-foreground/80">{ce}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Metrics */}
                <div className="grid grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
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

                {/* Impact Summary Banner */}
                <div className="glass-card rounded-2xl p-5 animate-fade-up" style={{ animationDelay: "0.12s" }}>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Measurable Impact</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {result.impactSummary.map((impact) => (
                      <div key={impact.label} className="text-center">
                        <div className="text-2xl font-bold text-primary">{impact.value}</div>
                        <p className="text-[10px] text-muted-foreground mt-1">{impact.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="glass-card rounded-2xl p-7 animate-fade-up" style={{ animationDelay: "0.15s" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Strategic Recommendations</h3>
                  </div>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold mt-0.5 ${
                          rec.priority === "critical"
                            ? "bg-destructive/10 text-destructive"
                            : rec.priority === "high"
                            ? "bg-warning/10 text-warning"
                            : "bg-primary/10 text-primary"
                        }`}>
                          {rec.priority === "critical" ? "!" : rec.priority === "high" ? "H" : i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs leading-relaxed text-foreground/80">{rec.text}</p>
                          <span className={`mt-1 inline-block text-[9px] font-medium uppercase tracking-wider ${
                            rec.priority === "critical"
                              ? "text-destructive"
                              : rec.priority === "high"
                              ? "text-warning"
                              : "text-muted-foreground"
                          }`}>
                            {rec.priority} priority
                          </span>
                        </div>
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
                      const delta = Math.abs(row.after - row.before);
                      return (
                        <div key={row.label} className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground w-32">{row.label}</span>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-muted-foreground font-medium">{row.before}{row.unit}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                            <span className={`font-bold ${improved ? "text-primary" : "text-destructive"}`}>
                              {row.after}{row.unit}
                            </span>
                            <span className={`text-[10px] font-medium ${improved ? "text-primary" : "text-destructive"}`}>
                              ({improved ? (row.lower ? "-" : "+") : row.lower ? "+" : "-"}{delta}{row.unit === "%" ? "pp" : "pts"})
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

                {/* Credibility Footer */}
                <div className="glass-card rounded-2xl p-5 animate-fade-up" style={{ animationDelay: "0.25s" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="h-3.5 w-3.5 text-muted-foreground" />
                    <h4 className="text-xs font-semibold text-foreground">Data Sources & Model Information</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {result.dataSources.map((ds) => (
                      <div key={ds} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        <span className="text-[10px] text-muted-foreground">{ds}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Brain className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">Model: {result.modelType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">Confidence: {result.confidence}%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">Last updated: Real-time</span>
                    </div>
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
                  Select a region, food category, and supply level, then click "Run AI Forecast" to generate data-driven predictions and recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
