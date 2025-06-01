import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Pause } from 'lucide-react';

interface ShowcaseItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 1,
    title: "Modern E-commerce",
    category: "Web Development",
    description: "Responsive online store with seamless user experience",
    image: "/api/placeholder/600/400",
    color: "from-gray-100 to-gray-200"
  },
  {
    id: 2,
    title: "Brand Identity",
    category: "Design System",
    description: "Complete visual identity and design guidelines",
    image: "/api/placeholder/600/400",
    color: "from-gray-50 to-gray-150"
  },
  {
    id: 3,
    title: "Mobile App UI",
    category: "App Design",
    description: "Intuitive mobile interface with modern aesthetics",
    image: "/api/placeholder/600/400",
    color: "from-gray-200 to-gray-300"
  }
];

export default function CubertoShowcase() {
  const [activeItem, setActiveItem] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">Featured</span>
            <span className="block text-gray-600">Work</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest projects and creative solutions
          </p>
        </motion.div>

        {/* Showcase Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Preview */}
          <div className="relative">
            <motion.div
              className="relative h-[500px] rounded-3xl overflow-hidden"
              layoutId="showcase-container"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-0 bg-gradient-to-br ${showcaseItems[activeItem].color}`}
                >
                  {/* Content placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/40 rounded-lg"></div>
                      </div>
                      <p className="text-gray-600 font-medium">
                        {showcaseItems[activeItem].title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Play button */}
              <motion.button
                className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-gray-700" />
                ) : (
                  <Play className="w-5 h-5 text-gray-700 ml-0.5" />
                )}
              </motion.button>

              {/* Corner accent */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-white/30 rounded-full"></div>
            </motion.div>

            {/* Progress indicators */}
            <div className="flex gap-2 mt-6">
              {showcaseItems.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeItem ? 'bg-black w-8' : 'bg-gray-300 w-1'
                  }`}
                  onClick={() => setActiveItem(index)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
                    {showcaseItems[activeItem].category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {showcaseItems[activeItem].title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {showcaseItems[activeItem].description}
                  </p>
                </div>

                {/* Action button */}
                <motion.button
                  className="group flex items-center gap-3 text-black hover:text-gray-600 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <span className="font-medium">View Project</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </motion.button>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="space-y-4">
              {showcaseItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    index === activeItem 
                      ? 'border-gray-300 bg-gray-50' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                  onClick={() => setActiveItem(index)}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeItem ? 'bg-black' : 'bg-gray-300'
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}