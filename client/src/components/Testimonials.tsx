import { useEffect } from "react";
import { motion } from "framer-motion";

// Create iPhone 15-sized placeholder screenshot images
const generatePlaceholderImage = (index: number) => {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600', 
    'from-purple-400 to-purple-600',
    'from-red-400 to-red-600',
    'from-yellow-400 to-yellow-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-orange-400 to-orange-600',
    'from-teal-400 to-teal-600',
  ];
  
  const gradient = colors[index % colors.length];
  
  // Special referral images for first two screenshots
  if (index === 0) {
    return (
      <div 
        className="w-full aspect-[9/19.5] rounded-[2.5rem] shadow-lg border-4 border-gray-800 overflow-hidden bg-black mx-auto"
        style={{ maxWidth: '280px' }}
      >
        <img 
          src="/referral-screenshot.jpeg" 
          alt="Referral Screenshot"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  if (index === 1) {
    return (
      <div 
        className="w-full aspect-[9/19.5] rounded-[2.5rem] shadow-lg border-4 border-gray-800 overflow-hidden bg-black mx-auto"
        style={{ maxWidth: '280px' }}
      >
        <img 
          src="/referral-screenshot2.jpeg" 
          alt="Referral Screenshot 2"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  if (index === 2) {
    return (
      <div 
        className="w-full aspect-[9/19.5] rounded-[2.5rem] shadow-lg border-4 border-gray-800 overflow-hidden bg-black mx-auto"
        style={{ maxWidth: '280px' }}
      >
        <img 
          src="/referral-screenshot3.jpeg" 
          alt="Referral Screenshot 3"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  if (index === 3) {
    return (
      <div 
        className="w-full aspect-[9/19.5] rounded-[2.5rem] shadow-lg border-4 border-gray-800 overflow-hidden bg-black mx-auto"
        style={{ maxWidth: '280px' }}
      >
        <img 
          src="/referral-screenshot4.jpeg" 
          alt="Referral Screenshot 4"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  if (index === 4) {
    return (
      <div 
        className="w-full aspect-[9/19.5] rounded-[2.5rem] shadow-lg border-4 border-gray-800 overflow-hidden bg-black mx-auto"
        style={{ maxWidth: '280px' }}
      >
        <img 
          src="/referral-screenshot5.jpeg" 
          alt="Referral Screenshot 5"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  return (
    <div 
      className={`w-full aspect-[9/19.5] bg-gradient-to-br ${gradient} rounded-[2.5rem] shadow-lg flex items-center justify-center text-white font-semibold border-4 border-gray-800 mx-auto`}
      style={{ maxWidth: '280px' }}
    >
      <div className="text-center">
        <div className="text-sm mb-1">Screenshot {index + 1}</div>
        <div className="text-xs opacity-80">iPhone 15</div>
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
    company: "Apple",
    quote: "The practice sessions were incredibly realistic and helpful",
  },
  {
    id: 6,
    name: "Lisa Wang",
    company: "Microsoft",
    quote: "WebNova's mock interviews prepared me perfectly for my role",
  },
  {
    id: 7,
    name: "James Wilson",
    company: "Netflix",
    quote: "Amazing platform that helped me crack tech interviews",
  },
  {
    id: 8,
    name: "Maria Garcia",
    company: "Uber",
    quote: "The feedback was spot-on and helped me improve drastically",
  },
  {
    id: 9,
    name: "Ryan Lee",
    company: "Spotify",
    quote: "From zero confidence to tech offer in 3 months!",
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
    <section id="testimonials" className="min-h-screen w-full bg-white pt-20 pb-10 relative overflow-hidden">
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

      {/* Responsive Conveyor Belt Animation */}
      <div className="flex justify-center gap-4 md:gap-8 px-4 max-w-6xl mx-auto">
        {/* Mobile: Show only first 2 columns, Desktop: Show all 3 */}
        {columns.map((column, columnIndex) => (
          <div 
            key={columnIndex} 
            className={`w-full overflow-hidden h-[600px] relative ${
              columnIndex === 2 ? 'hidden md:block md:max-w-xs' : 'max-w-sm md:max-w-xs'
            }`}
          >
            <motion.div
              className="flex flex-col gap-6"
              animate={{
                y: [600, -600],
              }}
              transition={{
                duration: 25 + columnIndex * 3,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {/* Quadruple content for ultra-smooth seamless looping */}
              {[...column, ...column, ...column, ...column].map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="w-full flex-shrink-0 flex justify-center">
                  {generatePlaceholderImage(testimonial.id - 1)}
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