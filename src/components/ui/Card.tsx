import React from 'react';
import { typo } from '@/lib/typography';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  density?: 'comfortable' | 'compact' | 'spacious';
}

export default function Card({
  title,
  description,
  children,
  className = '',
  bodyClassName = '',
  density = 'comfortable',
}: CardProps) {
  const densityClass =
    density === 'compact'
      ? 'px-4 py-3'
      : density === 'spacious'
        ? 'p-6'
        : 'p-5';

  return (
    <section
      className={`overflow-hidden rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--bg-card)] shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)] ${className}`}
    >
      {(title || description) && (
        <header className={`border-b border-[var(--cream-dark)] ${densityClass}`}>
          {title ? (
            <h2 className={typo.heading}>
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className={`mt-1 ${typo.subheading}`}>{description}</p>
          ) : null}
        </header>
      )}
      <div className={`${densityClass} ${bodyClassName}`}>{children}</div>
    </section>
  );
}
