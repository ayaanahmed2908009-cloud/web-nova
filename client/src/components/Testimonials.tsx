import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote, Instagram, Mail } from "lucide-react";
import { SiInstagram } from "react-icons/si";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    image: "https://i.pravatar.cc/150?u=sarah",
    quote: "NovaWeb Solutions transformed my portfolio into a stunning showcase. Their attention to detail and modern design approach helped me attract more clients.",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    image: "https://i.pravatar.cc/150?u=michael",
    quote: "The team delivered our landing page ahead of schedule. The results exceeded our expectations, and our conversion rate has improved significantly.",
  },
  {
    name: "Emma Davis",
    role: "Small Business Owner",
    image: "https://i.pravatar.cc/150?u=emma",
    quote: "Working with NovaWeb was a game-changer for my business. They created an e-commerce site that's both beautiful and easy to manage.",
  },
  {
    name: "Alex Thompson",
    role: "Photography Studio",
    image: "https://i.pravatar.cc/150?u=alex",
    quote: "Their creative approach and technical expertise helped bring my vision to life. My photography portfolio has never looked better.",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    skipSnaps: false,
    align: 'start',
    containScroll: 'trimSnaps',
  });

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

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect(); // Initial check

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </motion.div>

        <div className="relative flex-grow flex flex-col justify-center">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Quote className="w-10 h-10 text-black/20 mb-4" />
                      <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="rounded-full bg-white hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="rounded-full bg-white hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* CTA Section for Instagram/Email */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
            <CardContent className="space-y-6">
              <h3 className="text-2xl font-bold">Want to Share Your Experience?</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We'd love to hear about your experience working with WebNova! Send us a message on Instagram or email us with your feedback.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => window.open('https://instagram.com/webnovasolution', '_blank')}
                >
                  <SiInstagram className="w-5 h-5 mr-2" />
                  Message on Instagram
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                  onClick={() => window.location.href = 'mailto:webnovasolution@gmail.com?subject=My Experience with WebNova'}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}