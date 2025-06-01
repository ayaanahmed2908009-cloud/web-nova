import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CubertoLayoutProps {
  children: ReactNode;
  className?: string;
}

export function CubertoSection({ children, className = "" }: CubertoLayoutProps) {
  return (
    <motion.section
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function CubertoGrid({ children, className = "" }: CubertoLayoutProps) {
  return (
    <div className={`grid grid-cols-12 gap-6 ${className}`}>
      {children}
    </div>
  );
}

export function CubertoCard({ children, className = "" }: CubertoLayoutProps) {
  return (
    <motion.div
      className={`relative p-8 rounded-3xl bg-white border border-gray-100 ${className}`}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-6 right-6 w-2 h-2 bg-gray-300 rounded-full opacity-60"></div>
      {children}
    </motion.div>
  );
}

export function CubertoText({ 
  children, 
  className = "",
  delay = 0 
}: CubertoLayoutProps & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}