import React from 'react';

/** Shared class string for labels on non-`<span>` elements (e.g. buttons) when a component cannot be used. */
export const FIELD_LABEL_CLASSNAME =
  'text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]';

interface FieldLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Unified field label: Name, Email, section metadata, stat row captions, etc.
 */
export default function FieldLabel({ children, className = '' }: FieldLabelProps) {
  return (
    <span className={[FIELD_LABEL_CLASSNAME, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
