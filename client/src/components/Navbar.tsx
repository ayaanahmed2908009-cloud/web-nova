import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

const sections = [
  { id: "who", label: "Who Are We?", isExternal: false },
  { id: "services", label: "What Do We Do?", isExternal: false },
  { id: "why", label: "Why Us?", isExternal: false },
  { id: "testimonials", label: "Testimonials", isExternal: false },
  { id: "pricing", label: "Pricing", isExternal: false },
];

const externalPages = [
  { path: "/portfolio", label: "Portfolio" },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      {/* Home page sections */}
      {location === "/" && sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <button
            onClick={() => {
              scrollToSection(section.id);
              setIsOpen(false);
            }}
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group"
          >
            {section.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </button>
        </motion.div>
      ))}
      
      {/* External pages */}
      {externalPages.map((page, index) => (
        <motion.div
          key={page.path}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (sections.length + index) * 0.1 + 0.3 }}
        >
          <Link href={page.path}>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group"
            >
              {page.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </button>
          </Link>
        </motion.div>
      ))}
      
      {/* Home link when not on home page */}
      {location !== "/" && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </button>
          </Link>
        </motion.div>
      )}
    </>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-shrink-0"
            >
              <Link href="/">
                <div className="cursor-pointer group">
                  <h1 className="text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105">
                    <span className="text-black">WebNova</span>
                    <span className="text-gray-600 ml-1">Solutions</span>
                  </h1>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <NavLinks />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button 
                  onClick={() => scrollToSection('pricing')}
                  className="bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full px-6 py-2 text-sm font-medium"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <div className="flex flex-col justify-center items-center w-6 h-6">
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                      </div>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="bg-white/95 backdrop-blur-md">
                    <div className="flex flex-col space-y-6 mt-12">
                      <NavLinks />
                      <Button 
                        onClick={() => {
                          scrollToSection('pricing');
                          setIsOpen(false);
                        }}
                        className="bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full px-6 py-3 text-sm font-medium w-fit"
                      >
                        Get Started
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
