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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
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
            Building digital experiences that drive real results for our clients
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <Counter end={50} label="Happy Clients" suffix="+" />
          <Counter end={98} label="Satisfaction Rate" suffix="%" />
          <Counter end={75} label="Projects Completed" suffix="+" />
          <Counter end={24} label="Support Hours" suffix="/7" />
        </div>
      </div>
    </section>
  );
}