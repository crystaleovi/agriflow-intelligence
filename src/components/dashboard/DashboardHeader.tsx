import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card px-6 py-4 card-shadow">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">FoodFlow AI</h1>
            <p className="text-xs text-muted-foreground">Predictive Food Supply Chain Intelligence</p>
          </div>
        </div>
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary text-xs font-medium">
          Demo Mode
        </Badge>
      </div>
    </header>
  );
}
