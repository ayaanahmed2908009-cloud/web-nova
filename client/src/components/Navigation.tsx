import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Website Development", href: "/get-website" },
  { name: "App Development", href: "/get-app" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Our Story", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Dashboard", href: "/dashboard" }
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Apply shadow effect to main content when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-active');
      
      // Add click handler to close menu when clicking on shadow
      const handleBodyClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.mobile-menu-panel') && !target.closest('.mobile-menu-button')) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('click', handleBodyClick);
      
      return () => {
        document.removeEventListener('click', handleBodyClick);
        document.body.classList.remove('mobile-menu-active');
      };
    } else {
      document.body.classList.remove('mobile-menu-active');
    }
  }, [isOpen]);



  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent cursor-pointer"
            >
              WebNova
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer rounded-lg relative ${
                    location === item.href 
                      ? "text-white bg-gray-900 shadow-lg" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                  {location === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gray-900 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-button"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <>
          {/* Dark Grey Backdrop - Remaining Screen */}
          <div 
            className="fixed inset-0 bg-gray-800/70 z-[9998] md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* White Full-Height Menu Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-[9999] md:hidden mobile-menu-panel"
            style={{ height: '100vh', boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.15)' }}
          >
            {/* White Background Container */}
            <div className="h-full bg-white flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 p-6 space-y-3 bg-white overflow-y-auto">
                {navItems.map((item, index) => (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={`block px-4 py-3 text-base font-medium transition-colors cursor-pointer rounded-lg ${
                        location === item.href 
                          ? "text-white bg-gray-900" 
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
              </div>
              
              {/* Bottom padding area - ensures white extends to bottom */}
              <div className="h-6 bg-white" />
            </div>
          </motion.div>
        </>
      )}
    </motion.nav>
  );
}