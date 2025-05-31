import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  fallback?: string;
}

export function useImageOptimization(src: string, options: ImageOptimizationOptions = {}) {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      return new Promise<boolean>((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
          resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      });
    };

    const checkAVIFSupport = () => {
      return new Promise<boolean>((resolve) => {
        const avif = new Image();
        avif.onload = avif.onerror = () => {
          resolve(avif.height === 2);
        };
        avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUEAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      });
    };

    const optimizeImage = async () => {
      if (options.format === 'webp') {
        const webpSupported = await checkWebPSupport();
        setIsSupported(webpSupported);
        if (webpSupported) {
          setOptimizedSrc(src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        }
      } else if (options.format === 'avif') {
        const avifSupported = await checkAVIFSupport();
        setIsSupported(avifSupported);
        if (avifSupported) {
          setOptimizedSrc(src.replace(/\.(jpg|jpeg|png|webp)$/i, '.avif'));
        }
      }
    };

    optimizeImage();
  }, [src, options.format]);

  return {
    src: optimizedSrc,
    isSupported,
    fallbackSrc: options.fallback || src
  };
}