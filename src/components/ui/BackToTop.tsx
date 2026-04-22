'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[40] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-light)] bg-[var(--surface-glass)] text-[var(--text-secondary)] shadow-[var(--shadow-featured)] backdrop-blur-xl transition-colors hover:bg-white hover:text-[var(--blush-deep)] lg:bottom-8 lg:right-[calc((100vw-min(100vw,1152px))/2+24px)]"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
