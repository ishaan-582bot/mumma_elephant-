'use client';
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[5000]"
            style={{
              background: 'var(--bg-overlay)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-[5001] overflow-y-auto"
            style={{
              maxHeight: '85vh',
              background: 'var(--bg-card)',
              borderTopLeftRadius: 'var(--radius-xl)',
              borderTopRightRadius: 'var(--radius-xl)',
              boxShadow: '0 -8px 32px rgba(45, 33, 24, 0.1)',
            }}
          >
            {/* Drag handle */}
            <div
              className="sticky top-0 z-[1] flex justify-center"
              style={{
                padding: '14px 0 10px',
                background: 'var(--bg-card)',
                borderTopLeftRadius: 'var(--radius-xl)',
                borderTopRightRadius: 'var(--radius-xl)',
              }}
            >
              <motion.div
                whileHover={{ scaleX: 1.2 }}
                className="h-1 w-10 rounded-full"
                style={{ background: 'var(--border)' }}
              />
            </div>

            {title && (
              <h3
                className="px-6 pb-4 text-lg font-bold text-[var(--text-primary)]"
              >
                {title}
              </h3>
            )}
            <div className="px-6 pb-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
