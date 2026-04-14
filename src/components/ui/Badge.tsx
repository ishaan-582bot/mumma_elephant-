'use client';
import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'blush' | 'sage' | 'mauve' | 'terracotta' | 'lavender' | 'cream' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

const variantStyles: Record<string, { bg: string; color: string }> = {
  blush: { bg: 'var(--blush-light)', color: '#8A4A62' },
  sage: { bg: 'var(--sage-light)', color: '#4A6B3A' },
  mauve: { bg: 'var(--mauve-light)', color: '#6A4A68' },
  terracotta: { bg: 'var(--terracotta-light)', color: '#6A3A28' },
  lavender: { bg: 'var(--lavender-light)', color: '#5A3A7A' },
  cream: { bg: 'var(--cream-dark)', color: 'var(--text-secondary)' },
  success: { bg: '#D4E8D0', color: '#2A6B2A' },
  warning: { bg: '#F5E0C0', color: '#7A5A2A' },
};

export default function Badge({ label, variant = 'blush', size = 'md' }: BadgeProps) {
  const style = variantStyles[variant];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: style.bg,
      color: style.color,
      borderRadius: 'var(--radius-full)',
      padding: size === 'sm' ? '3px 10px' : '5px 14px',
      fontSize: size === 'sm' ? '0.75rem' : '0.8rem',
      fontWeight: 700,
      whiteSpace: 'nowrap',
      letterSpacing: '0.02em',
    }}>
      {label}
    </span>
  );
}
