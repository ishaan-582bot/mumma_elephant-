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
        }, 250);
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
          <motion.div
            key={i}
            animate={{
              scale: i < pin.length ? [1, 1.3, 1] : 1,
              borderColor: error ? 'var(--status-error)' : i < pin.length ? 'var(--blush)' : 'var(--border)',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className={`h-4 w-4 rounded-full border-[2.5px] transition-colors duration-200 ${
              i < pin.length ? 'bg-[var(--blush)] shadow-[var(--shadow-glow-blush)]' : 'bg-transparent'
            } ${error ? 'border-[var(--status-error)]' : ''}`}
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold text-[var(--status-error)]"
        >
          {error}
        </motion.p>
      )}

      {/* Number Pad */}
      <div className="grid w-full max-w-[260px] grid-cols-3 gap-3">
        {buttons.map((btn, i) => {
          if (btn === '') return <div key={i} />;
          if (btn === 'del') {
            return (
              <motion.button
                key={i}
                onClick={handleDelete}
                whileTap={{ scale: 0.88 }}
                className="flex h-[68px] w-[68px] cursor-pointer items-center justify-center justify-self-center rounded-[var(--radius-full)] border-none bg-transparent text-[var(--text-muted)] transition-colors hover:text-[var(--status-error)]"
              >
                <Delete size={22} />
              </motion.button>
            );
          }
          return (
            <motion.button
              key={i}
              onClick={() => handlePress(btn)}
              whileTap={{
                scale: 0.92,
                backgroundColor: 'var(--blush-soft)',
              }}
              className="h-[68px] w-[68px] cursor-pointer justify-self-center rounded-full border-2 border-[var(--border)] bg-[var(--bg-card)] text-[22px] font-bold text-[var(--text-primary)] transition-all duration-150 hover:border-[var(--blush)] hover:shadow-[var(--shadow-elevated)]"
            >
              {btn}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
