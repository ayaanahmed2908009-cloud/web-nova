import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "What do you charge?", answer: "We charge you the cost of the website and nothing more. There is no added profit margin or agency markup. We explain the costs before starting." },
  { question: "Who is this for?", answer: "Small businesses and nonprofits in Saudi Arabia that need more online exposure without a large development budget." },
  { question: "What costs might my website have?", answer: "Depending on your needs, costs can include a domain, hosting, and third-party services. We explain one-time and recurring costs so you know what you are paying for." },
  { question: "What can you build?", answer: "We build full-stack websites, from public pages and contact forms to online stores and management tools. We choose features around your organization's needs." },
  { question: "How do we get started?", answer: "Tell us about your organization and what you need your website to do. We will discuss the essentials, the cost breakdown, and a realistic timeline." }
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
    <section id="faq" className="py-20 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-medium text-gray-600 mb-4">
            Got Questions?
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-black max-w-2xl mx-auto">
            We've Got Answers
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border rounded-lg bg-white overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-black border-2' : 'border-gray-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 hover:bg-gray-50 transition-colors group"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-black pr-4 group-hover:text-gray-800">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-600 transition-all duration-300 ${
                      openIndex === index ? 'transform rotate-180 text-black' : 'group-hover:text-gray-800'
                    }`}
                  />
                </div>
                {/* Grey highlight line underneath question */}
                <div className={`h-px bg-gray-300 mt-4 transition-all duration-300 ${
                  openIndex === index ? 'opacity-100' : 'opacity-60'
                }`} />
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
                <div className="px-6 pb-6 pt-2">
                  <p className="text-black leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}