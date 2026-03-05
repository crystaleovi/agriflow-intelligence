import { type AIAllocation } from "@/lib/gemini";

interface SupplyNetworkMapProps {
  allocation: AIAllocation[];
  hasOptimized: boolean;
}

const NODES = [
  { id: "johor", label: "Johor Farm", x: 300, y: 220, type: "farm" as const },
  { id: "kl", label: "Kuala Lumpur", x: 250, y: 80, type: "market" as const },
  { id: "penang", label: "Penang", x: 100, y: 30, type: "market" as const },
  { id: "ipoh", label: "Ipoh", x: 160, y: 60, type: "market" as const },
  { id: "jb", label: "Johor Bahru", x: 380, y: 260, type: "market" as const },
];

const ROUTES = [
  { from: "johor", to: "kl", market: "Kuala Lumpur", time: "3h" },
  { from: "johor", to: "penang", market: "Penang", time: "5h" },
  { from: "johor", to: "ipoh", market: "Ipoh", time: "4h" },
  { from: "johor", to: "jb", market: "Johor Bahru", time: "1h" },
];

function getNodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function getAllocated(market: string, allocation: AIAllocation[]) {
  return allocation.find((a) => a.market === market)?.allocated || 0;
}

function getRouteColor(allocated: number, demand: number) {
  if (allocated === 0) return "hsl(220, 15%, 80%)";
  if (allocated > demand + 10) return "hsl(0, 72%, 55%)";
  if (allocated >= demand * 0.8) return "hsl(152, 60%, 42%)";
  return "hsl(38, 92%, 55%)";
}

const DEMANDS: Record<string, number> = {
  "Kuala Lumpur": 85,
  "Penang": 42,
  "Ipoh": 25,
  "Johor Bahru": 30,
};

export function SupplyNetworkMap({ allocation, hasOptimized }: SupplyNetworkMapProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 card-shadow">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Digital Twin Supply Network</h3>
          <p className="text-xs text-muted-foreground">Real-time food distribution flows</p>
        </div>
        <div className="flex gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-success" /> Optimized</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-destructive" /> Oversupply</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-warning" /> Partial</span>
        </div>
      </div>
      <svg viewBox="0 0 500 300" className="w-full" style={{ minHeight: 240 }}>
        <defs>
          <marker id="arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="hsl(152, 60%, 42%)" />
          </marker>
          <marker id="arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="hsl(0, 72%, 55%)" />
          </marker>
          <marker id="arrow-orange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="hsl(38, 92%, 55%)" />
          </marker>
          <marker id="arrow-gray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="hsl(220, 15%, 80%)" />
          </marker>
        </defs>
        {/* Routes */}
        {ROUTES.map((route) => {
          const from = getNodeById(route.from);
          const to = getNodeById(route.to);
          const allocated = getAllocated(route.market, allocation);
          const demand = DEMANDS[route.market] || 0;
          const color = getRouteColor(allocated, demand);
          const thickness = Math.max(1.5, Math.min(5, allocated / 20));
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const markerId = allocated === 0 ? "arrow-gray" : allocated > demand + 10 ? "arrow-red" : allocated >= demand * 0.8 ? "arrow-green" : "arrow-orange";

          return (
            <g key={`${route.from}-${route.to}`}>
              <line
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={color}
                strokeWidth={thickness}
                strokeDasharray={hasOptimized ? "none" : "6 4"}
                className={hasOptimized ? "" : "animate-flow-dash"}
                markerEnd={`url(#${markerId})`}
                opacity={allocated === 0 ? 0.3 : 0.8}
              />
              {allocated > 0 && (
                <text x={midX} y={midY - 6} textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontWeight="500">
                  {allocated}t
                </text>
              )}
            </g>
          );
        })}
        {/* Nodes */}
        {NODES.map((node) => {
          const isFarm = node.type === "farm";
          return (
            <g key={node.id}>
              <circle
                cx={node.x} cy={node.y}
                r={isFarm ? 18 : 14}
                className={isFarm ? "fill-primary/20 stroke-primary" : "fill-secondary/20 stroke-secondary"}
                strokeWidth={2}
              />
              <text x={node.x} y={node.y + 3} textAnchor="middle" fontSize={isFarm ? "8" : "7"} fontWeight="600" className="fill-foreground">
                {isFarm ? "🌾" : "🏪"}
              </text>
              <text x={node.x} y={node.y + (isFarm ? 32 : 28)} textAnchor="middle" fontSize="9" fontWeight="600" className="fill-foreground">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
