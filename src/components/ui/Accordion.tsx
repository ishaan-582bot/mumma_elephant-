'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { typo } from '@/lib/typography';

interface AccordionProps {
  title: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}

export default function Accordion({
  title,
  badge,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  children,
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    if (!isControlled) {
      setInternalOpen(!isOpen);
    }
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <button
        type="button"
        onClick={handleToggle}
        className="group flex w-full cursor-pointer items-center justify-between border-none bg-[var(--bg-card)] px-4 py-3.5 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)]"
        style={{
          borderRadius: isOpen ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-lg)',
          fontFamily: 'inherit',
        }}
      >
        <span className={`flex items-center gap-2.5 ${typo.heading}`}>
          {title}
          {badge}
        </span>
        {isOpen ? (
          <ChevronUp size={16} color="var(--text-muted)" />
        ) : (
          <ChevronDown size={16} color="var(--text-muted)" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="group hover:shadow-[var(--shadow-lg)]"
            style={{
              overflow: 'hidden',
              background: 'var(--bg-card)',
              borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            <div style={{ padding: '0 16px 16px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
