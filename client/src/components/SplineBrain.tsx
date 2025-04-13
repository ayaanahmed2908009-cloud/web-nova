import { useState, useEffect } from 'react';
import { Loader2, Brain, Box, Square } from 'lucide-react';

interface SplineBrainProps {
  onLoad?: () => void;
  onError?: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
        loading?: string;
        'events-target'?: string;
        'load-scene'?: string;
      };
    }
  }
}

export default function SplineBrain({ onLoad, onError }: SplineBrainProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Using an improved approach for smoother rendering
  useEffect(() => {
    const loadSplineScene = () => {
      try {
        // Get the container
        const container = document.getElementById('spline-container');
        if (container) {
          container.innerHTML = '';
          
          // Create a new spline-viewer element with optimized settings
          const splineViewer = document.createElement('spline-viewer');
          
          // Set the new URL
          splineViewer.setAttribute('url', 'https://prod.spline.design/b9891f11-c178-4214-88e7-c03e6d932990/scene.splinecode');
          
          // Optimize performance
          splineViewer.setAttribute('loading', 'lazy');
          splineViewer.setAttribute('events-target', 'global');
          splineViewer.setAttribute('load-scene', 'preload');
          
          // Style for full coverage and smooth rendering
          splineViewer.style.width = '100%';
          splineViewer.style.height = '100%';
          splineViewer.style.position = 'absolute';
          splineViewer.style.top = '0';
          splineViewer.style.left = '0';
          splineViewer.style.right = '0';
          splineViewer.style.bottom = '0';
          splineViewer.style.objectFit = 'cover';
          splineViewer.style.willChange = 'transform'; // Performance optimization
          
          // Add event listeners
          splineViewer.addEventListener('load', () => {
            console.log('Spline scene loaded successfully');
            setIsLoading(false);
            setHasError(false);
            onLoad?.();
          });
          
          splineViewer.addEventListener('error', (error) => {
            console.error('Spline scene loading error:', error);
            setIsLoading(false);
            setHasError(true);
            onError?.();
          });
          
          // Append the spline-viewer to the container
          container.appendChild(splineViewer);
        }
      } catch (error) {
        console.error('Error setting up Spline viewer:', error);
        setIsLoading(false);
        setHasError(true);
        onError?.();
      }
    };

    // Load the scene with a slight delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      loadSplineScene();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [onLoad, onError]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <Brain className="w-24 h-24 text-primary opacity-50 animate-pulse" />
          <Box className="w-16 h-16 text-primary/30 absolute transform rotate-45 translate-x-12" />
          <Square className="w-12 h-12 text-primary/20 absolute transform -rotate-12 -translate-x-16 translate-y-8" />
        </div>
      ) : (
        <div id="spline-container" className="relative w-full h-full">
          {/* Spline viewer will be dynamically inserted here */}
        </div>
      )}
    </div>
  );
}