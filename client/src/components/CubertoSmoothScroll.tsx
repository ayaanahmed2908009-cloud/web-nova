import { motion, useScroll } from 'framer-motion';

export default function CubertoSmoothScroll() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <motion.div
        className="h-full bg-black origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
