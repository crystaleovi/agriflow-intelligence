import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertCircle } from "lucide-react";

const data = [
  { day: "Mon", supply: 135, demand: 120 },
  { day: "Tue", supply: 130, demand: 125 },
  { day: "Wed", supply: 128, demand: 132 },
  { day: "Thu", supply: 132, demand: 128 },
  { day: "Fri", supply: 127, demand: 134 },
  { day: "Sat", supply: 125, demand: 138 },
  { day: "Sun", supply: 130, demand: 142 },
];

const insights = [
  {
    severity: "high",
    text: "Demand expected to exceed supply in Northern Region by 8% within 3 days.",
  },
  {
    severity: "medium",
    text: "High surplus risk detected in Johor for vegetable category.",
  },
  {
    severity: "action",
    text: "Recommended redistribution: Johor to Kuala Lumpur — 12,000 tonnes.",
  },
  {
    severity: "low",
    text: "Central Region supply-demand ratio stabilizing at optimal levels.",
  },
];

function SeverityDot({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    high: "bg-destructive",
    medium: "bg-warning",
    action: "bg-primary",
    low: "bg-muted-foreground/40",
  };
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors[severity] || colors.low} shrink-0 mt-1.5`} />;
}

export function AnalyticsSection() {
  return (
    <section id="analytics" className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">Analytics</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Supply vs Demand Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Chart - 3 cols */}
          <div className="lg:col-span-3 glass-card rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground">7-Day Forecast</h3>
              <p className="text-xs text-muted-foreground mt-1">National supply and demand projections (thousand tonnes)</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(152, 45%, 42%)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="hsl(152, 45%, 42%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0, 0%, 20%)" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="hsl(0, 0%, 20%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(0, 0%, 45%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(0, 0%, 45%)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(0, 0%, 92%)",
                      borderRadius: "12px",
                      fontSize: "12px",
                      boxShadow: "0 4px 20px hsl(0 0% 0% / 0.08)",
                    }}
                  />
                  <Area type="monotone" dataKey="supply" stroke="hsl(152, 45%, 42%)" strokeWidth={2} fill="url(#supplyGrad)" name="Supply" />
                  <Area type="monotone" dataKey="demand" stroke="hsl(0, 0%, 25%)" strokeWidth={2} fill="url(#demandGrad)" name="Demand" strokeDasharray="6 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-primary rounded-full" /> Supply
              </span>
              <span className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-foreground/60 rounded-full border-dashed" style={{ borderTop: "2px dashed hsl(0,0%,25%)", height: 0 }} /> Demand
              </span>
            </div>
          </div>

          {/* Insights - 2 cols */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="mb-6 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Intelligence Briefing</h3>
            </div>
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <SeverityDot severity={insight.severity} />
                  <p className="text-xs leading-relaxed text-foreground/80">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
