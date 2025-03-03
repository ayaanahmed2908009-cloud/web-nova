import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Palette, DollarSign } from "lucide-react";

const features = [
  {
    title: "Fast Turnaround",
    description: "Get your website up and running quickly without compromising quality",
    icon: Clock,
  },
  {
    title: "Custom Design",
    description: "Unique designs tailored to your brand and business needs",
    icon: Palette,
  },
  {
    title: "Affordable Pricing",
    description: "Competitive rates with flexible payment options",
    icon: DollarSign,
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
              alt="Team collaboration"
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
            </motion.div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="flex items-start p-6">
                      <feature.icon className="w-8 h-8 text-primary mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
