import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">F</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">FoodFlow AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#metrics" className="hover:text-foreground transition-colors">Metrics</a>
          <a href="#analytics" className="hover:text-foreground transition-colors">Analytics</a>
          <a href="#map" className="hover:text-foreground transition-colors">Supply Map</a>
          <a href="#insights" className="hover:text-foreground transition-colors">Insights</a>
        </div>
        <a
          href="#metrics"
          className="hidden sm:inline-flex h-9 px-4 items-center rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
        >
          View Dashboard
        </a>
      </div>
    </nav>
  );
}
