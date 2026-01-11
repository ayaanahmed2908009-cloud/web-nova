import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";

const sections = [
  { id: "who", label: "Who Are We?", isExternal: false },
  { id: "services", label: "What Do We Do?", isExternal: false },
  { id: "why", label: "Why Us?", isExternal: false },
  { id: "testimonials", label: "Testimonials", isExternal: false },
  { id: "pricing", label: "Pricing", isExternal: false },
];

const externalPages = [
  { path: "/portfolio", label: "Portfolio" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "Our Team" },
  { path: "/dashboard", label: "My Quotes", authRequired: true },
  { path: "/admin", label: "Admin Panel", authRequired: true, adminRequired: true },
];

const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

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
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isAuthenticated, login, register, logout, isLoggingIn, isRegistering } = useAuth();
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  const authForm = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = async (data: AuthFormData) => {
    try {
      if (authMode === 'register') {
        await register(data);
        toast({
          title: "Account Created!",
          description: "Welcome to WebNova Solutions.",
        });
      } else {
        await login(data);
        toast({
          title: "Welcome Back!",
          description: "You're now logged in.",
        });
      }
      setShowAuthDialog(false);
      authForm.reset();
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Force a page refresh to ensure clean state
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out.",
        variant: "destructive",
      });
    }
  };

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
            className="text-sm font-medium text-gray-700 hover:text-black transition-all duration-300 relative group py-2"
          >
            {section.label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </button>
        </motion.div>
      ))}
      
      {/* External pages */}
      {externalPages.map((page, index) => {
        // Hide dashboard if user is not authenticated
        if (page.authRequired && !isAuthenticated) return null;
        // Hide admin panel if user is not admin
        if (page.adminRequired && !isAdmin) return null;
        
        return (
          <motion.div
            key={page.path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (sections.length + index) * 0.1 + 0.3 }}
          >
            <Link href={page.path}>
              <span
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-black transition-all duration-300 relative group py-2 inline-block"
              >
                {page.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </motion.div>
        );
      })}
      
      {/* Home link when not on home page */}
      {location !== "/" && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/">
            <span
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-black transition-all duration-300 relative group py-2 inline-block"
            >
              Home
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
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
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-shrink-0"
            >
              <Link href="/">
                <div className="cursor-pointer group flex items-center gap-3">
                  <Logo className="w-8 h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-105" />
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105 text-black">
                    WebNova Solutions
                  </h1>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center">
              <nav className="flex items-center space-x-8 mr-8">
                <NavLinks />
              </nav>
              

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
                    <div className="flex flex-col space-y-8 mt-16">
                      <div className="space-y-6">
                        <NavLinks />
                      </div>
                      

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
