import { motion } from 'framer-motion';

export function CubertoFloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large morphing blob */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-100/30 to-gray-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 0.8, 1],
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Medium floating circle */}
      <motion.div
        className="absolute top-1/3 -left-20 w-40 h-40 bg-gray-50/40 rounded-full blur-2xl"
        animate={{
          scale: [0.8, 1.3, 0.9, 0.8],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Small accent shapes */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-gray-400/30 rounded-lg"
        animate={{
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/4 right-1/3 w-4 h-4 bg-gray-300/40"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        animate={{
          rotate: [0, 120, 240, 360],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

export function CubertoGridPattern() {
  return (
    <div className="absolute inset-0 opacity-5">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

export function CubertoGlowEffect({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-gray-200/20 via-gray-100/10 to-gray-200/20 rounded-3xl blur-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}