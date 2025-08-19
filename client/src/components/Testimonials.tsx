import { useEffect } from "react";
import { motion } from "framer-motion";

// Create placeholder screenshot images with different colors
const generatePlaceholderImage = (index: number, width: number = 300, height: number = 200) => {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600', 
    'from-purple-400 to-purple-600',
    'from-red-400 to-red-600',
    'from-yellow-400 to-yellow-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-orange-400 to-orange-600',
  ];
  
  const gradient = colors[index % colors.length];
  
  return (
    <div 
      className={`w-full h-48 bg-gradient-to-br ${gradient} rounded-lg shadow-lg flex items-center justify-center text-white font-semibold`}
    >
      <div className="text-center">
        <div className="text-lg mb-2">Screenshot {index + 1}</div>
        <div className="text-sm opacity-80">WebNova Interface</div>
      </div>
    </div>
  );
};

type TestimonialImage = {
  id: number;
  name: string;
  company: string;
  quote: string;
};

const testimonialImages: TestimonialImage[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Meta",
    quote: "Used WebNova for my Meta interview - cleanest code I've written!",
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Amazon", 
    quote: "Got Amazon offer using WebNova's best investment ever",
  },
  {
    id: 3,
    name: "Emma Davis",
    company: "TikTok",
    quote: "From failing interviews to TikTok offer - game changer!",
  },
  {
    id: 4,
    name: "Alex Thompson",
    company: "Google",
    quote: "Landed my dream job at Google thanks to WebNova's platform",
  },
  {
    id: 5,
    name: "David Kim",
    company: "Meta",
    quote: "The practice sessions were incredibly realistic and helpful",
  },
  {
    id: 6,
    name: "Lisa Wang",
    company: "Apple",
    quote: "WebNova's mock interviews prepared me perfectly for Apple",
  },
  {
    id: 7,
    name: "James Wilson",
    company: "Microsoft",
    quote: "Amazing platform that helped me crack Microsoft interviews",
  },
  {
    id: 8,
    name: "Maria Garcia",
    company: "Tesla",
    quote: "The feedback was spot-on and helped me improve drastically",
  },
  {
    id: 9,
    name: "Ryan Lee",
    company: "Netflix",
    quote: "From zero confidence to Netflix offer in 3 months!",
  },
  {
    id: 10,
    name: "Jennifer Brown",
    company: "Uber",
    quote: "WebNova's system design practice was exactly what I needed",
  },
  {
    id: 11,
    name: "Kevin Zhang",
    company: "Airbnb",
    quote: "The coding challenges were perfectly tailored to real interviews",
  },
  {
    id: 12,
    name: "Amy Chen",
    company: "Spotify",
    quote: "Incredible platform - helped me land my Spotify role",
  },
];

// Split testimonials into 3 columns for the animation
const createTestimonialColumns = (testimonials: TestimonialImage[], numColumns: number = 3) => {
  const columns = Array.from({ length: numColumns }, () => [] as TestimonialImage[]);
  testimonials.forEach((testimonial: TestimonialImage, index: number) => {
    columns[index % numColumns].push(testimonial);
  });
  return columns;
};

export default function Testimonials() {
  // Add review structured data for SEO
  useEffect(() => {
    const reviewsStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WebNova Solution",
      "review": testimonialImages.map(testimonial => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": testimonial.name
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": testimonial.quote
      })),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": testimonialImages.length,
        "bestRating": "5"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-testimonials', 'reviews');
    script.textContent = JSON.stringify(reviewsStructuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[data-testimonials="reviews"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const columns = createTestimonialColumns(testimonialImages, 3);

  return (
    <section id="testimonials" className="min-h-screen w-full bg-white py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-600 mb-4">Trusted by</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            87,000+ developers,
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            landing internship to staff level
          </p>
          <p className="text-lg text-gray-600">
            offers at <span className="font-semibold text-black">FAANG, Big Tech, Quant</span>
          </p>
          <p className="text-lg text-gray-600">and more.</p>
        </motion.div>
      </div>

      {/* 3-Column Conveyor Belt Animation */}
      <div className="flex justify-center gap-6 px-4 max-w-6xl mx-auto">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="w-full max-w-sm overflow-hidden">
            <motion.div
              className="flex flex-col gap-6"
              animate={{
                y: [0, -2000],
              }}
              transition={{
                duration: 40 + columnIndex * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Duplicate the column content multiple times for seamless looping */}
              {[...column, ...column, ...column, ...column].map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="w-full flex-shrink-0">
                  {generatePlaceholderImage(testimonial.id - 1)}
                  <div className="bg-white p-4 border border-gray-200 rounded-b-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-black text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-gray-600">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Gradient overlays to fade out top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
}