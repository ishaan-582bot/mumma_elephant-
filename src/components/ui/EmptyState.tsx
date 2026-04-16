'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  hint?: string;
}

export default function EmptyState({ icon, title, subtitle, action, secondaryAction, hint }: EmptyStateProps) {
  return (
    <div className="fade-in-up" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      gap: 16,
    }}>
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
          marginBottom: 8,
        }}
      >
        {icon}
      </motion.div>
      <h3 style={{
        fontSize: '1.15rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.4,
        maxWidth: 280,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        maxWidth: 260,
        lineHeight: 1.5,
      }}>
        {subtitle}
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {action && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            style={{
              background: 'linear-gradient(135deg, var(--blush), var(--blush-dark))',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '12px 28px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {action.label}
          </motion.button>
        )}
        {secondaryAction && (
          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'var(--blush)' }}
            whileTap={{ scale: 0.95 }}
            onClick={secondaryAction.onClick}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '2px solid var(--cream-dark)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 28px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
            }}
          >
            {secondaryAction.label}
          </motion.button>
        )}
      </div>
      
      {hint && (
        <div style={{
          marginTop: 24,
          padding: '12px 16px',
          background: 'var(--cream)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 280,
        }}>
          <Heart size={16} color="var(--blush-dark)" style={{ flexShrink: 0 }} />
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
    </div>
  );
}
