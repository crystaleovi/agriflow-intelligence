export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-background to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            National Food Security Platform
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.1] opacity-0 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Predicting Food Demand.
          <br />
          <span className="text-muted-foreground">Preventing Waste.</span>
          <br />
          <span className="text-primary">Powering National</span>
          <br />
          <span className="text-primary">Food Security.</span>
        </h1>

        <p
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          FoodFlow AI is an intelligent supply chain platform that enables governments and industries
          to forecast demand, reduce surplus, and optimize food distribution in real time.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#metrics"
            className="inline-flex h-12 px-8 items-center rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all hover:scale-[1.02]"
          >
            View Dashboard
          </a>
          <a
            href="#insights"
            className="inline-flex h-12 px-8 items-center rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted transition-all hover:scale-[1.02]"
          >
            See Insights
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
