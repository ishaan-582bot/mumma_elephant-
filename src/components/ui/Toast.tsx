'use client';
import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  action?: { label: string; onClick: () => void };
  duration?: number;
  type?: 'success' | 'warning' | 'info' | 'error' | 'default';
}

export default function Toast({ message, show, onClose, action, duration = 5000, type = 'default' }: ToastProps) {
  const [visible, setVisible] = useState(false);

  const getAccentColor = (t: string) => {
    switch (t) {
      case 'success': return 'var(--sage)';
      case 'warning': return 'var(--terracotta)';
      case 'info': return '#60A5FA';
      case 'error': return '#E05D5D';
      default: return 'transparent';
    }
  };


  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show && !visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '0' : '20px'})`,
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s ease',
        background: 'var(--text-primary)',
        color: 'var(--cream)',
        padding: '14px 24px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        borderLeft: type && type !== 'default' ? `4px solid ${getAccentColor(type)}` : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 10000,
        fontSize: '0.9rem',
        fontWeight: 600,
        maxWidth: '90vw',
      }}
    >
      <span>{message}</span>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: 'var(--blush)',
            color: 'var(--text-primary)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 14px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontFamily: 'inherit',
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
