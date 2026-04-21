'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  hint?: string;
  hintIcon?: React.ReactNode;
}

export default function EmptyState({ icon, title, subtitle, action, secondaryAction, hint, hintIcon }: EmptyStateProps) {
  return (
    <motion.div
      className="fade-in-up"
      whileHover={{ scale: 1.01 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        gap: 20,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--blush-light), var(--cream))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          boxShadow: 'var(--shadow-glow-blush)',
        }}
      >
        {icon}
      </div>
      <h3 style={{
        fontSize: '1.15rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.4,
        maxWidth: 320,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        maxWidth: 300,
        lineHeight: 1.5,
      }}>
        {subtitle}
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {action && (
          <Button variant="primary" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="secondary" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
      
      {hint && (
        <div style={{
          marginTop: 4,
          padding: '12px 16px',
          background: 'var(--cream)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 320,
        }}>
          {hintIcon || <Heart size={16} color="var(--blush-dark)" style={{ flexShrink: 0 }} />}
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            lineHeight: 1.4,
            textAlign: 'left',
          }}>
            {hint}
          </p>
        </div>
      )}
    </motion.div>
  );
}
