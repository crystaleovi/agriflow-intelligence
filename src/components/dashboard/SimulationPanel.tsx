import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

interface SimulationPanelProps {
  redistribution: number;
  targetMarket: string;
  isSimulating: boolean;
  hasOptimized: boolean;
  onRedistributionChange: (val: number) => void;
  onTargetMarketChange: (val: string) => void;
  onRunSimulation: () => void;
  onReset: () => void;
}

export function SimulationPanel({
  redistribution,
  targetMarket,
  isSimulating,
  hasOptimized,
  onRedistributionChange,
  onTargetMarketChange,
  onRunSimulation,
  onReset,
}: SimulationPanelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="text-sm font-semibold text-foreground">Supply Chain Simulation</h3>
      <p className="mb-4 text-xs text-muted-foreground">Configure and run AI optimization</p>

      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">Redistribute Supply</label>
            <span className="text-xs font-semibold text-foreground">{redistribution} tons</span>
          </div>
          <Slider
            value={[redistribution]}
            onValueChange={([v]) => onRedistributionChange(v)}
            min={0}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-muted-foreground">Target Market</label>
          <Select value={targetMarket} onValueChange={onTargetMarketChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Penang">Penang</SelectItem>
              <SelectItem value="Ipoh">Ipoh</SelectItem>
              <SelectItem value="Johor Bahru">Johor Bahru</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onRunSimulation}
            disabled={isSimulating}
            className="flex-1 gradient-primary text-primary-foreground border-0 hover:opacity-90"
            size="sm"
          >
            <Play className="mr-1.5 h-3.5 w-3.5" />
            {isSimulating ? "Running..." : "Run AI Optimization"}
          </Button>
          {hasOptimized && (
            <Button onClick={onReset} variant="outline" size="sm">
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
