import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PortfolioPage from "@/pages/Portfolio";
import CustomCursor from "@/components/CustomCursor";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import FloatingActions from "@/components/FloatingActions";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen">
        <CustomCursor />
        <Router />
        <FloatingActions />
        <Toaster />
        <PerformanceMonitor />
      </div>
    </QueryClientProvider>
  );
}

export default App;
