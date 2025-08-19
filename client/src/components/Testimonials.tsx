import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

// Generate placeholder chat avatar with initials on black background
const generateChatAvatar = (name: string, company: string) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold text-sm">
      {initials}
    </div>
  );
};

type Testimonial = {
  name: string;
  company: string;
  quote: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    company: "Meta",
    quote: "Used WebNova for my Meta interview - cleanest code I've written!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "Amazon", 
    quote: "Got Amazon offer using WebNova's best investment ever",
    rating: 5,
  },
  {
    name: "Emma Davis",
    company: "TikTok",
    quote: "From failing interviews to TikTok offer - game changer!",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    company: "Google",
    quote: "Landed my dream job at Google thanks to WebNova's platform",
    rating: 5,
  },
  {
    name: "David Kim",
    company: "Meta",
    quote: "The practice sessions were incredibly realistic and helpful",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    company: "Apple",
    quote: "WebNova's mock interviews prepared me perfectly for Apple",
    rating: 5,
  },
  {
    name: "James Wilson",
    company: "Microsoft",
    quote: "Amazing platform that helped me crack Microsoft interviews",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    company: "Tesla",
    quote: "The feedback was spot-on and helped me improve drastically",
    rating: 5,
  },
  {
    name: "Ryan Lee",
    company: "Netflix",
    quote: "From zero confidence to Netflix offer in 3 months!",
    rating: 5,
  },
  {
    name: "Jennifer Brown",
    company: "Uber",
    quote: "WebNova's system design practice was exactly what I needed",
    rating: 5,
  },
  {
    name: "Kevin Zhang",
    company: "Airbnb",
    quote: "The coding challenges were perfectly tailored to real interviews",
    rating: 5,
  },
  {
    name: "Amy Chen",
    company: "Spotify",
    quote: "Incredible platform - helped me land my Spotify role",
    rating: 5,
  },
];

// Split testimonials into columns for the animation
const createTestimonialColumns = (testimonials: Testimonial[], numColumns: number) => {
  const columns = Array.from({ length: numColumns }, () => [] as Testimonial[]);
  testimonials.forEach((testimonial: Testimonial, index: number) => {
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
      "review": testimonials.map(testimonial => ({
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
        "reviewCount": testimonials.length,
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

  const columns = createTestimonialColumns(testimonials, 4);

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

      {/* Animated Testimonial Columns */}
      <div className="flex justify-center gap-4 md:gap-6 px-4">
        {columns.map((column, columnIndex) => (
          <motion.div
            key={columnIndex}
            className="flex flex-col gap-4 w-80"
            animate={{
              y: columnIndex % 2 === 0 ? [0, -20, 0] : [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: columnIndex * 2,
            }}
          >
            {/* Duplicate the column content for seamless looping */}
            {[...column, ...column].map((testimonial, index) => (
              <Card key={`${testimonial.name}-${index}`} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {generateChatAvatar(testimonial.name, testimonial.company)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-black text-sm">{testimonial.name}</h4>
                        <div className="flex">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Gradient overlays to fade out top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}