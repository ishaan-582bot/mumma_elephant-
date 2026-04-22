'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
  activeColor?: string;
}

export default function Toggle({
  checked,
  onChange,
  ariaLabel,
  activeColor = 'var(--sage)',
}: ToggleProps) {
  return (
    <motion.div
      onClick={() => onChange(!checked)}
      className="relative flex h-7 w-12 cursor-pointer items-center rounded-full px-0.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage)]"
      style={{
        background: checked ? activeColor : 'var(--cream-deep)',
        boxShadow: checked ? `0 0 12px ${activeColor}40` : 'inset 0 1px 3px rgba(45,33,24,0.08)',
        justifyContent: checked ? 'flex-end' : 'flex-start',
      }}
      whileTap={{ scale: 0.95 }}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      <motion.div
        layout
        className="h-6 w-6 rounded-full bg-white shadow-sm"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          boxShadow: checked
            ? `0 1px 4px ${activeColor}60`
            : '0 1px 3px rgba(45,33,24,0.15)',
        }}
      />
    </motion.div>
  );
}
