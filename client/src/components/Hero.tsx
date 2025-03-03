import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Hero() {
  return (
    <section id="who" className="min-h-screen pt-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
          >
            <Card className="overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
              <div className="relative w-full h-[400px]">
                <svg
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full p-8"
                >
                  <path
                    d="M250 50C142.8 50 56 136.8 56 244c0 71.4 38.6 133.8 96 167.2-1-11.4-1.6-23-1.6-34.8 0-89.6 72.4-162 162-162s162 72.4 162 162c0 11.8-0.6 23.4-1.6 34.8 57.4-33.4 96-95.8 96-167.2 0-107.2-86.8-194-194-194z"
                    fill="#6366f1"
                    opacity="0.2"
                  />
                  <circle cx="250" cy="244" r="120" fill="#4f46e5" opacity="0.3" />
                  <path
                    d="M250 124c-66.2 0-120 53.8-120 120 0 66.2 53.8 120 120 120s120-53.8 120-120c0-66.2-53.8-120-120-120zm0 200c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                    fill="#3730a3"
                    opacity="0.4"
                  />
                  <circle cx="250" cy="244" r="40" fill="#312e81" />
                </svg>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}