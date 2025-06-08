import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, Phone, Calendar } from 'lucide-react';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Mail,
      label: 'Send Email',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => window.location.href = 'mailto:hello@webnovasolutions.com'
    },
    {
      icon: Phone,
      label: 'Call Us',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => window.location.href = 'tel:+15551234567'
    },
    {
      icon: Calendar,
      label: 'Schedule Meeting',
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`${action.color} text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2 group`}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-2">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}