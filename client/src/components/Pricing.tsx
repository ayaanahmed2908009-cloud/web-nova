import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Rocket, Target } from "lucide-react";
import QuoteForm from "./QuoteForm";

export default function Pricing() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <section id="pricing" className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Personalized Solutions, Tailored Pricing</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Starting from 250 SAR to 1000 SAR, based on your specific needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-10 flex-grow">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Customized For You</h3>
                <p className="text-gray-600 mb-6">
                  At WebNova Solutions, we believe that no two businesses are the same—so why should their websites be? Every individual and small business has unique goals, branding, and vision, which is why we don't offer generic, one-size-fits-all packages.
                </p>
                <p className="text-gray-600">
                  Whether you're a freelancer looking for a personal portfolio, a startup in need of a sleek landing page, or a small business requiring a fully functional e-commerce platform, we have you covered.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Our Process</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MessageSquare className="w-6 h-6 text-black mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Initial Consultation</h4>
                      <p className="text-gray-600">We discuss your goals, design preferences, and special features you need.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Target className="w-6 h-6 text-black mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Personalized Quote</h4>
                      <p className="text-gray-600">Receive a custom quote based on your project's complexity and requirements.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Rocket className="w-6 h-6 text-black mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Project Execution</h4>
                      <p className="text-gray-600">We bring your vision to life with a custom-built digital presence.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            With WebNova Solutions, you're not just getting a website—you're getting a custom-built digital presence designed to elevate your brand and help you succeed. Let's bring your vision to life.
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowQuoteForm(true)}
            className="bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Get Your Personalized Quote
          </Button>
        </motion.div>
      </div>

      <QuoteForm open={showQuoteForm} onOpenChange={setShowQuoteForm} />
    </section>
  );
}