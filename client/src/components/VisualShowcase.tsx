import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import MasonryGrid from '@/components/MasonryGrid';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const showcaseItems = [
  {
    title: "Modern Design Systems",
    description: "Cohesive visual languages that scale across all touchpoints",
    category: "Design",
    height: "tall"
  },
  {
    title: "Performance Optimization",
    description: "Lightning-fast load times with advanced caching strategies",
    category: "Development", 
    height: "medium"
  },
  {
    title: "Interactive Elements",
    description: "Engaging micro-interactions that delight users",
    category: "UX",
    height: "short"
  },
  {
    title: "Responsive Layouts",
    description: "Pixel-perfect designs that work seamlessly across all devices",
    category: "Development",
    height: "medium"
  },
  {
    title: "Brand Identity",
    description: "Memorable visual identities that tell your story",
    category: "Design",
    height: "tall"
  },
  {
    title: "User Research",
    description: "Data-driven insights that inform every design decision",
    category: "UX",
    height: "short"
  }
];

export default function VisualShowcase() {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Design', 'Development', 'UX'];
  const filteredItems = filter === 'All' 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === filter);

  const handleFilterChange = (category: string) => {
    setIsLoading(true);
    setFilter(category);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Floating geometric shapes */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 border border-gray-200 rounded-lg"
        animate={{ 
          rotate: [0, 45, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <ScrollReveal direction="fade" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Visual Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how sophisticated animations, thoughtful interactions, and beautiful design come together to create exceptional digital experiences.
          </p>
        </ScrollReveal>

        {/* Filter buttons */}
        <ScrollReveal direction="up" delay={0.2} className="flex justify-center mb-12">
          <div className="flex gap-2 p-2 bg-white rounded-full shadow-lg border border-gray-100">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Showcase grid */}
        <ScrollReveal direction="up" delay={0.4}>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLoader.Card key={index} />
              ))}
            </div>
          ) : (
            <MasonryGrid columns={3} gap={24}>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={`${item.title}-${filter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 p-8 ${
                        item.height === 'tall' ? 'h-80' : 
                        item.height === 'medium' ? 'h-48' : 'h-32'
                      }`}>
                        <motion.div
                          className="w-full h-full bg-gradient-to-br from-black/5 to-gray-900/10 rounded-lg flex items-center justify-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="text-4xl font-bold text-gray-400"
                            whileHover={{ rotate: 5 }}
                          >
                            {item.category[0]}
                          </motion.div>
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-black transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </MasonryGrid>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}