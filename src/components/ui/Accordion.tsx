'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { typo } from '@/lib/typography';

interface AccordionProps {
  title: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  gradientBorder?: string;
}

export default function Accordion({
  title,
  badge,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  children,
  gradientBorder = 'var(--mauve)',
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) onToggle();
    if (!isControlled) setInternalOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      <motion.button
        type="button"
        onClick={handleToggle}
        whileTap={{ scale: 0.995 }}
        className="group flex w-full cursor-pointer items-center justify-between border-none bg-[var(--bg-card)] px-5 py-4 shadow-[var(--shadow-elevated)] transition-shadow duration-200 hover:shadow-[var(--shadow-featured)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)]"
        style={{
          borderRadius: isOpen ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-lg)',
          fontFamily: 'inherit',
        }}
      >
        <span className={`flex items-center gap-2.5 ${typo.heading}`}>
          {title}
          {badge}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <ChevronDown size={18} className="text-[var(--text-muted)]" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
              boxShadow: 'var(--shadow-elevated)',
            }}
          >
            {/* Subtle gradient left border */}
            <div className="flex">
              <div
                className="w-1 shrink-0"
                style={{
                  background: `linear-gradient(to bottom, ${gradientBorder}, transparent)`,
                }}
              />
              <div className="flex-1 px-4 pb-4 pt-2">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
