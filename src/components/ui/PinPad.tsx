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
    <div className="flex flex-col items-center gap-6 px-6 py-8">
      {title && (
        <h2 className="text-center text-xl font-bold text-[var(--text-primary)]">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="max-w-[260px] text-center text-sm text-[var(--text-muted)]">
          {subtitle}
        </p>
      )}
      
      {/* PIN Dots */}
      <div className="my-2 flex gap-4">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={`pin-dot ${i < pin.length ? 'filled' : ''} ${error ? 'border-[var(--terracotta)]' : ''}`}
          />
        ))}
      </div>

      {error && (
        <p className="text-sm font-semibold text-[var(--terracotta)]">
          {error}
        </p>
      )}

      {/* Number Pad */}
      <div className="grid w-full max-w-[280px] grid-cols-3 gap-3">
        {buttons.map((btn, i) => {
          if (btn === '') return <div key={i} />;
          if (btn === 'del') {
            return (
              <motion.button
                key={i}
                onClick={handleDelete}
                whileTap={{ scale: 0.9, color: 'var(--terracotta)' }}
                className="flex h-[72px] w-[72px] cursor-pointer items-center justify-center justify-self-center rounded-[var(--radius-full)] border-none bg-transparent text-[var(--text-secondary)]"
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
              className="h-[72px] w-[72px] cursor-pointer justify-self-center rounded-full border-2 border-[var(--cream-dark)] bg-[var(--bg-card)] text-2xl font-bold text-[var(--text-primary)] transition-all duration-100"
            >
              {btn}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
