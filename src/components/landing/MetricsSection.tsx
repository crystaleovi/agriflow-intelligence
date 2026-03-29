import { TrendingDown, TrendingUp, Package, Activity, Shield } from "lucide-react";

const metrics = [
  {
    label: "Waste Risk",
    value: "12.4%",
    trend: "down",
    trendValue: "↓ 3.2%",
    trendLabel: "reduction vs. last quarter",
    detail: "~18,600 tonnes prevented",
    icon: TrendingDown,
    accent: true,
  },
  {
    label: "Predicted Demand",
    value: "1.2M",
    unit: "tonnes",
    trend: "up",
    trendValue: "↑ 8%",
    trendLabel: "increase projected (7-day)",
    detail: "+96,000 tonnes nationally",
    icon: TrendingUp,
  },
  {
    label: "Total Supply",
    value: "1.35M",
    unit: "tonnes",
    trend: "up",
    trendValue: "↑ 2.1%",
    trendLabel: "vs. seasonal baseline",
    detail: "Surplus: 150,000 tonnes",
    icon: Package,
  },
  {
    label: "Efficiency Score",
    value: "87",
    unit: "/ 100",
    trend: "up",
    trendValue: "↑ 5 pts",
    trendLabel: "from last optimization cycle",
    detail: "Top quartile nationally",
    icon: Activity,
  },
];

export function MetricsSection() {
  return (
    <section id="metrics" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">Key Performance Indicators</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            System Overview
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
            Real-time national metrics generated from ensemble forecasting models with 93% average prediction confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1 opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </span>
                <m.icon className={`h-4 w-4 ${m.accent ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold tracking-tight text-foreground">{m.value}</span>
                {m.unit && <span className="text-sm text-muted-foreground">{m.unit}</span>}
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="text-xs font-semibold text-primary">{m.trendValue}</span>
                <span className="text-xs text-muted-foreground">{m.trendLabel}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-border/40">
                <span className="text-[10px] text-muted-foreground">{m.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Credibility bar */}
        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-primary" />
            Model: Ensemble (LSTM + XGBoost)
          </span>
          <span className="h-3 w-px bg-border" />
          <span>Data: 5-year historical + real-time market feeds</span>
          <span className="h-3 w-px bg-border" />
          <span>Updated: 12 min ago</span>
        </div>
      </div>
    </section>
  );
}
