import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import CrypticText from "./CrypticText";
import CrypticAlternatingText from "./CrypticAlternatingText";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

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
      toast({
        title: "Logged Out",
        description: "You've been successfully logged out.",
      });
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
          <CrypticText
            text={section.label}
            onClick={() => {
              scrollToSection(section.id);
              setIsOpen(false);
            }}
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group"
          />
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
            <CrypticText
              text={page.label}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group"
            />
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
            <CrypticText
              text="Home"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300 relative group"
            />
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
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-shrink-0"
            >
              <Link href="/">
                <div className="cursor-pointer group">
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105">
                    <CrypticAlternatingText
                      texts={["WebNova Solutions", "An Agency Built on Excellence"]}
                      className="text-black text-xl md:text-2xl font-bold"
                      interval={3000}
                    />
                  </h1>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <NavLinks />
              
              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        {authMode === 'login' ? 'Login to Your Account' : 'Create Your Account'}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          onClick={() => setAuthMode('login')}
                          variant={authMode === 'login' ? 'default' : 'outline'}
                          className="flex-1"
                        >
                          Login
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setAuthMode('register')}
                          variant={authMode === 'register' ? 'default' : 'outline'}
                          className="flex-1"
                        >
                          Register
                        </Button>
                      </div>

                      <form onSubmit={authForm.handleSubmit(handleAuth)} className="space-y-4">
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            placeholder="Enter your username"
                            {...authForm.register("username")}
                          />
                          {authForm.formState.errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                              {authForm.formState.errors.username.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...authForm.register("password")}
                          />
                          {authForm.formState.errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                              {authForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoggingIn || isRegistering}
                          className="w-full"
                        >
                          {isLoggingIn || isRegistering ? "Processing..." : 
                           authMode === 'register' ? "Create Account" : "Login"}
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              
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
                      
                      {/* Mobile Authentication Section */}
                      {isAuthenticated ? (
                        <div className="space-y-4">
                          <div className="text-sm text-gray-600">Welcome, {user?.username}</div>
                          <Button
                            onClick={() => {
                              handleLogout();
                              setIsOpen(false);
                            }}
                            variant="outline"
                            className="flex items-center space-x-2 w-fit"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            setShowAuthDialog(true);
                            setIsOpen(false);
                          }}
                          variant="outline"
                          className="flex items-center space-x-2 w-fit"
                        >
                          <User className="h-4 w-4" />
                          <span>Login</span>
                        </Button>
                      )}
                      
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
