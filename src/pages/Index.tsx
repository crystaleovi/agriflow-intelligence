import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { SupplyNetworkMap } from "@/components/dashboard/SupplyNetworkMap";
import { DemandForecastChart } from "@/components/dashboard/DemandForecastChart";
import { SimulationPanel } from "@/components/dashboard/SimulationPanel";
import { ScenarioPanel } from "@/components/dashboard/ScenarioPanel";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { HeatmapPanel } from "@/components/dashboard/HeatmapPanel";
import { ImpactAnalytics } from "@/components/dashboard/ImpactAnalytics";
import { SimulationOverlay } from "@/components/dashboard/SimulationOverlay";
import { DataSourcesPanel } from "@/components/dashboard/DataSourcesPanel";
import { useDashboardState } from "@/hooks/useDashboardState";

const Index = () => {
  const {
    state,
    setRedistribution,
    setTargetMarket,
    toggleScenario,
    runSimulation,
    resetSimulation,
  } = useDashboardState();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <SimulationOverlay isVisible={state.isSimulating} step={state.simulationStep} />

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Metric Cards */}
        <MetricCards
          wasteRisk={state.wasteRisk}
          predictedDemand={state.predictedDemand}
          totalSupply={state.totalSupply}
          hasOptimized={state.hasOptimized}
        />

        {/* Row 1: Map + Heatmap */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SupplyNetworkMap allocation={state.allocation} hasOptimized={state.hasOptimized} />
          <HeatmapPanel
            marketData={state.marketData}
            wasteRisk={state.wasteRisk}
            demandCoverage={state.demandCoverage}
            efficiencyScore={state.efficiencyScore}
            hasOptimized={state.hasOptimized}
          />
        </div>

        {/* Row 2: Forecast + Simulation Controls */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DemandForecastChart />
          <div className="space-y-4">
            <SimulationPanel
              redistribution={state.redistribution}
              targetMarket={state.targetMarket}
              isSimulating={state.isSimulating}
              hasOptimized={state.hasOptimized}
              onRedistributionChange={setRedistribution}
              onTargetMarketChange={setTargetMarket}
              onRunSimulation={runSimulation}
              onReset={resetSimulation}
            />
            <DataSourcesPanel />
          </div>
        </div>

        {/* Row 3: Scenarios + AI Insights */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ScenarioPanel activeScenarios={state.activeScenarios} onToggle={toggleScenario} />
          <AIInsightsPanel
            reasoning={state.reasoning}
            confidence={state.confidence}
            wasteRisk={state.wasteRisk}
            demandCoverage={state.demandCoverage}
            hasOptimized={state.hasOptimized}
            redistribution={state.redistribution}
            targetMarket={state.targetMarket}
          />
        </div>

        {/* Impact Analytics */}
        <div className="mt-6">
          <ImpactAnalytics
            wasteRisk={state.wasteRisk}
            demandCoverage={state.demandCoverage}
            efficiencyScore={state.efficiencyScore}
            hasOptimized={state.hasOptimized}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
