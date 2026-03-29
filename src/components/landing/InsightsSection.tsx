import { Brain, AlertTriangle, TrendingUp, Route, Clock, Shield } from "lucide-react";

const insights = [
  {
    icon: AlertTriangle,
    priority: "Critical" as const,
    title: "Southern Region Vegetable Surplus",
    text: "Projected oversupply of 14,200 tonnes in Johor vegetable corridor within 5 days. Immediate redistribution of ~8,500 tonnes to Kuala Lumpur recommended to prevent 23% waste escalation.",
    confidence: 94,
    timeframe: "Action required within 48 hours",
  },
  {
    icon: TrendingUp,
    priority: "High" as const,
    title: "Urban Demand Surge — Northern Region",
    text: "Penang and Ipoh markets forecast +18% demand spike (~6,800 additional tonnes) due to seasonal consumption patterns. Current supply allocation covers only 76% of projected demand.",
    confidence: 89,
    timeframe: "Projected onset: 3–5 days",
  },
  {
    icon: Route,
    priority: "Medium" as const,
    title: "Central Corridor Logistics Inefficiency",
    text: "Alternative routing via Seremban corridor reduces Johor → KL transit time by 2.4 hours, improving freshness compliance by 12% and reducing spoilage loss by an estimated 1,200 tonnes/month.",
    confidence: 91,
    timeframe: "Implementation: 72 hours",
  },
];

const priorityStyles = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
};

export function InsightsSection() {
  return (
    <section id="insights" className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Brain className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium uppercase tracking-widest text-primary">AI Engine</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            AI-Generated Strategic Insights
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
            Ensemble machine learning models continuously analyze 5 years of historical data, real-time market signals, and weather patterns to surface actionable intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((item, i) => (
            <div
              key={i}
              className="group glass-card rounded-2xl p-7 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1 opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.15}s` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-accent-foreground" />
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${priorityStyles[item.priority]}`}>
                  {item.priority}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground mb-4">{item.text}</p>
              <div className="pt-3 border-t border-border/50 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3 w-3 text-primary" />
                  <span className="text-[10px] text-muted-foreground">Confidence: <span className="font-semibold text-foreground">{item.confidence}%</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{item.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
