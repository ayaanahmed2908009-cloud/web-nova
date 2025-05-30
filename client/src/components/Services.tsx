import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Paintbrush, Settings, LineChart } from "lucide-react";

const services = [
  {
    title: "Website Development",
    description: "Custom-built websites using modern technologies and best practices",
    icon: Code2,
  },
  {
    title: "UI/UX Design",
    description: "Intuitive and engaging user interfaces that enhance user experience",
    icon: Paintbrush,
  },
  {
    title: "Website Maintenance",
    description: "Regular updates and maintenance to keep your site running smoothly",
    icon: Settings,
  },
  {
    title: "SEO Optimization",
    description: "Improve your site's visibility and reach your target audience",
    icon: LineChart,
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: [0.33, 1, 0.68, 1]
    }
  })
};

export default function Services() {
  return (
    <section id="services" className="min-h-screen w-full bg-white pt-24">
      <div className="max-w-7xl mx-auto px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Title */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <motion.h2 
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
              >
                <span className="block">What</span>
                <span className="block text-gray-600">We</span>
                <span className="block">Do</span>
              </motion.h2>
            </div>
            
            <motion.p 
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-lg text-gray-600 leading-relaxed max-w-lg"
            >
              We craft digital experiences that transform your business presence and drive meaningful results through strategic design and development.
            </motion.p>
          </div>

          {/* Right side - Services */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index + 2}
                className="group border-b border-gray-200 pb-8 last:border-b-0"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 p-3 rounded-full bg-gray-50 group-hover:bg-black transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
