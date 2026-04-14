'use client';
import React, { useState, useCallback } from 'react';
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
              <button
                key={i}
                onClick={handleDelete}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
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
              </button>
            );
          }
          return (
            <button
              key={i}
              onClick={() => handlePress(btn)}
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
                transition: 'all 0.15s ease',
                justifySelf: 'center',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.background = 'var(--blush-light)';
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
