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
            }}
            loading="lazy"
            allowFullScreen
          />
          {/* Elegant watermark cover with design elements */}
          <div 
            className="absolute bottom-0 right-0 w-36 h-10 pointer-events-none z-10 overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 40%, rgba(243,244,246,0.99) 100%)',
              backdropFilter: 'blur(8px)',
              borderTopLeftRadius: '12px',
              borderBottomRightRadius: 'inherit',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 20px rgba(0,0,0,0.03)'
            }}
          >
            {/* Subtle decorative elements */}
            <div 
              className="absolute top-1 left-2 w-1 h-1 rounded-full opacity-30"
              style={{ background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)' }}
            />
            <div 
              className="absolute bottom-1 right-3 w-1.5 h-1.5 rounded-full opacity-20"
              style={{ background: 'linear-gradient(45deg, #8B5CF6, #EC4899)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}