import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How much does a website cost in Saudi Arabia?",
    answer: "Our professional website development starts at 500 SAR for basic business websites and goes up to 5,000 SAR for complex e-commerce solutions. We offer transparent pricing with no hidden fees and flexible payment plans to suit your budget."
  },
  {
    question: "How long does it take to build a website?",
    answer: "Most websites are completed within 7-14 days. Simple business websites can be delivered in as little as 5 days, while complex e-commerce or custom applications may take 2-4 weeks. We provide regular updates throughout the development process."
  },
  {
    question: "Do you provide SEO optimization for Saudi businesses?",
    answer: "Yes! All our websites include comprehensive SEO optimization for the Saudi market. We implement Arabic and English keywords, local business listings, Google My Business setup, and technical SEO to improve your visibility in search results across Saudi Arabia."
  },
  {
    question: "Will my website work on mobile phones?",
    answer: "Absolutely! All our websites are fully responsive and mobile-optimized. With over 90% of Saudis using mobile devices to browse the internet, we ensure your website provides an excellent experience across all devices and screen sizes."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, we offer comprehensive website maintenance packages including security updates, content updates, performance monitoring, and technical support. Our support team is available to help you keep your website running smoothly."
  },
  {
    question: "Can you help with Arabic website content?",
    answer: "Yes! We have experience creating bilingual Arabic-English websites for Saudi businesses. We can help with Arabic content optimization, right-to-left layout design, and cultural adaptation to better serve your local customers."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-gray-600">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our web design services in Saudi Arabia
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
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
        })}
      </script>
    </section>
  );
}