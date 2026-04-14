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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--bg-overlay)',
              zIndex: 5000,
            }}
          />
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '85vh',
              background: 'var(--bg-card)',
              borderTopLeftRadius: 'var(--radius-xl)',
              borderTopRightRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 5001,
              overflowY: 'auto',
              padding: '0 0 24px',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px 0 8px',
              position: 'sticky',
              top: 0,
              background: 'var(--bg-card)',
              borderTopLeftRadius: 'var(--radius-xl)',
              borderTopRightRadius: 'var(--radius-xl)',
              zIndex: 1,
            }}>
              <div style={{
                width: 40,
                height: 4,
                borderRadius: 'var(--radius-full)',
                background: 'var(--cream-dark)',
              }} />
            </div>
            {title && (
              <h3 style={{
                padding: '4px 24px 16px',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}>
                {title}
              </h3>
            )}
            <div style={{ padding: '0 24px' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
