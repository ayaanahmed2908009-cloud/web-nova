import * as React from "react";
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
import GetApp from "@/pages/GetApp";
import ProjectForm from "@/pages/ProjectForm";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Consultation from "@/pages/Consultation";
import SEOServices from "@/pages/SEOServices";
import MaintenanceSubscription from "@/pages/MaintenanceSubscription";
import CustomCursor from "@/components/CustomCursor";
import CrypticLoadingScreen from "@/components/CrypticLoadingScreen";
import EnhancedCursor from "@/components/EnhancedCursor";
import EnhancedLoadingScreen from "@/components/EnhancedLoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/get-website" component={GetWebsite} />
      <Route path="/get-app" component={GetApp} />
      <Route path="/project-form" component={ProjectForm} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/seo-services" component={SEOServices} />
      <Route path="/maintenance-subscription" component={MaintenanceSubscription} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/dashboard" component={AdminDashboard} />
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
    trigger: false // Temporarily disabled to fix the admin dashboard access
  });

  // Ensure scroll is always available at app level
  React.useEffect(() => {
    // Force restore scroll on app load
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Ensure html and body can scroll to top
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Clean up on unmount
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <EnhancedLoadingScreen 
        isVisible={screenLoading} 
        onComplete={handleComplete}
        duration={3500}
      />
      <div style={{ 
        opacity: screenLoading ? 0 : 1, 
        transition: 'opacity 0.6s ease-out',
        transform: screenLoading ? 'translateY(10px)' : 'translateY(0)',
        transitionProperty: 'opacity, transform'
      }}>
        <EnhancedCursor />
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
