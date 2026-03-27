import { TrendingDown, TrendingUp, Package, Activity } from "lucide-react";

const metrics = [
  {
    label: "Waste Risk",
    value: "12.4%",
    trend: "down",
    trendLabel: "3.2% from last quarter",
    icon: TrendingDown,
    accent: true,
  },
  {
    label: "Predicted Demand",
    value: "1.2M",
    unit: "tonnes",
    trend: "up",
    trendLabel: "8% increase projected",
    icon: TrendingUp,
  },
  {
    label: "Total Supply",
    value: "1.35M",
    unit: "tonnes",
    trend: "up",
    trendLabel: "Stable supply chain",
    icon: Package,
  },
  {
    label: "Efficiency Score",
    value: "87",
    unit: "/ 100",
    trend: "up",
    trendLabel: "Top quartile performance",
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
                <span className={`text-xs font-medium ${m.trend === "down" ? "text-primary" : "text-primary"}`}>
                  {m.trend === "down" ? "↓" : "↑"}
                </span>
                <span className="text-xs text-muted-foreground">{m.trendLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
