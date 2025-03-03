import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Loader2, Brain } from 'lucide-react';

interface SplineBrainProps {
  onLoad?: () => void;
  onError?: () => void;
}

export default function SplineBrain({ onLoad, onError }: SplineBrainProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
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
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-32 h-32 text-primary opacity-50" />
        </div>
      ) : (
        <div className="w-full h-full" style={{ opacity: isLoading ? 0 : 1 }}>
          <Spline 
            scene="https://prod.spline.design/particleaibrain-f7a57e65557dcbfd7fa806dead58666f/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}