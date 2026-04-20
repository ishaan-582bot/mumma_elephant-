import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export default function Card({
  title,
  description,
  children,
  className = '',
  bodyClassName = '',
}: CardProps) {
  return (
    <section
      className={`overflow-hidden rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--bg-card)] shadow-[var(--shadow-sm)] ${className}`}
    >
      {(title || description) && (
        <header className="border-b border-[var(--cream-dark)] px-5 py-4">
          {title ? (
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
          ) : null}
        </header>
      )}
      <div className={`px-5 py-5 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
