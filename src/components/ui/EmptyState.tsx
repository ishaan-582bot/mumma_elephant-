'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
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
      className="fade-in-up flex flex-col items-center justify-center p-12 text-center gap-5"
      whileHover={{ scale: 1.01 }}
    >
      <div
        className="w-[120px] h-[120px] rounded-[var(--radius-full)] bg-gradient-to-br from-[var(--blush-light)] to-[var(--cream)] flex items-center justify-center text-[48px] shadow-[var(--shadow-glow-blush)]"
      >
        {icon}
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
        <div className="mt-1 px-4 py-3 bg-[var(--cream)] rounded-[var(--radius-lg)] flex items-center gap-3 max-w-[320px]">
          {hintIcon || <Heart size={16} color="var(--blush-dark)" className="shrink-0" />}
          <p className={`${typo.caption} text-left leading-relaxed`}>
            {hint}
          </p>
        </div>
      )}
    </motion.div>
  );
}
