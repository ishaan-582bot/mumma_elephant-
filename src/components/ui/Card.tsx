import React from 'react';
import { motion } from 'framer-motion';
import { typo } from '@/lib/typography';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  density?: 'compact' | 'comfortable' | 'spacious';
  elevation?: 'resting' | 'elevated' | 'featured' | 'glass';
  hover?: boolean;
}

export default function Card({
  title,
  description,
  children,
  className = '',
  bodyClassName = '',
  density = 'comfortable',
  elevation = 'elevated',
  hover = true,
}: CardProps) {
  const densityClass =
    density === 'compact'
      ? 'px-4 py-3'
      : density === 'spacious'
        ? 'p-6'
        : 'p-5';

  const elevationClass =
    elevation === 'resting'
      ? 'shadow-[var(--shadow-resting)]'
      : elevation === 'featured'
        ? 'shadow-[var(--shadow-featured)]'
        : elevation === 'glass'
          ? 'bg-[var(--surface-glass)] backdrop-blur-xl border-white/40 shadow-[var(--shadow-elevated)]'
          : 'shadow-[var(--shadow-elevated)]';

  return (
    <motion.section
      whileHover={
        hover
          ? {
              y: -2,
              boxShadow:
                elevation === 'featured'
                  ? '0 16px 40px rgba(45, 33, 24, 0.1), 0 6px 12px rgba(45, 33, 24, 0.05)'
                  : '0 8px 24px rgba(45, 33, 24, 0.07), 0 3px 6px rgba(45, 33, 24, 0.03)',
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`
        overflow-hidden rounded-[var(--radius-lg)]
        ${elevation === 'glass' ? '' : 'bg-[var(--bg-card)] border border-[var(--border)]'}
        ${elevationClass}
        transition-shadow duration-300
        ${className}
      `}
    >
      {(title || description) && (
        <header className={`border-b border-[var(--border-light)] ${densityClass}`}>
          {title && <h2 className={typo.heading}>{title}</h2>}
          {description && <p className={`mt-1 ${typo.subheading}`}>{description}</p>}
        </header>
      )}
      <div className={`${densityClass} ${bodyClassName}`}>{children}</div>
    </motion.section>
  );
}
