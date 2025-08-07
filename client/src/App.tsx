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
import LoadingDemo from "@/pages/LoadingDemo";
import GetWebsite from "@/pages/GetWebsite";
import Services from "@/pages/Services";
import About from "@/pages/About";
import CustomCursor from "@/components/CustomCursor";
import CrypticLoadingScreen from "@/components/CrypticLoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/get-website" component={GetWebsite} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/loading-demo" component={LoadingDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isLoading: authLoading } = useAuth();
  const { isLoading: screenLoading, handleComplete } = useLoadingScreen({
    minDuration: 2500,
    trigger: true // Cryptic loading screen is back!
  });

  return (
    <>
      <CrypticLoadingScreen 
        isVisible={screenLoading} 
        onComplete={handleComplete}
        duration={2500}
      />
      <div style={{ 
        opacity: screenLoading ? 0 : 1, 
        transition: 'opacity 0.6s ease-out',
        transform: screenLoading ? 'translateY(10px)' : 'translateY(0)',
        transitionProperty: 'opacity, transform'
      }}>
        <CustomCursor />
        <Router />
        <Toaster />
      </div>
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
