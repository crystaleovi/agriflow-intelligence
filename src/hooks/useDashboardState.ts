import { useState, useCallback } from "react";
import { runGeminiOptimization, type AIResponse, type AIAllocation } from "@/lib/gemini";

export interface MarketData {
  market: string;
  demand: number;
  allocated: number;
  status: "balanced" | "shortage" | "oversupply";
}

export interface DashboardState {
  // Metrics
  wasteRisk: number;
  predictedDemand: number;
  totalSupply: number;
  demandCoverage: number;
  efficiencyScore: number;
  confidence: number;

  // Simulation controls
  redistribution: number;
  targetMarket: string;
  activeScenarios: string[];

  // AI results
  allocation: AIAllocation[];
  reasoning: string[];
  marketData: MarketData[];

  // UI state
  isSimulating: boolean;
  hasOptimized: boolean;
  simulationStep: string;
}

const INITIAL_MARKET_DATA: MarketData[] = [
  { market: "Kuala Lumpur", demand: 85, allocated: 120, status: "oversupply" },
  { market: "Penang", demand: 42, allocated: 0, status: "shortage" },
  { market: "Ipoh", demand: 25, allocated: 0, status: "shortage" },
  { market: "Johor Bahru", demand: 30, allocated: 0, status: "shortage" },
];

const INITIAL_STATE: DashboardState = {
  wasteRisk: 29,
  predictedDemand: 85,
  totalSupply: 120,
  demandCoverage: 70,
  efficiencyScore: 82,
  confidence: 0,
  redistribution: 20,
  targetMarket: "Penang",
  activeScenarios: [],
  allocation: [
    { market: "Kuala Lumpur", allocated: 120 },
    { market: "Penang", allocated: 0 },
    { market: "Ipoh", allocated: 0 },
    { market: "Johor Bahru", allocated: 0 },
  ],
  reasoning: [],
  marketData: INITIAL_MARKET_DATA,
  isSimulating: false,
  hasOptimized: false,
  simulationStep: "",
};

const SIMULATION_STEPS = [
  "Analyzing supply-demand imbalance...",
  "Forecasting regional demand...",
  "Evaluating disruption scenarios...",
  "Optimizing redistribution strategy...",
  "Generating AI recommendations...",
];

function computeMarketData(allocation: AIAllocation[]): MarketData[] {
  const demands: Record<string, number> = {
    "Kuala Lumpur": 85,
    "Penang": 42,
    "Ipoh": 25,
    "Johor Bahru": 30,
  };
  return allocation.map((a) => {
    const demand = demands[a.market] || 0;
    const diff = a.allocated - demand;
    let status: MarketData["status"] = "balanced";
    if (diff < -5) status = "shortage";
    else if (diff > 10) status = "oversupply";
    return { market: a.market, demand, allocated: a.allocated, status };
  });
}

export function useDashboardState() {
  const [state, setState] = useState<DashboardState>(INITIAL_STATE);

  const setRedistribution = useCallback((val: number) => {
    setState((s) => ({ ...s, redistribution: val }));
  }, []);

  const setTargetMarket = useCallback((val: string) => {
    setState((s) => ({ ...s, targetMarket: val }));
  }, []);

  const toggleScenario = useCallback((scenario: string) => {
    setState((s) => ({
      ...s,
      activeScenarios: s.activeScenarios.includes(scenario)
        ? s.activeScenarios.filter((sc) => sc !== scenario)
        : [...s.activeScenarios, scenario],
    }));
  }, []);

  const runSimulation = useCallback(async () => {
    setState((s) => ({ ...s, isSimulating: true, simulationStep: SIMULATION_STEPS[0] }));

    // Animate through steps
    for (let i = 1; i < SIMULATION_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 800));
      setState((s) => ({ ...s, simulationStep: SIMULATION_STEPS[i] }));
    }

    try {
      const result: AIResponse = await runGeminiOptimization({
        supply: state.totalSupply,
        demand: state.predictedDemand,
        redistribution: state.redistribution,
        market: state.targetMarket,
        scenarios: state.activeScenarios,
      });

      const marketData = computeMarketData(result.allocation);

      setState((s) => ({
        ...s,
        wasteRisk: result.predicted_waste_risk,
        demandCoverage: result.demand_coverage,
        confidence: result.confidence,
        efficiencyScore: Math.min(99, 82 + Math.round((result.demand_coverage - 70) * 0.4)),
        allocation: result.allocation,
        reasoning: result.reasoning,
        marketData,
        isSimulating: false,
        hasOptimized: true,
        simulationStep: "",
      }));
    } catch {
      setState((s) => ({ ...s, isSimulating: false, simulationStep: "" }));
    }
  }, [state.totalSupply, state.predictedDemand, state.redistribution, state.targetMarket, state.activeScenarios]);

  const resetSimulation = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { state, setRedistribution, setTargetMarket, toggleScenario, runSimulation, resetSimulation };
}
