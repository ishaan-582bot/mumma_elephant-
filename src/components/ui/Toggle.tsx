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
    <div
      onClick={() => onChange(!checked)}
      style={{
        background: checked ? activeColor : 'var(--cream-dark)',
      }}
      className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full px-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage)] ${
        checked ? 'justify-end' : 'justify-start'
      }`}
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
        className="h-5 w-5 rounded-full bg-white shadow-sm"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  );
}
