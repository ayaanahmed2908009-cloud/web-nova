import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    // Get Core Web Vitals
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcp) {
          setMetrics(prev => ({ ...prev, firstContentfulPaint: fcp.startTime }));
        }
      }).observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, largestContentfulPaint: lastEntry.startTime }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            const fid = entry.processingStart - entry.startTime;
            setMetrics(prev => ({ ...prev, firstInputDelay: fid }));
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cumulativeLayoutShift: clsValue }));
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }

    setMetrics(prev => ({ ...prev, loadTime }));
  }, []);

  return metrics;
}

export default function PerformanceMonitor() {
  const metrics = usePerformanceMonitor();

  // Hide performance monitor
  return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="text-green-400 mb-2">Performance Metrics</div>
      {metrics.loadTime && (
        <div>Load: {Math.round(metrics.loadTime)}ms</div>
      )}
      {metrics.firstContentfulPaint && (
        <div>FCP: {Math.round(metrics.firstContentfulPaint)}ms</div>
      )}
      {metrics.largestContentfulPaint && (
        <div>LCP: {Math.round(metrics.largestContentfulPaint)}ms</div>
      )}
      {metrics.firstInputDelay && (
        <div>FID: {Math.round(metrics.firstInputDelay)}ms</div>
      )}
      {metrics.cumulativeLayoutShift && (
        <div>CLS: {metrics.cumulativeLayoutShift.toFixed(3)}</div>
      )}
    </div>
  );
}