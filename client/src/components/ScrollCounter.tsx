import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function Counter({ end, label, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-black mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 text-sm uppercase tracking-wide">
        {label}
      </div>
    </motion.div>
  );
}

export default function ScrollCounter() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Enhanced visual background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 left-1/4 w-32 h-32 border border-gray-300 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-24 h-24 bg-gray-200 rounded-2xl"
          animate={{
            rotate: [0, 45, 90, 45, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Helping Saudi small businesses and nonprofits gain exposure at minimum cost
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-100/20 to-gray-200/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Counter end={10} label="Entities Supported" />
          </motion.div>
          <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-100/20 to-gray-200/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Counter end={6000} label="Sales Generated for Them" suffix=" USD" />
          </motion.div>
          <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-100/20 to-gray-200/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Counter end={0} label="Added Profit Margin" suffix="%" />
          </motion.div>
          <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-100/20 to-gray-200/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Counter end={100} label="At-Cost Websites" suffix="%" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
