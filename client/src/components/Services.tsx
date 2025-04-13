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

export default function Services() {
  return (
    <section id="services" className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What Do We Do?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive web solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow flex items-center">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="w-10 h-10 mb-4 text-black" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
