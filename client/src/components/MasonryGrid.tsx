import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MasonryGridProps {
  children: ReactNode[];
  columns?: number;
  gap?: number;
  className?: string;
}

export default function MasonryGrid({ 
  children, 
  columns = 3, 
  gap = 16,
  className = ""
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const [itemPositions, setItemPositions] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateLayout = () => {
      const containerWidth = container.offsetWidth;
      const columnWidth = (containerWidth - gap * (columns - 1)) / columns;
      const heights = new Array(columns).fill(0);
      const positions: Array<{ x: number; y: number }> = [];

      children.forEach((_, index) => {
        const shortestColumnIndex = heights.indexOf(Math.min(...heights));
        const x = shortestColumnIndex * (columnWidth + gap);
        const y = heights[shortestColumnIndex];

        positions.push({ x, y });

        // Estimate height for layout calculation
        const estimatedHeight = 200 + Math.random() * 100;
        heights[shortestColumnIndex] += estimatedHeight + gap;
      });

      setColumnHeights(heights);
      setItemPositions(positions);
    };

    calculateLayout();

    const resizeObserver = new ResizeObserver(calculateLayout);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [children.length, columns, gap]);

  const containerHeight = Math.max(...columnHeights);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: itemPositions[index]?.x || 0,
            y: itemPositions[index]?.y || 0
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.33, 1, 0.68, 1]
          }}
          style={{
            width: `calc((100% - ${gap * (columns - 1)}px) / ${columns})`
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}