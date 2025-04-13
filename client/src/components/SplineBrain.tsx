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
      };
    }
  }
}

export default function SplineBrain({ onLoad, onError }: SplineBrainProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Using a different approach with direct DOM manipulation after component mount
  useEffect(() => {
    // Create a function to handle the loading of the Spline scene
    const loadSplineScene = () => {
      try {
        // Clear any existing spline-viewer elements to avoid duplicates
        const container = document.getElementById('spline-container');
        if (container) {
          container.innerHTML = '';
          
          // Create a new spline-viewer element
          const splineViewer = document.createElement('spline-viewer');
          splineViewer.setAttribute('url', 'https://prod.spline.design/mChWf0WQHsDe2Mvu/scene.splinecode');
          splineViewer.style.width = '100%';
          splineViewer.style.height = '100%';
          
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

    // Small delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      loadSplineScene();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [onLoad, onError]);

  return (
    <div className="relative w-full h-full">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
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
        <div id="spline-container" className="w-full h-full" style={{ opacity: isLoading ? 0 : 1 }}>
          {/* Spline viewer will be dynamically inserted here */}
        </div>
      )}
    </div>
  );
}