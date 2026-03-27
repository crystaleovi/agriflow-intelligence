import { BarChart3, Leaf, Truck } from "lucide-react";

const values = [
  {
    icon: BarChart3,
    title: "Predictive Intelligence",
    text: "Anticipate demand before shortages occur using advanced forecasting models trained on national supply data.",
  },
  {
    icon: Leaf,
    title: "Waste Reduction",
    text: "Minimize food loss through early risk detection, enabling proactive redistribution before perishable goods expire.",
  },
  {
    icon: Truck,
    title: "Optimized Distribution",
    text: "Ensure efficient movement of supply across regions with AI-driven route optimization and capacity planning.",
  },
];

export function ValueSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">Platform Capabilities</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Built for National-Scale Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((v, i) => (
            <div key={i} className="text-center">
              <div className="h-12 w-12 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
                <v.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-3">{v.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
