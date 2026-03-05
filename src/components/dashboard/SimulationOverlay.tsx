import { Loader2, Brain } from "lucide-react";

interface SimulationOverlayProps {
  isVisible: boolean;
  step: string;
}

export function SimulationOverlay({ isVisible, step }: SimulationOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="rounded-2xl border border-border bg-card p-8 card-shadow text-center animate-count-up" style={{ maxWidth: 360 }}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full gradient-primary">
          <Brain className="h-7 w-7 text-primary-foreground animate-pulse" />
        </div>
        <h3 className="mb-2 text-base font-semibold text-foreground">Running AI Analysis</h3>
        <p className="mb-4 text-sm text-muted-foreground">{step}</p>
        <Loader2 className="mx-auto h-5 w-5 animate-spin text-primary" />
      </div>
    </div>
  );
}
