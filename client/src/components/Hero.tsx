import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SplineBrain from './SplineBrain';

export default function Hero() {
  return (
    <section id="who" className="h-screen w-full flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
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
              className="bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Our Services
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full flex items-center"
          >
            <Card className="overflow-hidden relative bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm h-[500px] w-full">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="relative w-full h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <SplineBrain />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}