'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          /*
           * z-index layering:
           * 40 = BackToTop (this button)
           * 50 = FABs (MyPosts.tsx, SafeVault.tsx upload buttons)
           * 10000 = Toast notifications
           * BackToTop sits below FABs so it never obscures primary actions.
           */
          className="fixed bottom-6 right-6 z-[40] flex h-11 w-11 cursor-pointer items-center justify-center rounded-[var(--radius-full)] border-none bg-[var(--mauve)] text-white shadow-[var(--shadow-lg)] lg:bottom-8 lg:right-[calc((100vw-min(100vw,1152px))/2+24px)]"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
