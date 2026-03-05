import { Database, Cloud, BarChart3 } from "lucide-react";

export function DataSourcesPanel() {
  const sources = [
    { icon: Cloud, label: "Weather API", status: "Connected" },
    { icon: BarChart3, label: "Market Sales Data", status: "Connected" },
    { icon: Database, label: "Historical Crop Production", status: "Connected" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="text-sm font-semibold text-foreground">Data Sources</h3>
      <p className="mb-3 text-xs text-muted-foreground">Active prediction inputs</p>
      <div className="space-y-2">
        {sources.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="flex-1 text-xs text-foreground">{s.label}</span>
            <span className="flex items-center gap-1 text-[10px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
