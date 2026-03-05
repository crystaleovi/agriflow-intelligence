import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const forecastData = [
  { day: "Day 1", supply: 120, demand: 85 },
  { day: "Day 2", supply: 118, demand: 88 },
  { day: "Day 3", supply: 115, demand: 92 },
  { day: "Day 4", supply: 119, demand: 87 },
  { day: "Day 5", supply: 116, demand: 90 },
  { day: "Day 6", supply: 114, demand: 93 },
  { day: "Day 7", supply: 112, demand: 95 },
];

export function DemandForecastChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="text-sm font-semibold text-foreground">7-Day Demand Forecast</h3>
      <p className="mb-4 text-xs text-muted-foreground">Supply vs Predicted Demand</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={forecastData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(225, 70%, 50%)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="hsl(225, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(264, 60%, 55%)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="hsl(264, 60%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 60%)" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 60%)" />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(220, 15%, 90%)",
              fontSize: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Area type="monotone" dataKey="supply" stroke="hsl(225, 70%, 50%)" fill="url(#supplyGrad)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="demand" stroke="hsl(264, 60%, 55%)" fill="url(#demandGrad)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Supply</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" /> Predicted Demand</span>
      </div>
    </div>
  );
}
