'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  action?: { label: string; onClick: () => void };
  duration?: number;
  type?: 'success' | 'warning' | 'info' | 'error' | 'default';
}

const typeConfig = {
  success: {
    border: 'var(--sage)',
    bg: 'var(--sage-soft)',
    icon: <CheckCircle2 size={18} className="text-[var(--sage-deep)] shrink-0" />,
  },
  warning: {
    border: 'var(--status-warning)',
    bg: 'var(--warning-soft)',
    icon: <AlertTriangle size={18} className="text-[#8B6A2A] shrink-0" />,
  },
  info: {
    border: 'var(--status-info)',
    bg: 'var(--info-soft)',
    icon: <Info size={18} className="text-[var(--status-info)] shrink-0" />,
  },
  error: {
    border: 'var(--status-error)',
    bg: 'var(--error-soft)',
    icon: <XCircle size={18} className="text-[var(--status-error)] shrink-0" />,
  },
  default: {
    border: 'transparent',
    bg: 'transparent',
    icon: null,
  },
};

export default function Toast({ message, show, onClose, action, duration = 5000, type = 'default' }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), duration);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, duration]);

  const handleExitComplete = () => {
    if (!isVisible) onClose();
  };

  const cfg = typeConfig[type] || typeConfig.default;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          className="fixed top-6 left-1/2 z-[10000] flex items-center gap-3"
          style={{
            transform: 'translateX(-50%)',
            maxWidth: 448,
            width: 'calc(100vw - 32px)',
          }}
        >
          <div
            className="flex items-center gap-3 w-full rounded-[var(--radius-lg)] px-5 py-3.5 shadow-[var(--shadow-featured)] border"
            style={{
              background: 'var(--surface-glass)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderColor: type !== 'default' ? cfg.border : 'var(--border)',
              borderLeftWidth: type !== 'default' ? '4px' : '1px',
            }}
          >
            {cfg.icon}
            <span className="flex-1 text-sm font-semibold text-[var(--text-primary)] leading-snug">
              {message}
            </span>
            {action && (
              <button
                onClick={action.onClick}
                className="shrink-0 rounded-[var(--radius-sm)] border border-[var(--border)] bg-transparent px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] transition-all duration-150 hover:border-[var(--blush)] hover:text-[var(--blush-deep)] cursor-pointer"
              >
                {action.label}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
