import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SplineBrain from './SplineBrain';

export default function Hero() {
  return (
    <section id="who" className="min-h-screen pt-20 flex items-center relative overflow-hidden">
      {/* Background with a subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/80 z-0"></div>
      
      {/* Spline animation as background */}
      <div className="absolute inset-0">
        <SplineBrain />
      </div>
      
      {/* Content overlay with glass morphism for better readability */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Crafting Digital Excellence for Your Business
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At NovaWeb Solutions, we transform your digital presence with modern,
              responsive websites that captivate your audience and drive results.
            </p>
            <Button
              size="lg"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Our Packages
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center md:justify-end"
          >
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Innovative Web Solutions</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> 
                  Responsive Design
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> 
                  Modern Technology
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> 
                  SEO Optimization
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> 
                  Custom Functionality
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}