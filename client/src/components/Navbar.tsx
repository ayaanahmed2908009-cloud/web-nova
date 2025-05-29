import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";

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
  const [location] = useLocation();

  const NavLinks = () => (
    <>
      {/* Home page sections */}
      {location === "/" && sections.map((section) => (
        <Button
          key={section.id}
          variant="ghost"
          onClick={() => {
            scrollToSection(section.id);
            setIsOpen(false);
          }}
          className="text-base font-medium"
        >
          {section.label}
        </Button>
      ))}
      
      {/* External pages */}
      {externalPages.map((page) => (
        <Link key={page.path} href={page.path}>
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium"
          >
            {page.label}
          </Button>
        </Link>
      ))}
      
      {/* Home link when not on home page */}
      {location !== "/" && (
        <Link href="/">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium"
          >
            Home
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold cursor-pointer hover:text-gray-700 transition-colors">
                WebNova Solutions
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
