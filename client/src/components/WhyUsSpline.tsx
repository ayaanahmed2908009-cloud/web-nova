import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface WhyUsSplineProps {
  onLoad?: () => void;
  onError?: () => void;
}

export default function WhyUsSpline({ onLoad, onError }: WhyUsSplineProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    
    if (iframe) {
      // Handle iframe load event
      const handleLoad = () => {
        console.log('Why Us Spline iframe loaded successfully');
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
      };
      
      // Handle iframe error event
      const handleError = (error: any) => {
        console.error('Why Us Spline iframe loading error:', error);
        setIsLoading(false);
        setHasError(true);
        onError?.();
      };
      
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      
      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, [onLoad, onError]);

  return (
    <div className="relative w-full h-full">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">Failed to load animation. Please refresh.</p>
        </div>
      ) : (
        <div className="w-full h-full absolute inset-0" style={{ opacity: isLoading ? 0.3 : 1 }}>
          <iframe 
            ref={iframeRef}
            src="https://my.spline.design/claritystream-eCsj0nbrSwmk5j1VVeqpACbs/"
            frameBorder="0" 
            width="100%" 
            height="100%"
            title="Why Choose Us - 3D Visualization"
            style={{
              borderRadius: 'inherit',
              overflow: 'hidden',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              clipPath: 'inset(0 0 40px 0)', // Clip bottom 40px to hide watermark
            }}
            loading="lazy"
            allowFullScreen
          />

        </div>
      )}
    </div>
  );
}