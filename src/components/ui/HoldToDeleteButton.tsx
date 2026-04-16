'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Trash2, AlertCircle } from 'lucide-react';

interface HoldToDeleteButtonProps {
  onConfirm: () => void;
  label?: string;
  confirmLabel?: string;
  holdTime?: number; // ms
}

export default function HoldToDeleteButton({
  onConfirm,
  label = "Hold to delete",
  confirmLabel = "Deleting...",
  holdTime = 1500
}: HoldToDeleteButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animationFrame: number;
    
    if (isHolding) {
      startTimeRef.current = Date.now();
      
      const updateProgress = () => {
        const elapsed = Date.now() - (startTimeRef.current || 0);
        const p = Math.min(elapsed / holdTime, 1);
        setProgress(p);
        
        if (p < 1) {
          animationFrame = requestAnimationFrame(updateProgress);
        } else {
          setIsHolding(false);
          onConfirm();
        }
      };
      
      animationFrame = requestAnimationFrame(updateProgress);
      
      // Shake effect as progress increases
      controls.start({
        x: [0, -2, 2, -2, 2, 0],
        transition: { 
          duration: 0.2, 
          repeat: Infinity,
          repeatType: "reverse"
        }
      });
    } else {
      setProgress(0);
      controls.stop();
      controls.set({ x: 0 });
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isHolding, holdTime, onConfirm, controls]);

  return (
    <motion.button
      animate={controls}
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
      onMouseLeave={() => setIsHolding(false)}
      onTouchStart={() => setIsHolding(true)}
      onTouchEnd={() => setIsHolding(false)}
      style={{
        width: '100%',
        height: 48,
        borderRadius: 'var(--radius-md)',
        background: 'var(--cream-dark)',
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        color: 'var(--text-secondary)',
        fontWeight: 700,
        fontSize: '0.9rem',
        fontFamily: 'inherit',
      }}
    >
      {/* Progress Background */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          background: 'var(--terracotta)',
          width: `${progress * 100}%`,
          opacity: 0.8,
          zIndex: 0,
        }}
      />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8, color: progress > 0.4 ? 'white' : 'inherit', transition: 'color 0.2s' }}>
        {progress < 1 ? <Trash2 size={18} /> : <AlertCircle size={18} />}
        {progress < 1 ? label : confirmLabel}
      </div>
    </motion.button>
  );
}
