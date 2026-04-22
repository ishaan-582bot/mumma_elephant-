import React from 'react';
import { motion } from 'framer-motion';
import { typo } from '@/lib/typography';

interface SectionHeroProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor?: string;
  featured?: boolean;
}

export default function SectionHero({
  icon,
  title,
  subtitle,
  accentColor = 'var(--blush)',
  featured = false,
}: SectionHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] as any }}
      className={`
        relative mb-5 flex items-center gap-4 overflow-hidden rounded-[var(--radius-lg)]
        border border-[var(--border)] bg-[var(--bg-card)] p-5
        shadow-[var(--shadow-elevated)] transition-shadow duration-300 hover:shadow-[var(--shadow-featured)]
        sm:gap-5 sm:p-6 lg:p-7
        ${featured ? 'border-l-0' : 'border-t-[3px] border-l-0 sm:border-t-0 sm:border-l-[3px]'}
      `}
      style={{
        borderTopColor: !featured ? accentColor : undefined,
        borderLeftColor: !featured ? accentColor : undefined,
      }}
    >
      {featured && (
        <div
          className="absolute inset-y-0 left-0 w-1"
          style={{
            background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
          }}
        />
      )}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream-deep)]/60 sm:h-14 sm:w-14"
        style={{ color: accentColor }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <h2 className={`${typo.pageHeroBold} leading-snug`}>{title}</h2>
        <p className={`mt-0.5 ${typo.bodyMuted}`}>{subtitle}</p>
      </div>
    </motion.div>
  );
}
