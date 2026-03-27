const NODES = [
  { id: "johor", label: "Johor", sub: "Supply Hub", x: 310, y: 230, type: "farm" as const },
  { id: "kl", label: "Kuala Lumpur", sub: "Primary Market", x: 250, y: 100, type: "market" as const },
  { id: "penang", label: "Penang", sub: "Northern Market", x: 110, y: 30, type: "market" as const },
  { id: "ipoh", label: "Ipoh", sub: "Central Market", x: 170, y: 65, type: "market" as const },
  { id: "jb", label: "Johor Bahru", sub: "Southern Market", x: 400, y: 260, type: "market" as const },
];

const ROUTES = [
  { from: "johor", to: "kl", flow: "82k", status: "optimal" },
  { from: "johor", to: "penang", flow: "28k", status: "optimal" },
  { from: "johor", to: "ipoh", flow: "15k", status: "surplus" },
  { from: "johor", to: "jb", flow: "22k", status: "optimal" },
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function SupplyMapSection() {
  return (
    <section id="map" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
            Digital Twin
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            National Supply Flow Intelligence
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
            Real-time visualization of food distribution across Malaysia's primary supply corridors.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" /> Optimal Flow
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-warning" /> Surplus Risk
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Live</span>
          </div>

          <svg viewBox="0 0 500 310" className="w-full" style={{ minHeight: 280 }}>
            <defs>
              <marker id="arr-g" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5" fill="hsl(152, 45%, 42%)" opacity="0.6" />
              </marker>
              <marker id="arr-w" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5" fill="hsl(38, 92%, 55%)" opacity="0.6" />
              </marker>
            </defs>

            {ROUTES.map((route) => {
              const from = getNode(route.from);
              const to = getNode(route.to);
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;
              const isOptimal = route.status === "optimal";

              return (
                <g key={`${route.from}-${route.to}`}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isOptimal ? "hsl(152, 45%, 42%)" : "hsl(38, 92%, 55%)"}
                    strokeWidth={isOptimal ? 2 : 1.5}
                    opacity={0.35}
                    markerEnd={`url(#${isOptimal ? "arr-g" : "arr-w"})`}
                  />
                  <text x={midX} y={midY - 8} textAnchor="middle" fontSize="8" fontWeight="500" className="fill-muted-foreground">
                    {route.flow}t
                  </text>
                </g>
              );
            })}

            {NODES.map((node) => {
              const isFarm = node.type === "farm";
              return (
                <g key={node.id}>
                  <circle
                    cx={node.x} cy={node.y}
                    r={isFarm ? 20 : 14}
                    fill={isFarm ? "hsl(152, 45%, 42%)" : "hsl(0, 0%, 95%)"}
                    fillOpacity={isFarm ? 0.1 : 0.8}
                    stroke={isFarm ? "hsl(152, 45%, 42%)" : "hsl(0, 0%, 85%)"}
                    strokeWidth={1.5}
                  />
                  <circle
                    cx={node.x} cy={node.y}
                    r={3}
                    fill={isFarm ? "hsl(152, 45%, 42%)" : "hsl(0, 0%, 30%)"}
                  />
                  <text x={node.x} y={node.y + (isFarm ? 34 : 28)} textAnchor="middle" fontSize="9" fontWeight="600" className="fill-foreground">
                    {node.label}
                  </text>
                  <text x={node.x} y={node.y + (isFarm ? 45 : 39)} textAnchor="middle" fontSize="7" className="fill-muted-foreground">
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
