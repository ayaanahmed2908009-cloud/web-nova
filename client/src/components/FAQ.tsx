import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Typical website projects take 2-4 weeks from start to finish, depending on complexity and features required. We provide detailed timelines during our initial consultation."
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes, we offer comprehensive maintenance packages including regular updates, security monitoring, content updates, and technical support to keep your website running smoothly."
  },
  {
    question: "Can you help with SEO and digital marketing?",
    answer: "Absolutely! We build all websites with SEO best practices and offer additional digital marketing services including keyword optimization, content strategy, and performance tracking."
  },
  {
    question: "What's included in your web design packages?",
    answer: "Our packages include custom design, responsive development, content management system, basic SEO setup, SSL certificate, and initial training. Additional features can be added based on your needs."
  },
  {
    question: "Do you work with existing websites or only new projects?",
    answer: "We work with both! We can redesign existing websites, add new features, improve performance, or migrate to modern platforms while maintaining your existing content and SEO rankings."
  },
  {
    question: "What platforms and technologies do you use?",
    answer: "We specialize in modern web technologies including React, TypeScript, and cutting-edge frameworks. We also leverage AI tools like Replit and Lovable to accelerate development and deliver higher quality results. We choose the best technology stack based on your specific requirements and goals."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Add FAQ structured data for SEO
  useEffect(() => {
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq', 'structured-data');
    script.textContent = JSON.stringify(faqStructuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[data-faq="structured-data"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our web design and development services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <CardContent className="pt-0 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}