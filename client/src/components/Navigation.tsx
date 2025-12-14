import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { 
    name: "Services", 
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      { category: "Development", items: [
        { name: "Website Development", description: "Custom web solutions", href: "/get-website" },
        { name: "App Development", description: "iOS & Android apps", href: "/get-app" },
        { name: "E-commerce", description: "Online store solutions", href: "/ecommerce-solutions" },
      ]},
      { category: "Growth", items: [
        { name: "SEO Services", description: "Search optimization", href: "/seo-services" },
        { name: "Maintenance", description: "Ongoing support", href: "/maintenance-subscription" },
      ]}
    ]
  },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-active');
      
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div className="h-20" />
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
      >
        <motion.div
          className={`relative rounded-2xl transition-all duration-300 ${
            isScrolled 
              ? "bg-white/95 backdrop-blur-xl shadow-lg border border-gray-200/50" 
              : "bg-white/90 backdrop-blur-lg shadow-md border border-gray-100"
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <Link href="/">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">W</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 hidden sm:block">WebNova</span>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
                {navItems.map((item) => (
                  <div key={item.name} className="relative">
                    {item.hasDropdown ? (
                      <motion.button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                          activeDropdown === item.name
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </motion.button>
                    ) : (
                      <Link href={item.href}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                            location === item.href 
                              ? "bg-gray-900 text-white" 
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-0">
                            {item.dropdownItems?.map((category, idx) => (
                              <div key={category.category} className={`p-4 ${idx === 0 ? 'border-r border-gray-100' : ''}`}>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">{category.category}</p>
                                <div className="space-y-1">
                                  {category.items.map((subItem) => (
                                    <Link key={subItem.name} href={subItem.href}>
                                      <motion.div
                                        whileHover={{ x: 4 }}
                                        className="block p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <p className="text-sm font-medium text-gray-900">{subItem.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{subItem.description}</p>
                                      </motion.div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex items-center gap-3">
                <Link href="/project-form">
                  <Button 
                    className="hidden sm:flex bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-5 h-9 text-sm font-medium shadow-sm"
                  >
                    Start a Project
                  </Button>
                </Link>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    className="mobile-menu-button p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
                style={{ top: '-1rem', left: '-50vw', right: '-50vw', bottom: '-100vh' }}
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[9999] md:hidden mobile-menu-panel"
              >
                <div className="p-4 space-y-1">
                  <Link href="/">
                    <motion.div
                      className={`block px-4 py-3 text-base font-medium rounded-xl cursor-pointer ${
                        location === "/" 
                          ? "bg-gray-900 text-white" 
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </motion.div>
                  </Link>
                  
                  {navItems.map((item) => (
                    item.hasDropdown ? (
                      <div key={item.name}>
                        <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider mt-3">
                          {item.name}
                        </div>
                        {item.dropdownItems?.map((category) => (
                          category.items.map((subItem) => (
                            <Link key={subItem.name} href={subItem.href}>
                              <motion.div
                                className={`block px-4 py-3 text-base font-medium rounded-xl cursor-pointer ${
                                  location === subItem.href 
                                    ? "bg-gray-900 text-white" 
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </motion.div>
                            </Link>
                          ))
                        ))}
                      </div>
                    ) : (
                      <Link key={item.name} href={item.href}>
                        <motion.div
                          className={`block px-4 py-3 text-base font-medium rounded-xl cursor-pointer ${
                            location === item.href 
                              ? "bg-gray-900 text-white" 
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    )
                  ))}
                  
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <Link href="/project-form">
                      <Button 
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-11 text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Start a Project
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
