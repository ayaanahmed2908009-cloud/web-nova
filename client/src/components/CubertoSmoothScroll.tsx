import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function CubertoSmoothScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Simple progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
      >
        <div
          className="h-full bg-black transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </>
  );
}