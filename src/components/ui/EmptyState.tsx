'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Button from './Button';
import { typo } from '@/lib/typography';

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as any }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center gap-5"
    >
      {/* Animated gradient orb behind icon */}
      <div className="relative mb-1">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--blush-soft)] via-[var(--lavender-soft)] to-[var(--sage-soft)] blur-xl"
          style={{ transform: 'scale(1.3)' }}
        />
        <div
          className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-gradient-to-br from-[var(--blush-soft)] to-[var(--cream-deep)] text-[48px] shadow-[var(--shadow-glow-blush)]"
        >
          {icon}
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles size={18} className="text-[var(--blush)]" />
        </motion.div>
      </div>

      <h3 className={`${typo.heading} max-w-[320px] leading-relaxed`}>
        {title}
      </h3>
      <p className={`${typo.bodyMuted} max-w-[300px] leading-relaxed`}>
        {subtitle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
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
        <div className="mt-1 flex items-center gap-3 max-w-[320px] rounded-[var(--radius-lg)] bg-[var(--cream-deep)]/60 px-4 py-3 border border-[var(--border-light)]">
          {hintIcon || <Sparkles size={16} className="text-[var(--blush)] shrink-0" />}
          <p className={`${typo.caption} text-left leading-relaxed`}>
            {hint}
          </p>
        </div>
      )}
    </motion.div>
  );
}
