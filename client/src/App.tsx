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
import SEOServices from "@/pages/SEOServices";
import MaintenanceSubscription from "@/pages/MaintenanceSubscription";
import EcommerceSolutions from "@/pages/EcommerceSolutions";


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
      <Route path="/seo-services" component={SEOServices} />
      <Route path="/maintenance-subscription" component={MaintenanceSubscription} />
      <Route path="/ecommerce-solutions" component={EcommerceSolutions} />
      <Route path="/examples" component={PortfolioPage} />
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
  return <><Router /><Toaster /></>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
