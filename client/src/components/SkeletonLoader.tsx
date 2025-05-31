import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'image' | 'button' | 'avatar';
  className?: string;
  lines?: number;
  width?: string;
  height?: string;
}

export default function SkeletonLoader({ 
  variant = 'text', 
  className = "",
  lines = 1,
  width = "100%",
  height = "1rem"
}: SkeletonLoaderProps) {
  const baseClasses = "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse";

  const skeletonVariants = {
    text: `${baseClasses} h-4`,
    card: `${baseClasses} h-32`,
    image: `${baseClasses} aspect-video`,
    button: `${baseClasses} h-10 w-24`,
    avatar: `${baseClasses} w-12 h-12 rounded-full`
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={skeletonVariants.text}
            style={{ 
              width: index === lines - 1 ? '75%' : width,
              height
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${skeletonVariants[variant]} ${className}`}
      style={{ width, height: variant !== 'avatar' ? height : undefined }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// Compound components for common layouts
SkeletonLoader.Card = function SkeletonCard() {
  return (
    <div className="p-6 border border-gray-200 rounded-lg space-y-4">
      <SkeletonLoader variant="image" />
      <SkeletonLoader variant="text" lines={3} />
      <SkeletonLoader variant="button" />
    </div>
  );
};

SkeletonLoader.Profile = function SkeletonProfile() {
  return (
    <div className="flex items-start space-x-4 p-4">
      <SkeletonLoader variant="avatar" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader variant="text" width="40%" />
        <SkeletonLoader variant="text" lines={2} />
      </div>
    </div>
  );
};