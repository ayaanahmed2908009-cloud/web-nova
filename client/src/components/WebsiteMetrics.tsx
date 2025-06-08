import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WebsiteMetricsProps {
  className?: string;
}

export default function WebsiteMetrics({ className = '' }: WebsiteMetricsProps) {
  const [metrics, setMetrics] = useState({
    projectsCompleted: 0,
    clientsSatisfied: 0,
    yearsExperience: 0,
    successRate: 0
  });

  const finalMetrics = {
    projectsCompleted: 150,
    clientsSatisfied: 98,
    yearsExperience: 5,
    successRate: 99
  };

  useEffect(() => {
    const animateMetrics = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setMetrics({
          projectsCompleted: Math.floor(finalMetrics.projectsCompleted * easeOutQuart),
          clientsSatisfied: Math.floor(finalMetrics.clientsSatisfied * easeOutQuart),
          yearsExperience: Math.floor(finalMetrics.yearsExperience * easeOutQuart),
          successRate: Math.floor(finalMetrics.successRate * easeOutQuart)
        });

        if (step >= steps) {
          clearInterval(interval);
          setMetrics(finalMetrics);
        }
      }, stepDuration);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateMetrics();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('metrics-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const metricItems = [
    { label: 'Projects Completed', value: metrics.projectsCompleted, suffix: '+' },
    { label: 'Client Satisfaction', value: metrics.clientsSatisfied, suffix: '%' },
    { label: 'Years Experience', value: metrics.yearsExperience, suffix: '+' },
    { label: 'Success Rate', value: metrics.successRate, suffix: '%' }
  ];

  return (
    <section id="metrics-section" className={`py-20 bg-black text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Impact</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Numbers that speak for themselves - our commitment to excellence drives results
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metricItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {item.value}{item.suffix}
              </div>
              <div className="text-gray-400 font-medium">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}