'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  label: string;
  variant?: 'blush' | 'sage' | 'mauve' | 'terracotta' | 'lavender' | 'cream' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<string, { bg: string; color: string; dot?: string }> = {
  blush:      { bg: 'var(--blush-soft)',      color: 'var(--blush-deep)',      dot: 'var(--blush)' },
  sage:       { bg: 'var(--sage-soft)',       color: 'var(--sage-deep)',       dot: 'var(--sage)' },
  mauve:      { bg: 'var(--mauve-soft)',      color: 'var(--mauve-deep)',      dot: 'var(--mauve)' },
  terracotta: { bg: 'var(--terracotta-soft)', color: 'var(--terracotta-deep)', dot: 'var(--terracotta)' },
  lavender:   { bg: 'var(--lavender-soft)',   color: '#5A3A7A',                dot: 'var(--lavender)' },
  cream:      { bg: 'var(--cream-deep)',      color: 'var(--text-secondary)',  dot: 'var(--text-muted)' },
  success:    { bg: 'var(--success-soft)',    color: 'var(--status-success)',  dot: 'var(--sage)' },
  warning:    { bg: 'var(--warning-soft)',    color: '#8B6A2A',                dot: 'var(--status-warning)' },
  error:      { bg: 'var(--error-soft)',      color: 'var(--status-error)',    dot: 'var(--status-error)' },
};

export default function Badge({ label, variant = 'blush', size = 'md', dot = false, className = '' }: BadgeProps) {
  const style = variantStyles[variant];
  return (
    <motion.span
      initial={false}
      className={`
        inline-flex items-center gap-1.5 whitespace-nowrap rounded-full
        ${size === 'sm' ? 'px-2.5 py-0.5 text-[11px] font-semibold' : 'px-3.5 py-1 text-xs font-semibold'}
        ${className}
      `}
      style={{
        background: style.bg,
        color: style.color,
      }}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{ background: style.dot }}
        />
      )}
      {label}
    </motion.span>
  );
}
