import { CloudRain, Truck, TrendingUp, Leaf } from "lucide-react";

interface ScenarioPanelProps {
  activeScenarios: string[];
  onToggle: (scenario: string) => void;
}

const SCENARIOS = [
  { id: "extreme_weather", label: "Extreme Weather", desc: "Heavy rainfall affecting harvest", icon: CloudRain },
  { id: "transport_disruption", label: "Transport Disruption", desc: "Route delays or closures", icon: Truck },
  { id: "demand_spike", label: "Demand Spike", desc: "Sudden demand increase in city", icon: TrendingUp },
  { id: "crop_yield_reduction", label: "Crop Yield Reduction", desc: "Lower than expected harvest", icon: Leaf },
];

export function ScenarioPanel({ activeScenarios, onToggle }: ScenarioPanelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="text-sm font-semibold text-foreground">Scenario Intelligence</h3>
      <p className="mb-3 text-xs text-muted-foreground">Toggle disruption scenarios</p>
      <div className="space-y-2">
        {SCENARIOS.map((s) => {
          const active = activeScenarios.includes(s.id);
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => onToggle(s.id)}
              className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all ${
                active
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/20"
              }`}
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                active ? "bg-primary/15" : "bg-muted"
              }`}>
                <Icon className={`h-3.5 w-3.5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-foreground">{s.label}</div>
                <div className="text-[10px] text-muted-foreground">{s.desc}</div>
              </div>
              <div className={`ml-auto h-2 w-2 shrink-0 rounded-full ${active ? "bg-primary" : "bg-muted"}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
