export function FooterSection() {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-[10px] font-bold">F</span>
          </div>
          <span className="text-sm font-semibold text-foreground">FoodFlow AI</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-md">
          Designed for National Food Security and Supply Optimization.
          Powered by advanced machine learning and real-time supply chain intelligence.
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-4">
          &copy; {new Date().getFullYear()} FoodFlow AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
