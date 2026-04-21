'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  action?: { label: string; onClick: () => void };
  duration?: number;
  type?: 'success' | 'warning' | 'info' | 'error' | 'default';
}

const typeConfig: Record<string, { border: string; dot: string }> = {
  success: { border: 'var(--sage)', dot: 'var(--sage)' },
  warning: { border: 'var(--terracotta)', dot: 'var(--terracotta)' },
  info: { border: '#60A5FA', dot: '#60A5FA' },
  error: { border: '#E05D5D', dot: '#E05D5D' },
  default: { border: 'transparent', dot: 'transparent' },
};

export default function Toast({ message, show, onClose, action, duration = 5000, type = 'default' }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, duration]);

  const handleExitComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const cfg = typeConfig[type] || typeConfig.default;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'fixed',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            padding: '14px 20px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            borderLeft: type && type !== 'default' ? `4px solid ${cfg.border}` : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 10000,
            fontSize: '0.9rem',
            fontWeight: 600,
            maxWidth: 448,
            width: 'calc(100vw - 32px)',
          }}
        >
          {type && type !== 'default' && (
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: cfg.dot,
                flexShrink: 0,
              }}
            />
          )}
          <span style={{ flex: 1 }}>{message}</span>
          {action && (
            <button
              onClick={action.onClick}
              style={{
                background: 'transparent',
                color: 'var(--text-secondary)',
                border: '1.5px solid var(--cream-dark)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--blush)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; }}
            >
              {action.label}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
