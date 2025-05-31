import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressiveImageProps {
  src: string;
  placeholderSrc?: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export default function ProgressiveImage({ 
  src, 
  placeholderSrc, 
  alt, 
  className = "",
  onLoad 
}: ProgressiveImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setImageError(true);
    };
    img.src = src;
  }, [src, onLoad]);

  const generatePlaceholder = (width: number = 400, height: number = 300) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL();
  };

  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      <motion.img
        ref={imgRef}
        src={placeholderSrc || generatePlaceholder()}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover filter blur-sm ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        initial={{ opacity: 1 }}
        animate={{ opacity: imageLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main image */}
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: imageLoaded ? 1 : 0,
          scale: imageLoaded ? 1 : 1.1
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        loading="lazy"
      />
    </div>
  );
}