import React from 'react';
import { typo } from '@/lib/typography';

interface SectionHeroProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor?: string;
}

export default function SectionHero({ 
  icon, 
  title, 
  subtitle, 
  accentColor = 'var(--blush)' 
}: SectionHeroProps) {
  return (
    <div 
      className="mb-5 flex items-center gap-3 sm:gap-4 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] border-l-4 bg-[var(--bg-card)] p-4 sm:p-5 lg:p-6 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]"
      style={{ borderLeftColor: accentColor }}
    >
      <div 
        className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream)]"
        style={{ color: accentColor }}
      >
        {icon}
      </div>
      <div>
        <h2 className={typo.pageHeroBold}>{title}</h2>
        <p className={`mt-0.5 ${typo.bodyMuted}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
