import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PortfolioPage from "@/pages/Portfolio";
import Dashboard from "@/pages/Dashboard-new";
import AdminDashboard from "@/pages/AdminDashboard";
import Checkout from "@/pages/Checkout";
import CustomCursor from "@/components/CustomCursor";
import CrypticLoadingScreen from "@/components/CrypticLoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isLoading: authLoading } = useAuth();
  const { isLoading: screenLoading, handleComplete } = useLoadingScreen({
    minDuration: 2500,
    trigger: authLoading
  });

  return (
    <>
      <CrypticLoadingScreen 
        isVisible={screenLoading} 
        onComplete={handleComplete}
        duration={2500}
      />
      <CustomCursor />
      <Router />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
