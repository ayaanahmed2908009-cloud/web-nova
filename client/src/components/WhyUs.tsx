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
    <section id="why" className="h-screen w-full flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600">
              Discover what makes WebNova Solutions the perfect partner for your digital journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="text-center p-8">
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-black" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
