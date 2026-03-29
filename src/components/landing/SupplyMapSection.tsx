import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

const NODES = [
  { id: "johor", label: "Johor", sub: "Supply Hub", x: 310, y: 230, type: "farm" as const, tonnage: "42,000t" },
  { id: "kl", label: "Kuala Lumpur", sub: "Primary Market", x: 250, y: 100, type: "market" as const, tonnage: "82,000t" },
  { id: "penang", label: "Penang", sub: "Northern Market", x: 110, y: 30, type: "market" as const, tonnage: "28,000t" },
  { id: "ipoh", label: "Ipoh", sub: "Central Market", x: 170, y: 65, type: "market" as const, tonnage: "15,000t" },
  { id: "jb", label: "Johor Bahru", sub: "Southern Market", x: 400, y: 260, type: "market" as const, tonnage: "22,000t" },
];

interface RouteData {
  from: string;
  to: string;
  flow: string;
  status: "optimal" | "surplus" | "redistribution";
}

const DEFAULT_ROUTES: RouteData[] = [
  { from: "johor", to: "kl", flow: "82,000t", status: "optimal" },
  { from: "johor", to: "penang", flow: "28,000t", status: "optimal" },
  { from: "johor", to: "ipoh", flow: "15,000t", status: "surplus" },
  { from: "johor", to: "jb", flow: "22,000t", status: "optimal" },
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

const statusColors = {
  optimal: "hsl(152, 45%, 42%)",
  surplus: "hsl(38, 92%, 55%)",
  redistribution: "hsl(220, 70%, 55%)",
};

const statusLabels = {
  optimal: "Optimal Flow",
  surplus: "Surplus Risk",
  redistribution: "AI Redistribution",
};

export function SupplyMapSection() {
  const [routes, setRoutes] = useState<RouteData[]>(DEFAULT_ROUTES);
  const [isAnimating, setIsAnimating] = useState(false);
  const [networkScore, setNetworkScore] = useState({ before: 74, after: 74 });
  const [showOptimized, setShowOptimized] = useState(false);

  const runMapOptimization = () => {
    setIsAnimating(true);
    setShowOptimized(false);

    setTimeout(() => {
      setRoutes([
        { from: "johor", to: "kl", flow: "68,000t", status: "optimal" },
        { from: "johor", to: "penang", flow: "+12,400t", status: "redistribution" },
        { from: "johor", to: "ipoh", flow: "+8,200t", status: "redistribution" },
        { from: "johor", to: "jb", flow: "22,000t", status: "optimal" },
      ]);
      setNetworkScore({ before: 74, after: 91 });
      setShowOptimized(true);
      setIsAnimating(false);
    }, 1500);
  };

  const resetMap = () => {
    setRoutes(DEFAULT_ROUTES);
    setShowOptimized(false);
    setNetworkScore({ before: 74, after: 74 });
  };

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
            Real-time visualization of food distribution across Malaysia's primary supply corridors with AI-driven route optimization.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {/* Header controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4 text-[10px] text-muted-foreground">
              {Object.entries(statusLabels).map(([key, label]) => (
                <span key={key} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColors[key as keyof typeof statusColors] }} />
                  {label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {showOptimized && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 animate-fade-up">
                  <span className="text-[10px] font-medium text-muted-foreground">Network Score:</span>
                  <span className="text-[10px] text-muted-foreground">{networkScore.before}</span>
                  <span className="text-[10px] text-muted-foreground">→</span>
                  <span className="text-[10px] font-bold text-primary">{networkScore.after}</span>
                </div>
              )}
              <button
                onClick={showOptimized ? resetMap : runMapOptimization}
                disabled={isAnimating}
                className="text-[10px] font-medium px-3 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isAnimating ? "Optimizing..." : showOptimized ? "Reset" : "Simulate Optimization"}
              </button>
            </div>
          </div>

          <svg viewBox="0 0 500 310" className="w-full" style={{ minHeight: 280 }}>
            <defs>
              {Object.entries(statusColors).map(([key, color]) => (
                <marker key={key} id={`arr-${key}`} markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                  <path d="M0,0 L6,2.5 L0,5" fill={color} opacity="0.7" />
                </marker>
              ))}
            </defs>

            {routes.map((route, idx) => {
              const from = getNode(route.from);
              const to = getNode(route.to);
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;
              const color = statusColors[route.status];
              const isRedistribution = route.status === "redistribution";

              return (
                <g key={`${route.from}-${route.to}`} className={isAnimating ? "animate-pulse" : ""}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={color}
                    strokeWidth={isRedistribution ? 3 : 2}
                    opacity={isRedistribution ? 0.6 : 0.35}
                    markerEnd={`url(#arr-${route.status})`}
                    strokeDasharray={isRedistribution ? "8 4" : "none"}
                    className={isRedistribution ? "animate-flow-dash" : ""}
                  />
                  {/* Flow label */}
                  <g>
                    <rect
                      x={midX - 24}
                      y={midY - 16}
                      width={48}
                      height={14}
                      rx={4}
                      fill={isRedistribution ? color : "hsl(0, 0%, 97%)"}
                      fillOpacity={isRedistribution ? 0.15 : 0.9}
                      stroke={color}
                      strokeWidth={0.5}
                      strokeOpacity={0.3}
                    />
                    <text
                      x={midX}
                      y={midY - 6}
                      textAnchor="middle"
                      fontSize="7"
                      fontWeight={isRedistribution ? "700" : "500"}
                      fill={isRedistribution ? color : "hsl(0, 0%, 45%)"}
                    >
                      {route.flow}
                    </text>
                  </g>
                </g>
              );
            })}

            {NODES.map((node) => {
              const isFarm = node.type === "farm";
              return (
                <g key={node.id}>
                  {/* Pulse ring for farm */}
                  {isFarm && (
                    <circle
                      cx={node.x} cy={node.y}
                      r={24}
                      fill="none"
                      stroke="hsl(152, 45%, 42%)"
                      strokeWidth={1}
                      className="animate-pulse-glow"
                    />
                  )}
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
                  <text x={node.x} y={node.y + (isFarm ? 55 : 49)} textAnchor="middle" fontSize="6.5" fontWeight="500" className="fill-primary">
                    {node.tonnage}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Credibility footer */}
          <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Shield className="h-3 w-3 text-primary" />
              <span>Time-series forecasting model · 93% confidence · Updated in real-time</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
