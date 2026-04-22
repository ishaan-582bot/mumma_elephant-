import React from 'react';
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
  featured = false
}: SectionHeroProps) {
  return (
    <div 
      className={`relative mb-5 flex items-center gap-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)] sm:gap-4 sm:p-5 lg:p-6 ${
        featured ? 'border-l-0' : 'border-t-4 border-l-0 sm:border-t-0 sm:border-l-4'
      }`}
      style={!featured ? { borderLeftColor: undefined, borderTopColor: accentColor } : undefined}
    >
      {!featured && (
        <style jsx>{`
          div {
            border-top-color: ${accentColor};
          }
          @media (min-width: 640px) {
            div {
              border-top-color: transparent;
              border-left-color: ${accentColor};
            }
          }
        `}</style>
      )}
      {featured && (
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--blush)] to-[var(--terracotta)]" />
      )}
      <div 
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream)] sm:h-14 sm:w-14"
        style={{ color: featured ? 'var(--terracotta)' : accentColor }}
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
