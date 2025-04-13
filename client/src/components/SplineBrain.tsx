import { useState } from 'react';
import { Loader2, Brain, Box, Square } from 'lucide-react';

interface SplineBrainProps {
  onLoad?: () => void;
  onError?: () => void;
}

export default function SplineBrain({ onLoad, onError }: SplineBrainProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Using a direct iframe approach which is more reliable
  const handleIframeLoad = () => {
    console.log('Spline iframe loaded successfully');
    setIsLoading(false);
    onLoad?.();
  };

  const handleIframeError = () => {
    console.error('Spline iframe loading error');
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
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
        <iframe 
          src="https://my.spline.design/chips-55ff9936b8398f473371de6b76d3a510/" 
          width="100%" 
          height="100%" 
          style={{ 
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="Spline 3D Design"
          allow="autoplay; fullscreen; camera; gyroscope; accelerometer; magnetometer; xr-spatial-tracking;"
        />
      )}
    </div>
  );
}