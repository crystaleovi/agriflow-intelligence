import { Brain, AlertTriangle, TrendingUp, Route } from "lucide-react";

const insights = [
  {
    icon: AlertTriangle,
    title: "Southern Region Surplus",
    text: "Vegetable oversupply projected in Southern Region within 5 days. Immediate redistribution recommended.",
  },
  {
    icon: TrendingUp,
    title: "Urban Demand Spike",
    text: "Urban demand spike expected due to seasonal trend shift. Northern markets require 12% additional supply.",
  },
  {
    icon: Route,
    title: "Logistics Inefficiency",
    text: "Logistics inefficiency detected in Central distribution route. Alternative corridor reduces transit by 2.4 hours.",
  },
];

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
            Machine learning models continuously analyze supply chain data to surface critical intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((item, i) => (
            <div
              key={i}
              className="group glass-card rounded-2xl p-7 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1 opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.15}s` }}
            >
              <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center mb-5">
                <item.icon className="h-4 w-4 text-accent-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
