'use client';
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';

interface PinPadProps {
  length?: number;
  onComplete: (pin: string) => void;
  title?: string;
  subtitle?: string;
  error?: string;
}

export default function PinPad({ length = 4, onComplete, title, subtitle, error }: PinPadProps) {
  const [pin, setPin] = useState('');

  const handlePress = useCallback((digit: string) => {
    if (pin.length < length) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === length) {
        setTimeout(() => {
          onComplete(newPin);
          setPin('');
        }, 200);
      }
    }
  }, [pin, length, onComplete]);

  const handleDelete = useCallback(() => {
    setPin((p) => p.slice(0, -1));
  }, []);

  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      padding: '32px 24px',
    }}>
      {title && (
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 260 }}>
          {subtitle}
        </p>
      )}
      
      {/* PIN Dots */}
      <div style={{ display: 'flex', gap: 16, margin: '8px 0' }}>
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={`pin-dot ${i < pin.length ? 'filled' : ''}`}
            style={error ? { borderColor: 'var(--terracotta)' } : undefined}
          />
        ))}
      </div>

      {error && (
        <p style={{ fontSize: '0.85rem', color: 'var(--terracotta)', fontWeight: 600 }}>
          {error}
        </p>
      )}

      {/* Number Pad */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        maxWidth: 280,
        width: '100%',
      }}>
        {buttons.map((btn, i) => {
          if (btn === '') return <div key={i} />;
          if (btn === 'del') {
            return (
              <motion.button
                key={i}
                onClick={handleDelete}
                whileTap={{ scale: 0.9, color: 'var(--terracotta)' }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  justifySelf: 'center',
                }}
              >
                <Delete size={24} />
              </motion.button>
            );
          }
          return (
            <motion.button
              key={i}
              onClick={() => handlePress(btn)}
              whileTap={{ 
                scale: 0.94, 
                backgroundColor: 'var(--blush-light)',
                borderColor: 'var(--blush)'
              }}
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                border: '2px solid var(--cream-dark)',
                background: 'var(--bg-card)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background-color 0.1s ease, border-color 0.1s ease',
                justifySelf: 'center',
              }}
            >
              {btn}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
