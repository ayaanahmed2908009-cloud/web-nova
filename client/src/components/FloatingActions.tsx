import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sun, Moon, Settings, ArrowUp, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const actions = [
    {
      icon: ArrowUp,
      label: 'Scroll to top',
      action: scrollToTop,
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      icon: isDark ? Sun : Moon,
      label: isDark ? 'Light mode' : 'Dark mode',
      action: toggleTheme,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => console.log('Settings clicked'),
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col gap-3 mb-4"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full shadow-lg border whitespace-nowrap">
                  {action.label}
                </span>
                <motion.button
                  onClick={action.action}
                  className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg flex items-center justify-center`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <action.icon className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full ${
          isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'
        } text-white shadow-xl flex items-center justify-center transition-colors duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-black"
        initial={{ scale: 0, opacity: 0.3 }}
        animate={{ scale: isOpen ? 2 : 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}