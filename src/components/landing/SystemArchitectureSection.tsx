import { Database, Brain, Lightbulb, Target, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Database,
    label: "Data Input",
    description: "Supply volumes, demand signals, regional data",
  },
  {
    icon: Brain,
    label: "AI Prediction",
    description: "Machine learning forecasting models",
  },
  {
    icon: Lightbulb,
    label: "Insight Generation",
    description: "Risk detection, surplus analysis",
  },
  {
    icon: Target,
    label: "Decision Output",
    description: "Actionable redistribution strategy",
  },
];

export function SystemArchitectureSection() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            System Architecture
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
            End-to-end intelligence pipeline from raw data to optimized decisions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4 md:gap-0">
              <div
                className="glass-card rounded-2xl p-6 text-center w-48 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1 opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.15}s` }}
              >
                <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="text-xs font-semibold text-foreground mb-1">{step.label}</h3>
                <p className="text-[10px] leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 mx-3 shrink-0 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
