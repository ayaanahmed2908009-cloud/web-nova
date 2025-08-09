import { useState, useEffect, useRef } from 'react';
import { Loader2, Brain, Box, Square } from 'lucide-react';

interface SplineBrainProps {
  onLoad?: () => void;
  onError?: () => void;
}

export default function SplineBrain({ onLoad, onError }: SplineBrainProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    
    if (iframe) {
      // Handle iframe load event
      const handleLoad = () => {
        console.log('Spline iframe loaded successfully');
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
      };
      
      // Handle iframe error event
      const handleError = (error: any) => {
        console.error('Spline iframe loading error:', error);
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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <Brain className="w-24 h-24 text-primary opacity-50 animate-pulse" />
          <Box className="w-16 h-16 text-primary/30 absolute transform rotate-45 translate-x-12" />
          <Square className="w-12 h-12 text-primary/20 absolute transform -rotate-12 -translate-x-16 translate-y-8" />
        </div>
      ) : (
        <div className="w-full h-full absolute inset-0" style={{ opacity: isLoading ? 0.3 : 1 }}>
          <iframe 
            ref={iframeRef}
            src="https://my.spline.design/customlinepathwithcustommatcap-P1dTY8OOrartvoGLGJgvWbik/"
            frameBorder="0" 
            width="100%" 
            height="100%"
            title="Spline 3D Design"
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
          {/* Comprehensive watermark covers */}
          {/* Bottom-right cover */}
          <div 
            className="absolute bottom-0 right-0 w-40 h-12 pointer-events-none overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.99) 50%, rgba(243,244,246,1) 100%)',
              backdropFilter: 'blur(12px)',
              borderTopLeftRadius: '16px',
              borderBottomRightRadius: 'inherit',
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.9), 0 0 30px rgba(0,0,0,0.05)',
              zIndex: 9999,
              border: '1px solid rgba(255,255,255,0.8)'
            }}
          >
            {/* Brand accent elements */}
            <div 
              className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full opacity-40"
              style={{ background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)' }}
            />
            <div 
              className="absolute bottom-2 right-4 w-2 h-2 rounded-full opacity-25"
              style={{ background: 'linear-gradient(45deg, #8B5CF6, #EC4899)' }}
            />
            <div 
              className="absolute top-1/2 right-8 w-1 h-1 rounded-full opacity-35"
              style={{ background: 'linear-gradient(45deg, #10B981, #3B82F6)' }}
            />
          </div>
          {/* Bottom-left cover (backup) */}
          <div 
            className="absolute bottom-0 left-0 w-32 h-8 pointer-events-none"
            style={{ 
              background: 'linear-gradient(45deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
              backdropFilter: 'blur(8px)',
              borderTopRightRadius: '12px',
              borderBottomLeftRadius: 'inherit',
              zIndex: 9999
            }}
          />
          {/* Center-bottom cover (backup) */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-6 pointer-events-none"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
              backdropFilter: 'blur(8px)',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              zIndex: 9999
            }}
          />
        </div>
      )}
    </div>
  );
}