'use client';

import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  /* Warm gradient primary — the hero action */
  primary:
    'bg-gradient-to-r from-[var(--terracotta)] to-[var(--terracotta-deep)] text-white '
    + 'hover:from-[var(--terracotta-deep)] hover:to-[#8B4D35] '
    + 'shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-featured)] '
    + 'focus-visible:ring-[var(--terracotta)]',

  /* Subtle bordered — secondary actions */
  secondary:
    'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] '
    + 'hover:bg-[var(--surface-elevated)] hover:border-[var(--blush-soft)] '
    + 'shadow-[var(--shadow-resting)] hover:shadow-[var(--shadow-elevated)] '
    + 'focus-visible:ring-[var(--mauve)]',

  /* Ghost — low emphasis, icon actions */
  ghost:
    'bg-transparent text-[var(--blush-deep)] '
    + 'hover:bg-[var(--blush-soft)] '
    + 'focus-visible:ring-[var(--blush)]',

  /* Glassmorphism — floating actions, overlays */
  glass:
    'bg-[var(--surface-glass)] backdrop-blur-xl border border-white/30 text-[var(--text-primary)] '
    + 'hover:bg-white/80 hover:border-white/50 '
    + 'shadow-[var(--shadow-elevated)] '
    + 'focus-visible:ring-[var(--blush)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3.5 text-sm gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: props.disabled ? 1 : 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`
        inline-flex items-center justify-center
        rounded-[var(--radius-md)] font-semibold
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none
        active:scale-[0.96]
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}
