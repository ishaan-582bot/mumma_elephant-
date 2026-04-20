'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--terracotta)] text-white hover:bg-[color-mix(in_oklab,var(--terracotta)_85%,black)] focus-visible:ring-[var(--terracotta)]',
  secondary:
    'border border-[var(--cream-dark)] bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] focus-visible:ring-[var(--mauve)]',
  ghost:
    'bg-transparent text-[var(--blush-dark)] hover:bg-[var(--blush-light)] focus-visible:ring-[var(--blush-dark)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
