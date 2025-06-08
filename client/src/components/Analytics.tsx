import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Page view tracking
    const trackPageView = () => {
      // Track page views with analytics service
      if (typeof window !== 'undefined') {
        console.log('Page view:', location);
        
        // Performance monitoring
        if ('performance' in window) {
          const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigationTiming) {
            const pageLoadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
            console.log('Page load time:', pageLoadTime + 'ms');
          }
        }
      }
    };

    trackPageView();
  }, [location]);

  useEffect(() => {
    // Core Web Vitals tracking
    const observeWebVitals = () => {
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('LCP:', entry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }
    };

    observeWebVitals();
  }, []);

  return null;
}