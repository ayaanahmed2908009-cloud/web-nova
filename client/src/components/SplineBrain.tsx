import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Loader2, Brain, Box, Square } from 'lucide-react';

interface SplineBrainProps {
  onLoad?: () => void;
  onError?: () => void;
}

export default function SplineBrain({ onLoad, onError }: SplineBrainProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    console.log('Spline scene loaded successfully');
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = (error: any) => {
    console.error('Spline scene loading error:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    console.error('Error details:', {
      type: typeof error,
      stringified: JSON.stringify(error, null, 2),
      properties: Object.keys(error || {})
    });
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

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
        <div className="w-full h-full" style={{ opacity: isLoading ? 0 : 1 }}>
          <Spline 
            scene="https://prod.spline.design/chips-55ff9936b8398f473371de6b76d3a510/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}